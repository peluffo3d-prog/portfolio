"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

type Message = { role: "user" | "assistant"; content: string; id: string };

const SUGGESTIONS = [
  "¿Qué es AtlasLibre?",
  "¿Cuánto cuesta una landing?",
  "¿Cómo trabajamos juntos?",
  "¿Qué tecnologías usás?",
];

export default function Chat() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef                 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    const aId = (Date.now() + 1).toString();
    setMessages(p => [...p, userMsg, { role: "assistant", content: "", id: aId }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });
      const reader = res.body!.getReader();
      const dec    = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value)
          setMessages(p => p.map(m => m.id === aId ? { ...m, content: m.content + dec.decode(value) } : m));
      }
    } catch {
      setMessages(p => p.map(m => m.id === aId ? { ...m, content: "Error al conectar. Escribime directo." } : m));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="contacto"
      ref={ref}
      style={{ fontFamily: "'Inter', sans-serif", background: "#060606", color: "#fff" }}
      className="px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Contacto
      </motion.p>

      <div className="overflow-hidden mb-5">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Hablemos.
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-12"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Chateá con mi IA — responde como yo, con mi info real.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
        className="max-w-xl"
      >
        {/* Mensajes */}
        <div className="h-64 overflow-y-auto space-y-4 mb-4 pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#222 transparent" }}>

          {messages.length === 0 && (
            <div className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-semibold shrink-0 mt-0.5"
                style={{ borderColor: ACCENT, color: ACCENT }}>J</div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Hola, soy Jasiel. ¿En qué te puedo ayudar?
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-semibold shrink-0 mt-0.5"
                  style={{
                    borderColor: m.role === "user" ? "rgba(255,255,255,0.25)" : ACCENT,
                    color:       m.role === "user" ? "rgba(255,255,255,0.6)"  : ACCENT,
                  }}>
                  {m.role === "user" ? "V" : "J"}
                </div>
                {/* Mensajes: texto normal, NO uppercase */}
                <p className="text-sm leading-relaxed max-w-xs"
                  style={{ color: m.role === "user" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)" }}>
                  {m.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 rounded-full border shrink-0" style={{ borderColor: ACCENT }} />
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Sugerencias */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)}
                className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border transition-colors hover:border-white/35 hover:text-white/70"
                style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.38)" }}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); send(input); }}
          className="flex items-center gap-3 border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribí tu pregunta..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#fff" }}
          />
          <button type="submit" disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors disabled:opacity-25 hover:bg-white hover:text-black"
            style={{ borderColor: "rgba(255,255,255,0.20)" }}>
            <ArrowUpRight size={14} />
          </button>
        </form>

        <p className="text-[9px] font-semibold tracking-widest uppercase mt-5"
          style={{ color: "rgba(255,255,255,0.22)" }}>
          O escribime directo →{" "}
          <a href="mailto:jaas.i.elel2@gmail.com"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "rgba(255,255,255,0.40)" }}>
            jaas.i.elel2@gmail.com
          </a>
        </p>
      </motion.div>
    </section>
  );
}
