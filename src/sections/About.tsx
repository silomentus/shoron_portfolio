"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/SectionHeading";
import { personalInfo, education } from "@/lib/data";

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const stepTime = 2000 / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, inView]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { label: "Projects Built", value: 7, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Years Learning", value: 4, suffix: "+" },
  { label: "Year Experience", value: 1, suffix: "+" },
];

export default function About() {
  return (
    <section id="about" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "72px",
          }}
          className="md:!grid-cols-2"
        >
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          >
            <p
              className="text-text-muted leading-relaxed"
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              {personalInfo.summary.split("North South University")[0]}
              <a
                href="https://www.northsouth.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-light transition-colors duration-300"
                style={{ textDecoration: "none", borderBottom: "1px solid var(--color-accent-dark)" }}
              >
                North South University
              </a>
              {personalInfo.summary.split("North South University")[1]}
            </p>
            <p
              className="text-text-muted leading-relaxed"
              style={{
                fontSize: "16px",
                lineHeight: 1.9,
                marginBottom: "48px",
              }}
            >
              My academic experience built a strong foundation in artificial
              intelligence, machine learning, and software engineering. I enjoy
              solving complex problems and turning ideas into efficient,
              well-structured systems.
            </p>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                  className="glass-card-hover group"
                  style={{ padding: "28px 24px", borderRadius: "16px" }}
                >
                  <div
                    className="font-display font-bold text-accent"
                    style={{
                      fontSize: "36px",
                      marginBottom: "4px",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <CountUp target={stat.value} />
                    <span className="text-accent-light">{stat.suffix}</span>
                  </div>
                  <div
                    className="text-text-muted"
                    style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          >
            <h3
              className="font-display font-semibold flex items-center"
              style={{
                fontSize: "20px",
                marginBottom: "32px",
                gap: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              <span
                className="flex items-center justify-center"
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
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </span>
              Education
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                  className="group"
                  style={{
                    position: "relative",
                    paddingLeft: "28px",
                    borderLeft: "1px solid var(--color-border)",
                    transition: "border-color 0.5s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderLeftColor =
                      "rgba(129, 140, 248, 0.4)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderLeftColor =
                      "var(--color-border)")
                  }
                >
                  <div
                    className="absolute rounded-full transition-all duration-500"
                    style={{
                      left: "-5px",
                      top: "4px",
                      width: "9px",
                      height: "9px",
                      backgroundColor: "var(--color-bg)",
                      border: "2px solid var(--color-border)",
                    }}
                  />
                  <div
                    className="font-mono text-accent/70"
                    style={{
                      fontSize: "12px",
                      marginBottom: "8px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {edu.duration}
                  </div>
                  <h4
                    className="font-display font-semibold text-text"
                    style={{
                      fontSize: "16px",
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="text-text-muted"
                    style={{ fontSize: "14px", marginBottom: "6px" }}
                  >
                    {edu.institution}
                  </p>
                  <a
                    href="#contact"
                    className="text-accent/60 hover:text-accent font-mono transition-colors duration-300"
                    style={{ fontSize: "13px", textDecoration: "none" }}
                  >
                    {edu.result}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card"
              style={{
                marginTop: "36px",
                padding: "28px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  fontSize: "14px",
                }}
              >
                <div>
                  <span
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Location
                  </span>
                  <p className="text-text font-medium">
                    {personalInfo.location}
                  </p>
                </div>
                <div>
                  <span
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Email
                  </span>
                  <p
                    className="text-accent font-medium"
                    style={{ wordBreak: "break-all", fontSize: "13px" }}
                  >
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
