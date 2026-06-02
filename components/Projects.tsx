"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { projects } from "@/lib/data";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="proyectos" className="px-6 md:px-16 py-24 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--muted)" }}>
          Proyectos
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Lo que construí
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link}
            target={project.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="block rounded-xl p-6 cursor-pointer"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="text-3xl mb-4">{project.emoji}</div>
            <h3 className="font-semibold text-base mb-2">{project.title}</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--border)", color: "var(--muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
