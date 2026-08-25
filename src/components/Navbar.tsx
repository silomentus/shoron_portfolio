"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function Navbar({
  onPlayGame,
  onRequestCV,
}: {
  onPlayGame?: () => void;
  onRequestCV?: () => void;
}) {
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
          {/* Desktop Left Brand Monogram */}
          <a
            href="#home"
            className="hidden md:flex items-center font-mono font-bold tracking-wider hover:opacity-80 transition-opacity shrink-0 fixed top-6 left-8 group"
            style={{
              zIndex: 50,
              gap: "8px",
              fontSize: "14px",
              color: "var(--color-text)",
              textDecoration: "none",
            }}
          >
            <span
              className="rounded-full bg-emerald-400 shrink-0"
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
          </a>

          {/* Desktop nav — centered developer dock */}
          <div
            className="hidden md:flex items-center fixed left-1/2 -translate-x-1/2 top-5"
            style={{ zIndex: 50 }}
          >
            <div
              className="flex items-center backdrop-blur-2xl rounded-full"
              style={{
                padding: "4px 6px",
                gap: "2px",
                backgroundColor: "rgba(10, 10, 15, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              }}
            >
              {navLinks.map((link, idx) => {
                const isActive =
                  activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative inline-flex items-center whitespace-nowrap font-mono transition-all duration-300 rounded-full ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-text-muted/60 hover:text-text hover:bg-white/[0.03]"
                    }`}
                    style={{
                      padding: "8px 16px",
                      fontSize: "12px",
                      letterSpacing: "0.02em",
                      textDecoration: "none",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "rgba(255, 255, 255, 0.07)",
                          border: "1px solid rgba(129, 140, 248, 0.25)",
                          boxShadow: "0 0 16px rgba(129, 140, 248, 0.1)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center" style={{ gap: "6px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          color: isActive ? "var(--color-accent)" : "rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        0{idx + 1}.
                      </span>
                      <span>{link.name}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Actions (CV + Game) */}
          <div
            className="hidden md:flex items-center fixed top-5 right-8"
            style={{ zIndex: 50, gap: "10px" }}
          >
            {onRequestCV && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRequestCV}
                className="inline-flex items-center font-mono rounded-full transition-all duration-300 backdrop-blur-xl border border-accent/20 hover:border-accent/50 bg-accent/[0.08] hover:bg-accent/15 text-accent-light hover:text-white cursor-pointer"
                style={{
                  padding: "7px 14px",
                  fontSize: "12px",
                  gap: "6px",
                  boxShadow: "0 4px 16px rgba(99, 102, 241, 0.15)",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Request CV</span>
              </motion.button>
            )}

            {onPlayGame && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onPlayGame}
                className="inline-flex items-center font-mono rounded-full transition-all duration-300 backdrop-blur-xl border border-white/[0.08] hover:border-accent/40 bg-white/[0.03] hover:bg-accent/10 text-text-muted hover:text-text cursor-pointer"
                style={{
                  padding: "7px 13px",
                  fontSize: "12px",
                  gap: "6px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <rect x="2" y="6" width="20" height="12" rx="3" />
                  <line x1="6" y1="10" x2="6" y2="14" />
                  <line x1="4" y1="12" x2="8" y2="12" />
                  <circle cx="16" cy="10" r="1" fill="currentColor" />
                  <circle cx="19" cy="12" r="1" fill="currentColor" />
                </svg>
                <span>Play</span>
              </motion.button>
            )}
          </div>

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

              {/* Request CV — mobile menu */}
              {onRequestCV && (
                <motion.li
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: navLinks.length * 0.08,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onRequestCV();
                    }}
                    className="flex items-center font-display font-semibold text-accent hover:text-accent-light transition-colors py-3 cursor-pointer"
                    style={{
                      fontSize: "32px",
                      letterSpacing: "-0.02em",
                      gap: "14px",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Request CV
                  </button>
                </motion.li>
              )}

              {/* Play Game — mobile menu */}
              {onPlayGame && (
                <motion.li
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: (navLinks.length + 1) * 0.08,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onPlayGame();
                    }}
                    className="flex items-center font-display font-semibold text-accent/70 hover:text-accent transition-colors py-3 cursor-pointer"
                    style={{
                      fontSize: "32px",
                      letterSpacing: "-0.02em",
                      gap: "14px",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="3" />
                      <line x1="6" y1="10" x2="6" y2="14" />
                      <line x1="4" y1="12" x2="8" y2="12" />
                      <circle cx="16" cy="10" r="1" fill="currentColor" />
                      <circle cx="19" cy="12" r="1" fill="currentColor" />
                    </svg>
                    Play
                  </button>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
