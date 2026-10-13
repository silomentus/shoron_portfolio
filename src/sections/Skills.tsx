"use client";

import { motion } from "framer-motion";
import { LuCode, LuCpu, LuDatabase, LuWrench } from "react-icons/lu";
import { skills } from "@/lib/data";
import { EASE, Reveal, SectionHeader, SpotlightCard, Stagger, StaggerItem, Tag } from "@/components/ui";

export default function Skills() {
  return (
    <section id="stack" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="What I Know"
          title="Skills & Technical Matrix"
          subtitle="Mastered foundations spanning distributed backend stacks to deep learning paradigms."
          accent="primary"
        />

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.12}>
          {/* 1: Programming Languages */}
          <StaggerItem className="h-full">
            <SpotlightCard
              accent="primary"
              className="glass flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <LuCode className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-on-surface sm:text-[20px]">
                    Programming Languages
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((lang) => {
                    const isKey = ["PHP", "Python", "SQL"].includes(lang.name);
                    const isFront = ["HTML5", "CSS3"].includes(lang.name);
                    return (
                      <span
                        key={lang.name}
                        className={`badge-tag rounded-lg border border-white/[0.06] bg-surface-high/60 px-3 py-1.5 transition-all duration-300 hover:border-primary/40 hover:scale-105 ${
                          isKey
                            ? "text-primary font-semibold"
                            : isFront
                            ? "text-on-surface-variant/70"
                            : "text-on-surface"
                        }`}
                      >
                        {lang.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          {/* 2: Backend Development */}
          <StaggerItem className="h-full">
            <SpotlightCard
              accent="secondary"
              className="glass flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <LuDatabase className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-on-surface sm:text-[20px]">
                    Backend & Cloud Systems
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((item) => {
                    const isPri = item.includes("Laravel");
                    const isSec = item.includes("Database") || item.includes("Optimization");
                    const isCyan = item.includes("Microservice");
                    return (
                      <span
                        key={item}
                        className={`badge-tag rounded-lg border border-white/[0.06] bg-surface-high/60 px-3 py-1.5 transition-all duration-300 hover:border-secondary/40 hover:scale-105 ${
                          isPri
                            ? "text-secondary font-semibold"
                            : isSec
                            ? "text-tertiary"
                            : isCyan
                            ? "text-cyan"
                            : "text-on-surface"
                        }`}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          {/* 3: AI & Machine Learning */}
          <StaggerItem className="h-full">
            <SpotlightCard
              accent="tertiary"
              className="glass flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-tertiary/10 text-tertiary">
                    <LuCpu className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-on-surface sm:text-[20px]">
                    AI & Machine Learning
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.aiml.map((item) => {
                    const isKey = ["TensorFlow", "PyTorch"].includes(item);
                    const isSec = ["CNNs & BiLSTM", "Vision Transformers (ViTs)", "Knowledge Distillation"].includes(item);
                    return (
                      <span
                        key={item}
                        className={`badge-tag rounded-lg border border-white/[0.06] bg-surface-high/60 px-3 py-1.5 transition-all duration-300 hover:border-tertiary/40 hover:scale-105 ${
                          isKey
                            ? "text-tertiary font-semibold"
                            : isSec
                            ? "text-secondary"
                            : "text-on-surface"
                        }`}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>

          {/* 4: Tools & Engineering Environments */}
          <StaggerItem className="h-full">
            <SpotlightCard
              accent="cyan"
              className="glass flex h-full flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/10 text-cyan">
                    <LuWrench className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold text-on-surface sm:text-[20px]">
                    Tools & Engineering Environments
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((item) => {
                    const isGit = item.toLowerCase().includes("git");
                    const isDb = item.includes("MySQL");
                    return (
                      <span
                        key={item}
                        className={`badge-tag rounded-lg border border-white/[0.06] bg-surface-high/60 px-3 py-1.5 transition-all duration-300 hover:border-cyan/40 hover:scale-105 ${
                          isGit
                            ? "text-cyan font-semibold"
                            : isDb
                            ? "text-tertiary"
                            : "text-on-surface"
                        }`}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>

        {/* System Architecture Domain Distribution Infographic */}
        <Reveal delay={0.2} className="mt-8">
          <SpotlightCard accent="tertiary" className="glass relative overflow-hidden rounded-2xl p-6 sm:p-7">
            {/* Continuous radar ambient sweep */}
            <motion.div
              animate={{ x: ["-100%", "250%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-tertiary/10 to-transparent"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
                  </span>
                  <span className="label-mono text-tertiary">SYSTEM ARCHITECTURE DOMAINS</span>
                </div>
                <h4 className="font-display text-[16px] font-semibold text-on-surface pt-0.5">
                  Engineering Focus & Workload Allocation
                </h4>
              </div>
              <span className="font-mono text-[12px] text-on-surface-variant">Production Backend & Research Profile</span>
            </div>

            {/* Stacked Progress Bar with Continuous Shimmer */}
            <div className="relative h-3 w-full rounded-full bg-surface-high overflow-hidden flex gap-0.5 z-10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="relative h-full bg-primary"
                title="Backend Architecture: 45%"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "25%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                className="relative h-full bg-cyan"
                title="Database & Optimization: 25%"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "20%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4, ease: EASE }}
                className="relative h-full bg-secondary"
                title="Applied AI / ML: 20%"
              />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "10%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: EASE }}
                className="relative h-full bg-tertiary"
                title="DevOps & Tooling: 10%"
              />

              {/* Shimmer light bar looping across all segments */}
              <motion.div
                animate={{ x: ["-100%", "500%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>

            {/* Legend & Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 font-mono text-[12px] relative z-10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-on-surface">Backend & APIs (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <span className="text-on-surface">MySQL & Query Opt (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-on-surface">Applied AI & ML (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-tertiary" />
                <span className="text-on-surface">DevOps & CI/CD (10%)</span>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
