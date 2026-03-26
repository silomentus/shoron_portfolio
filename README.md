<div align="center">

# Shoron — Portfolio

A high-performance, visually immersive developer portfolio built with Next.js 16, featuring real-time 3D particle effects, smooth animations, and a fully responsive design optimized for every device.

**[Live Site](https://shoron.vercel.app)**

---

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r183-black?style=for-the-badge&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

</div>

---

## Overview

This portfolio is designed to deliver a premium, memorable experience — not just a list of projects. It combines a space-themed aesthetic with subtle interactivity to keep visitors engaged while maintaining blazing-fast performance across all devices.

### Key Highlights

- **3D Space Background** — Real-time particle rain, twinkling stars, nebula shader fog, and shooting stars powered by Three.js and custom GLSL shaders
- **Adaptive Performance** — Automatically detects device capabilities and adjusts rendering complexity — disabling WebGL, reducing effects, and simplifying animations on mobile for a smooth experience on any hardware
- **Custom Cursor** — Canvas-based cursor with trail effects, radial glow, and hover-aware ring expansion (desktop only)
- **Interactive Mini-Game** — A built-in "Star Collector" space game accessible from the navbar — pilot a ship, collect stars, dodge asteroids
- **Emoji Reaction Bar** — Floating reaction picker that spawns animated emoji particles
- **Smooth Scroll Animations** — Every section animates into view with staggered reveals, count-up stats, and intersection-observer-driven effects
- **Contact Form** — Functional contact form with real-time validation and submission feedback

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated typewriter cycling through roles, rotating taglines, and a pulsing "open to opportunities" badge |
| **About** | Animated count-up stats (Projects, Technologies, Years Learning, Experience), education timeline with hover effects, and quick info card |
| **Experience** | Vertical timeline with glass-morphism cards, live status indicator, role details, responsibilities, and interactive tech tags |
| **Projects** | Filterable project grid with animated category tabs, project cards with tech stacks, and hover-lift effects |
| **Skills** | Icon grid for programming languages with hover scale, plus categorized pill chips for Backend, AI/ML, and Tools with border glow |
| **Contact** | Split layout — contact info cards and social links on the left, validated contact form on the right |

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org) | 16.1 | React framework with App Router |
| [React](https://react.dev) | 19.2 | UI library |
| [TypeScript](https://typescriptlang.org) | 5.9 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Utility-first styling |

### Animation & Graphics

| Technology | Purpose |
|-----------|---------|
| [Three.js](https://threejs.org) + React Three Fiber | 3D particle systems, nebula shader, shooting stars |
| [Framer Motion](https://motion.dev) | Page transitions, layout animations, stagger effects, spring physics |
| Custom Canvas 2D | Cursor trail rendering, space game engine |
| GLSL Shaders | Nebula fog with Simplex noise FBM, additive blending |

---

## Performance

This site is heavily optimized to eliminate load stutter across all devices:

### Mobile
- Three.js completely disabled — CSS-only background with lightweight drift animations
- Reduced blur radii, fewer smoke clouds, no SVG noise overlay
- Simplified keyframe animations — translate-only, no `scale()` on blurred elements
- Custom cursor and GPU-heavy overlays skipped entirely

### Desktop
- Deferred Three.js initialization — content paints before WebGL starts
- Non-critical components lazy loaded after initial paint
- Self-hosted fonts via `next/font` with `display: swap`
- GPU compositing hints on animated elements

---

## License

This project is the personal portfolio of **Shoron**. You're welcome to take inspiration from the design and ideas, but please don't copy the code or content wholesale. If something here helps you build your own portfolio, a credit or mention would be appreciated.

---

<div align="center">

**Built with care by [Shoron](https://shoron.vercel.app)**

</div>
