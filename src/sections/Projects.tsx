"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { LuBuilding2, LuFlaskConical } from "react-icons/lu";
import {
  academicFilters,
  academicMeta,
  academicProjects,
  industryMeta,
  industryProjects,
} from "@/lib/data";
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

const COMMON = new Set(["PHP", "Laravel", "MySQL", "REST APIs"]);

type FilterKey = (typeof academicFilters)[number]["key"];

export default function Projects() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const academic = useMemo(
    () =>
      academicProjects
        .map((p, i) => ({ ...p, meta: academicMeta[i] }))
        .filter((p) => filter === "all" || p.meta.cat === filter),
    [filter]
  );

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="What I've Built"
          title="System Architecture & Projects"
          subtitle="Production-grade enterprise services alongside rigorous academic AI research."
          accent="tertiary"
        />

        {/* Industry */}
        <div className="mb-20">
          <Reveal className="mb-6 flex items-center gap-2">
            <LuBuilding2 className="h-5 w-5 text-primary" />
            <h3 className="font-display text-[22px] font-semibold tracking-tight text-on-surface sm:text-[24px]">
              Industry & Enterprise Systems
            </h3>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6" stagger={0.12}>
            {industryProjects.map((p, i) => {
              const m = industryMeta[i];
              const a = ACCENT[m.accent];
              return (
                <StaggerItem key={p.title} className="h-full">
                  <SpotlightCard
                    accent={m.accent}
                    className="hairline-top glass flex h-full flex-col justify-between rounded-2xl p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] sm:p-7"
                  >
                    <span className="hairline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className={`badge-tag rounded-md px-2.5 py-1 ${a.bg} ${a.text}`}>{m.tag}</span>
                        <span
                          className={`label-mono flex items-center gap-1.5 ${
                            i < 2 ? "text-emerald" : a.text
                          }`}
                        >
                          <StatusDot className={i < 2 ? "bg-emerald" : a.dot} /> {m.status}
                        </span>
                      </div>
                      <h4 className="font-display text-[19px] font-semibold tracking-tight text-on-surface transition-colors duration-300 sm:text-[20px]">
                        <span className={`bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px] group-hover:${a.text}`}>
                          {p.title}
                        </span>
                      </h4>
                      <p className={`mt-1 font-mono text-[13px] ${a.text}`}>{p.subtitle}</p>
                      <p className="mt-3 text-[13px] leading-relaxed text-on-surface-variant">{p.description}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
                      {p.tech.map((t) => (
                        <Tag key={t} tone={COMMON.has(t) ? "muted" : m.accent}>
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Academic research */}
        <div id="research" className="scroll-mt-24">
          <Reveal className="mb-5 flex items-center gap-2">
            <LuFlaskConical className="h-5 w-5 text-secondary" />
            <h3 className="font-display text-[22px] font-semibold tracking-tight text-on-surface sm:text-[24px]">
              Academic Research & Engineering
            </h3>
          </Reveal>

          {/* Filter tabs — horizontally scrollable on small screens */}
          <Reveal delay={0.05} className="-mx-4 mb-6 px-4 sm:mx-0 sm:px-0">
            <LayoutGroup id="academic-tabs">
              <div
                className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden"
                role="tablist"
              >
                {academicFilters.map((f) => {
                  const isActive = filter === f.key;
                  const count =
                    f.key === "all"
                      ? academicProjects.length
                      : academicMeta.filter((m) => m.cat === f.key).length;
                  return (
                    <button
                      key={f.key}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setFilter(f.key)}
                      className={`label-mono relative shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 transition-colors duration-300 ${
                        isActive
                          ? "text-on-primary"
                          : "border border-white/[0.06] bg-surface-low/70 text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="academic-pill"
                          className="absolute inset-0 rounded-lg bg-primary shadow-[0_6px_20px_-6px_rgba(189,194,255,0.6)]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">
                        {f.label}
                        <span className={isActive ? "opacity-70" : "opacity-50"}> ({count})</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>

          <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {academic.map((p) => {
                const a = ACCENT[p.meta.accent];
                return (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="h-full"
                  >
                    <SpotlightCard
                      accent={p.meta.accent}
                      className="flex h-full flex-col justify-between rounded-xl border border-white/[0.06] bg-surface-low/60 p-5 backdrop-blur transition-[transform,background-color] duration-500 hover:-translate-y-1 hover:bg-surface-low/90"
                    >
                      <div>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className={`badge-tag ${a.text}`}>{p.meta.label}</span>
                          <span className="label-mono text-on-surface-variant/70">{p.meta.stack}</span>
                        </div>
                        <h4 className="font-display text-[17px] font-bold leading-snug tracking-tight text-on-surface">
                          {p.title}
                        </h4>
                        <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant">{p.description}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 3).map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
