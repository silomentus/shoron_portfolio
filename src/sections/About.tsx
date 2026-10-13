"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuCheck, LuCopy, LuGraduationCap, LuMail, LuMapPin } from "react-icons/lu";
import { education, personalInfo } from "@/lib/data";
import { EASE, Reveal, SectionHeader, SpotlightCard, Stagger, StaggerItem } from "@/components/ui";

const SPARK = "M0 32 L40 28 L80 30 L120 18 L160 22 L200 12 L240 15 L280 8 L300 10";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  return (
    <button
      onClick={copy}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/[0.06] bg-surface-high/50 px-3 py-2 text-[13px] text-on-surface transition-colors duration-300 hover:border-tertiary/30 hover:bg-surface-high"
    >
      <LuMail className="h-[18px] w-[18px] text-tertiary" />
      <span>silomentus [at] gmail.com</span>
      <span className="relative grid h-4 w-4 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
              <LuCheck className="h-3.5 w-3.5 text-emerald" />
            </motion.span>
          ) : (
            <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <LuCopy className="h-3.5 w-3.5 text-on-surface-variant transition-colors group-hover:text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

export default function About() {
  const [nsu, ...school] = education;

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-14">
          {/* Bio */}
          <div className="w-full lg:w-5/12">
            <SectionHeader index="01" label="Who I Am" title="About Me & Foundations" />
            <div className="-mt-4 space-y-4 text-[15px] leading-relaxed text-on-surface-variant">
              <Reveal>
                <p>
                  I am a Computer Science graduate from{" "}
                  <span className="font-medium text-on-surface">North South University (Dhaka)</span>,
                  currently working as a{" "}
                  <span className="font-medium text-on-surface">Software Engineer at Appinion BD</span>.
                  My work focuses on backend development, API design, and building reliable, scalable
                  software solutions.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  My academic experience built a strong foundation in artificial intelligence, machine
                  learning, and scalable backend architecture. I enjoy solving complex problems and
                  turning ideas into efficient, well-structured production systems.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-surface-high/50 px-3 py-2 text-[13px] text-on-surface">
                <LuMapPin className="h-[18px] w-[18px] text-primary" />
                {personalInfo.location}
              </span>
              <CopyEmail />
            </Reveal>

            {/* Infographics: SLA & Latency */}
            <Reveal delay={0.2} className="mt-6 space-y-3">
              <SpotlightCard accent="tertiary" className="glass relative overflow-hidden rounded-xl p-5">
                {/* Continuous ambient scanline */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-tertiary/10 to-transparent"
                />

                <div className="mb-2 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
                    </span>
                    <span className="label-mono text-on-surface-variant">SYSTEM AVAILABILITY TARGET</span>
                  </div>
                  <span className="badge-tag text-tertiary">99.98% SLA</span>
                </div>
                <div className="relative">
                  <svg className="h-12 w-full text-tertiary" fill="none" viewBox="0 0 300 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`${SPARK} L300 40 L0 40 Z`}
                      fill="url(#spark-fill)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                    <motion.path
                      d={SPARK}
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
                    />
                  </svg>
                  {/* Continuous live heartbeat point on sparkline endpoint */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-tertiary shadow-[0_0_10px_#e5a93c]"
                  />
                </div>
              </SpotlightCard>

              {/* P99 Response Latency Distribution */}
              <SpotlightCard accent="primary" className="glass relative overflow-hidden rounded-xl p-5">
                <div className="mb-2.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="label-mono text-on-surface-variant">P99 REST API LATENCY</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant/70">Production endpoint response distribution</p>
                  </div>
                  <span className="badge-tag text-primary">&lt; 120ms P99</span>
                </div>
                <div className="flex h-10 items-end gap-1.5 pt-1">
                  {[28, 42, 65, 88, 100, 75, 45, 30, 18, 12, 8, 4].map((h, idx) => (
                    <div key={idx} className="group/bar relative flex-1 h-full flex items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        animate={{
                          height: [`${h}%`, `${Math.max(10, Math.min(100, h + (idx % 2 === 0 ? 8 : -8)))}%`, `${h}%`],
                        }}
                        transition={{
                          height: {
                            duration: 2.4 + (idx % 3) * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: idx * 0.15,
                          },
                        }}
                        className={`w-full rounded-t-sm transition-colors ${
                          idx === 4
                            ? "bg-primary shadow-[0_0_12px_rgba(186,155,255,0.6)]"
                            : idx > 4
                            ? "bg-primary/30 group-hover/bar:bg-primary/60"
                            : "bg-primary/50 group-hover/bar:bg-primary/80"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-on-surface-variant/60">
                  <span>20ms</span>
                  <span className="text-primary font-semibold">Median ~48ms</span>
                  <span>140ms</span>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>

          {/* Education */}
          <div className="w-full lg:w-7/12 lg:pt-[92px]">
            <Reveal className="mb-5 flex items-center gap-2">
              <LuGraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-display text-[22px] font-semibold tracking-tight text-on-surface sm:text-[24px]">
                Education & Background
              </h3>
            </Reveal>

            <Stagger className="space-y-3" stagger={0.12}>
              <StaggerItem>
                <SpotlightCard className="glass relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
                  <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <span className="label-mono text-primary">{nsu.duration}</span>
                    <span className="badge-tag self-start rounded-full bg-primary/10 px-2.5 py-1 text-primary sm:self-auto">
                      Graduated
                    </span>
                  </div>
                  <h4 className="font-display text-[18px] font-semibold tracking-tight text-on-surface sm:text-[20px]">
                    BSc in Computer Science and Engineering
                  </h4>
                  <p className="font-medium text-on-surface-variant">{nsu.institution}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant/80">
                    Rigorous curriculum emphasizing Data Structures, Algorithms, Software Engineering, Deep
                    Learning, Distributed Systems, and Database Management.
                  </p>
                </SpotlightCard>
              </StaggerItem>

              {school.map((e) => (
                <StaggerItem key={e.degree}>
                  <SpotlightCard className="glass flex flex-col justify-between gap-2 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1 sm:flex-row sm:items-center">
                    <div>
                      <span className="label-mono text-on-surface-variant">{e.duration}</span>
                      <h4 className="font-display text-[17px] font-semibold tracking-tight text-on-surface sm:text-[19px]">
                        {e.degree}
                      </h4>
                      <p className="text-[13px] text-on-surface-variant">
                        {e.institution} • {e.result}
                      </p>
                    </div>
                    <span className="badge-tag self-start rounded-full bg-surface-highest px-2.5 py-1 text-on-surface-variant sm:self-auto">
                      Science
                    </span>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
