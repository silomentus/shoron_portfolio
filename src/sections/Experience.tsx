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
                    style={{ gap: "16px", marginBottom: "28px" }}
                  >
                    <div>
                      <h3
                        className="font-display font-bold text-text group-hover:text-accent transition-colors duration-500"
                        style={{
                          fontSize: "26px",
                          marginBottom: "10px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-accent/80 font-medium"
                        style={{ fontSize: "17px", marginBottom: "4px" }}
                      >
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors duration-300"
                            style={{ textDecoration: "none" }}
                          >
                            {exp.company}
                          </a>
                        ) : (
                          exp.company
                        )}
                      </p>
                      <p
                        className="text-text-muted/80"
                        style={{ fontSize: "14px" }}
                      >
                        {exp.department}
                      </p>
                    </div>
                    <div
                      className="flex items-center text-accent/80 font-mono shrink-0"
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

                  <p
                    className="text-text-muted leading-relaxed"
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.8,
                      marginBottom: "28px",
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      marginBottom: "36px",
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
