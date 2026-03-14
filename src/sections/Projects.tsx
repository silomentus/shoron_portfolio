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
    <section id="projects" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Projects" subtitle="What I've Built" />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center"
          style={{ gap: "8px", marginBottom: "56px" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-medium transition-colors duration-300 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-text-muted hover:text-text"
              }`}
              style={{ padding: "10px 20px", fontSize: "14px", borderRadius: "12px" }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-filter"
                  className="absolute inset-0 bg-accent"
                  style={{ borderRadius: "12px" }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
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
            gap: "24px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group"
                style={{ position: "relative" }}
              >
                <div
                  className="h-full bg-bg-card border border-border hover:border-accent/30 transition-all duration-500 flex flex-col"
                  style={{ padding: "28px", borderRadius: "20px" }}
                >
                  {/* Category badge + arrow */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "20px" }}
                  >
                    <span
                      className="font-mono bg-accent/10 text-accent"
                      style={{ padding: "6px 14px", fontSize: "12px", borderRadius: "999px" }}
                    >
                      {project.category}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="border border-border flex items-center justify-center group-hover:border-accent/50 transition-colors rounded-full"
                      style={{ width: "36px", height: "36px" }}
                    >
                      <svg
                        className="text-text-muted group-hover:text-accent transition-colors"
                        style={{ width: "14px", height: "14px" }}
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
                    className="font-bold text-text group-hover:text-accent transition-colors"
                    style={{ fontSize: "20px", marginBottom: "6px" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-accent/60 font-mono"
                    style={{ fontSize: "13px", marginBottom: "14px" }}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className="text-text-muted flex-1"
                    style={{ fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap" style={{ gap: "8px" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono bg-bg-secondary text-text-muted border border-border"
                        style={{ padding: "5px 10px", fontSize: "11px", borderRadius: "8px" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
