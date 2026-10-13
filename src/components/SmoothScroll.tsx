"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (null on reduced-motion or before mount). */
export const getLenis = () => lenisInstance;

/** Lock / unlock page scroll in a Lenis-aware way (used by modals & menus). */
export function setScrollLocked(locked: boolean) {
  if (lenisInstance) {
    if (locked) lenisInstance.stop();
    else lenisInstance.start();
  }
  if (locked) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
}

/**
 * Inertia-based smooth scrolling for wheel/trackpad on desktop.
 * On mobile/touch devices, Lenis is disabled to let the mobile OS handle
 * native momentum scrolling with 0ms touch delay and no gesture blocking.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Don't hijack mobile touch scrolling — native mobile inertia is faster & never locks up
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisInstance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smoothly route in-page anchor links through Lenis
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(hash === "#home" ? 0 : target, { offset: -80, duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
