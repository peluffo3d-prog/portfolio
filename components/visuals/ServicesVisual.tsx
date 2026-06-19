"use client";
import { motion, useTransform, type MotionValue } from "motion/react";

const ACCENT = "#5E0ED7";

export default function ServicesVisual({ progress }: { progress: MotionValue<number> }) {
  const lineScale = useTransform(progress, [0.15, 0.85], [0, 1]);

  return (
    <div
      className="absolute left-0 -top-12 -bottom-16 hidden md:block pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div className="relative h-full w-px" style={{ background: "rgba(0,0,0,0.06)" }}>
        <motion.div
          className="absolute left-0 top-0 w-px h-full"
          style={{ background: ACCENT, scaleY: lineScale, transformOrigin: "top" }}
        />
      </div>
    </div>
  );
}
