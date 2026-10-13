"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Blogs from "@/sections/Blogs";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

const SpaceGame = dynamic(() => import("@/components/SpaceGame"), {
  ssr: false,
});

const ResumeModal = dynamic(() => import("@/components/ResumeModal"), {
  ssr: false,
});

export default function Home() {
  const [deferred, setDeferred] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDeferred(true));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handlePlayGame = useCallback(() => setGameOpen(true), []);
  const handleGameOpenChange = useCallback((open: boolean) => setGameOpen(open), []);
  const handleRequestCV = useCallback(() => setCvModalOpen(true), []);
  const handleCloseCV = useCallback(() => setCvModalOpen(false), []);

  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <ScrollProgress />
      <Navbar onPlayGame={handlePlayGame} onRequestCV={handleRequestCV} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Blogs />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {deferred && <SpaceGame open={gameOpen} onOpenChange={handleGameOpenChange} />}
      {deferred && <ResumeModal isOpen={cvModalOpen} onClose={handleCloseCV} />}
    </>
  );
}
