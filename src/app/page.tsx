"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Blogs from "@/sections/Blogs";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const SpaceBackground = dynamic(
  () => import("@/components/SpaceBackground"),
  { ssr: false }
);

const SpaceGame = dynamic(() => import("@/components/SpaceGame"), {
  ssr: false,
});

const ResumeModal = dynamic(() => import("@/components/ResumeModal"), {
  ssr: false,
});

export default function Home() {
  // Defer non-critical components until after initial paint
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
      <SpaceBackground />
      {/* {deferred && <CustomCursor />} */}
      <ScrollProgress />
      <Navbar onPlayGame={handlePlayGame} onRequestCV={handleRequestCV} />
      <main className="relative z-[1]">
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
