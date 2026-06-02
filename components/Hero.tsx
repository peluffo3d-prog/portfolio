"use client";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState, memo } from "react";
import { Check } from "lucide-react";

// ─── Typewriter — componente separado para que sus re-renders no afecten el video
function useTypewriter(text: string, speed = 42, startDelay = 700) {
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

const Headline = memo(function Headline() {
  const { displayed, done } = useTypewriter("I build software\n& AI agents.");
  return (
    <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />
      )}
    </h1>
  );
});

// ─── Video — completamente aislado, sin estado propio
const VideoBackground = memo(function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Desktop: RAF + seek lock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX: number | null = null;
    let targetTime = 0;
    let isSeeking = false;
    let rafId: number;

    const tick = () => {
      if (
        !isSeeking &&
        video.duration &&
        Math.abs(video.currentTime - targetTime) > 0.016
      ) {
        isSeeking = true;
        video.currentTime = targetTime;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onSeeked = () => { isSeeking = false; };

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (prevX === null) { prevX = e.clientX; return; }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!video.duration) return;
      targetTime += (delta / window.innerWidth) * 0.8 * video.duration;
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Mobile: autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-right lg:object-right-bottom"
        style={{ willChange: "transform" }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4" />
      </video>
    </div>
  );
});

// ─── Pills — aisladas del video
const SERVICE_OPTIONS = ["Landing Page", "Bot WhatsApp", "Agente IA", "Otro"];

const ServicePills = memo(function ServicePills() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) =>
    setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div>
      <p className="text-2xl font-medium tracking-tight mb-2">¿Qué necesitás?</p>
      <p className="text-[#738273] mb-8 text-base">Seleccioná lo que aplique</p>

      <div className="flex flex-wrap gap-3 mb-4">
        {SERVICE_OPTIONS.map((service) => {
          const active = selected.includes(service);
          return (
            <button
              key={service}
              onClick={() => toggle(service)}
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
              {service}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected.length === 0 ? (
          <motion.p
            key="empty"
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
            key="active"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="overflow-hidden"
          >
            <div className="bg-[#FAFBF9] border border-[#EEF0EE] rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <span className="text-sm text-[#1C2E1E]">
                Listo para hablar sobre:{" "}
                <strong>{selected.join(", ")}</strong>
              </span>
              <a
                href="#contacto"
                className="text-[#4D6D47] uppercase text-xs font-semibold tracking-wide hover:opacity-70 transition-opacity shrink-0"
              >
                Hablemos →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ─── Navbar
const NAV_LINKS = ["proyectos", "servicios", "contacto"];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Jasiel Nuevo
          </span>
          <span className="text-[22px] text-black select-none font-medium leading-none">✳</span>
        </div>

        <nav className="hidden md:flex text-[21px] text-black items-center gap-0">
          {NAV_LINKS.map((link, i) => (
            <span key={link} className="flex items-center">
              <a href={`#${link}`} className="capitalize hover:opacity-50 transition-opacity duration-150">
                {link}
              </a>
              {i < NAV_LINKS.length - 1 && <span className="opacity-30">,&nbsp;</span>}
            </span>
          ))}
        </nav>

        <a href="#contacto" className="hidden md:block text-[21px] text-black underline underline-offset-2 hover:opacity-50 transition-opacity duration-150">
          Hablemos
        </a>

        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex flex-col gap-[5px] md:hidden p-1"
          aria-label="Menú"
        >
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      <div className={`fixed inset-0 z-[9] bg-white/96 backdrop-blur-sm transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {[...NAV_LINKS, "contacto"].map((link) => (
          <a key={link} href={`#${link}`} onClick={() => setMenuOpen(false)} className="text-3xl capitalize hover:opacity-50 transition-opacity">
            {link}
          </a>
        ))}
      </div>
    </>
  );
}

// ─── Hero principal
export default function Hero() {
  return (
    <div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      <Navbar />
      <VideoBackground />

      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
          <div className="pt-20 lg:pt-0 max-w-2xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Headline />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14"
            >
              Landings que convierten, bots de WhatsApp y agentes de IA.<br />
              Contame qué necesitás y arrancamos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
            >
              <ServicePills />
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
