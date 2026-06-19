"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Bounds } from "@react-three/drei";

const MODEL_URL = "https://atlaslibre.app/models/merged/huesos.glb";

useGLTF.preload(MODEL_URL);

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

export default function AtlasModelViewer() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} />
      <directionalLight position={[-3, -2, -4]} intensity={1} />
      <directionalLight position={[0, 5, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={0.55}>
          <Model />
        </Bounds>
      </Suspense>
      <OrbitControls
        autoRotate
        autoRotateSpeed={2.2}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
