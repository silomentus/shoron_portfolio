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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-bg/60 backdrop-blur-2xl shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div
          className="w-full mx-auto flex items-center justify-center relative"
          style={{ padding: "16px 24px", maxWidth: "1440px" }}
        >
          {/* Desktop nav — centered pill */}
          <div
            className="hidden md:flex items-center fixed left-1/2 -translate-x-1/2 top-5"
            style={{ zIndex: 50 }}
          >
            <div
              className="flex items-center backdrop-blur-xl border rounded-full"
              style={{
                padding: "4px 5px",
                gap: "1px",
                backgroundColor: "rgba(12, 12, 17, 0.7)",
                borderColor: "rgba(26, 26, 37, 0.6)",
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative inline-block whitespace-nowrap font-medium transition-colors duration-300 rounded-full ${
                      isActive
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    }`}
                    style={{
                      padding: "9px 20px",
                      fontSize: "13px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(129, 140, 248, 0.2), rgba(167, 139, 250, 0.12))",
                          border: "1px solid rgba(129, 140, 248, 0.25)",
                          boxShadow:
                            "0 0 20px rgba(129, 140, 248, 0.1), inset 0 0 20px rgba(129, 140, 248, 0.05)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
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

          {/* CTA button — top right */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex text-white font-medium rounded-full transition-all duration-300 shrink-0 fixed top-4 right-8"
            style={{
              padding: "9px 22px",
              fontSize: "13px",
              zIndex: 50,
              background:
                "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))",
              boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
            }}
          >
            Let&apos;s Talk
          </motion.a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col p-3 absolute right-6"
            style={{ gap: "6px" }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
              }
              className="block rounded-full"
              style={{
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-text)",
              }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block rounded-full"
              style={{
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-text)",
              }}
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0 }
              }
              className="block rounded-full"
              style={{
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-text)",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              backgroundColor: "rgba(6, 6, 8, 0.97)",
              backdropFilter: "blur(30px)",
              paddingTop: "100px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            <ul
              className="flex flex-col"
              style={{ gap: "8px" }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.08,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-display font-semibold transition-colors py-3 ${
                      activeSection === link.href.replace("#", "")
                        ? "text-accent"
                        : "text-text/60 hover:text-accent"
                    }`}
                    style={{ fontSize: "36px", letterSpacing: "-0.02em" }}
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
