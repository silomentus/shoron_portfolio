"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  LuArrowUpRight,
  LuBrain,
  LuGraduationCap,
  LuMail,
  LuServer,
  LuTerminal,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { heroFocus, heroRoles, personalInfo } from "@/lib/data";
import { ACCENT, EASE, Magnetic, SplitText, SpotlightCard } from "@/components/ui";

const focusIcons = { server: LuServer, brain: LuBrain, grad: LuGraduationCap };

const marquee = [
  "PHP", "Laravel", "MySQL", "REST APIs", "Python", "PyTorch", "TensorFlow",
  "Redis", "RBAC", "Git", "OpenCV", "Scikit-Learn", "TypeScript", "Microservices",
];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % heroRoles.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {heroRoles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.2]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24 sm:pt-28"
    >
      {/* Hero glow */}
      <div className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-primary-container/5 blur-[120px]" />

      <motion.div
        style={{ y, opacity }}
        className="container-x relative will-change-transform max-sm:!opacity-100 max-sm:!transform-none"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Greeting */}
          <motion.div
            {...fadeUp(0.2)}
            className="mb-4 flex items-center gap-2 font-mono text-[15px] font-semibold tracking-wide text-primary"
          >
            <LuTerminal className="h-4 w-4 opacity-70" />
            <span>Hello, I am {personalInfo.name}</span>
            <span className="inline-block h-4 w-2 animate-blink bg-primary" />
          </motion.div>

          {/* Name */}
          <h1 className="font-display text-[clamp(34px,7.2vw,72px)] font-bold leading-[1.05] tracking-[-0.035em] text-on-surface">
            <SplitText text="Md. Harun Or Rashid" animateOnMount delay={0.3} stagger={0.07} />{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.65 }}
              className="text-gradient-anim inline-block"
            >
              (Shoron)
            </motion.span>
          </h1>

          {/* Rotating role */}
          <motion.p
            {...fadeUp(0.8)}
            className="mt-4 font-display text-[clamp(17px,2.6vw,24px)] font-medium tracking-tight text-secondary"
          >
            <RotatingRole />
          </motion.p>

          {/* Value statement */}
          <motion.div {...fadeUp(0.95)} className="mx-auto mt-6 max-w-2xl space-y-3">
            <p className="text-[clamp(16px,2vw,20px)] font-medium leading-relaxed text-on-surface">
              Crafting scalable backend architectures and exploring algorithmic deep learning.
            </p>
            <p className="text-[15px] leading-relaxed text-on-surface-variant/85">
              Software Engineer at <span className="font-medium text-on-surface">Appinion BD</span>.
              Focused on high-throughput services, distributed transaction systems, and applied AI.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(1.1)}
            className="mt-9 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.25} className="justify-center">
              <a
                href="#projects"
                className="label-mono group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-7 py-3.5 text-on-primary shadow-[0_10px_30px_-8px_rgba(129,140,248,0.55)] transition-shadow duration-500 hover:shadow-[0_14px_40px_-6px_rgba(129,140,248,0.75)] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <LuTerminal className="relative h-[18px] w-[18px]" />
                <span className="relative">Explore Engineering Work</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25} className="justify-center">
              <a
                href="#contact"
                className="label-mono group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-surface-high/70 px-6 py-3.5 text-on-surface backdrop-blur transition-all duration-300 hover:border-tertiary/40 hover:bg-surface-highest sm:w-auto"
              >
                <LuMail className="h-[18px] w-[18px] text-tertiary transition-transform duration-300 group-hover:-rotate-12" />
                Get in Touch
              </a>
            </Magnetic>
            <Magnetic strength={0.25} className="justify-center">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-surface-low/70 px-5 py-3.5 text-on-surface-variant backdrop-blur transition-all duration-300 hover:text-on-surface sm:w-auto"
              >
                <FaGithub className="h-4 w-4" />
                silomentus
                <LuArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Focus cards */}
          <div className="mt-12 grid w-full grid-cols-1 gap-3 border-t border-white/[0.06] pt-10 sm:grid-cols-3">
            {heroFocus.map((f) => {
              const Icon = focusIcons[f.icon];
              const a = ACCENT[f.accent];
              return (
                <div key={f.title}>
                  <SpotlightCard
                    accent={f.accent}
                    className="glass flex h-full items-start gap-3 rounded-xl p-4 text-left transition-transform duration-500 hover:-translate-y-1"
                  >
                    <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${a.bg} ${a.text}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="space-y-1">
                      <span className={`badge-tag font-medium uppercase tracking-wide ${a.text}`}>{f.label}</span>
                      <p className="font-display text-[14px] font-semibold tracking-tight text-on-surface">{f.title}</p>
                      <p className="text-[12px] text-on-surface-variant/80">{f.sub}</p>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Tech marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="mask-x relative mt-12 overflow-hidden"
      >
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              className="badge-tag whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-on-surface-variant/60"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
