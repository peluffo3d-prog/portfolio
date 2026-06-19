"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const DESKTOP_FRAMES = 60;
const MOBILE_FRAMES  = 28;
const MOBILE_SCALE   = 1.0;       // los frames mobile ya vienen recortados con margen
const MOBILE_BG      = "#f5f5f5"; // color de fondo de los frames — se rellena el canvas para que no se vea recuadro

type Device = "desktop" | "mobile";

function framePath(device: Device, index: number) {
  const n = String(index + 1).padStart(3, "0");
  return `/hero-frames/${device}/frame-${n}.webp`;
}

export default function HeroSequence({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const frameCountRef   = useRef(0);
  const currentIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const coverRef        = useRef(true); // desktop = cover (llena), mobile = contain (entra entero)

  const [device, setDevice] = useState<Device | null>(null);
  const [ready, setReady]   = useState(false);

  // Detecta mobile/desktop — mismo breakpoint (768px) que el resto del Hero
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setDevice(mq.matches ? "desktop" : "mobile");
    coverRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      setDevice(e.matches ? "desktop" : "mobile");
      coverRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Precarga el set de frames correspondiente al device
  useEffect(() => {
    if (!device) return;
    setReady(false);
    const count = device === "desktop" ? DESKTOP_FRAMES : MOBILE_FRAMES;
    frameCountRef.current = count;

    let loaded = 0;
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < count; i++) {
      const img = new window.Image();
      img.src = framePath(device, i);
      img.onload = () => {
        loaded++;
        if (loaded === count && !cancelled) setReady(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => { cancelled = true; };
  }, [device]);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr  = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width  = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const canvasRatio = cssW / cssH;
    const imgRatio    = img.naturalWidth / img.naturalHeight;

    if (coverRef.current) {
      // object-fit: cover — recorta la fuente y llena el canvas (desktop)
      let sx, sy, sw, sh;
      if (imgRatio > canvasRatio) {
        sh = img.naturalHeight;
        sw = sh * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cssW, cssH);
    } else {
      // mobile: rellena todo el canvas con el color de fondo del frame (full-bleed, sin recuadro)
      ctx.fillStyle = MOBILE_BG;
      ctx.fillRect(0, 0, cssW, cssH);
      // y dibuja el átomo entero (frames ya recortados en portrait), centrado
      const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) * MOBILE_SCALE;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cssW - dw) / 2;
      const dy = (cssH - dh) / 2;
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, dw, dh);
    }
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!ready) return;
    const count = frameCountRef.current;
    if (!count) return;
    const idx = reducedMotionRef.current
      ? Math.floor(count / 2)
      : Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));
    currentIndexRef.current = idx;
    requestAnimationFrame(() => drawFrame(idx));
  });

  // Primer frame al quedar listo + redibujo (debounced) en resize
  useEffect(() => {
    if (!ready) return;
    const count = frameCountRef.current;
    currentIndexRef.current = reducedMotionRef.current ? Math.floor(count / 2) : 0;
    drawFrame(currentIndexRef.current);

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => drawFrame(currentIndexRef.current), 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [ready]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, opacity: ready ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  );
}
