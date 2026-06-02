"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, memo } from "react";
import { Check } from "lucide-react";
import dynamic from "next/dynamic";

const Galaxy = dynamic(() => import("./Galaxy"), { ssr: false });

// ─── Typewriter ────────────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 44, startDelay = 750) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

// Componente separado para que sus re-renders no afecten el canvas
const Headline = memo(function Headline() {
  const { displayed, done } = useTypewriter("construyo software\ny agentes de IA.");
  return (
    <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
      )}
    </h1>
  );
});

// ─── Pills ─────────────────────────────────────────────────────────────────────
const SERVICIOS = ["Landing Page", "Bot WhatsApp", "Agente IA", "Otro"];

const ServicePills = memo(function ServicePills() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) =>
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div>
      <p className="text-2xl font-medium tracking-tight mb-2">¿Qué necesitás?</p>
      <p className="text-[#738273] mb-6 text-base">Seleccioná lo que aplique</p>

      <div className="flex flex-wrap gap-3 mb-4">
        {SERVICIOS.map((s) => {
          const active = selected.includes(s);
          return (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-[#1C2E1E] text-white shadow-md"
                  : "bg-white text-[#1C2E1E] border border-[#E8EAE8] hover:bg-[#F4F6F4]"
              }`}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="flex items-center"
                  >
                    <Check size={13} strokeWidth={2.5} />
                  </motion.span>
                )}
              </AnimatePresence>
              {s}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected.length === 0 ? (
          <motion.p
            key="vacio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs italic text-neutral-500"
          >
            Seleccioná qué tipo de proyecto tenés en mente.
          </motion.p>
        ) : (
          <motion.div
            key="activo"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="overflow-hidden"
          >
            <div className="bg-[#FAFBF9] border border-[#EEF0EE] rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <span className="text-sm text-[#1C2E1E]">
                Listo para hablar sobre: <strong>{selected.join(", ")}</strong>
              </span>
              <a
                href="#contacto"
                className="text-[#4D6D47] uppercase text-xs font-semibold tracking-wide hover:opacity-70 transition-opacity shrink-0"
              >
                Arrancamos →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Navbar ────────────────────────────────────────────────────────────────────
const LINKS = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#servicios",  label: "Servicios" },
  { href: "#contacto",   label: "Contacto" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-20 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <span className="text-[20px] sm:text-[24px] tracking-tight text-black font-medium select-none">
            Jasiel Nuevo
          </span>
          <span className="text-[20px] text-black select-none font-medium leading-none">✳</span>
        </div>

        <nav className="hidden md:flex text-[20px] text-black items-center">
          {LINKS.map((l, i) => (
            <span key={l.href} className="flex items-center">
              <a href={l.href} className="hover:opacity-50 transition-opacity duration-150">{l.label}</a>
              {i < LINKS.length - 1 && <span className="opacity-30">,&nbsp;</span>}
            </span>
          ))}
        </nav>

        <a href="#contacto" className="hidden md:block text-[20px] text-black underline underline-offset-2 hover:opacity-50 transition-opacity duration-150">
          Hablemos
        </a>

        <button
          onClick={() => setOpen((p) => !p)}
          className="flex flex-col gap-[5px] md:hidden p-1"
          aria-label="Menú"
        >
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      <div className={`fixed inset-0 z-10 bg-white/96 backdrop-blur-sm transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-3xl hover:opacity-50 transition-opacity">
            {l.label}
          </a>
        ))}
        <a href="#contacto" onClick={() => setOpen(false)} className="text-3xl underline underline-offset-4 hover:opacity-50 transition-opacity">
          Hablemos
        </a>
      </div>
    </>
  );
}

// ─── Hero principal ────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <Navbar />

      {/* Alien X galáctico — derecha en desktop, arriba en mobile */}
      <div
        className="order-last lg:order-none w-full h-[420px] md:h-[520px] lg:absolute lg:right-0 lg:top-0 lg:w-[52%] lg:h-full lg:z-0"
        style={{ background: "#fff" }}
      >
        <Galaxy />
      </div>

      {/* Contenido */}
      <div className="relative z-10 order-first lg:order-none w-full lg:min-h-screen flex flex-col">
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
          <div className="pt-20 lg:pt-0 lg:max-w-[52%]">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Headline />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.13 }}
              className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-12"
            >
              Landings que convierten, bots de WhatsApp<br className="hidden sm:block" /> y agentes de IA para negocios en LATAM.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
            >
              <ServicePills />
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
