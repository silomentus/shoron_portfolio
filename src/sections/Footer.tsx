"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border" style={{ width: "100%" }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-text-muted text-sm"
        style={{ textAlign: "center", width: "100%" }}
      >
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-accent">Shoron</span>. All rights
        reserved.
      </motion.p>
    </footer>
  );
}
