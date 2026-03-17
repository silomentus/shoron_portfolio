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
    <section id="about" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="About Me" subtitle="Who I Am" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
          }}
          className="md:!grid-cols-2"
        >
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-text-muted leading-relaxed"
              style={{ fontSize: "17px", lineHeight: "1.8", marginBottom: "24px" }}
            >
              {personalInfo.summary.split("North South University")[0]}
              <a
                href="https://www.northsouth.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                North South University
              </a>
              {personalInfo.summary.split("North South University")[1]}
            </p>
            <p
              className="text-text-muted leading-relaxed"
              style={{ fontSize: "17px", lineHeight: "1.8", marginBottom: "40px" }}
            >
              My academic experience built a strong foundation in artificial intelligence, machine learning, and software engineering. I enjoy solving complex problems and turning ideas into efficient, well-structured systems.
            </p>

            {/* Stats */}
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
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-bg-card border border-border hover:border-accent/30 transition-colors group"
                  style={{ padding: "24px", borderRadius: "16px" }}
                >
                  <div
                    className="font-bold text-accent"
                    style={{ fontSize: "32px", marginBottom: "4px" }}
                  >
                    <CountUp target={stat.value} />
                    {stat.suffix}
                  </div>
                  <div
                    className="text-text-muted"
                    style={{ fontSize: "14px" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Education */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
              </span>
              Education
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="border-l-2 border-border hover:border-accent/50 transition-colors group"
                  style={{ position: "relative", paddingLeft: "28px" }}
                >
                  <div
                    className="absolute bg-bg border-2 border-border group-hover:border-accent group-hover:bg-accent/20 transition-colors rounded-full"
                    style={{ left: "-7px", top: "2px", width: "12px", height: "12px" }}
                  />
                  <div
                    className="font-mono text-accent"
                    style={{ fontSize: "13px", marginBottom: "6px" }}
                  >
                    {edu.duration}
                  </div>
                  <h4
                    className="font-semibold text-text"
                    style={{ fontSize: "18px", marginBottom: "4px" }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="text-text-muted"
                    style={{ fontSize: "15px", marginBottom: "4px" }}
                  >
                    {edu.institution}
                  </p>
                  <a
                    href="#contact"
                    className="text-accent/80 hover:text-accent font-mono transition-colors duration-300"
                    style={{ fontSize: "14px", textDecoration: "none", cursor: "pointer" }}
                  >
                    {edu.result}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-gradient-to-br from-accent/5 to-accent-light/5 border border-accent/10"
              style={{ marginTop: "32px", padding: "28px", borderRadius: "16px" }}
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
                  <span className="text-text-muted" style={{ display: "block", marginBottom: "4px" }}>
                    Location
                  </span>
                  <p className="text-text font-medium">{personalInfo.location}</p>
                </div>
                <div>
                  <span className="text-text-muted" style={{ display: "block", marginBottom: "4px" }}>
                    Email
                  </span>
                  <p className="text-accent font-medium" style={{ wordBreak: "break-all", fontSize: "13px" }}>
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
