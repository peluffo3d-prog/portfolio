"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

const HITOS = [
  { num: "+1K",  label: "USUARIOS\nATLASLIBRE" },
  { num: "6",    label: "APPS EN\nPRODUCCIÓN" },
  { num: "3",    label: "CLIENTES\nACTIVOS" },
];

const SOCIOS = [
  {
    nombre: "Jasiel",
    rol: "Dev & IA",
    bio: "Construyo las apps, los agentes y la infraestructura. Me interesa que las cosas funcionen de verdad, no solo en demo. Fui de aprender a programar solo a tener proyectos con miles de usuarios en menos de un año.",
  },
  {
    nombre: "Peluffo",
    rol: "Ecommerce & Operaciones",
    bio: "Gestiono Pelufo3D, nuestro taller de impresión 3D. Sé lo que necesitan los negocios reales porque tengo uno. Ese conocimiento operativo es lo que hace que lo que construimos tenga sentido para quien lo usa.",
  },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="historia"
      ref={ref}
      style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#000" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Quiénes somos
      </motion.p>

      {/* Heading */}
      <div className="overflow-hidden mb-12 md:mb-20">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase text-black"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Dos personas.<br />Una visión.
        </motion.h2>
      </div>

      {/* Cards de socios */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
        {SOCIOS.map((s, i) => (
          <motion.div
            key={s.nombre}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 + i * 0.1 }}
            className="border border-black/10 p-7 md:p-8"
            style={{ borderRadius: "4px" }}
          >
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="font-semibold uppercase"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, lineHeight: 1 }}
              >
                {s.nombre}
              </span>
              <span
                className="text-[10px] font-semibold tracking-widest uppercase px-2 py-1"
                style={{ background: "rgba(94,14,215,0.08)", color: ACCENT, borderRadius: "2px" }}
              >
                {s.rol}
              </span>
            </div>
            <p
              className="text-xs sm:text-sm font-medium leading-loose"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              {s.bio}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Frase puente */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
        className="text-xs sm:text-sm font-semibold tracking-widest uppercase leading-loose mb-16 md:mb-20 max-w-2xl"
        style={{ color: "rgba(0,0,0,0.45)" }}
      >
        Juntos cubrimos desde el código hasta las operaciones. No somos una agencia grande —
        somos dos personas que construyen cosas reales para negocios reales en LATAM.
        AtlasLibre, Pelufo3D, Diseños JK, Laser Cut Designe. Todos en producción.
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.44 }}
        className="flex flex-wrap gap-x-10 gap-y-8 pt-10 border-t border-black/10"
      >
        {HITOS.map(h => (
          <div key={h.num} className="flex flex-col gap-1">
            <span
              className="font-semibold"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 600, lineHeight: 1 }}
            >
              <span style={{ fontSize: "0.55em", color: ACCENT, marginRight: "1px" }}>+</span>
              {h.num}
            </span>
            <span
              className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase whitespace-pre-line leading-tight"
              style={{ color: "rgba(0,0,0,0.40)" }}
            >
              {h.label}
            </span>
          </div>
        ))}
        <div className="ml-auto flex items-end">
          <a
            href="https://atlaslibre.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
            style={{ color: ACCENT }}
          >
            Ver AtlasLibre →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
