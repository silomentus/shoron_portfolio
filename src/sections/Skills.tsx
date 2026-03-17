"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/lib/data";
import {
  DiPhp,
  DiPython,
  DiJavascript1,
  DiJava,
  DiHtml5,
  DiCss3,
} from "react-icons/di";
import {
  SiLaravel,
  SiCplusplus,
  SiTypescript,
} from "react-icons/si";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  php: DiPhp,
  laravel: SiLaravel,
  python: DiPython,
  javascript: DiJavascript1,
  java: DiJava,
  cplusplus: SiCplusplus,
  typescript: SiTypescript,
  html5: DiHtml5,
  css3: DiCss3,
};

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

        {/* Programming Languages icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "48px" }}
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
            className="sm:!grid-cols-5 md:!grid-cols-9"
          >
            {skills.languages.map((lang, i) => {
              const Icon = iconMap[lang.icon];
              return (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{
                    scale: 1.05,
                    y: -6,
                    boxShadow: "0 8px 25px rgba(108, 99, 255, 0.15)",
                  }}
                  className="flex flex-col items-center bg-bg-card border border-border hover:border-accent/40 transition-colors cursor-default group"
                  style={{ padding: "20px 12px", borderRadius: "16px", gap: "10px" }}
                >
                  {Icon && (
                    <Icon
                      className="text-text-muted group-hover:text-accent transition-colors"
                      style={{ width: "36px", height: "36px" }}
                    />
                  )}
                  <span
                    className="font-medium text-text-muted group-hover:text-text transition-colors text-center"
                    style={{ fontSize: "13px" }}
                  >
                    {lang.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Other skill categories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
          }}
          className="md:!grid-cols-3"
        >
          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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

      <style jsx>{`
        @media (min-width: 640px) {
          .sm\\:!grid-cols-5 {
            grid-template-columns: repeat(5, 1fr) !important;
          }
        }
        @media (min-width: 768px) {
          .md\\:!grid-cols-9 {
            grid-template-columns: repeat(9, 1fr) !important;
          }
          .md\\:!grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
