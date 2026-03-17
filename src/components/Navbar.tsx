"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div
          className="w-full mx-auto flex items-center justify-center relative"
          style={{ padding: "16px 24px", maxWidth: "1440px" }}
        >
          {/* Desktop nav — always centered on screen */}
          <div className="hidden md:flex items-center fixed left-1/2 -translate-x-1/2 top-5" style={{ zIndex: 50 }}>
            <div
              className="flex items-center bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-full"
              style={{ padding: "5px 6px", gap: "2px" }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative inline-block whitespace-nowrap font-medium transition-colors duration-300 rounded-full ${
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                    style={{ padding: "10px 22px", fontSize: "14px" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-accent/25 border border-accent/40 rounded-full"
                        style={{
                          boxShadow: "0 0 12px rgba(108, 99, 255, 0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CTA button — fixed to top right */}
          <a
            href="#contact"
            className="hidden md:inline-flex bg-accent hover:bg-accent-light text-white font-semibold rounded-full transition-colors duration-300 shrink-0 fixed top-4 right-8"
            style={{ padding: "10px 24px", fontSize: "14px", zIndex: 50 }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile toggle — pinned to the right */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col p-3 absolute right-6"
            style={{ gap: "6px" }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block bg-text rounded-full"
              style={{ width: "24px", height: "2px" }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block bg-text rounded-full"
              style={{ width: "24px", height: "2px" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block bg-text rounded-full"
              style={{ width: "24px", height: "2px" }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
            style={{ paddingTop: "100px", paddingLeft: "32px", paddingRight: "32px" }}
          >
            <ul className="flex flex-col" style={{ gap: "24px" }}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-bold transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "text-accent"
                        : "text-text hover:text-accent"
                    }`}
                    style={{ fontSize: "32px" }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
