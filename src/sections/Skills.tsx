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
import { SiLaravel, SiCplusplus, SiTypescript } from "react-icons/si";
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
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
      whileHover={{
        scale: 1.04,
        y: -3,
      }}
      className="font-medium transition-all duration-300 cursor-default"
      style={{
        padding: "10px 18px",
        fontSize: "13px",
        borderRadius: "10px",
        backgroundColor: "rgba(17, 17, 24, 0.6)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text-muted)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(129, 140, 248, 0.3)";
        e.currentTarget.style.color = "var(--color-accent-light)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(129, 140, 248, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-muted)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {name}
    </motion.span>
  );
}

function SkillCategoryIcon({ path }: { path: string }) {
  return (
    <span
      className="flex items-center justify-center shrink-0"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background:
          "linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(167, 139, 250, 0.08))",
      }}
    >
      <svg
        className="text-accent"
        style={{ width: "18px", height: "18px" }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={path}
        />
      </svg>
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Skills" subtitle="What I Know" />

        {/* Programming Languages icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          style={{ marginBottom: "56px" }}
        >
          <h3
            className="font-display font-semibold flex items-center"
            style={{
              fontSize: "18px",
              marginBottom: "28px",
              gap: "12px",
              letterSpacing: "-0.01em",
            }}
          >
            <SkillCategoryIcon path="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            Programming Languages
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
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
                  transition={{
                    delay: i * 0.06,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  className="flex flex-col items-center glass-card-hover cursor-default group"
                  style={{
                    padding: "20px 12px",
                    borderRadius: "14px",
                    gap: "10px",
                  }}
                >
                  {Icon && (
                    <Icon
                      className="text-text-muted/80 group-hover:text-accent transition-colors duration-500"
                      style={{ width: "32px", height: "32px" }}
                    />
                  )}
                  <span
                    className="font-medium text-text-muted/80 group-hover:text-text/80 transition-colors duration-500 text-center"
                    style={{ fontSize: "12px" }}
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
            gap: "48px",
          }}
          className="md:!grid-cols-3"
        >
          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          >
            <h3
              className="font-display font-semibold flex items-center"
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                gap: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              <SkillCategoryIcon path="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
              Backend Development
            </h3>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {skills.backend.map((s, i) => (
                <SkillChip key={s} name={s} delay={i * 0.04} />
              ))}
            </div>
          </motion.div>

          {/* AI/ML */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0, 1],
            }}
          >
            <h3
              className="font-display font-semibold flex items-center"
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                gap: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              <SkillCategoryIcon path="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              AI & Machine Learning
            </h3>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {skills.aiml.map((s, i) => (
                <SkillChip key={s} name={s} delay={i * 0.04} />
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0, 1],
            }}
          >
            <h3
              className="font-display font-semibold flex items-center"
              style={{
                fontSize: "18px",
                marginBottom: "20px",
                gap: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              <SkillCategoryIcon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap" style={{ gap: "8px" }}>
              {skills.tools.map((s, i) => (
                <SkillChip key={s} name={s} delay={i * 0.04} />
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
