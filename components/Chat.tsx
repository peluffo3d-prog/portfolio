"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

type Message = { role: "user" | "assistant"; content: string; id: string };

const SUGGESTIONS = [
  "¿Cuánto cuesta una landing page?",
  "¿Qué es un agente de IA?",
  "¿Cómo trabajamos juntos?",
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input, id: Date.now().toString() };
    const aId = (Date.now() + 1).toString();
    setMessages(p => [...p, userMsg, { role: "assistant", content: "", id: aId }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });
      const reader = res.body!.getReader();
      const dec    = new TextDecoder();
      let done     = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = dec.decode(value);
          setMessages(p => p.map(m => m.id === aId ? { ...m, content: m.content + chunk } : m));
        }
      }
    } catch {
      setMessages(p => p.map(m => m.id === (Date.now() + 1).toString() ? { ...m, content: "Error de conexión." } : m));
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
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5"
        style={{ color: ACCENT }}
      >
        — Contacto
      </motion.p>

      {/* Heading */}
      <div className="overflow-hidden mb-16 md:mb-24">
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="max-w-2xl"
      >
        {/* Chat area */}
        <div
          className="h-72 overflow-y-auto mb-0 space-y-5 pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}
        >
          {messages.length === 0 && (
            <div className="flex gap-3 items-start">
              <div
                className="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-semibold tracking-wider uppercase shrink-0 mt-0.5"
                style={{ borderColor: ACCENT, color: ACCENT }}
              >
                J
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Hola. Soy Jasiel. ¿En qué te puedo ayudar?
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-semibold tracking-wider uppercase shrink-0 mt-0.5"
                  style={{
                    borderColor: m.role === "user" ? "rgba(255,255,255,0.3)" : ACCENT,
                    color:       m.role === "user" ? "rgba(255,255,255,0.7)" : ACCENT,
                  }}
                >
                  {m.role === "user" ? "V" : "J"}
                </div>
                <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase leading-relaxed max-w-sm"
                  style={{ color: m.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>
                  {m.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 rounded-full border shrink-0" style={{ borderColor: ACCENT }} />
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-4">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 border transition-colors hover:border-white/40"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-4 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="ESCRIBÍ TU PREGUNTA..."
            className="flex-1 bg-transparent text-xs sm:text-sm font-semibold tracking-widest uppercase outline-none placeholder:opacity-30"
            style={{ color: "#fff" }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 hover:bg-white hover:text-black"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
          >
            <ArrowUpRight size={14} />
          </button>
        </form>

        {/* Footer note */}
        <p className="text-[9px] font-semibold tracking-widest uppercase mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
          O escribime directo →{" "}
          <a href="mailto:jaas.i.elel2@gmail.com" className="hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.45)" }}>
            jaas.i.elel2@gmail.com
          </a>
        </p>
      </motion.div>
    </section>
  );
}
