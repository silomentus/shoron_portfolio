"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <SectionHeading title="Experience" subtitle="Where I've Worked" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0, 1],
              }}
              className="group"
            >
              <div
                className="glass-card-hover overflow-hidden"
                style={{
                  position: "relative",
                  padding: "44px",
                  borderRadius: "20px",
                }}
              >
                {/* Subtle gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 20%, rgba(129, 140, 248, 0.04) 0%, transparent 60%)",
                  }}
                />

                <div style={{ position: "relative", zIndex: 10 }}>
                  {/* Header */}
                  <div
                    className="flex flex-col md:flex-row md:items-start md:justify-between"
                    style={{ gap: "16px", marginBottom: "24px" }}
                  >
                    <div>
                      <h3
                        className="font-display font-bold text-text"
                        style={{
                          fontSize: "26px",
                          marginBottom: "6px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {exp.role}
                      </h3>

                      {/* Company & Department inline */}
                      <div
                        className="flex flex-wrap items-center"
                        style={{ gap: "10px", marginBottom: "6px" }}
                      >
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-accent hover:text-accent-light font-semibold group/link transition-colors duration-200"
                            style={{ fontSize: "17px", textDecoration: "none" }}
                          >
                            <span>{exp.company}</span>
                            <svg
                              className="w-3.5 h-3.5 opacity-75 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.2}
                                d="M7 17L17 7M17 7H7M17 7V17"
                              />
                            </svg>
                          </a>
                        ) : (
                          <span className="font-semibold text-accent" style={{ fontSize: "17px" }}>
                            {exp.company}
                          </span>
                        )}

                        <span className="text-text-muted/40">•</span>

                        <span
                          className="text-text-muted/90 font-mono"
                          style={{ fontSize: "13px" }}
                        >
                          {exp.department}
                        </span>
                      </div>

                      {/* Portfolio Company Badge */}
                      {"parentCompany" in exp && exp.parentCompany && (
                        <div
                          className="text-text-muted/70 font-mono flex items-center flex-wrap"
                          style={{ fontSize: "12px", gap: "6px" }}
                        >
                          <span>A Portfolio Company of</span>
                          <a
                            href={exp.parentCompany.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-accent/90 hover:text-accent-light underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors font-medium"
                          >
                            <span>{exp.parentCompany.name}</span>
                            <svg
                              className="w-2.5 h-2.5 opacity-60"
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
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Duration Badge */}
                    <div
                      className="flex items-center text-accent/80 font-mono shrink-0 self-start"
                      style={{
                        gap: "8px",
                        padding: "8px 18px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        background:
                          "linear-gradient(135deg, rgba(129, 140, 248, 0.08), rgba(167, 139, 250, 0.04))",
                        border: "1px solid rgba(129, 140, 248, 0.12)",
                      }}
                    >
                      <span
                        className="bg-emerald-400 animate-pulse rounded-full"
                        style={{ width: "6px", height: "6px" }}
                      />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Company Overview Callout */}
                  <div
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderLeft: "3px solid var(--color-accent)",
                      marginBottom: "28px",
                    }}
                  >
                    <p
                      className="text-text-muted leading-relaxed"
                      style={{ fontSize: "14px", lineHeight: 1.7 }}
                    >
                      {exp.description}
                    </p>
                  </div>

                  {/* Contributions Section Label */}
                  <div
                    className="flex items-center"
                    style={{ gap: "12px", marginBottom: "18px" }}
                  >
                    <span
                      className="font-mono uppercase text-text-muted/60"
                      style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                    >
                      Key Contributions & Work
                    </span>
                    <div
                      className="flex-1"
                      style={{ height: "1px", background: "rgba(255, 255, 255, 0.06)" }}
                    />
                  </div>

                  {/* Responsibilities */}
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "32px",
                    }}
                  >
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.08 * i,
                          duration: 0.5,
                          ease: [0.25, 0.1, 0, 1],
                        }}
                        className="flex items-start text-text-muted"
                        style={{ gap: "14px" }}
                      >
                        <span
                          className="rounded-full shrink-0"
                          style={{
                            width: "5px",
                            height: "5px",
                            marginTop: "8px",
                            backgroundColor: "var(--color-accent)",
                            opacity: 0.6,
                          }}
                        />
                        <span style={{ fontSize: "14px", lineHeight: 1.7 }}>
                          {resp}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap" style={{ gap: "8px" }}>
                    {exp.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.04, y: -2 }}
                        className="font-mono transition-all duration-300 cursor-default"
                        style={{
                          padding: "7px 14px",
                          fontSize: "12px",
                          borderRadius: "8px",
                          background:
                            "linear-gradient(135deg, rgba(129, 140, 248, 0.1), rgba(129, 140, 248, 0.04))",
                          border: "1px solid rgba(129, 140, 248, 0.12)",
                          color: "var(--color-accent-light)",
                        }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
