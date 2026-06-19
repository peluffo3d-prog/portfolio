"use client";
import { motion, useTransform, type MotionValue } from "motion/react";

const ACCENT = "#5E0ED7";

export default function AboutVisual({ progress }: { progress: MotionValue<number> }) {
  const lineScale = useTransform(progress, [0.1, 0.75], [0, 1]);
  const dot1Scale = useTransform(progress, [0.05, 0.2], [0, 1]);
  const dot2Scale = useTransform(progress, [0.6, 0.78], [0, 1]);

  return (
    <div
      className="absolute left-3 md:left-6 -top-12 -bottom-12 hidden md:block pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div className="relative h-full w-px" style={{ background: "rgba(94,14,215,0.15)" }}>
        <motion.div
          className="absolute left-0 top-0 w-px h-full"
          style={{ background: ACCENT, scaleY: lineScale, transformOrigin: "top" }}
        />
        <motion.div
          className="absolute -left-[3px] top-0 w-[7px] h-[7px] rounded-full"
          style={{ background: ACCENT, scale: dot1Scale }}
        />
        <motion.div
          className="absolute -left-[3px] bottom-0 w-[7px] h-[7px] rounded-full"
          style={{ background: ACCENT, scale: dot2Scale }}
        />
      </div>
    </div>
  );
}
