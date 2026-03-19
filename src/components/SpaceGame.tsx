"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GAME_DURATION = 30;
const SHIP_SIZE = 20;
const STAR_SIZE = 12;
const ASTEROID_MIN = 14;
const ASTEROID_MAX = 28;
const MAX_HITS = 3;

interface Star {
  x: number;
  y: number;
  collected: boolean;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

export default function SpaceGame() {
  const [gameOpen, setGameOpen] = useState(false);
  const [gameState, setGameState] = useState<
    "menu" | "playing" | "gameover"
  >("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [hits, setHits] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [deathReason, setDeathReason] = useState<"time" | "crash">("time");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef({
    shipX: 0,
    shipY: 0,
    targetX: 0,
    targetY: 0,
    stars: [] as Star[],
    asteroids: [] as Asteroid[],
    particles: [] as Particle[],
    score: 0,
    hits: 0,
    alive: true,
    time: GAME_DURATION,
    canvasW: 0,
    canvasH: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const rafRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const asteroidIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

  // Resize canvas to fit container
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);

    canvas.width = w;
    canvas.height = h;

    const g = gameRef.current;
    g.canvasW = w;
    g.canvasH = h;
    g.scaleX = 1;
    g.scaleY = 1;
  }, []);

  const spawnStar = useCallback((w: number, h: number): Star => {
    return {
      x: Math.random() * (w - 40) + 20,
      y: Math.random() * (h - 40) + 20,
      collected: false,
    };
  }, []);

  const spawnAsteroid = useCallback((w: number, h: number): Asteroid => {
    const side = Math.floor(Math.random() * 4);
    const size =
      ASTEROID_MIN + Math.random() * (ASTEROID_MAX - ASTEROID_MIN);
    let x: number, y: number;

    switch (side) {
      case 0: x = Math.random() * w; y = -size; break;
      case 1: x = w + size; y = Math.random() * h; break;
      case 2: x = Math.random() * w; y = h + size; break;
      default: x = -size; y = Math.random() * h; break;
    }

    const angle = Math.atan2(
      h / 2 - y + (Math.random() - 0.5) * h * 0.5,
      w / 2 - x + (Math.random() - 0.5) * w * 0.5
    );

    return {
      x,
      y,
      size,
      speed: 1.5 + Math.random() * 2,
      rotation: angle,
      rotSpeed: (Math.random() - 0.5) * 0.08,
    };
  }, []);

  const spawnParticles = useCallback(
    (x: number, y: number, color: string, count: number) => {
      const g = gameRef.current;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: 2 + Math.random() * 3,
        });
      }
    },
    []
  );

  const endGame = useCallback(
    (reason: "time" | "crash") => {
      const g = gameRef.current;
      g.alive = false;
      if (timerRef.current) clearInterval(timerRef.current);
      if (asteroidIntervalRef.current)
        clearInterval(asteroidIntervalRef.current);
      setDeathReason(reason);
      setGameState("gameover");
      setHighScore((prev) => Math.max(prev, g.score));
    },
    []
  );

  const startGame = useCallback(() => {
    resizeCanvas();

    const g = gameRef.current;
    const w = g.canvasW;
    const h = g.canvasH;

    g.shipX = w / 2;
    g.shipY = h / 2;
    g.targetX = w / 2;
    g.targetY = h / 2;
    g.stars = Array.from({ length: 5 }, () => spawnStar(w, h));
    g.asteroids = [];
    g.particles = [];
    g.score = 0;
    g.hits = 0;
    g.alive = true;
    g.time = GAME_DURATION;

    setScore(0);
    setHits(0);
    setTimeLeft(GAME_DURATION);
    setGameState("playing");

    // Spawn asteroids gradually
    if (asteroidIntervalRef.current)
      clearInterval(asteroidIntervalRef.current);
    asteroidIntervalRef.current = setInterval(() => {
      if (!g.alive) return;
      g.asteroids.push(spawnAsteroid(g.canvasW, g.canvasH));
    }, 800);

    // Countdown timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!g.alive) return;
      g.time -= 1;
      setTimeLeft(g.time);
      if (g.time <= 0) {
        endGame("time");
      }
    }, 1000);
  }, [spawnStar, spawnAsteroid, resizeCanvas, endGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = gameRef.current;

    // Mouse input
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      g.targetX = ((e.clientX - rect.left) / rect.width) * g.canvasW;
      g.targetY = ((e.clientY - rect.top) / rect.height) * g.canvasH;
    };

    // Touch input
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      g.targetX = ((touch.clientX - rect.left) / rect.width) * g.canvasW;
      g.targetY = ((touch.clientY - rect.top) / rect.height) * g.canvasH;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchstart", onTouch, { passive: false });

    const loop = () => {
      if (!g.alive) return;

      const w = g.canvasW;
      const h = g.canvasH;

      ctx.clearRect(0, 0, w, h);

      // Background stars
      ctx.fillStyle = "rgba(199, 210, 254, 0.3)";
      for (let i = 0; i < 40; i++) {
        const bx = (i * 137.5) % w;
        const by = (i * 211.3) % h;
        ctx.beginPath();
        ctx.arc(bx, by, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Smooth ship movement
      g.shipX += (g.targetX - g.shipX) * 0.12;
      g.shipY += (g.targetY - g.shipY) * 0.12;

      // Clamp ship inside canvas
      g.shipX = Math.max(SHIP_SIZE, Math.min(w - SHIP_SIZE, g.shipX));
      g.shipY = Math.max(SHIP_SIZE, Math.min(h - SHIP_SIZE, g.shipY));

      // Draw ship
      const shipAngle = Math.atan2(
        g.targetY - g.shipY,
        g.targetX - g.shipX
      );

      // Ship glow
      const shipGlow = ctx.createRadialGradient(
        g.shipX,
        g.shipY,
        0,
        g.shipX,
        g.shipY,
        SHIP_SIZE * 2
      );
      shipGlow.addColorStop(0, "rgba(129, 140, 248, 0.2)");
      shipGlow.addColorStop(1, "rgba(129, 140, 248, 0)");
      ctx.beginPath();
      ctx.arc(g.shipX, g.shipY, SHIP_SIZE * 2, 0, Math.PI * 2);
      ctx.fillStyle = shipGlow;
      ctx.fill();

      // Ship body
      ctx.save();
      ctx.translate(g.shipX, g.shipY);
      ctx.rotate(shipAngle);
      ctx.beginPath();
      ctx.moveTo(SHIP_SIZE, 0);
      ctx.lineTo(-SHIP_SIZE * 0.7, -SHIP_SIZE * 0.6);
      ctx.lineTo(-SHIP_SIZE * 0.4, 0);
      ctx.lineTo(-SHIP_SIZE * 0.7, SHIP_SIZE * 0.6);
      ctx.closePath();
      ctx.fillStyle = "rgba(200, 210, 255, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(129, 140, 248, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Engine trail
      ctx.beginPath();
      ctx.moveTo(-SHIP_SIZE * 0.4, -SHIP_SIZE * 0.25);
      ctx.lineTo(-SHIP_SIZE * 0.9 - Math.random() * 6, 0);
      ctx.lineTo(-SHIP_SIZE * 0.4, SHIP_SIZE * 0.25);
      ctx.fillStyle = `rgba(165, 180, 252, ${0.4 + Math.random() * 0.3})`;
      ctx.fill();
      ctx.restore();

      // Stars (collectibles)
      g.stars.forEach((star, i) => {
        if (star.collected) return;

        const pulse = 1 + Math.sin(Date.now() * 0.005 + i) * 0.15;
        const r = STAR_SIZE * pulse;

        // Star glow
        const sg = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          r * 2
        );
        sg.addColorStop(0, "rgba(250, 204, 21, 0.4)");
        sg.addColorStop(1, "rgba(250, 204, 21, 0)");
        ctx.beginPath();
        ctx.arc(star.x, star.y, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();

        // Star shape
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(Date.now() * 0.001 + i);
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const a = (j * Math.PI * 2) / 5 - Math.PI / 2;
          const aInner = a + Math.PI / 5;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          ctx.lineTo(
            Math.cos(aInner) * r * 0.4,
            Math.sin(aInner) * r * 0.4
          );
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(250, 204, 21, 0.9)";
        ctx.fill();
        ctx.restore();

        // Collision with ship
        const dx = star.x - g.shipX;
        const dy = star.y - g.shipY;
        if (Math.sqrt(dx * dx + dy * dy) < SHIP_SIZE + STAR_SIZE) {
          star.collected = true;
          g.score += 10;
          setScore(g.score);
          spawnParticles(star.x, star.y, "rgba(250, 204, 21,", 12);

          setTimeout(() => {
            const idx = g.stars.indexOf(star);
            if (idx !== -1) {
              g.stars[idx] = spawnStar(g.canvasW, g.canvasH);
            }
          }, 500);
        }
      });

      // Asteroids
      g.asteroids = g.asteroids.filter((ast) => {
        ast.x += Math.cos(ast.rotation) * ast.speed;
        ast.y += Math.sin(ast.rotation) * ast.speed;

        // Out of bounds
        if (
          ast.x < -60 ||
          ast.x > w + 60 ||
          ast.y < -60 ||
          ast.y > h + 60
        ) {
          return false;
        }

        // Draw asteroid
        ctx.save();
        ctx.translate(ast.x, ast.y);
        const visualRot =
          Date.now() * 0.001 * ast.rotSpeed * 10 + ast.rotation;
        ctx.rotate(visualRot);
        ctx.beginPath();
        const sides = 7;
        for (let j = 0; j < sides; j++) {
          const a = (j / sides) * Math.PI * 2;
          const wobble = ast.size * (0.7 + (((j * 7 + 3) % 5) * 0.08));
          ctx.lineTo(Math.cos(a) * wobble, Math.sin(a) * wobble);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(100, 100, 120, 0.7)";
        ctx.fill();
        ctx.strokeStyle = "rgba(140, 140, 160, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        // Collision with ship
        const dx = ast.x - g.shipX;
        const dy = ast.y - g.shipY;
        if (
          Math.sqrt(dx * dx + dy * dy) <
          SHIP_SIZE * 0.6 + ast.size * 0.6
        ) {
          g.hits += 1;
          g.score = Math.max(0, g.score - 5);
          setScore(g.score);
          setHits(g.hits);
          spawnParticles(g.shipX, g.shipY, "rgba(248, 113, 113,", 15);

          if (g.hits >= MAX_HITS) {
            endGame("crash");
          }

          return false;
        }

        return true;
      });

      // Particles
      g.particles = g.particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.03;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color + `${p.life})`;
        ctx.fill();

        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchstart", onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, spawnStar, spawnParticles, endGame]);

  // Resize listener when game is open
  useEffect(() => {
    if (!gameOpen) return;
    const handleResize = () => {
      if (gameState === "playing") resizeCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gameOpen, gameState, resizeCanvas]);

  const handleClose = () => {
    const g = gameRef.current;
    g.alive = false;
    if (timerRef.current) clearInterval(timerRef.current);
    if (asteroidIntervalRef.current)
      clearInterval(asteroidIntervalRef.current);
    cancelAnimationFrame(rafRef.current);
    setGameOpen(false);
    setGameState("menu");
  };

  // Life hearts display
  const livesLeft = MAX_HITS - hits;

  return (
    <>
      {/* Trigger button — bottom-left */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setGameOpen(true)}
        className="fixed z-[90]"
        style={{
          bottom: "24px",
          left: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(17, 17, 24, 0.8)",
          border: "1px solid rgba(26, 26, 37, 0.8)",
          backdropFilter: "blur(20px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
        title="Play a game!"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(129, 140, 248, 0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="20" height="12" rx="3" />
          <line x1="6" y1="10" x2="6" y2="14" />
          <line x1="4" y1="12" x2="8" y2="12" />
          <circle
            cx="16"
            cy="10"
            r="1"
            fill="rgba(129, 140, 248, 0.8)"
          />
          <circle
            cx="19"
            cy="12"
            r="1"
            fill="rgba(129, 140, 248, 0.8)"
          />
        </svg>
      </motion.button>

      {/* Game overlay — full screen, responsive */}
      <AnimatePresence>
        {gameOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            style={{
              backgroundColor: "rgba(6, 6, 8, 0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              ref={containerRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0, 1],
              }}
              className="relative w-full h-full"
              style={{
                maxWidth: "750px",
                maxHeight: "550px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(26, 26, 37, 0.8)",
                background: "rgba(10, 10, 14, 0.95)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                }}
              >
                ✕
              </button>

              {/* Canvas — fills container */}
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  touchAction: "none",
                }}
              />

              {/* Menu overlay */}
              {gameState === "menu" && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center px-6"
                  style={{ gap: "16px" }}
                >
                  <h3
                    className="font-display font-bold gradient-text"
                    style={{
                      fontSize: "clamp(24px, 5vw, 32px)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Star Collector
                  </h3>
                  <p
                    className="text-text-muted text-center"
                    style={{
                      fontSize: "clamp(12px, 2.5vw, 14px)",
                      maxWidth: "320px",
                      lineHeight: 1.6,
                    }}
                  >
                    {typeof window !== "undefined" &&
                    "ontouchstart" in window
                      ? "Touch and drag to pilot the ship."
                      : "Move your mouse to pilot the ship."}{" "}
                    Collect stars, dodge asteroids. You have{" "}
                    {GAME_DURATION} seconds and {MAX_HITS} lives!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="font-display font-semibold text-white"
                    style={{
                      padding: "12px 36px",
                      fontSize: "16px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))",
                      border: "none",
                      cursor: "pointer",
                      boxShadow:
                        "0 4px 24px rgba(99, 102, 241, 0.3)",
                      marginTop: "8px",
                    }}
                  >
                    Play
                  </motion.button>
                </div>
              )}

              {/* HUD during game */}
              {gameState === "playing" && (
                <div
                  className="absolute top-3 left-3 flex items-center flex-wrap"
                  style={{ gap: "8px" }}
                >
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "clamp(11px, 2vw, 14px)",
                      color: "rgba(250, 204, 21, 0.9)",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "5px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    ⭐ {score}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "clamp(11px, 2vw, 14px)",
                      color:
                        timeLeft <= 10
                          ? "rgba(248, 113, 113, 0.9)"
                          : "rgba(200, 210, 255, 0.8)",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "5px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    ⏱ {timeLeft}s
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "clamp(11px, 2vw, 14px)",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "5px 12px",
                      borderRadius: "8px",
                      color:
                        livesLeft <= 1
                          ? "rgba(248, 113, 113, 0.9)"
                          : "rgba(248, 113, 113, 0.7)",
                    }}
                  >
                    {Array.from({ length: MAX_HITS }, (_, i) =>
                      i < livesLeft ? "❤️" : "🖤"
                    ).join("")}
                  </div>
                </div>
              )}

              {/* Game over */}
              {gameState === "gameover" && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center px-6"
                  style={{
                    gap: "12px",
                    backgroundColor: "rgba(6, 6, 8, 0.88)",
                  }}
                >
                  <h3
                    className="font-display font-bold text-text"
                    style={{
                      fontSize: "clamp(22px, 4vw, 28px)",
                    }}
                  >
                    {deathReason === "crash"
                      ? "Ship Destroyed! 💥"
                      : "Time's Up!"}
                  </h3>
                  <div
                    className="font-display font-bold gradient-text"
                    style={{
                      fontSize: "clamp(36px, 8vw, 48px)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {score}
                  </div>
                  <p
                    className="text-text-muted font-mono"
                    style={{ fontSize: "clamp(11px, 2vw, 13px)" }}
                  >
                    {deathReason === "crash"
                      ? "Too many asteroid hits!"
                      : score >= 100
                      ? "Legendary pilot! 🚀"
                      : score >= 60
                      ? "Great flying! ⭐"
                      : score >= 30
                      ? "Not bad, cadet!"
                      : "Keep practicing! 💪"}
                  </p>
                  {highScore > 0 && (
                    <p
                      className="text-accent/60 font-mono"
                      style={{ fontSize: "12px" }}
                    >
                      Best: {Math.max(highScore, score)}
                    </p>
                  )}
                  <div
                    className="flex flex-wrap justify-center"
                    style={{ gap: "10px", marginTop: "8px" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="font-display font-semibold text-white"
                      style={{
                        padding: "10px 28px",
                        fontSize: "14px",
                        borderRadius: "10px",
                        background:
                          "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))",
                        border: "none",
                        cursor: "pointer",
                        boxShadow:
                          "0 4px 20px rgba(99, 102, 241, 0.25)",
                      }}
                    >
                      Play Again
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="font-display font-medium text-text-muted"
                      style={{
                        padding: "10px 28px",
                        fontSize: "14px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border:
                          "1px solid rgba(255, 255, 255, 0.1)",
                        cursor: "pointer",
                      }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
