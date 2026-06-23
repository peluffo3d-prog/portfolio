"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import HeroSequence from "./HeroSequence";

const ACCENT = "#5E0ED7";
const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

const NAV_LINKS  = ["Historia", "Proyectos", "Demos", "Servicios", "Contacto"];
const HERO_LINES = ["Potenciamos marcas", "para inspirar personas."];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [availMonth, setAvailMonth] = useState("junio 2026");
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Única invitación a bajar — desaparece apenas el usuario empieza a scrollear
    const onScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Auto-actualiza cada vez que se carga la página
    const d = new Date();
    const mes  = d.toLocaleDateString("es-AR", { month: "long" });
    const año  = d.getFullYear();
    setAvailMonth(`${mes} ${año}`);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e8e6e1 0%, #c9c7c2 100%)" }}
    >
      {/* ── SECUENCIA DE IMÁGENES (scroll-scrub, desktop + mobile) ── */}
      <HeroSequence containerRef={heroRef} />

      {/* Scrim: protege la legibilidad del texto negro sobre el video (zonas de texto arriba y abajo) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 56%, rgba(255,255,255,0.66) 100%)",
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── NAV ── */}
        <nav className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
          {/* Logo */}
          <motion.div
            variants={fadeDown} initial="hidden" animate="visible" custom={0}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0"
              style={{ borderColor: ACCENT }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-widest uppercase text-black">
              PelufoStudio
            </span>
          </motion.div>

          {/* Center links — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                variants={fadeDown} initial="hidden" animate="visible" custom={i + 1}
                className="text-sm font-semibold tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Badge disponibilidad — desktop */}
          <motion.div
            variants={fadeDown} initial="hidden" animate="visible" custom={5}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border"
            style={{ borderColor: "rgba(0,0,0,0.15)", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
            <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "#1a1a1a" }}>
              Disponibles · {availMonth}
            </span>
          </motion.div>

          {/* Hamburger */}
          <motion.button
            variants={fadeDown} initial="hidden" animate="visible" custom={6}
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1"
            aria-label="Abrir menú"
          >
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
            <span className="w-4 h-0.5 bg-white" />
          </motion.button>
        </nav>

        {/* ── CONTENIDO: frase arriba / átomo al centro (bg) / CTA abajo ──
             Mobile: frase top + CTA bottom (justify-between), centrado.
             Desktop: frase y CTA agrupadas abajo a la derecha (editorial). */}
        <div className="flex-1 flex flex-col justify-between md:justify-end px-5 sm:px-8 md:px-12 pt-10 md:pt-0 pb-20 md:pb-12">

          {/* Frase hero */}
          <div className="text-center md:text-right md:mb-8">
            {HERO_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.14, duration: 0.7, ease: EASE }}
                  className="font-display font-semibold uppercase text-black"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 4rem)", lineHeight: 0.98, fontWeight: 600 }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* CTA → chat IA */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={5}
            className="flex justify-center md:justify-end"
          >
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 font-semibold tracking-widest uppercase whitespace-nowrap text-base sm:text-xl md:text-2xl hover:opacity-70 transition-opacity"
              style={{ color: ACCENT }}
            >
              Trabajemos juntos
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL HINT — única invitación a bajar, no indica cuánto falta ── */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-black/40" />
        </motion.div>
      </motion.div>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-5 sm:px-8 pt-5 pb-10"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: ACCENT }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT }} />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X size={16} color="white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-8 mt-16">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-semibold tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xl font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity"
                style={{ color: ACCENT }}
              >
                Trabajemos juntos
                <ArrowUpRight size={22} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
