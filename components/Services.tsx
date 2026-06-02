"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { services } from "@/lib/data";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="px-6 md:px-16 py-24 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--muted)" }}>
          Servicios
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          ¿En qué te puedo ayudar?
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {services.map((service, i) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            className="rounded-xl p-6 flex flex-col"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>
                {service.name}
              </p>
              <p className="text-2xl font-bold mb-3 tracking-tight">
                {service.price}
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                {service.description}
              </p>
            </div>
            <ul className="mt-auto space-y-2">
              {service.includes.map((item) => (
                <li key={item} className="text-xs flex items-center gap-2" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--fg)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          ¿No ves lo que necesitás?{" "}
          <a href="#chat" className="underline" style={{ color: "var(--fg)" }}>
            Hablemos →
          </a>
        </p>
      </motion.div>
    </section>
  );
}
