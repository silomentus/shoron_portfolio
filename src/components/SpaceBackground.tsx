"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════
   DEVICE DETECTION — reduce work on mobile
   ═══════════════════════════════════════════ */
function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
}

const MOBILE = typeof window !== "undefined" && isMobile();

/* ═══════════════════════════════════════════
   RAIN — diagonal streaks with subtle glow
   ═══════════════════════════════════════════ */
const RAIN_COUNT = MOBILE ? 200 : 800;

function Rain() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities, opacities] = useMemo(() => {
    const pos = new Float32Array(RAIN_COUNT * 3);
    const vel = new Float32Array(RAIN_COUNT);
    const opa = new Float32Array(RAIN_COUNT);
    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = Math.random() * 20 - 10;
      pos[i3 + 2] = (Math.random() - 0.5) * 12;
      vel[i] = 0.025 + Math.random() * 0.04;
      opa[i] = 0.15 + Math.random() * 0.35;
    }
    return [pos, vel, opa];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] -= velocities[i];
      posArray[i3] -= velocities[i] * 0.15; // diagonal

      if (posArray[i3 + 1] < -10) {
        posArray[i3 + 1] = 10;
        posArray[i3] = (Math.random() - 0.5) * 30;
        posArray[i3 + 2] = (Math.random() - 0.5) * 12;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const posAttr = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions]
  );

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#8b9cf8"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   RAIN STREAKS — elongated lines for rain feel
   ═══════════════════════════════════════════ */
const STREAK_COUNT = MOBILE ? 80 : 300;

function RainStreaks() {
  const meshRef = useRef<THREE.LineSegments>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(STREAK_COUNT * 6); // 2 points per line
    const vel = new Float32Array(STREAK_COUNT);
    for (let i = 0; i < STREAK_COUNT; i++) {
      const i6 = i * 6;
      const x = (Math.random() - 0.5) * 28;
      const y = Math.random() * 20 - 10;
      const z = (Math.random() - 0.5) * 10;
      const streakLen = 0.15 + Math.random() * 0.25;

      // Start point
      pos[i6] = x;
      pos[i6 + 1] = y;
      pos[i6 + 2] = z;
      // End point — offset up-right for diagonal rain
      pos[i6 + 3] = x + streakLen * 0.15;
      pos[i6 + 4] = y + streakLen;
      pos[i6 + 5] = z;

      vel[i] = 0.04 + Math.random() * 0.06;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < STREAK_COUNT; i++) {
      const i6 = i * 6;
      const speed = velocities[i];

      posArray[i6 + 1] -= speed;
      posArray[i6 + 4] -= speed;
      posArray[i6] -= speed * 0.15;
      posArray[i6 + 3] -= speed * 0.15;

      if (posArray[i6 + 1] < -10) {
        const x = (Math.random() - 0.5) * 28;
        const y = 10 + Math.random() * 2;
        const z = (Math.random() - 0.5) * 10;
        const len = 0.15 + Math.random() * 0.25;

        posArray[i6] = x;
        posArray[i6 + 1] = y;
        posArray[i6 + 2] = z;
        posArray[i6 + 3] = x + len * 0.15;
        posArray[i6 + 4] = y + len;
        posArray[i6 + 5] = z;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const posAttr = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions]
  );

  return (
    <lineSegments ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#8b9cf8"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* ═══════════════════════════════════════════
   STARS — twinkling space dust
   ═══════════════════════════════════════════ */
const STAR_COUNT = MOBILE ? 80 : 250;

function Stars() {
  const meshRef = useRef<THREE.Points>(null);
  const phases = useRef<Float32Array>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const ph = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 28;
      pos[i3 + 1] = (Math.random() - 0.5) * 18;
      pos[i3 + 2] = (Math.random() - 0.5) * 8 - 3;
      ph[i] = Math.random() * Math.PI * 2;
    }
    phases.current = ph;
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !phases.current) return;
    const t = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    // Gentle global twinkle
    mat.opacity = 0.35 + Math.sin(t * 0.5) * 0.1;
  });

  const posAttr = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions]
  );

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c7d2fe"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   BRIGHT STARS — larger, pulsing accent stars
   ═══════════════════════════════════════════ */
const BRIGHT_COUNT = MOBILE ? 8 : 20;

function BrightStars() {
  const meshRef = useRef<THREE.Points>(null);
  const phasesRef = useRef<Float32Array>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(BRIGHT_COUNT * 3);
    const ph = new Float32Array(BRIGHT_COUNT);
    for (let i = 0; i < BRIGHT_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 24;
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = (Math.random() - 0.5) * 4 - 2;
      ph[i] = Math.random() * Math.PI * 2;
    }
    phasesRef.current = ph;
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !phasesRef.current) return;
    const t = state.clock.elapsedTime;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(t * 0.8) * 0.15;
  });

  const posAttr = useMemo(
    () => new THREE.BufferAttribute(positions, 3),
    [positions]
  );

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a5b4fc"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   NEBULA SMOKE — animated shader fog
   ═══════════════════════════════════════════ */
function NebulaMesh() {
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
    window.addEventListener("pointermove", handlePointerMove);
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

        // Simplex-ish noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amp = 0.5;
          float freq = 1.0;
          for (int i = 0; i < ${MOBILE ? 3 : 5}; i++) {
            value += amp * snoise(p * freq);
            freq *= 2.0;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;

          // Smoke layers
          float t = uTime * 0.08;
          float smoke1 = fbm(uv * 2.0 + vec2(t * 0.5, t * 0.3));
          float smoke2 = fbm(uv * 3.0 + vec2(-t * 0.4, t * 0.6) + 5.0);
          float smoke3 = fbm(uv * 1.5 + vec2(t * 0.2, -t * 0.4) + 10.0);

          // Mouse influence — subtle push
          float mouseDist = length(uv - (uMouse * 0.5 + 0.5));
          float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;

          float smoke = smoke1 * 0.5 + smoke2 * 0.3 + smoke3 * 0.2 + mouseInfluence;
          smoke = smoothstep(-0.2, 0.8, smoke);

          // Color — indigo / violet / deep blue
          vec3 col1 = vec3(0.30, 0.33, 0.95); // indigo
          vec3 col2 = vec3(0.45, 0.30, 0.85); // violet
          vec3 col3 = vec3(0.15, 0.18, 0.50); // deep blue

          vec3 color = mix(col3, col1, smoke);
          color = mix(color, col2, smoke2 * 0.4);

          // Fade edges
          float edgeFade = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x)
                         * smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);

          float alpha = smoke * 0.06 * edgeFade;

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
}

/* ═══════════════════════════════════════════
   SHOOTING STARS — occasional fast streaks
   ═══════════════════════════════════════════ */
const MAX_SHOOTING = MOBILE ? 2 : 6;

function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);

  const stars = useMemo(() => {
    return Array.from({ length: MAX_SHOOTING }, () => ({
      positions: new Float32Array(6),
      active: false,
      timer: Math.random() * 4 + 1, // random initial delay
      life: 0,
      maxLife: 0.8 + Math.random() * 0.4,
      speed: 0.3 + Math.random() * 0.2,
      angle: (-Math.PI / 6) + Math.random() * 0.3,
      startX: 0,
      startY: 0,
    }));
  }, []);

  const lineRefs = useRef<(THREE.LineSegments | null)[]>([]);

  useFrame((state, delta) => {
    stars.forEach((star, idx) => {
      if (!star.active) {
        star.timer -= delta;
        if (star.timer <= 0) {
          // Activate
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

      star.life += delta;
      if (star.life >= star.maxLife) {
        star.active = false;
        star.timer = 3 + Math.random() * 6; // next interval
        // Hide
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
      const tailLen = 2.5;
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
        // Fade in then out
        const fade = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;
        mat.opacity = fade * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((_, idx) => (
        <lineSegments
          key={idx}
          ref={(el) => { lineRefs.current[idx] = el; }}
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
}

/* ═══════════════════════════════════════════
   MAIN SPACE BACKGROUND COMPONENT
   ═══════════════════════════════════════════ */
export default function SpaceBackground() {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    // Defer Three.js initialization to let the main content paint first
    const id = requestIdleCallback
      ? requestIdleCallback(() => setCanvasReady(true), { timeout: 1500 })
      : setTimeout(() => setCanvasReady(true), 800) as unknown as number;
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  const cloudStyle = {
    willChange: "transform, opacity" as const,
    contain: "layout style paint" as const,
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* CSS Smoke Clouds — large blurred orbs drifting slowly */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cloud 1 — top left, indigo */}
        <div
          className="absolute smoke-cloud-1"
          style={{
            ...cloudStyle,
            width: MOBILE ? "300px" : "600px",
            height: MOBILE ? "300px" : "600px",
            top: "-10%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.02) 40%, transparent 70%)",
            filter: MOBILE ? "blur(40px)" : "blur(80px)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 2 — right, violet */}
        <div
          className="absolute smoke-cloud-2"
          style={{
            ...cloudStyle,
            width: MOBILE ? "250px" : "500px",
            height: MOBILE ? "250px" : "500px",
            top: "20%",
            right: "-8%",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0.015) 40%, transparent 70%)",
            filter: MOBILE ? "blur(50px)" : "blur(100px)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 3 — center, deep blue */}
        <div
          className="absolute smoke-cloud-3"
          style={{
            ...cloudStyle,
            width: MOBILE ? "350px" : "700px",
            height: MOBILE ? "250px" : "500px",
            top: "40%",
            left: "20%",
            background:
              "radial-gradient(ellipse, rgba(79, 70, 229, 0.05) 0%, rgba(79, 70, 229, 0.01) 40%, transparent 70%)",
            filter: MOBILE ? "blur(45px)" : "blur(90px)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 4 — bottom, warm violet */}
        <div
          className="absolute smoke-cloud-4"
          style={{
            ...cloudStyle,
            width: MOBILE ? "275px" : "550px",
            height: MOBILE ? "275px" : "550px",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, rgba(167, 139, 250, 0.015) 40%, transparent 70%)",
            filter: MOBILE ? "blur(50px)" : "blur(100px)",
            borderRadius: "50%",
          }}
        />
        {/* Cloud 5 — bottom left accent */}
        <div
          className="absolute smoke-cloud-5"
          style={{
            ...cloudStyle,
            width: MOBILE ? "200px" : "400px",
            height: MOBILE ? "200px" : "400px",
            bottom: "20%",
            left: "-5%",
            background:
              "radial-gradient(circle, rgba(129, 140, 248, 0.05) 0%, transparent 60%)",
            filter: MOBILE ? "blur(40px)" : "blur(80px)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Three.js Canvas — deferred to avoid blocking initial paint */}
      {canvasReady && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 60 }}
          dpr={MOBILE ? [1, 1] : [1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{
            background: "transparent",
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
          }}
          frameloop="always"
        >
          <NebulaMesh />
          <Rain />
          <RainStreaks />
          <Stars />
          <BrightStars />
          {!MOBILE && <ShootingStars />}
        </Canvas>
      )}

      {/* Dot grid overlay — techy vibe */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
}
