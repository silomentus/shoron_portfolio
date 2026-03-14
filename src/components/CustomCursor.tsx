"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Dot follows mouse tightly
  const dotConfig = { stiffness: 800, damping: 35 };
  const dotX = useSpring(0, dotConfig);
  const dotY = useSpring(0, dotConfig);

  // Ring follows with a slight delay
  const ringConfig = { stiffness: 250, damping: 25 };
  const ringX = useSpring(0, ringConfig);
  const ringY = useSpring(0, ringConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setVisible(true);
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!visible) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 8 : 6,
            height: hovering ? 8 : 6,
            backgroundColor: hovering
              ? "var(--color-accent-light)"
              : "var(--color-accent)",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 44 : 32,
            height: hovering ? 44 : 32,
            borderColor: hovering
              ? "var(--color-accent)"
              : "rgba(108, 99, 255, 0.4)",
            borderWidth: hovering ? "2px" : "1.5px",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full"
          style={{ borderStyle: "solid", backgroundColor: "transparent" }}
        />
      </motion.div>
    </>
  );
}
