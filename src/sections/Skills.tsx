"use client";

import { LuCode, LuCpu, LuDatabase, LuWrench } from "react-icons/lu";
import { skills } from "@/lib/data";
import { SectionHeader, SpotlightCard, Stagger, StaggerItem, Tag } from "@/components/ui";

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
      </div>
    </section>
  );
}
