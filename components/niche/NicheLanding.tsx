"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Niche } from "@/lib/niches";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function NicheLanding({ config }: { config: Niche }) {
  const { businessName, tagline, accent, bg, fg, heroImage, valueProps, gallery, testimonial, ctaText, niche } = config;

  return (
    <main style={{ background: bg, color: fg }} className="min-h-screen">
      {/* Header demo */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-8 md:px-12 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase px-3 py-2 rounded-full"
          style={{ background: "rgba(0,0,0,0.55)", color: "#fff", backdropFilter: "blur(8px)" }}
        >
          <ArrowLeft size={12} /> PelufoStudio
        </Link>
        <span
          className="text-[9px] font-semibold tracking-widest uppercase px-3 py-2 rounded-full"
          style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)" }}
        >
          Demo — hecho por PelufoStudio
        </span>
      </header>

      {/* Hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <Image src={heroImage} alt={businessName} fill priority className="object-cover" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%)" }}
        />
        <div className="relative z-10 px-5 sm:px-8 md:px-12 pb-16 md:pb-20 w-full">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: accent }}>
            — {niche}
          </p>
          <h1
            className="font-display font-semibold uppercase text-white leading-none"
            style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}
          >
            {businessName}
          </h1>
          <p className="mt-4 text-sm sm:text-base font-medium tracking-wide max-w-md text-white/75">
            {tagline}
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-4xl">
          {valueProps.map((vp, i) => (
            <Reveal key={vp.title} delay={i * 0.1}>
              <div className="border-t pt-5" style={{ borderColor: `${fg}22` }}>
                <h3 className="font-display font-semibold uppercase text-xl mb-2">{vp.title}</h3>
                <p className="text-sm leading-relaxed opacity-70">{vp.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galería */}
      <section className="px-5 sm:px-8 md:px-12 pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {gallery.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="relative h-56 md:h-72 overflow-hidden" style={{ borderRadius: "4px" }}>
                <Image src={item.image} alt={item.label} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)" }} />
                <span className="absolute bottom-4 left-4 text-[10px] font-semibold tracking-widest uppercase text-white">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonio */}
      <section className="px-5 sm:px-8 md:px-12 py-20 md:py-28 text-center">
        <Reveal>
          <p className="font-display max-w-2xl mx-auto" style={{ fontSize: "clamp(1.3rem, 3vw, 2.2rem)", lineHeight: 1.3 }}>
            “{testimonial.quote}”
          </p>
          <p className="mt-4 text-xs font-semibold tracking-widest uppercase opacity-50">{testimonial.author}</p>
        </Reveal>
      </section>

      {/* CTA final → vuelve al chat real del portfolio */}
      <section className="px-5 sm:px-8 md:px-12 py-24 md:py-32" style={{ background: accent, color: "#fff" }}>
        <Reveal>
          <p className="font-display font-semibold uppercase max-w-2xl mx-auto text-center" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", lineHeight: 1.05 }}>
            {ctaText}
          </p>
          <div className="flex justify-center mt-8">
            <Link
              href="/#contacto"
              className="group inline-flex items-center gap-2 font-semibold tracking-widest uppercase text-base sm:text-lg px-6 py-3 rounded-full"
              style={{ background: "#fff", color: "#111" }}
            >
              Hablemos
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="px-5 sm:px-8 md:px-12 py-6 text-center">
        <span className="text-[9px] font-semibold tracking-widest uppercase opacity-40">
          Demo conceptual · imágenes de stock · sin afiliación real
        </span>
      </footer>
    </main>
  );
}
