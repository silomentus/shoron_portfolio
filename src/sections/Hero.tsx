"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/MagneticButton";
import { personalInfo } from "@/lib/data";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

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
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <>
      <span className="gradient-text">{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-accent inline-block ml-0.5"
      >
        |
      </motion.span>
    </>
  );
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-light/15 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center rounded-full border border-border bg-bg-card/50 backdrop-blur-sm whitespace-nowrap"
          style={{ gap: "10px", padding: "10px 20px", marginBottom: "32px" }}
        >
          <span className="rounded-full bg-green-500 animate-pulse shrink-0" style={{ width: "8px", height: "8px" }} />
          <span className="text-text-muted font-mono" style={{ fontSize: "14px" }}>
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-6"
        >
          <span className="block text-text">Hi, I&apos;m</span>
          <span className="block gradient-text glow-text mt-2">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl font-light text-text-muted mb-6 min-h-[2.5rem] flex items-center justify-center"
        >
          <TypeWriter
            words={[
              "Software Engineer",
              "Backend Developer",
              "AI/ML Enthusiast",
              "Problem Solver",
            ]}
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-text-muted max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ marginTop: "24px", marginBottom: "48px" }}
        >
          Building scalable backend systems and exploring the frontiers of AI.
          Currently crafting enterprise solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <MagneticButton
            href="#projects"
            className="bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent/25 transition-all duration-300"
            style={{ padding: "14px 32px", fontSize: "15px" }}
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="border border-white/20 text-text font-semibold rounded-full hover:border-accent hover:text-accent transition-colors duration-300 bg-white/[0.05] backdrop-blur-sm"
            style={{ padding: "14px 32px", fontSize: "15px" }}
          >
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — pinned to bottom of section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs font-mono tracking-widest">
            SCROLL
          </span>
          <div className="w-5 h-8 border-2 border-text-muted rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
