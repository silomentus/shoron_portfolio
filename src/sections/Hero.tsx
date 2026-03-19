"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

function TypeWriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length === currentWord.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <>
      <span className="gradient-text">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-accent inline-block ml-0.5"
        style={{ fontWeight: 300 }}
      >
        |
      </motion.span>
    </>
  );
}

const taglines = [
  "Code it. Ship it. Learn from it.",
  "Clean code over clever code.",
  "Turning caffeine into backend systems.",
  "If it works, make it better.",
  "Building things that matter.",
  "git commit -m 'life'",
  "Ctrl + S your expectations",
];

function RotatingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative font-mono text-text-muted/70 italic"
      style={{ fontSize: "14px", minHeight: "24px" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
        >
          &quot;{taglines[index]}&quot;
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.25, 0.1, 0, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100dvh-60px)] sm:min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-16 sm:pt-20 pb-12 sm:pb-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center rounded-full backdrop-blur-md"
          style={{
            gap: "8px",
            padding: "7px 16px",
            marginBottom: "32px",
            border: "1px solid rgba(26, 26, 37, 0.8)",
            background: "rgba(17, 17, 24, 0.5)",
          }}
        >
          <span
            className="rounded-full bg-emerald-400 animate-pulse shrink-0"
            style={{ width: "6px", height: "6px" }}
          />
          <span
            className="text-text-muted font-mono"
            style={{ fontSize: "12px", letterSpacing: "0.02em" }}
          >
            Open to meaningful opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-display font-extrabold leading-none tracking-tighter"
          style={{ marginBottom: "20px" }}
        >
          <span
            className="block text-text/90"
            style={{
              fontSize: "clamp(18px, 3vw, 24px)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              marginBottom: "12px",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            Hi, I&apos;m
          </span>
          <span
            className="block gradient-text glow-text"
            style={{
              fontSize: "clamp(48px, 8vw, 90px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* Full name */}
        <motion.p
          variants={itemVariants}
          className="text-text-muted/80 font-light tracking-widest uppercase font-mono"
          style={{ fontSize: "16px", marginBottom: "28px" }}
        >
          Md. Harun Or Rashid
        </motion.p>

        {/* TypeWriter roles */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl font-light text-text-muted min-h-[2.5rem] flex items-center justify-center font-display"
          style={{ marginBottom: "8px", letterSpacing: "-0.01em" }}
        >
          <TypeWriter
            words={[
              "Software Engineer",
              "Backend Developer",
              "AI/ML Enthusiast",
              "Problem Solver",
              "Bug Creator & Fixer",
              "Deadline Speedrunner",
              "Code Poet",
              "Overengineering Specialist",
            ]}
          />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className="text-text-muted max-w-xl mx-auto leading-relaxed"
          style={{
            fontSize: "16px",
            marginTop: "28px",
            marginBottom: "44px",
            lineHeight: 1.8,
          }}
        >
          Building scalable backend systems and exploring the frontiers of AI.
          Currently crafting enterprise solutions.
        </motion.p>

        {/* Rotating tagline */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <RotatingTagline />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex short-hide"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="text-text-muted/40 font-mono tracking-[0.2em] uppercase"
            style={{ fontSize: "10px" }}
          >
            Scroll
          </span>
          <div
            className="rounded-full flex justify-center pt-1.5"
            style={{
              width: "18px",
              height: "28px",
              border: "1.5px solid rgba(110, 110, 130, 0.3)",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-full"
              style={{
                width: "3px",
                height: "3px",
                backgroundColor: "var(--color-accent)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
