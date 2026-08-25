"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = atob("c2lsb21lbnR1c0BnbWFpbC5jb20=");
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer style={{ width: "100%", marginTop: "60px" }}>
      {/* Section divider */}
      <div className="section-divider" />
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ padding: "48px 24px 36px", gap: "16px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center font-mono font-bold tracking-wider"
          style={{ fontSize: "15px", gap: "8px", color: "var(--color-text)" }}
        >
          <span
            className="rounded-full bg-emerald-400"
            style={{
              width: "6px",
              height: "6px",
              boxShadow: "0 0 8px rgba(52, 211, 153, 0.8)",
            }}
          />
          <span className="flex items-center">
            <span className="text-accent font-light mr-0.5">&lt;</span>
            <span className="tracking-widest">SHORON</span>
            <span className="text-accent font-light ml-0.5">/&gt;</span>
          </span>
        </motion.div>

        {/* Quick Social Links */}
        <div className="flex items-center gap-6 font-mono text-xs text-text-muted/70">
          <a
            href="https://github.com/silomentus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/md-harun-or-rashid-shoron/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="hover:text-accent transition-colors cursor-pointer"
            title="Click to copy email"
          >
            {copied ? (
              <span className="text-emerald-400">Copied! ✓</span>
            ) : (
              "Email ↗"
            )}
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-muted/50 font-mono"
          style={{
            fontSize: "11px",
            letterSpacing: "0.02em",
            marginTop: "6px",
          }}
        >
          &copy; {new Date().getFullYear()} Md. Harun Or Rashid (Shoron). Designed &amp; Engineered with Next.js, Tailwind &amp; Three.js.
        </motion.p>
      </div>
    </footer>
  );
}
