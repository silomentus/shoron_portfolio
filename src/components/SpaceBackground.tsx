"use client";

import { useRef, useMemo, useEffect, useState, useCallback, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   DEVICE TIER DETECTION
   ═══════════════════════════════════════════ */
export type PerfTier = "ultra-low" | "low" | "medium" | "high";

function detectInitialTier(): PerfTier {
  if (typeof window === "undefined") return "low";

  // Check prefers-reduced-motion
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "ultra-low";
  }

  const isMobileDevice =
    window.innerWidth < 768 ||
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const cores = navigator.hardwareConcurrency || 4;
  // @ts-ignore
  const memory = navigator.deviceMemory || 4;

  if (cores <= 2 || memory <= 2) {
    return "ultra-low";
  }

  if (isMobileDevice || cores <= 4 || memory <= 4 || window.innerWidth < 1024) {
    return "low";
  }

  return "high";
}

/* ═══════════════════════════════════════════
   GPU RAIN — 100% Vertex Shader Driven
   (Zero CPU loops, Zero buffer re-uploads)
   ═══════════════════════════════════════════ */
interface GPURainProps {
  count: number;
}

const GPURain = memo(function GPURain({ count }: GPURainProps) {
  const [positions, speeds, opacities, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const opa = new Float32Array(count);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 32;
      pos[i3 + 1] = Math.random() * 20 - 10;
      pos[i3 + 2] = (Math.random() - 0.5) * 12;
      spd[i] = 1.8 + Math.random() * 2.5;
      opa[i] = 0.4 + Math.random() * 0.45;
      sz[i] = 0.045 + Math.random() * 0.025;
    }
    return [pos, spd, opa, sz];
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#8b9cf8") },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aSpeed;
        attribute float aOpacity;
        attribute float aSize;
        varying float vOpacity;

        void main() {
          vOpacity = aOpacity;
          
          float totalHeight = 20.0;
          float dist = uTime * aSpeed;
          float y = mod(position.y - dist + 10.0, totalHeight) - 10.0;
          float progress = (10.0 - y) / totalHeight;
          float x = position.x - progress * 3.0;

          vec3 pos = vec3(x, y, position.z);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (500.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 uColor;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    g.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, speeds, opacities, sizes]);

  return <points geometry={geo} material={material} />;
});

/* ═══════════════════════════════════════════
   GPU RAIN STREAKS — Vertex Shader Line Segments
   ═══════════════════════════════════════════ */
interface GPURainStreaksProps {
  count: number;
}

const GPURainStreaks = memo(function GPURainStreaks({ count }: GPURainStreaksProps) {
  const [positions, speeds, lengths, isEnds, opacities] = useMemo(() => {
    const totalVerts = count * 2;
    const pos = new Float32Array(totalVerts * 3);
    const spd = new Float32Array(totalVerts);
    const len = new Float32Array(totalVerts);
    const isEnd = new Float32Array(totalVerts);
    const opa = new Float32Array(totalVerts);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = Math.random() * 20 - 10;
      const z = (Math.random() - 0.5) * 10;
      const streakSpeed = 2.8 + Math.random() * 3.5;
      const streakLen = 0.2 + Math.random() * 0.3;
      const streakOpa = 0.25 + Math.random() * 0.25;

      // Vertex 1: Start
      const v1 = i * 2;
      pos[v1 * 3] = x;
      pos[v1 * 3 + 1] = y;
      pos[v1 * 3 + 2] = z;
      spd[v1] = streakSpeed;
      len[v1] = streakLen;
      isEnd[v1] = 0.0;
      opa[v1] = streakOpa * 0.4;

      // Vertex 2: End
      const v2 = i * 2 + 1;
      pos[v2 * 3] = x;
      pos[v2 * 3 + 1] = y;
      pos[v2 * 3 + 2] = z;
      spd[v2] = streakSpeed;
      len[v2] = streakLen;
      isEnd[v2] = 1.0;
      opa[v2] = streakOpa;
    }
    return [pos, spd, len, isEnd, opa];
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#8b9cf8") },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aSpeed;
        attribute float aLen;
        attribute float aIsEnd;
        attribute float aOpacity;
        varying float vOpacity;

        void main() {
          vOpacity = aOpacity;
          
          float totalHeight = 22.0;
          float dist = uTime * aSpeed;
          float y = mod(position.y - dist + 11.0, totalHeight) - 11.0;
          float progress = (11.0 - y) / totalHeight;
          float x = position.x - progress * 3.3;

          if (aIsEnd > 0.5) {
            x += aLen * 0.15;
            y += aLen;
          }

          vec3 pos = vec3(x, y, position.z);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 uColor;

        void main() {
          gl_FragColor = vec4(uColor, vOpacity);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    g.setAttribute("aLen", new THREE.BufferAttribute(lengths, 1));
    g.setAttribute("aIsEnd", new THREE.BufferAttribute(isEnds, 1));
    g.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    return g;
  }, [positions, speeds, lengths, isEnds, opacities]);

  return <lineSegments geometry={geo} material={material} />;
});

/* ═══════════════════════════════════════════
   GPU STARS — Twinkling Stars in 1 Draw Call
   ═══════════════════════════════════════════ */
interface GPUStarsProps {
  count: number;
}

const GPUStars = memo(function GPUStars({ count }: GPUStarsProps) {
  const [positions, phases, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const sz = new Float32Array(count);
    const opa = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 2;
      ph[i] = Math.random() * Math.PI * 2;

      // 12% are larger accent bright stars
      const isBright = i < count * 0.12;
      sz[i] = isBright ? 0.08 : 0.038 + Math.random() * 0.02;
      opa[i] = isBright ? 0.75 : 0.4 + Math.random() * 0.3;
    }
    return [pos, ph, sz, opa];
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#c7d2fe") },
      },
      vertexShader: `
        uniform float uTime;
        attribute float aPhase;
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;

        void main() {
          float twinkle = aOpacity * (0.65 + 0.35 * sin(uTime * 1.0 + aPhase));
          vOpacity = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (500.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        uniform vec3 uColor;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
    return g;
  }, [positions, phases, sizes, opacities]);

  return <points geometry={geo} material={material} />;
});

/* ═══════════════════════════════════════════
   LIGHTWEIGHT NEBULA SMOKE SHADER
   (Optimized 2-octave smooth domain warp)
   ═══════════════════════════════════════════ */
const NebulaMesh = memo(function NebulaMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      mouse.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      mouse.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    },
    [viewport]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // Ultra-fast smooth 2D noise
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        float fbm2(vec2 p) {
          return noise(p) * 0.65 + noise(p * 2.05 + 1.2) * 0.35;
        }

        void main() {
          vec2 uv = vUv;
          float t = uTime * 0.05;
          
          float mouseDist = length(uv - (uMouse * 0.5 + 0.5));
          float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.10;

          // Single domain warp — ultra fast & smooth
          vec2 q = vec2(fbm2(uv * 1.8 + vec2(t * 0.4, t * 0.2)), fbm2(uv * 1.8 + vec2(-t * 0.3, t * 0.5)));
          float smoke = fbm2(uv * 2.2 + q * 1.2) + mouseInfluence;
          smoke = smoothstep(0.12, 0.82, smoke);

          vec3 col1 = vec3(0.30, 0.33, 0.95); // indigo
          vec3 col2 = vec3(0.45, 0.30, 0.85); // violet
          vec3 col3 = vec3(0.15, 0.18, 0.50); // deep blue

          vec3 color = mix(col3, col1, smoke);
          color = mix(color, col2, q.x * 0.35);

          float edgeFade = smoothstep(0.0, 0.25, uv.x) * smoothstep(1.0, 0.75, uv.x)
                         * smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);

          float alpha = smoke * 0.055 * edgeFade;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    shaderMaterial.uniforms.uMouse.value.set(
      mouse.current.x / (viewport.width / 2),
      mouse.current.y / (viewport.height / 2)
    );
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[20, 14]} />
    </mesh>
  );
});

/* ═══════════════════════════════════════════
   SHOOTING STARS
   ═══════════════════════════════════════════ */
interface ShootingStarsProps {
  maxCount: number;
}

const ShootingStars = memo(function ShootingStars({ maxCount }: ShootingStarsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: maxCount }, () => ({
      positions: new Float32Array(6),
      active: false,
      timer: Math.random() * 5 + 1.5,
      life: 0,
      maxLife: 0.8 + Math.random() * 0.4,
      speed: 15 + Math.random() * 10,
      angle: -Math.PI / 5 + Math.random() * 0.4,
      startX: 0,
      startY: 0,
    }));
  }, [maxCount]);

  const lineRefs = useRef<(THREE.LineSegments | null)[]>([]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);

    stars.forEach((star, idx) => {
      if (!star.active) {
        star.timer -= dt;
        if (star.timer <= 0) {
          star.active = true;
          star.life = 0;
          star.startX = (Math.random() - 0.3) * 20;
          star.startY = 4 + Math.random() * 6;
          star.angle = -Math.PI / 5 + Math.random() * 0.4;
          star.maxLife = 0.6 + Math.random() * 0.5;
          star.speed = 15 + Math.random() * 10;
        }
        return;
      }

      star.life += dt;
      if (star.life >= star.maxLife) {
        star.active = false;
        star.timer = 4 + Math.random() * 7;
        const line = lineRefs.current[idx];
        if (line) {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.opacity = 0;
        }
        return;
      }

      const progress = star.life / star.maxLife;
      const dist = star.life * star.speed;
      const dx = Math.cos(star.angle) * dist;
      const dy = Math.sin(star.angle) * dist;

      const headX = star.startX + dx;
      const headY = star.startY + dy;
      const tailLen = 2.2;
      const tailX = headX - Math.cos(star.angle) * tailLen;
      const tailY = headY - Math.sin(star.angle) * tailLen;

      const line = lineRefs.current[idx];
      if (line) {
        const posArray = line.geometry.attributes.position.array as Float32Array;
        posArray[0] = tailX;
        posArray[1] = tailY;
        posArray[2] = -1;
        posArray[3] = headX;
        posArray[4] = headY;
        posArray[5] = -1;
        line.geometry.attributes.position.needsUpdate = true;

        const mat = line.material as THREE.LineBasicMaterial;
        const fade =
          progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        mat.opacity = fade * 0.6;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((_, idx) => (
        <lineSegments
          key={idx}
          ref={(el) => {
            lineRefs.current[idx] = el;
          }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(6), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#c7d2fe"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
    </group>
  );
});

/* ═══════════════════════════════════════════
   FPS MONITOR & AUTO-DEGRADE SAFEGUARD
   ═══════════════════════════════════════════ */
function DynamicPerformanceMonitor({
  onDegrade,
}: {
  onDegrade: () => void;
}) {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const lowFpsCount = useRef(0);

  useFrame(() => {
    frameCount.current++;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    // Check FPS every 1 second
    if (elapsed >= 1000) {
      const fps = (frameCount.current * 1000) / elapsed;
      frameCount.current = 0;
      lastTime.current = now;

      if (fps < 38) {
        lowFpsCount.current++;
        if (lowFpsCount.current >= 2) {
          onDegrade();
          lowFpsCount.current = 0;
        }
      } else {
        lowFpsCount.current = 0;
      }
    }
  });

  return null;
}

/* ═══════════════════════════════════════════
   MAIN SPACE BACKGROUND COMPONENT
   ═══════════════════════════════════════════ */
export default function SpaceBackground() {
  const [tier, setTier] = useState<PerfTier>("medium");
  const [canvasReady, setCanvasReady] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const detected = detectInitialTier();
    setTier(detected);

    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const timer = setTimeout(() => {
      setCanvasReady(true);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const handleDegradeTier = useCallback(() => {
    setTier((prev) => {
      if (prev === "high") return "medium";
      if (prev === "medium") return "low";
      if (prev === "low") return "ultra-low";
      return "ultra-low";
    });
  }, []);

  const isUltraLow = tier === "ultra-low";
  const isLow = tier === "low" || isUltraLow;
  const isMed = tier === "medium";

  const rainCount = isUltraLow ? 180 : isLow ? 280 : isMed ? 450 : 750;
  const streakCount = isUltraLow ? 40 : isLow ? 80 : isMed ? 130 : 220;
  const starCount = isUltraLow ? 80 : isLow ? 120 : isMed ? 180 : 260;
  const shootingStarsCount = isUltraLow ? 1 : isLow ? 2 : isMed ? 4 : 5;
  const showNebulaShader = !isLow;

  const maxDpr = isLow ? 1 : isMed ? 1 : 1.25;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* CSS Smooth Radial Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cloud 1 — top left, indigo */}
        <div
          className="absolute smoke-cloud-1"
          style={{
            width: isLow ? "320px" : "550px",
            height: isLow ? "320px" : "550px",
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.04) 35%, rgba(99, 102, 241, 0.01) 60%, transparent 75%)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 2 — right, violet */}
        <div
          className="absolute smoke-cloud-2"
          style={{
            width: isLow ? "280px" : "480px",
            height: isLow ? "280px" : "480px",
            top: "20%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(139, 92, 246, 0.035) 35%, rgba(139, 92, 246, 0.01) 60%, transparent 75%)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 3 — center, deep blue */}
        {!isLow && (
          <div
            className="absolute smoke-cloud-3"
            style={{
              width: "600px",
              height: "450px",
              top: "40%",
              left: "20%",
              background:
                "radial-gradient(ellipse, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0.02) 40%, transparent 75%)",
              borderRadius: "50%",
            }}
          />
        )}
        {/* Cloud 4 — bottom, warm violet */}
        <div
          className={`absolute ${isLow ? "smoke-cloud-3" : "smoke-cloud-4"}`}
          style={{
            width: isLow ? "300px" : "500px",
            height: isLow ? "300px" : "500px",
            bottom: "-5%",
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.07) 0%, rgba(167, 139, 250, 0.03) 35%, rgba(167, 139, 250, 0.01) 60%, transparent 75%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Three.js Canvas */}
      {canvasReady && isTabVisible && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={[1, maxDpr]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
            depth: false,
            stencil: false,
          }}
          style={{
            background: "transparent",
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
          frameloop="always"
        >
          <DynamicPerformanceMonitor onDegrade={handleDegradeTier} />
          {showNebulaShader && <NebulaMesh />}
          <GPURain count={rainCount} />
          {streakCount > 0 && <GPURainStreaks count={streakCount} />}
          <GPUStars count={starCount} />
          {shootingStarsCount > 0 && (
            <ShootingStars maxCount={shootingStarsCount} />
          )}
        </Canvas>
      )}

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.4 }} />
    </div>
  );
}

