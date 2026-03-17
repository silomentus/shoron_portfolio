"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Aurora ribbon ── */
const SEGMENTS = 120;
const POINTS_PER_RIBBON = SEGMENTS * 2;

function AuroraRibbon({ index, baseY, speed, amplitude, width }: {
  index: number;
  baseY: number;
  speed: number;
  amplitude: number;
  width: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const phase = index * 1.7;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(POINTS_PER_RIBBON * 3);
    const colors = new Float32Array(POINTS_PER_RIBBON * 3);
    const indices: number[] = [];

    for (let i = 0; i < SEGMENTS; i++) {
      const topIdx = i * 2;
      const bottomIdx = i * 2 + 1;
      const t3Top = topIdx * 3;
      const t3Bot = bottomIdx * 3;

      const x = (i / SEGMENTS - 0.5) * 18;
      positions[t3Top] = x;
      positions[t3Top + 1] = baseY + width * 0.5;
      positions[t3Top + 2] = 0;
      positions[t3Bot] = x;
      positions[t3Bot + 1] = baseY - width * 0.5;
      positions[t3Bot + 2] = 0;

      const progress = i / SEGMENTS;
      const edgeFade = Math.sin(progress * Math.PI);
      colors[t3Top] = 0.42 * edgeFade;
      colors[t3Top + 1] = 0.39 * edgeFade;
      colors[t3Top + 2] = 1.0 * edgeFade;
      colors[t3Bot] = 0.42 * edgeFade * 0.3;
      colors[t3Bot + 1] = 0.39 * edgeFade * 0.3;
      colors[t3Bot + 2] = 1.0 * edgeFade * 0.3;

      if (i < SEGMENTS - 1) {
        const tl = topIdx;
        const bl = bottomIdx;
        const tr = (i + 1) * 2;
        const br = (i + 1) * 2 + 1;
        indices.push(tl, bl, tr);
        indices.push(bl, br, tr);
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setIndex(indices);
    return geo;
  }, [baseY, width]);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      mouse.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    },
    [viewport]
  );

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const colArray = meshRef.current.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < SEGMENTS; i++) {
      const topIdx = i * 2;
      const bottomIdx = i * 2 + 1;
      const t3Top = topIdx * 3;
      const t3Bot = bottomIdx * 3;
      const progress = i / SEGMENTS;
      const x = (progress - 0.5) * 18;

      // Layered wave — smooth with slight waviness
      let wave = 0;
      wave += Math.sin(x * 0.4 + time * speed + phase) * amplitude;
      wave += Math.sin(x * 0.8 + time * speed * 0.6 + phase * 2) * amplitude * 0.35;
      wave += Math.cos(x * 0.2 + time * speed * 0.3 + phase) * amplitude * 0.25;
      wave += Math.sin(x * 1.2 + time * speed * 0.9 + phase * 3) * amplitude * 0.1;

      // Mouse influence
      const dx = x - mouse.current.x;
      const dy = baseY + wave - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        wave += (mouse.current.y - baseY) * (1 - dist / 3) * 0.3;
      }

      // Gentle wavy edges
      const topNoise = Math.sin(x * 1.2 + time * speed * 0.8 + phase * 4) * width * 0.15;
      const botNoise = Math.sin(x * 1.0 + time * speed * 0.7 + phase * 3.2) * width * 0.12;

      posArray[t3Top + 1] = baseY + wave + width * 0.5 + topNoise;
      posArray[t3Bot + 1] = baseY + wave - width * 0.5 + botNoise;

      // Z-depth wave
      const zWave = Math.sin(x * 0.5 + time * speed * 0.4 + phase * 1.5) * 0.5;
      posArray[t3Top + 2] = zWave;
      posArray[t3Bot + 2] = zWave + 0.2;

      // Dynamic colors — soft shimmer
      const edgeFade = Math.sin(progress * Math.PI);
      const shimmer = 0.7 + Math.sin(time * 1.2 + x * 0.4 + phase) * 0.3;
      const brightness = edgeFade * shimmer;

      colArray[t3Top] = (0.42 + index * 0.04) * brightness * 0.8;
      colArray[t3Top + 1] = (0.39 + index * 0.03) * brightness * 0.8;
      colArray[t3Top + 2] = 1.0 * brightness * 0.8;

      colArray[t3Bot] = (0.42 + index * 0.04) * brightness * 0.05;
      colArray[t3Bot + 1] = (0.39 + index * 0.03) * brightness * 0.05;
      colArray[t3Bot + 2] = 1.0 * brightness * 0.05;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.08 + index * 0.015}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Twinkling stars ── */
const STAR_COUNT = 200;

function TwinklingStars() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const ph = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 12;
      pos[i3 + 2] = (Math.random() - 0.5) * 6 - 2;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
  });

  const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#e4e4e7"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Rain ── */
const RAIN_COUNT = 300;

function Rain() {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(RAIN_COUNT * 3);
    const vel = new Float32Array(RAIN_COUNT);
    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 22;
      pos[i3 + 1] = Math.random() * 14 - 7;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;
      vel[i] = 0.03 + Math.random() * 0.04;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] -= velocities[i];
      posArray[i3] -= 0.003; // slight diagonal

      if (posArray[i3 + 1] < -7) {
        posArray[i3 + 1] = 7;
        posArray[i3] = (Math.random() - 0.5) * 22;
        posArray[i3 + 2] = (Math.random() - 0.5) * 8;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const posAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={posAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#a78bfa"
        transparent
        opacity={0.2}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AuroraRibbon index={0} baseY={1.8} speed={0.2} amplitude={0.6} width={0.3} />
        <AuroraRibbon index={1} baseY={0.5} speed={0.15} amplitude={0.7} width={0.35} />
        <AuroraRibbon index={2} baseY={-0.5} speed={0.25} amplitude={0.5} width={0.25} />
        <AuroraRibbon index={3} baseY={-1.5} speed={0.18} amplitude={0.6} width={0.3} />
        <AuroraRibbon index={4} baseY={0.2} speed={0.12} amplitude={0.8} width={0.35} />
        <Rain />
        <TwinklingStars />
      </Canvas>
    </div>
  );
}
