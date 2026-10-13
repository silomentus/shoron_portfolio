"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";
import type { Accent } from "@/lib/data";

/* ─── Shared easing ─── */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Accent class map (static strings so Tailwind can see them) ─── */
export const ACCENT: Record<
  Accent,
  { text: string; bg: string; dot: string; ring: string; spot: string }
> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary/10",
    dot: "bg-primary",
    ring: "group-hover:border-primary/40",
    spot: "rgba(129, 140, 248, 0.16)",
  },
  secondary: {
    text: "text-secondary",
    bg: "bg-secondary/10",
    dot: "bg-secondary",
    ring: "group-hover:border-secondary/40",
    spot: "rgba(192, 132, 252, 0.16)",
  },
  tertiary: {
    text: "text-tertiary",
    bg: "bg-tertiary/10",
    dot: "bg-tertiary",
    ring: "group-hover:border-tertiary/40",
    spot: "rgba(69, 223, 164, 0.13)",
  },
  cyan: {
    text: "text-cyan",
    bg: "bg-cyan/10",
    dot: "bg-cyan",
    ring: "group-hover:border-cyan/40",
    spot: "rgba(56, 189, 248, 0.14)",
  },
};

/* ─── Reveal on scroll ─── */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={delay}
    >
      {children}
    </Comp>
  );
}

/* ─── Stagger container + item ─── */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & Omit<
  HTMLMotionProps<"div">,
  "children"
>) {
  return (
    <motion.div className={className} variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}

/* ─── Word-by-word masked text reveal ─── */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : {
        whileInView: "show" as const,
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      };
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", rotate: 4, opacity: 0 },
              show: {
                y: "0%",
                rotate: 0,
                opacity: 1,
                transition: { duration: 0.9, ease: EASE },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ─── Card with pointer-following spotlight ─── */
export function SpotlightCard({
  children,
  className = "",
  accent = "primary",
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  as?: "div" | "a";
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const Comp = as as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      onPointerMove={onMove}
      className={`spotlight group ${className}`}
      style={{ ["--spot" as string]: ACCENT[accent].spot }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ─── Magnetic hover wrapper (fine pointers only) ─── */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section header (index label + split title) ─── */
export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  accent = "primary",
  aside,
}: {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  accent?: Accent;
  aside?: ReactNode;
}) {
  const a = ACCENT[accent];
  return (
    <div className="mb-10 md:mb-14">
      <Reveal className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className={`absolute inset-0 rounded-full ${a.dot} animate-pulse-ring`} />
          <span className={`relative h-2 w-2 rounded-full ${a.dot}`} />
        </span>
        <span className={`label-mono uppercase ${a.text}`}>
          {index} / {label}
        </span>
      </Reveal>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <h2 className="font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.025em] text-on-surface sm:text-[34px] lg:text-[40px]">
            <SplitText text={title} />
          </h2>
          {subtitle && (
            <Reveal delay={0.15}>
              <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant/90">
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </div>
  );
}

/* ─── Tech tag ─── */
export function Tag({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | Accent | "on";
}) {
  const color =
    tone === "muted"
      ? "text-on-surface-variant/80"
      : tone === "on"
        ? "text-on-surface"
        : ACCENT[tone].text;
  return (
    <span
      className={`badge-tag inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.035] px-2.5 py-1 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06] ${color}`}
    >
      {children}
    </span>
  );
}

/* ─── Live status pill ─── */
export function StatusDot({ className = "bg-emerald" }: { className?: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className={`absolute inset-0 rounded-full ${className} animate-pulse-ring`} />
      <span className={`relative h-1.5 w-1.5 rounded-full ${className}`} />
    </span>
  );
}
