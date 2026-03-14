"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <SectionHeading title="Experience" subtitle="Where I've Worked" />

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div
                className="bg-bg-card/50 border border-border hover:border-accent/30 transition-all duration-500 backdrop-blur-sm overflow-hidden"
                style={{ position: "relative", padding: "40px", borderRadius: "20px" }}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div style={{ position: "relative", zIndex: 10 }}>
                  {/* Header */}
                  <div
                    className="flex flex-col md:flex-row md:items-start md:justify-between"
                    style={{ gap: "16px", marginBottom: "24px" }}
                  >
                    <div>
                      <h3
                        className="font-bold text-text group-hover:text-accent transition-colors"
                        style={{ fontSize: "28px", marginBottom: "8px" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-accent font-medium"
                        style={{ fontSize: "18px", marginBottom: "4px" }}
                      >
                        {exp.company}
                      </p>
                      <p className="text-text-muted" style={{ fontSize: "14px" }}>
                        {exp.department}
                      </p>
                    </div>
                    <div
                      className="flex items-center bg-accent/10 border border-accent/20 text-accent font-mono shrink-0"
                      style={{ gap: "8px", padding: "8px 16px", borderRadius: "999px", fontSize: "14px" }}
                    >
                      <span
                        className="bg-green-500 animate-pulse rounded-full"
                        style={{ width: "8px", height: "8px" }}
                      />
                      {exp.duration}
                    </div>
                  </div>

                  <p
                    className="text-text-muted leading-relaxed"
                    style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "28px" }}
                  >
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                        className="flex items-start text-text-muted"
                        style={{ gap: "12px" }}
                      >
                        <span
                          className="bg-accent rounded-full shrink-0"
                          style={{ width: "6px", height: "6px", marginTop: "8px" }}
                        />
                        <span style={{ fontSize: "15px", lineHeight: "1.6" }}>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap" style={{ gap: "10px" }}>
                    {exp.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="font-mono bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors cursor-default"
                        style={{ padding: "8px 16px", fontSize: "13px", borderRadius: "10px" }}
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
