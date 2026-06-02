"use client";
import { motion } from "motion/react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <motion.p
        {...fadeUp(0.1)}
        className="text-sm tracking-[0.2em] uppercase mb-6"
        style={{ color: "var(--muted)" }}
      >
        Buenos Aires · Disponible para proyectos
      </motion.p>

      <motion.h1
        {...fadeUp(0.2)}
        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        Jasiel
        <br />
        <span style={{ color: "var(--muted)" }}>Nuevo</span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.35)}
        className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        Construyo software y agentes de IA para negocios en LATAM.
        Landings que convierten, bots de WhatsApp y automatizaciones reales.
      </motion.p>

      <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4">
        <a
          href="#chat"
          className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Hablar con Jasiel AI →
        </a>
        <a
          href="#proyectos"
          className="px-6 py-3 rounded-lg text-sm font-medium transition-all"
          style={{ border: "1px solid var(--border)", color: "var(--fg)" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#444")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          Ver proyectos
        </a>
      </motion.div>

      <motion.div
        {...fadeUp(0.6)}
        className="mt-20 pt-8 flex gap-8 flex-wrap"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {[
          { num: "10+", label: "Proyectos entregados" },
          { num: "USD 30", label: "Mantenimiento/mes" },
          { num: "24h", label: "Tiempo de respuesta" },
        ].map(({ num, label }) => (
          <div key={label}>
            <div
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {num}
            </div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>
              {label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
