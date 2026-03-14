"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/lib/data";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="group">
      <div
        className="flex justify-between items-center"
        style={{ marginBottom: "10px" }}
      >
        <span
          className="font-medium text-text group-hover:text-accent transition-colors"
          style={{ fontSize: "15px" }}
        >
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="font-mono text-text-muted"
          style={{ fontSize: "13px" }}
        >
          {level}%
        </motion.span>
      </div>
      <div
        className="bg-bg-secondary overflow-hidden"
        style={{ height: "8px", borderRadius: "999px" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent-light"
          style={{ borderRadius: "999px", position: "relative" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </motion.div>
      </div>
    </div>
  );
}

function SkillChip({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: "0 8px 25px rgba(108, 99, 255, 0.15)",
      }}
      className="font-medium bg-bg-card border border-border hover:border-accent/40 hover:text-accent transition-colors cursor-default"
      style={{ padding: "10px 18px", fontSize: "14px", borderRadius: "12px" }}
    >
      {name}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Skills" subtitle="What I Know" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
          }}
          className="md:!grid-cols-2"
        >
          {/* Left: Programming Languages with bars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="font-semibold flex items-center"
              style={{ fontSize: "20px", marginBottom: "28px", gap: "12px" }}
            >
              <span
                className="bg-accent/10 flex items-center justify-center"
                style={{ width: "36px", height: "36px", borderRadius: "10px" }}
              >
                <svg
                  className="text-accent"
                  style={{ width: "18px", height: "18px" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </span>
              Programming Languages
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {skills.languages.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Other skill categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="font-semibold flex items-center"
                style={{ fontSize: "20px", marginBottom: "20px", gap: "12px" }}
              >
                <span
                  className="bg-accent/10 flex items-center justify-center"
                  style={{ width: "36px", height: "36px", borderRadius: "10px" }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </span>
                Backend Development
              </h3>
              <div className="flex flex-wrap" style={{ gap: "10px" }}>
                {skills.backend.map((s, i) => (
                  <SkillChip key={s} name={s} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>

            {/* AI/ML */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3
                className="font-semibold flex items-center"
                style={{ fontSize: "20px", marginBottom: "20px", gap: "12px" }}
              >
                <span
                  className="bg-accent/10 flex items-center justify-center"
                  style={{ width: "36px", height: "36px", borderRadius: "10px" }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                AI & Machine Learning
              </h3>
              <div className="flex flex-wrap" style={{ gap: "10px" }}>
                {skills.aiml.map((s, i) => (
                  <SkillChip key={s} name={s} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3
                className="font-semibold flex items-center"
                style={{ fontSize: "20px", marginBottom: "20px", gap: "12px" }}
              >
                <span
                  className="bg-accent/10 flex items-center justify-center"
                  style={{ width: "36px", height: "36px", borderRadius: "10px" }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap" style={{ gap: "10px" }}>
                {skills.tools.map((s, i) => (
                  <SkillChip key={s} name={s} delay={i * 0.05} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
