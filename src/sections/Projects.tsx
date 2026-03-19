"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/lib/data";

const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Projects" subtitle="What I've Built" />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center"
          style={{ gap: "6px", marginBottom: "60px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-medium transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-text-muted hover:text-text-muted"
              }`}
              style={{
                padding: "9px 18px",
                fontSize: "13px",
                borderRadius: "10px",
              }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-filter"
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
              <span style={{ position: "relative", zIndex: 10 }}>{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
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
                  {/* Category badge + arrow */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "22px" }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        padding: "5px 12px",
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
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="flex items-center justify-center rounded-full group-hover:border-accent/30 transition-all duration-500"
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <svg
                        className="text-text-muted/70 group-hover:text-accent transition-colors duration-500"
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3
                    className="font-display font-bold text-text group-hover:text-accent transition-colors duration-500"
                    style={{
                      fontSize: "19px",
                      marginBottom: "6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-accent/40 font-mono"
                    style={{
                      fontSize: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className="text-text-muted flex-1"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
                      marginBottom: "24px",
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
                          padding: "4px 10px",
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
    </section>
  );
}
