"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "80px" }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
        className="font-mono uppercase text-accent"
        style={{
          fontSize: "12px",
          letterSpacing: "4px",
          marginBottom: "16px",
          fontWeight: 500,
        }}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0, 1] }}
        className="font-display font-bold text-text"
        style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 60, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
        className="mx-auto rounded-full"
        style={{
          height: "2px",
          marginTop: "24px",
          background:
            "linear-gradient(90deg, var(--color-accent-dark), var(--color-accent-light))",
        }}
      />
    </div>
  );
}
