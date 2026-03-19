"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 18;

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const trail = useRef<TrailPoint[]>([]);
  const hovering = useRef(false);
  const hasMoved = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!hasMoved.current) {
        smooth.current.x = e.clientX;
        smooth.current.y = e.clientY;
        hasMoved.current = true;
      }
    };
    window.addEventListener("mousemove", onMove);

    const onEnter = () => { hovering.current = true; };
    const onLeave = () => { hovering.current = false; };

    const bindHover = () => {
      const els = document.querySelectorAll("a, button, input, textarea, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return els;
    };
    let els = bindHover();
    const rebind = setInterval(() => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      els = bindHover();
    }, 2500);

    let lastX = 0;
    let lastY = 0;
    let frameCount = 0;

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!hasMoved.current) {
        raf.current = requestAnimationFrame(draw);
        return;
      }

      // Smooth follow
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.3;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.3;

      const x = smooth.current.x;
      const y = smooth.current.y;

      // Speed for trail intensity
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX = x;
      lastY = y;

      // Add trail points every other frame when moving
      frameCount++;
      if (speed > 0.8 && frameCount % 2 === 0) {
        trail.current.unshift({ x, y, age: 0 });
        if (trail.current.length > TRAIL_LENGTH) {
          trail.current.pop();
        }
      }

      // Draw trail
      for (let i = trail.current.length - 1; i >= 0; i--) {
        const p = trail.current[i];
        p.age += 0.07;

        if (p.age >= 1) {
          trail.current.splice(i, 1);
          continue;
        }

        const fade = 1 - p.age;
        const progress = i / TRAIL_LENGTH;
        const sz = (hovering.current ? 4 : 2.5) * fade * (1 - progress * 0.5);

        // Soft glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 4);
        g.addColorStop(0, `rgba(190, 200, 255, ${fade * 0.35})`);
        g.addColorStop(1, "rgba(129, 140, 248, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 235, 255, ${fade * 0.75})`;
        ctx.fill();
      }

      // Head glow — larger, more visible
      const isHover = hovering.current;
      const glowR = isHover ? 36 : 22;
      const headGlow = ctx.createRadialGradient(x, y, 0, x, y, glowR);
      headGlow.addColorStop(0, isHover
        ? "rgba(200, 210, 255, 0.45)"
        : "rgba(180, 195, 255, 0.3)");
      headGlow.addColorStop(0.4, isHover
        ? "rgba(129, 140, 248, 0.15)"
        : "rgba(129, 140, 248, 0.08)");
      headGlow.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();

      // Head bright ring — gives a clear boundary
      const ringR = isHover ? 8 : 5;
      ctx.beginPath();
      ctx.arc(x, y, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = isHover
        ? "rgba(220, 225, 255, 0.5)"
        : "rgba(200, 210, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Head solid core — white so it never blends in
      const headR = isHover ? 5 : 3.5;
      ctx.beginPath();
      ctx.arc(x, y, headR, 0, Math.PI * 2);
      ctx.fillStyle = isHover
        ? "rgba(255, 255, 255, 0.95)"
        : "rgba(240, 243, 255, 0.9)";
      ctx.fill();

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      clearInterval(rebind);
      cancelAnimationFrame(raf.current);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
    />
  );
}
