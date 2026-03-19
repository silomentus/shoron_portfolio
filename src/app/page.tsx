"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
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

const ReactionBar = dynamic(() => import("@/components/ReactionBar"), {
  ssr: false,
});

const SpaceGame = dynamic(() => import("@/components/SpaceGame"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ReactionBar />
      <SpaceGame />
    </>
  );
}
