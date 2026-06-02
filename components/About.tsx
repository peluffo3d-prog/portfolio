"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

const HITOS = [
  { num: "+1K",  label: "USUARIOS\nATLASLIBRE" },
  { num: "5+",   label: "APPS EN\nPRODUCCIÓN" },
  { num: "600+", label: "ESTRUCTURAS\nANATÓMICAS 3D" },
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
        — Historia
      </motion.p>

      {/* Heading slide-up */}
      <div className="overflow-hidden mb-12 md:mb-20">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase text-black"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Del código al impacto.
        </motion.h2>
      </div>

      {/* Bio en dos columnas */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase leading-loose"
            style={{ color: "rgba(0,0,0,0.50)" }}>
            Soy Jasiel, desarrollador de software de Buenos Aires.
            Construyo apps, bots y agentes de IA para negocios en LATAM.
            Me apoyé en la IA para escalar lo que uno solo no puede.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase leading-loose"
            style={{ color: "rgba(0,0,0,0.50)" }}>
            Mi proyecto más destacado es AtlasLibre — atlas anatómico 3D
            gratuito para estudiantes de medicina de LATAM, con +1K usuarios.
            Empecé con Instala y Viaja, construí Caja Clara, Automotores DEH
            con subastas en tiempo real, y no paré desde entonces.
          </p>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.34 }}
        className="flex flex-wrap gap-x-10 gap-y-8 pt-10 border-t border-black/10"
      >
        {HITOS.map(h => (
          <div key={h.num} className="flex flex-col gap-1">
            <span
              className="font-semibold"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 600, lineHeight: 1 }}
            >
              <span style={{ fontSize: "0.55em", color: ACCENT, marginRight: "1px" }}>
                {h.num.startsWith("+") || h.num.endsWith("+") ? "" : "+"}
              </span>
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

        {/* AtlasLibre highlight */}
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
