"use client";

import { motion } from "framer-motion";
import { LuBadgeCheck, LuGauge, LuLandmark, LuTerminal } from "react-icons/lu";
import { experience, experienceHighlights } from "@/lib/data";
import {
  ACCENT,
  EASE,
  Reveal,
  SectionHeader,
  SpotlightCard,
  Stagger,
  StaggerItem,
  StatusDot,
  Tag,
} from "@/components/ui";

const icons = { terminal: LuTerminal, bank: LuLandmark, badge: LuBadgeCheck, gauge: LuGauge };
const stackTone = ["primary", "primary", "tertiary", "cyan", "on"] as const;

export default function Experience() {
  const job = experience[0];

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Where I've Worked"
          title="Experience & Production Engineering"
          accent="secondary"
          aside={
            <span className="font-mono text-[13px] text-on-surface-variant">
              Enterprise Fintech & Social Impact Scale
            </span>
          }
        />

        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-2xl p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] sm:p-7 lg:p-10">
            {/* Animated gradient edge */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-primary via-violet to-tertiary"
            />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/10 blur-[90px]" />

            <div className="relative flex flex-col justify-between gap-5 pb-6 lg:flex-row lg:items-start">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-[22px] font-bold tracking-tight text-on-surface sm:text-[24px]">
                    {job.role}
                  </h3>
                  <span className="badge-tag inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-emerald">
                    <StatusDot /> Active Production
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[15px] text-on-surface-variant">
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-on-surface underline-offset-4 hover:underline"
                  >
                    {job.company}
                  </a>
                  <span className="opacity-50">•</span>
                  <a
                    href={job.parentCompany.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    A Portfolio Company of {job.parentCompany.name}
                  </a>
                </div>
                <p className="max-w-3xl pt-1 text-[13px] leading-relaxed text-on-surface-variant/80">
                  {job.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-row gap-3 lg:flex-col lg:items-end lg:gap-1">
                <span className="font-mono text-[15px] font-bold text-secondary">{job.duration}</span>
                <span className="label-mono text-on-surface-variant">Dhaka, Bangladesh</span>
              </div>
            </div>

            <Stagger className="relative grid grid-cols-1 gap-3 pt-2 md:grid-cols-2 md:gap-4" stagger={0.1}>
              {experienceHighlights.map((h) => {
                const Icon = icons[h.icon];
                const a = ACCENT[h.accent];
                return (
                  <StaggerItem key={h.title}>
                    <SpotlightCard
                      accent={h.accent}
                      className="h-full rounded-xl border border-white/[0.05] bg-surface-low/60 p-5 transition-[transform,background-color] duration-500 hover:-translate-y-1 hover:bg-surface-low/90"
                    >
                      <div className={`mb-2 flex items-center gap-2 font-display text-[15px] font-semibold ${a.text}`}>
                        <span className={`grid h-7 w-7 place-items-center rounded-md ${a.bg} transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {h.title}
                      </div>
                      <p className="text-[13px] leading-relaxed text-on-surface-variant">{h.body}</p>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal delay={0.1} className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.05] pt-5">
              <span className="label-mono mr-2 text-on-surface-variant">STACK IN DEPLOYMENT:</span>
              {job.tech.map((t, i) => (
                <Tag key={t} tone={stackTone[i] ?? "muted"}>
                  {t}
                </Tag>
              ))}
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
