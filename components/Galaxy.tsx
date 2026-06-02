"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Textura suave para cada partícula (soft glow dot) ──────────────────────
function makeSprite() {
  const canvas = document.createElement("canvas");
  canvas.width = 48; canvas.height = 48;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(24, 24, 0, 24, 24, 24);
  g.addColorStop(0,    "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.65)");
  g.addColorStop(1,    "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 48, 48);
  return new THREE.CanvasTexture(canvas);
}

// ─── Genera partículas con forma de humanoide (torso para arriba) ────────────
function buildHumanoid() {
  const pts: number[] = [];
  const col: number[] = [];
  const color = new THREE.Color();

  const push = (x: number, y: number, z: number, h: number, s: number, l: number) => {
    pts.push(x, y, z);
    color.setHSL(h, s, l);
    col.push(color.r, color.g, color.b);
  };

  const rnd  = () => Math.random();
  const jit  = (v: number, amt: number) => v + (rnd() - 0.5) * amt;
  const cbrt = (v: number) => Math.cbrt(v);

  // ── CABEZA (esfera densa, núcleo brillante) ──
  for (let i = 0; i < 2200; i++) {
    const theta = rnd() * Math.PI * 2;
    const phi   = Math.acos(2 * rnd() - 1);
    const r     = 0.27 * cbrt(rnd());
    const ratio = r / 0.27;
    push(
      r * Math.sin(phi) * Math.cos(theta),
      1.24 + r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi) * 0.82,
      0.63 + ratio * 0.10,          // azul → violeta
      0.88 - ratio * 0.15,
      0.18 + (1 - ratio) * 0.58,   // centro claro → borde oscuro
    );
  }

  // ── CUELLO ──
  for (let i = 0; i < 280; i++) {
    const a = rnd() * Math.PI * 2;
    const r = rnd() * 0.09;
    push(
      Math.cos(a) * r,
      jit(0.89, 0.18),
      Math.sin(a) * r * 0.7,
      0.66, 0.80, 0.30,
    );
  }

  // ── TORSO (elipsoide, más denso en el centro) ──
  for (let i = 0; i < 5500; i++) {
    const t = rnd();               // 0 = hombros, 1 = cintura
    const w = 0.50 - t * 0.10;    // se afina levemente
    const a = rnd() * Math.PI * 2;
    const r = w * Math.sqrt(rnd());
    const x = Math.cos(a) * r;
    const y = 0.70 - t * 0.90;
    const z = Math.sin(a) * r * 0.52;
    const dist = Math.hypot(x, y * 0.4) / w;
    push(x, y, z,
      0.64 + dist * 0.12 + rnd() * 0.04,
      0.82 - dist * 0.12,
      0.24 + (1 - dist) * 0.40,
    );
  }

  // ── HOMBRO IZQUIERDO ──
  for (let i = 0; i < 1100; i++) {
    const theta = rnd() * Math.PI * 2;
    const phi   = Math.acos(2 * rnd() - 1);
    const r     = 0.21 * cbrt(rnd());
    const ratio = r / 0.21;
    push(
      -0.54 + r * Math.sin(phi) * Math.cos(theta),
       0.60 + r * Math.sin(phi) * Math.sin(theta) * 0.75,
      r * Math.cos(phi) * 0.75,
      0.67 + ratio * 0.10,
      0.80,
      0.28 + (1 - ratio) * 0.38,
    );
  }

  // ── HOMBRO DERECHO ──
  for (let i = 0; i < 1100; i++) {
    const theta = rnd() * Math.PI * 2;
    const phi   = Math.acos(2 * rnd() - 1);
    const r     = 0.21 * cbrt(rnd());
    const ratio = r / 0.21;
    push(
       0.54 + r * Math.sin(phi) * Math.cos(theta),
       0.60 + r * Math.sin(phi) * Math.sin(theta) * 0.75,
      r * Math.cos(phi) * 0.75,
      0.67 + ratio * 0.10,
      0.80,
      0.28 + (1 - ratio) * 0.38,
    );
  }

  // ── BRAZOS SUPERIORES (cilindros de partículas) ──
  for (let i = 0; i < 700; i++) {
    const t = rnd();
    const a = rnd() * Math.PI * 2;
    const r = (0.12 - t * 0.03) * Math.sqrt(rnd());
    // Izquierdo
    push(
      -0.62 - t * 0.12 + Math.cos(a) * r,
       0.42 - t * 0.38,
      Math.sin(a) * r * 0.7,
      0.69, 0.75, 0.32 + t * 0.10,
    );
    // Derecho
    push(
       0.62 + t * 0.12 + Math.cos(a) * r,
       0.42 - t * 0.38,
      Math.sin(a) * r * 0.7,
      0.69, 0.75, 0.32 + t * 0.10,
    );
  }

  // ── NEBULOSA: partículas esparcidas alrededor (filamentos) ──
  for (let i = 0; i < 1800; i++) {
    const side  = rnd() > 0.5 ? 1 : -1;
    const radial = 0.55 + rnd() * 1.0;
    const angle  = rnd() * Math.PI * 2;
    push(
      side * Math.cos(angle) * radial * 0.9 + jit(0, 0.3),
      jit(0.2, 1.6),
      jit(0, 0.5),
      0.70 + rnd() * 0.18,
      0.65,
      0.42 + rnd() * 0.22,
    );
  }

  return {
    positions: new Float32Array(pts),
    colors:    new Float32Array(col),
  };
}

// ─── Componente Three.js ─────────────────────────────────────────────────────
function GalacticFigure() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const smooth   = useRef({ x: 0, y: 0 });
  const tick     = useRef(0);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const { positions, colors } = useMemo(() => buildHumanoid(), []);

  const sprite = useMemo(() => makeSprite(), []);

  useFrame((_, delta) => {
    tick.current += delta;
    if (!groupRef.current) return;

    // Suavizado de cursor (delta-time correcto)
    const lf = 1 - Math.pow(0.04, delta);
    smooth.current.x += (-mouse.current.y * 0.20 - smooth.current.x) * lf;
    smooth.current.y += ( mouse.current.x * 0.28 - smooth.current.y) * lf;

    // Toda la figura gira con la mirada
    groupRef.current.rotation.x = smooth.current.x;
    groupRef.current.rotation.y = smooth.current.y;

    // Flotación idle
    groupRef.current.position.y = Math.sin(tick.current * 0.55) * 0.045;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          vertexColors
          size={0.048}
          transparent
          opacity={0.92}
          depthWrite={false}
          sizeAttenuation
          alphaTest={0.001}
        />
      </points>
    </group>
  );
}

// ─── Exportación ─────────────────────────────────────────────────────────────
export default function Galaxy() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.6], fov: 54 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <GalacticFigure />
    </Canvas>
  );
}
