"use client";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Scroll horizontal pineado — patrón canónico de ScrollTrigger (pin + scrub)
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const track = trackRef.current;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      id="proyectos"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif", background: "#060606", color: "#fff" }}
    >
      {/* Header */}
      <div ref={headerRef} className="px-5 sm:px-8 md:px-12 pt-20 md:pt-24 pb-6 md:pb-8 shrink-0">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[10px] font-semibold tracking-widest uppercase mb-4"
          style={{ color: ACCENT }}
        >
          — Trabajo selecto
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={headerInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-display font-semibold uppercase"
            style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)", lineHeight: 0.9, fontWeight: 600 }}
          >
            Lo que construimos.
          </motion.h2>
        </div>
      </div>

      {/* Galería horizontal pineada */}
      <div className="flex-1 relative overflow-hidden">
        <div ref={trackRef} className="flex h-full" style={{ width: `${projects.length * 100}vw` }}>
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block shrink-0 w-screen h-full px-5 sm:px-8 md:px-12 pb-8"
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{ borderRadius: "4px" }}
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized={project.image.includes("thum.io")}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="100vw"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #111 0%, #222 100%)" }} />
                )}

                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)" }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                />

                <div className="absolute top-5 left-5 md:top-6 md:left-6">
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase transition-opacity duration-300 group-hover:opacity-0"
                    style={{ color: ACCENT }}
                  >
                    0{i + 1}
                  </span>
                </div>

                <div
                  className="absolute top-5 right-5 md:top-6 md:right-6 w-9 h-9 rounded-full border flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:border-white"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  <ArrowUpRight size={14} className="text-black" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1"
                        style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", borderRadius: "2px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="font-display font-semibold uppercase leading-none"
                    style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.4rem)", color: "#fff" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mt-3 text-xs sm:text-sm leading-relaxed font-medium tracking-wide max-w-md"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
