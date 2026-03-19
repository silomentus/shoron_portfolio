"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer style={{ width: "100%" }}>
      {/* Section divider */}
      <div className="section-divider" />
      <div style={{ padding: "32px 24px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-muted/70 font-mono"
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "12px",
            letterSpacing: "0.02em",
          }}
        >
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-accent/80">Shoron</span>. All rights
          reserved.
        </motion.p>
      </div>
    </footer>
  );
}
