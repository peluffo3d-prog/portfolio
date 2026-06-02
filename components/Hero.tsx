"use client";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";

// ─── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(delay);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const SERVICE_OPTIONS = ["Landing Page", "Bot WhatsApp", "Agente IA", "Otro"];
const NAV_LINKS = ["proyectos", "servicios", "contacto"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { displayed, done } = useTypewriter("I build software\n& AI agents.", 42, 700);

  // Desktop mouse scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let prevX = 0;
    let targetTime = 0;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!video.duration) return;
      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      video.currentTime = targetTime;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Mobile autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.innerWidth >= 1024) return;
    video.autoplay = true;
    video.play().catch(() => {});
  }, []);

  const toggle = (s: string) =>
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Jasiel Nuevo
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            ✳
          </span>
        </div>

        <nav className="hidden md:flex flex-row text-[23px] text-black items-center">
          {NAV_LINKS.map((link, i) => (
            <span key={link} className="flex items-center">
              <a href={`#${link}`} className="capitalize hover:opacity-60 transition-opacity">
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </span>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Hablemos
        </a>

        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex flex-col gap-[5px] md:hidden"
          aria-label="Menú"
        >
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-[9] bg-white/95 backdrop-blur-sm transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {[...NAV_LINKS, "contacto"].map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={() => setMenuOpen(false)}
            className="text-3xl capitalize hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
      </div>

      {/* ── Background Video ── */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" />
        </video>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main
          id="spade-hero"
          className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
        >
          <div className="pt-20 lg:pt-0">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
                {displayed}
                {!done && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
                )}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
                Landings que convierten, bots de WhatsApp y agentes de IA.<br />
                Contame qué necesitás y arrancamos.
              </p>
            </motion.div>

            {/* Service Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-2xl font-medium tracking-tight mb-2">¿Qué necesitás?</p>
              <p className="text-[#738273] mb-8">Seleccioná lo que aplique</p>

              <div className="flex flex-wrap gap-3 mb-4">
                {SERVICE_OPTIONS.map((service) => {
                  const active = selected.includes(service);
                  return (
                    <motion.button
                      key={service}
                      onClick={() => toggle(service)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        active
                          ? "bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5"
                          : "bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55"
                      }`}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Check size={13} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {service}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback banner */}
              <AnimatePresence mode="wait">
                {selected.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-xs italic"
                  >
                    Seleccioná qué tipo de proyecto tenés en mente.
                  </motion.p>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl px-5 py-4 flex items-center justify-between">
                      <span className="text-sm text-[#1C2E1E]">
                        Listo para hablar sobre:{" "}
                        <strong>{selected.join(", ")}</strong>
                      </span>
                      <a
                        href="#contacto"
                        className="text-[#4D6D47] uppercase text-xs font-medium tracking-wide hover:opacity-70 transition-opacity"
                      >
                        Hablemos →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
