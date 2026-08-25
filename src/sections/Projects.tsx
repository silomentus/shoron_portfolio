"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { industryProjects, academicProjects } from "@/lib/data";

const academicCategories = [
  "All",
  ...Array.from(new Set(academicProjects.map((p) => p.category))),
];

export default function Projects() {
  const [academicCategory, setAcademicCategory] = useState("All");

  const filteredAcademic =
    academicCategory === "All"
      ? academicProjects
      : academicProjects.filter((p) => p.category === academicCategory);

  return (
    <section id="projects" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Projects" subtitle="What I've Built" />

        {/* ═══════════════════════════════════════════
            TIER 1: INDUSTRY & ENTERPRISE PROJECTS
            ═══════════════════════════════════════════ */}
        <div style={{ marginBottom: "70px" }}>
          {/* Section Divider / Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "32px" }}
          >
            <span
              className="inline-flex items-center font-mono"
              style={{
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "12px",
                background: "rgba(129, 140, 248, 0.08)",
                border: "1px solid rgba(129, 140, 248, 0.2)",
                color: "var(--color-accent-light)",
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="rounded-full bg-emerald-400 animate-pulse"
                style={{ width: "6px", height: "6px" }}
              />
              Industry & Enterprise Systems
            </span>
            <div
              className="flex-1"
              style={{ height: "1px", background: "rgba(255, 255, 255, 0.06)" }}
            />
          </motion.div>

          {/* Enterprise Projects 2x2 Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {industryProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0, 1],
                }}
                whileHover={{ y: -6 }}
                className="group"
                style={{ position: "relative" }}
              >
                <div
                  className="h-full glass-card-hover flex flex-col"
                  style={{
                    padding: "32px",
                    borderRadius: "20px",
                    border: "1px solid rgba(129, 140, 248, 0.12)",
                    background: "rgba(17, 17, 24, 0.65)",
                  }}
                >
                  {/* Category & Badge */}
                  <div
                    className="flex items-center justify-between"
                    style={{ gap: "10px", marginBottom: "20px" }}
                  >
                    <span
                      className="font-mono whitespace-nowrap"
                      style={{
                        padding: "5px 12px",
                        fontSize: "11px",
                        borderRadius: "6px",
                        background: "rgba(129, 140, 248, 0.1)",
                        color: "var(--color-accent-light)",
                        border: "1px solid rgba(129, 140, 248, 0.15)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {project.category}
                    </span>

                    <span
                      className="inline-flex items-center font-mono text-emerald-400/90 whitespace-nowrap"
                      style={{ gap: "6px", fontSize: "11px" }}
                    >
                      <span
                        className="rounded-full bg-emerald-400 animate-pulse"
                        style={{ width: "5px", height: "5px" }}
                      />
                      Enterprise
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="font-display font-bold text-text group-hover:text-accent transition-colors duration-300"
                    style={{
                      fontSize: "20px",
                      marginBottom: "6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="font-mono text-accent/70"
                    style={{
                      fontSize: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className="text-text-muted flex-1"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
                      marginBottom: "26px",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap" style={{ gap: "6px" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono"
                        style={{
                          padding: "5px 11px",
                          fontSize: "11px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(12, 12, 17, 0.8)",
                          border: "1px solid rgba(129, 140, 248, 0.12)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            TIER 2: ACADEMIC & RESEARCH PROJECTS
            ═══════════════════════════════════════════ */}
        <div>
          {/* Section Divider / Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "28px" }}
          >
            <span
              className="inline-flex items-center font-mono text-text-muted/80"
              style={{
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "12px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                letterSpacing: "0.02em",
              }}
            >
              Academic Research & Engineering
            </span>
            <div
              className="flex-1"
              style={{ height: "1px", background: "rgba(255, 255, 255, 0.06)" }}
            />
          </motion.div>

          {/* Academic Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center"
            style={{ gap: "6px", marginBottom: "40px" }}
          >
            {academicCategories.map((cat) => {
              const count =
                cat === "All"
                  ? academicProjects.length
                  : academicProjects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setAcademicCategory(cat)}
                  className={`relative font-medium transition-colors duration-300 ${
                    academicCategory === cat
                      ? "text-white"
                      : "text-text-muted hover:text-text"
                  }`}
                  style={{
                    padding: "8px 16px",
                    fontSize: "12px",
                    borderRadius: "10px",
                  }}
                >
                  {academicCategory === cat && (
                    <motion.div
                      layoutId="active-academic-filter"
                      className="absolute inset-0"
                      style={{
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))",
                        boxShadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{cat}</span>
                    <span
                      className="font-mono text-[10px]"
                      style={{
                        padding: "1px 6px",
                        borderRadius: "999px",
                        background:
                          academicCategory === cat
                            ? "rgba(255, 255, 255, 0.22)"
                            : "rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Academic Project Grid */}
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredAcademic.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
                  whileHover={{ y: -6 }}
                  className="group"
                  style={{ position: "relative" }}
                >
                  <div
                    className="h-full glass-card-hover flex flex-col"
                    style={{ padding: "28px", borderRadius: "18px" }}
                  >
                    {/* Category badge */}
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: "18px" }}
                    >
                      <span
                        className="font-mono whitespace-nowrap"
                        style={{
                          padding: "4px 10px",
                          fontSize: "11px",
                          borderRadius: "6px",
                          background: "rgba(129, 140, 248, 0.08)",
                          color: "var(--color-accent-light)",
                          border: "1px solid rgba(129, 140, 248, 0.1)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <h3
                      className="font-display font-bold text-text group-hover:text-accent transition-colors duration-500"
                      style={{
                        fontSize: "18px",
                        marginBottom: "4px",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-text-muted/60 font-mono"
                      style={{
                        fontSize: "11px",
                        marginBottom: "12px",
                      }}
                    >
                      {project.subtitle}
                    </p>
                    <p
                      className="text-text-muted flex-1"
                      style={{
                        fontSize: "13.5px",
                        lineHeight: 1.7,
                        marginBottom: "22px",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech */}
                    <div className="flex flex-wrap" style={{ gap: "6px" }}>
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-text-muted/50"
                          style={{
                            padding: "4px 9px",
                            fontSize: "11px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(12, 12, 17, 0.8)",
                            border: "1px solid var(--color-border)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
