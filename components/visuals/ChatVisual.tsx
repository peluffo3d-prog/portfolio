"use client";
import { motion, useTransform, type MotionValue } from "motion/react";

const ACCENT = "#5E0ED7";
const RINGS  = [60, 100, 140, 180];

export default function ChatVisual({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.1, 0.45], [0, 0.18]);
  const scale   = useTransform(progress, [0.1, 0.6], [0.7, 1.1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
      style={{ zIndex: -1, opacity, scale }}
    >
      {RINGS.map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size, height: size,
            left: -size / 2, top: -size / 2,
            borderColor: ACCENT,
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
    </motion.div>
  );
}
