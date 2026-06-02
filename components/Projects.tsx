"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="proyectos"
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
        — Proyectos
      </motion.p>

      {/* Heading slide-up */}
      <div className="overflow-hidden mb-16 md:mb-24">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-semibold uppercase"
          style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)", lineHeight: 0.88, fontWeight: 600 }}
        >
          Lo que construí
        </motion.h2>
      </div>

      {/* Lista de proyectos */}
      <div>
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href={project.link !== "#" ? project.link : undefined}
            target={project.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 + i * 0.09 }}
            className="group flex items-start md:items-center justify-between gap-6 py-7 border-t border-white/10 hover:border-white/25 transition-colors cursor-pointer"
            style={{ borderBottom: i === projects.length - 1 ? "1px solid rgba(255,255,255,0.10)" : undefined }}
          >
            {/* Left */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold tracking-widest uppercase mb-2" style={{ color: ACCENT }}>
                0{i + 1}
              </p>
              <h3
                className="font-semibold uppercase group-hover:opacity-50 transition-opacity"
                style={{ fontSize: "clamp(1.3rem, 3.2vw, 2.8rem)", lineHeight: 1, fontWeight: 600 }}
              >
                {project.title}
              </h3>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase mt-3 leading-relaxed max-w-md"
                style={{ color: "rgba(255,255,255,0.40)" }}>
                {project.description}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden md:flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 border"
                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.20)" }}>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
