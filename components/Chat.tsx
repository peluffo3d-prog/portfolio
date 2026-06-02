"use client";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useEffect, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; id: string };

const SUGGESTIONS = [
  "¿Qué podés hacer para mi negocio?",
  "¿Cuánto cuesta una landing page?",
  "¿Cómo funciona el bot de WhatsApp?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input, id: Date.now().toString() };
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "", id: assistantId }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) => m.id === assistantId ? { ...m, content: m.content + chunk } : m)
          );
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) => m.id === (Date.now() + 1).toString() ? { ...m, content: "Error al conectar." } : m)
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="chat" className="px-6 md:px-16 py-24 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--muted)" }}>
          Chat con Jasiel AI
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          ¿Tenés alguna pregunta?
        </h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Hablás directamente con una IA entrenada con mi info. Precios, proyectos, disponibilidad — todo.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--card)" }}
      >
        {/* Messages */}
        <div className="h-80 overflow-y-auto p-5 space-y-4 scroll-smooth">
          {messages.length === 0 && (
            <div className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "var(--border)", color: "var(--fg)" }}
              >
                J
              </div>
              <div
                className="rounded-xl rounded-tl-none px-4 py-3 text-sm max-w-sm"
                style={{ background: "#1a1a1a" }}
              >
                Hola! Soy Jasiel. ¿En qué te puedo ayudar?
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: m.role === "user" ? "var(--fg)" : "var(--border)",
                    color: m.role === "user" ? "var(--bg)" : "var(--fg)",
                  }}
                >
                  {m.role === "user" ? "V" : "J"}
                </div>
                <div
                  className="rounded-xl px-4 py-3 text-sm max-w-sm leading-relaxed"
                  style={{
                    background: m.role === "user" ? "var(--fg)" : "#1a1a1a",
                    color: m.role === "user" ? "var(--bg)" : "var(--fg)",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  }}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--border)" }}
              >
                J
              </div>
              <div className="flex gap-1 px-4 py-3 rounded-xl" style={{ background: "#1a1a1a" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--muted)" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
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
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#444";
                  e.currentTarget.style.color = "var(--fg)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu pregunta..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-sm"
            style={{ color: "var(--fg)", caretColor: "var(--fg)" }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all disabled:opacity-40"
            style={{ background: "var(--fg)", color: "var(--bg)" }}
          >
            ↑
          </button>
        </form>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xs mt-4 text-center"
        style={{ color: "var(--muted)" }}
      >
        Responde en segundos. Si querés hablar conmigo directamente →{" "}
        <a
          href="mailto:jaas.i.elel2@gmail.com"
          className="underline"
          style={{ color: "var(--fg)" }}
        >
          jaas.i.elel2@gmail.com
        </a>
      </motion.p>
    </section>
  );
}
