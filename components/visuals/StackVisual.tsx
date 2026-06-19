"use client";
import { motion, useTransform, type MotionValue } from "motion/react";

const ACCENT = "#5E0ED7";

// Facetas de un poliedro wireframe simple, en un viewBox cuadrado (sin distorsión)
const EDGES = [
  [50, 6, 14, 36], [50, 6, 86, 36], [50, 6, 50, 50],
  [14, 36, 86, 36], [14, 36, 50, 50], [86, 36, 50, 50],
  [14, 36, 28, 80], [86, 36, 72, 80], [50, 50, 28, 80], [50, 50, 72, 80],
  [28, 80, 72, 80],
];

export default function StackVisual({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, 200]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 0.5, 0.5, 0]);

  return (
    <motion.div
      className="absolute right-4 md:right-10 top-10 w-28 h-28 md:w-40 md:h-40 hidden sm:block pointer-events-none"
      style={{ zIndex: -1, rotate, opacity }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {EDGES.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={ACCENT}
            strokeWidth="0.6"
          />
        ))}
      </svg>
    </motion.div>
  );
}
