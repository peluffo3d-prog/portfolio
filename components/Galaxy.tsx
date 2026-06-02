"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Partículas de fondo ─────────────────────────────────────────────────────
function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(2400);
    for (let i = 0; i < 2400; i += 3) {
      arr[i]     = (Math.random() - 0.5) * 18;
      arr[i + 1] = (Math.random() - 0.5) * 18;
      arr[i + 2] = (Math.random() - 0.5) * 8 - 4;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#8ab4f8" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

// ─── Humanoide Android ───────────────────────────────────────────────────────
function AndroidBody() {
  const headRef   = useRef<THREE.Group>(null);
  const bodyRef   = useRef<THREE.Group>(null);
  const leftArm   = useRef<THREE.Group>(null);
  const rightArm  = useRef<THREE.Group>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const clock     = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const body = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#0d1b2a", metalness: 0.88, roughness: 0.12,
  }), []);

  const darkPanel = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#081018", metalness: 0.95, roughness: 0.05,
  }), []);

  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    emissive: new THREE.Color("#4fc3f7"),
    emissiveIntensity: 3.5,
    toneMapped: false,
  }), []);

  const chestGlow = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    emissive: new THREE.Color("#29b6f6"),
    emissiveIntensity: 2.0,
    toneMapped: false,
  }), []);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;

    // Cabeza sigue el cursor (lerp suave)
    if (headRef.current) {
      const tx = -mouse.current.y * 0.38;
      const ty =  mouse.current.x * 0.45;
      headRef.current.rotation.x += (tx - headRef.current.rotation.x) * 0.07;
      headRef.current.rotation.y += (ty - headRef.current.rotation.y) * 0.07;
    }

    // Cuerpo respira / flota
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 0.7) * 0.04;
      bodyRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
    }

    // Brazos oscilan suavemente
    if (leftArm.current)  leftArm.current.rotation.z  =  0.18 + Math.sin(t * 0.9) * 0.04;
    if (rightArm.current) rightArm.current.rotation.z = -0.18 - Math.sin(t * 0.9) * 0.04;
  });

  return (
    <group ref={bodyRef}>
      {/* Luz que ilumina el cuerpo desde el frente */}
      <pointLight position={[0,  1.5,  3]} intensity={4}   color="#b3d9ff" distance={8} />
      <pointLight position={[0, -0.5,  3]} intensity={2}   color="#ffffff"  distance={6} />
      {/* Rim light desde atrás */}
      <pointLight position={[-2, 0.5, -2]} intensity={1.5} color="#1565c0" distance={6} />
      <pointLight position={[ 2, 0.5, -2]} intensity={1.5} color="#1565c0" distance={6} />

      {/* ── CABEZA ─────────────────────────────────── */}
      <group ref={headRef} position={[0, 1.15, 0]}>
        {/* Cráneo */}
        <mesh material={body} castShadow>
          <boxGeometry args={[0.42, 0.46, 0.38]} />
        </mesh>
        {/* Visera frontal */}
        <mesh position={[0, 0.06, 0.185]} material={darkPanel}>
          <boxGeometry args={[0.34, 0.14, 0.02]} />
        </mesh>
        {/* Ojo izquierdo */}
        <mesh position={[-0.1, 0.06, 0.195]} material={glowMat}>
          <sphereGeometry args={[0.055, 10, 10]} />
        </mesh>
        {/* Ojo derecho */}
        <mesh position={[0.1, 0.06, 0.195]} material={glowMat}>
          <sphereGeometry args={[0.055, 10, 10]} />
        </mesh>
        {/* Luz de ojos */}
        <pointLight position={[0, 0.06, 0.3]} color="#4fc3f7" intensity={1.2} distance={2} />
        {/* Mandíbula */}
        <mesh position={[0, -0.24, 0.02]} material={darkPanel}>
          <boxGeometry args={[0.32, 0.08, 0.3]} />
        </mesh>
        {/* Antena */}
        <mesh position={[0, 0.28, 0]} material={body}>
          <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
        </mesh>
        <mesh position={[0, 0.37, 0]} material={glowMat}>
          <sphereGeometry args={[0.025, 6, 6]} />
        </mesh>
      </group>

      {/* ── CUELLO ─────────────────────────────────── */}
      <mesh position={[0, 0.84, 0]} material={body}>
        <cylinderGeometry args={[0.09, 0.12, 0.22, 8]} />
      </mesh>

      {/* ── TORSO ──────────────────────────────────── */}
      <mesh position={[0, 0.3, 0]} material={body} castShadow>
        <boxGeometry args={[0.58, 0.62, 0.28]} />
      </mesh>
      {/* Panel pecho */}
      <mesh position={[0, 0.34, 0.144]} material={darkPanel}>
        <boxGeometry args={[0.36, 0.3, 0.01]} />
      </mesh>
      {/* Núcleo pecho */}
      <mesh position={[0, 0.34, 0.155]} material={chestGlow}>
        <boxGeometry args={[0.12, 0.04, 0.008]} />
      </mesh>
      <mesh position={[0, 0.28, 0.155]} material={chestGlow}>
        <boxGeometry args={[0.22, 0.018, 0.008]} />
      </mesh>
      <mesh position={[0, 0.22, 0.155]} material={chestGlow}>
        <boxGeometry args={[0.18, 0.018, 0.008]} />
      </mesh>
      {/* Clavículas */}
      <mesh position={[-0.2, 0.55, 0.08]} material={darkPanel}>
        <boxGeometry args={[0.18, 0.05, 0.18]} />
      </mesh>
      <mesh position={[0.2, 0.55, 0.08]} material={darkPanel}>
        <boxGeometry args={[0.18, 0.05, 0.18]} />
      </mesh>

      {/* ── BRAZO IZQUIERDO ────────────────────────── */}
      <group ref={leftArm} position={[-0.41, 0.38, 0]}>
        {/* Hombro */}
        <mesh material={body} castShadow>
          <sphereGeometry args={[0.13, 8, 8]} />
        </mesh>
        {/* Brazo superior */}
        <mesh position={[-0.08, -0.25, 0]} rotation={[0, 0, 0.15]} material={body}>
          <cylinderGeometry args={[0.08, 0.07, 0.42, 8]} />
        </mesh>
        {/* Codo */}
        <mesh position={[-0.12, -0.5, 0]} material={darkPanel}>
          <sphereGeometry args={[0.075, 7, 7]} />
        </mesh>
        {/* Antebrazo */}
        <mesh position={[-0.1, -0.72, 0]} rotation={[0, 0, 0.08]} material={body}>
          <cylinderGeometry args={[0.07, 0.055, 0.38, 8]} />
        </mesh>
        {/* Mano */}
        <mesh position={[-0.08, -0.96, 0]} material={darkPanel}>
          <boxGeometry args={[0.12, 0.12, 0.09]} />
        </mesh>
      </group>

      {/* ── BRAZO DERECHO ──────────────────────────── */}
      <group ref={rightArm} position={[0.41, 0.38, 0]}>
        <mesh material={body} castShadow>
          <sphereGeometry args={[0.13, 8, 8]} />
        </mesh>
        <mesh position={[0.08, -0.25, 0]} rotation={[0, 0, -0.15]} material={body}>
          <cylinderGeometry args={[0.08, 0.07, 0.42, 8]} />
        </mesh>
        <mesh position={[0.12, -0.5, 0]} material={darkPanel}>
          <sphereGeometry args={[0.075, 7, 7]} />
        </mesh>
        <mesh position={[0.1, -0.72, 0]} rotation={[0, 0, -0.08]} material={body}>
          <cylinderGeometry args={[0.07, 0.055, 0.38, 8]} />
        </mesh>
        <mesh position={[0.08, -0.96, 0]} material={darkPanel}>
          <boxGeometry args={[0.12, 0.12, 0.09]} />
        </mesh>
      </group>

      {/* ── CADERA ─────────────────────────────────── */}
      <mesh position={[0, -0.06, 0]} material={darkPanel}>
        <boxGeometry args={[0.52, 0.16, 0.26]} />
      </mesh>

      {/* ── PIERNA IZQUIERDA ───────────────────────── */}
      <group position={[-0.18, -0.18, 0]}>
        <mesh position={[0, -0.26, 0]} material={body} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.46, 8]} />
        </mesh>
        <mesh position={[0, -0.52, 0]} material={darkPanel}>
          <sphereGeometry args={[0.09, 7, 7]} />
        </mesh>
        <mesh position={[0, -0.76, 0]} material={body}>
          <cylinderGeometry args={[0.085, 0.07, 0.42, 8]} />
        </mesh>
        <mesh position={[0.01, -1.01, 0.04]} material={darkPanel}>
          <boxGeometry args={[0.14, 0.1, 0.2]} />
        </mesh>
      </group>

      {/* ── PIERNA DERECHA ─────────────────────────── */}
      <group position={[0.18, -0.18, 0]}>
        <mesh position={[0, -0.26, 0]} material={body} castShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.46, 8]} />
        </mesh>
        <mesh position={[0, -0.52, 0]} material={darkPanel}>
          <sphereGeometry args={[0.09, 7, 7]} />
        </mesh>
        <mesh position={[0, -0.76, 0]} material={body}>
          <cylinderGeometry args={[0.085, 0.07, 0.42, 8]} />
        </mesh>
        <mesh position={[-0.01, -1.01, 0.04]} material={darkPanel}>
          <boxGeometry args={[0.14, 0.1, 0.2]} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Escena principal ────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} color="#1a2a4a" />
      <StarField />
      <AndroidBody />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.8}
          intensity={1.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function Galaxy() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.8], fov: 52 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#04080f 0%,#0a1628 60%,#0d1f3c 100%)" }}
    >
      <Scene />
    </Canvas>
  );
}
