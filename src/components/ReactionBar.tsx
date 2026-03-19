"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REACTIONS = [
  { emoji: "🚀", label: "Rocket" },
  { emoji: "❤️", label: "Love" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "⭐", label: "Star" },
  { emoji: "👏", label: "Clap" },
  { emoji: "😂", label: "Laugh" },
];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  drift: number;
}

let emojiId = 0;

export default function ReactionBar() {
  const [open, setOpen] = useState(false);
  const [floaters, setFloaters] = useState<FloatingEmoji[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnEmojis = useCallback((emoji: string) => {
    const count = 6 + Math.floor(Math.random() * 5);
    const newFloaters: FloatingEmoji[] = [];

    for (let i = 0; i < count; i++) {
      newFloaters.push({
        id: emojiId++,
        emoji,
        x: Math.random() * 120 - 60,
        y: 0,
        rotation: Math.random() * 360 - 180,
        scale: 0.6 + Math.random() * 0.8,
        drift: Math.random() * 80 - 40,
      });
    }

    setFloaters((prev) => [...prev, ...newFloaters]);

    // Clean up after animation
    setTimeout(() => {
      setFloaters((prev) =>
        prev.filter((f) => !newFloaters.find((n) => n.id === f.id))
      );
    }, 2500);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed z-[90]"
      style={{ bottom: "24px", right: "24px" }}
    >
      {/* Floating emojis */}
      <AnimatePresence>
        {floaters.map((f) => (
          <motion.div
            key={f.id}
            initial={{
              opacity: 1,
              y: 0,
              x: f.x * 0.3,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              y: -200 - Math.random() * 150,
              x: f.x + f.drift,
              scale: f.scale,
              rotate: f.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8 + Math.random() * 0.8,
              ease: "easeOut",
            }}
            className="absolute pointer-events-none"
            style={{
              bottom: "60px",
              right: "20px",
              fontSize: "28px",
            }}
          >
            {f.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Reaction emoji buttons */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0, 1] }}
            className="absolute flex flex-col gap-1"
            style={{
              bottom: "56px",
              right: "0px",
            }}
          >
            <div
              className="flex flex-col gap-1 p-2"
              style={{
                background: "rgba(17, 17, 24, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(26, 26, 37, 0.8)",
                borderRadius: "16px",
              }}
            >
              {REACTIONS.map((r) => (
                <motion.button
                  key={r.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => spawnEmojis(r.emoji)}
                  className="transition-transform"
                  style={{
                    fontSize: "24px",
                    padding: "6px 8px",
                    background: "none",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  title={r.label}
                >
                  {r.emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className="relative"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: open
            ? "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))"
            : "rgba(17, 17, 24, 0.8)",
          border: open
            ? "1px solid rgba(129, 140, 248, 0.4)"
            : "1px solid rgba(26, 26, 37, 0.8)",
          backdropFilter: "blur(20px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          boxShadow: open
            ? "0 4px 24px rgba(99, 102, 241, 0.3)"
            : "0 4px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s",
        }}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {open ? "✕" : "😊"}
        </motion.span>
      </motion.button>
    </div>
  );
}
