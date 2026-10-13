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

            {/* Sparkline */}
            <Reveal delay={0.2} className="mt-6">
              <SpotlightCard accent="tertiary" className="glass rounded-xl p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-mono text-on-surface-variant">SYSTEM AVAILABILITY TARGET</span>
                  <span className="badge-tag text-tertiary">99.98% SLA</span>
                </div>
                <svg className="h-14 w-full text-tertiary" fill="none" viewBox="0 0 300 40" preserveAspectRatio="none">
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
