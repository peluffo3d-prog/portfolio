"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NICHES } from "@/lib/niches";

const EASE   = [0.22, 1, 0.36, 1] as [number, number, number, number];
const ACCENT = "#5E0ED7";

export default function NicheDemos() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="demos"
      ref={ref}
      style={{ background: "#060606", color: "#fff" }}
      className="relative z-0 px-5 sm:px-8 md:px-12 py-24 md:py-36"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[10px] font-semibold tracking-widest uppercase mb-4"
        style={{ color: ACCENT }}
      >
        — Demos por rubro
      </motion.p>
      <div className="overflow-hidden mb-10 md:mb-14">
        <motion.h2
          initial={{ y: "110%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-display font-semibold uppercase max-w-3xl"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)", lineHeight: 0.98, fontWeight: 600 }}
        >
          Elegí tu rubro.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {NICHES.map((n, i) => (
          <motion.div
            key={n.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.08 }}
          >
            <Link
              href={`/demos/${n.slug}`}
              className="group relative block h-64 md:h-80 overflow-hidden"
              style={{ borderRadius: "4px" }}
            >
              <Image
                src={n.heroImage}
                alt={n.niche}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)" }}
              />
              <div
                className="absolute top-4 right-4 w-9 h-9 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:border-white"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                <ArrowUpRight size={14} className="text-black" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display font-semibold uppercase leading-none" style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)" }}>
                  {n.niche}
                </h3>
                <p className="mt-2 text-xs sm:text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {n.blurb}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
