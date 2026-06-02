"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GalaxyMesh() {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { positions, colors } = useMemo(() => {
    const COUNT = 10000;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const arm = i % 3;
      const t = (i / COUNT) * Math.PI * 10;
      const r = Math.pow(Math.random(), 0.45) * 4.5;
      const scatter = (Math.random() - 0.5) * r * 0.45;

      pos[i * 3]     = Math.cos(t + arm * ((Math.PI * 2) / 3)) * r + scatter;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.28;
      pos[i * 3 + 2] = Math.sin(t + arm * ((Math.PI * 2) / 3)) * r + scatter;

      // blanco en el centro → azul/violeta en el borde
      const ratio = r / 4.5;
      color.setHSL(0.62 + ratio * 0.14, 0.75 + ratio * 0.1, 0.82 - ratio * 0.38);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;

    // Lerp suave hacia el mouse
    const lerpFactor = 1 - Math.pow(0.04, delta);
    smooth.current.x += (mouse.current.x * 0.28 - smooth.current.x) * lerpFactor;
    smooth.current.y += (mouse.current.y * 0.18 - smooth.current.y) * lerpFactor;

    points.current.rotation.x = smooth.current.y;
    points.current.rotation.y += delta * 0.04; // rotación base lenta
    points.current.rotation.z = smooth.current.x * 0.25;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function Galaxy() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 5.5], fov: 58 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <GalaxyMesh />
    </Canvas>
  );
}
