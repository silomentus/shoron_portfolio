"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { LuFileText, LuGamepad2, LuTerminal } from "react-icons/lu";
import { navLinks } from "@/lib/data";
import { setScrollLocked } from "@/components/SmoothScroll";
import { EASE, Magnetic } from "@/components/ui";

export default function Navbar({
  onPlayGame,
  onRequestCV,
}: {
  onPlayGame?: () => void;
  onRequestCV?: () => void;
}) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (!open) setHidden(y > prev && y > 320);
  });

  // Active section tracking (rAF-throttled)
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    let ticking = false;
    const update = () => {
      ticking = false;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      // Bottom of page → last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -88 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
            scrolled || open
              ? "border-b border-white/[0.06] bg-[rgba(10,10,18,0.72)] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="container-x flex h-16 items-center justify-between gap-4">
            {/* Brand */}
            <a
              href="#home"
              className="group flex items-center gap-2 font-mono text-[14px] font-bold tracking-tight text-primary"
              aria-label="Back to top"
            >
              <motion.span
                whileHover={{ rotate: -12, scale: 1.1 }}
                className="grid h-8 w-8 place-items-center rounded-lg border border-primary/20 bg-primary/10"
              >
                <LuTerminal className="h-4 w-4" />
              </motion.span>
              <span className="transition-colors group-hover:text-on-surface">
                &lt;SHORON /&gt;
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`label-mono relative rounded-lg px-3 py-1.5 transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-on-surface-variant/70 hover:text-on-surface"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg border border-primary/20 bg-surface-high/80 shadow-[0_0_18px_rgba(129,140,248,0.15)]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onRequestCV && (
                <Magnetic strength={0.2} className="hidden sm:inline-flex">
                  <button
                    onClick={onRequestCV}
                    className="label-mono group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/[0.08] bg-surface-low/80 px-3.5 py-2 text-on-surface transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_24px_rgba(129,140,248,0.18)]"
                  >
                    <LuFileText className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-rotate-6" />
                    Request CV
                  </button>
                </Magnetic>
              )}
              {onPlayGame && (
                <Magnetic strength={0.25}>
                  <button
                    onClick={onPlayGame}
                    aria-label="Play space game"
                    title="Play a mini game"
                    className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-primary text-on-primary shadow-[0_0_20px_rgba(189,194,255,0.25)] transition-transform duration-300 hover:scale-110 active:scale-95"
                  >
                    <LuGamepad2 className="h-[18px] w-[18px]" />
                  </button>
                </Magnetic>
              )}

              {/* Mobile toggle */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-lg border border-white/[0.08] bg-surface-low/70 lg:hidden"
              >
                <span className="sr-only">Menu</span>
                <motion.span
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-on-surface"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute h-[1.5px] w-[18px] rounded-full bg-on-surface"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 32px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 36px) 32px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(7,7,11,0.97)] backdrop-blur-2xl lg:hidden"
            data-lenis-prevent
          >
            <div className="grid-fade pointer-events-none absolute inset-0 opacity-60" />
            <nav className="container-x relative flex min-h-full flex-col justify-between pb-8 pt-20">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.12 + i * 0.04, duration: 0.45, ease: EASE }}
                      className="border-b border-white/[0.05]"
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-3 py-2.5 sm:py-3.5"
                      >
                        <span className="label-mono text-[11px] text-outline/60">0{i + 1}</span>
                        <span
                          className={`font-display text-[clamp(20px,5vw,32px)] font-semibold tracking-tight transition-colors ${
                            isActive ? "text-gradient" : "text-on-surface/70 group-hover:text-on-surface"
                          }`}
                        >
                          {link.name}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {onRequestCV && (
                <div className="mt-6 border-t border-white/[0.06] pt-4">
                  <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.4, ease: EASE }}
                    onClick={() => {
                      setOpen(false);
                      onRequestCV();
                    }}
                    className="label-mono flex w-auto max-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3.5 py-2 text-[12px] text-primary transition-all duration-300 hover:bg-primary hover:text-on-primary"
                  >
                    <LuFileText className="h-3.5 w-3.5" /> Request CV
                  </motion.button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
