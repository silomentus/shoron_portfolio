"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuMail, LuTerminal } from "react-icons/lu";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/[0.06] bg-surface-lowest">
      <div className="container-x py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 pb-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a
              href="#home"
              className="flex items-center gap-2 font-mono text-[14px] font-bold tracking-tight text-primary hover:opacity-80 transition-opacity"
            >
              <LuTerminal className="h-4 w-4" />
              <span>&lt;SHORON /&gt;</span>
            </a>
            <p className="text-center text-[13px] text-on-surface-variant md:text-left">
              Md. Harun Or Rashid • Backend Systems &amp; Algorithmic Machine Learning Engineer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-surface-low text-on-surface-variant transition-colors hover:border-primary/40 hover:bg-surface-high hover:text-primary"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-surface-low text-on-surface-variant transition-colors hover:border-primary/40 hover:bg-surface-high hover:text-primary"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              aria-label="Contact"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-surface-low text-on-surface-variant transition-colors hover:border-primary/40 hover:bg-surface-high hover:text-primary"
            >
              <LuMail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] pt-6 sm:flex-row">
          <p className="badge-tag text-center text-on-surface-variant/70 sm:text-left">
            &copy; {new Date().getFullYear()} Md. Harun Or Rashid (Shoron). Engineered with architectural rigor.
          </p>
          <div className="flex items-center gap-2 badge-tag text-on-surface-variant/70">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
            <span>Next.js • Tailwind CSS • Lenis • Distributed Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
