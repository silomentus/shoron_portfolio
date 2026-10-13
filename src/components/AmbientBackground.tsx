"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Lightweight ambient backdrop:
 *  - CSS aurora orbs (radial gradients, transform-only animation → GPU friendly)
 *  - Fading engineering grid
 *  - Sparse drifting star field on a 2D canvas (auto-scaled for device, pauses when hidden)
 *  - Cursor-following glow on fine pointers
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowX = useTransform(sx, (v) => v - 300);
  const glowY = useTransform(sy, (v) => v - 300);

  // Cursor glow
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  // Star field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number };
    let stars: Star[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.25,
        vx: (Math.random() - 0.5) * 0.06,
        vy: -(Math.random() * 0.08 + 0.02),
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          s.tw += 0.015;
          if (s.y < -4) s.y = h + 4;
          if (s.x < -4) s.x = w + 4;
          if (s.x > w + 4) s.x = -4;
        }
        const alpha = s.a * (0.65 + Math.sin(s.tw) * 0.35);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 205, 255, ${alpha})`;
        ctx.fill();
      }
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduce) draw();
      }, 150);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base ambient light - deep cosmic void */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(129,140,248,0.06),transparent),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(192,132,252,0.03),transparent)]" />

      {/* Subtle Aurora orbs */}
      <div className="absolute -top-[20%] left-[10%] h-[70vmax] w-[70vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.045)_0%,transparent_60%)] will-change-transform" />
      <div className="absolute top-[30%] -right-[20%] h-[60vmax] w-[60vmax] animate-aurora-slow rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.035)_0%,transparent_60%)] will-change-transform" />
      <div className="absolute -bottom-[25%] left-[-15%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(69,223,164,0.02)_0%,transparent_60%)] will-change-transform [animation-delay:-8s]" />

      {/* Grid */}
      <div className="grid-fade absolute inset-x-0 top-0 h-[120vh]" />

      {/* Stars */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Cursor glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-0 top-0 hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.04)_0%,transparent_60%)] md:block"
      />
    </div>
  );
}
