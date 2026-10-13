"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuArrowUpRight,
  LuCheck,
  LuCircleAlert,
  LuCircleCheck,
  LuCopy,
  LuLoaderCircle,
  LuMail,
  LuMapPin,
  LuSend,
} from "react-icons/lu";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { personalInfo } from "@/lib/data";
import { EASE, Reveal, SectionHeader, SpotlightCard } from "@/components/ui";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: personalInfo.web3formsKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="06"
          label="Get In Touch"
          title="Let's Build Something Together"
          subtitle="I am always open to discussing new software architectures, creative engineering ideas, or high-impact opportunities in enterprise fintech and intelligent systems."
          accent="tertiary"
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Pitch & Connectivity Links */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal className="space-y-3">
              {/* LinkedIn */}
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:border-primary/40 hover:bg-surface-high/80 hover:shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FaLinkedin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="label-mono text-[11px] text-on-surface-variant/70">LINKEDIN</p>
                    <p className="font-display text-[15px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                      Connect with me on LinkedIn
                    </p>
                  </div>
                </div>
                <LuArrowUpRight className="h-4 w-4 text-on-surface-variant transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>

              {/* Location */}
              <div className="glass flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-tertiary/10 text-tertiary">
                    <LuMapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="label-mono text-[11px] text-on-surface-variant/70">LOCATION</p>
                    <p className="font-display text-[15px] font-semibold text-on-surface">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
                <span className="badge-tag rounded bg-surface-highest/60 px-2 py-0.5 text-tertiary">
                  GMT +6
                </span>
              </div>

              {/* Direct Email with Copy */}
              <div className="glass flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <LuMail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="label-mono text-[11px] text-on-surface-variant/70">DIRECT EMAIL</p>
                    <p className="font-mono text-[13.5px] font-medium text-on-surface">
                      silomentus [at] gmail.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="badge-tag inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.08] bg-surface-high/80 px-2.5 py-1 text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-on-primary"
                >
                  {copiedEmail ? (
                    <>
                      <LuCheck className="h-3 w-3" /> Copied!
                    </>
                  ) : (
                    <>
                      <LuCopy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            </Reveal>

            {/* Social Icons row */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-2 pt-2">
                {[
                  { icon: FaGithub, href: personalInfo.socials.github, label: "GitHub" },
                  { icon: FaLinkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
                  { icon: FaFacebook, href: personalInfo.socials.facebook, label: "Facebook" },
                  { icon: FaInstagram, href: personalInfo.socials.instagram, label: "Instagram" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-white/[0.06] bg-surface-high/50 text-on-surface-variant transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-surface-high hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Modern Glass Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <SpotlightCard
                accent="primary"
                className="glass-strong rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
              >
                <h3 className="font-display text-[22px] font-bold tracking-tight text-on-surface sm:text-[24px]">
                  Send a Message
                </h3>
                <p className="mt-1 text-[13.5px] text-on-surface-variant">
                  Fill out the form below and I will get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="label-mono mb-1.5 block text-[11px] uppercase text-on-surface-variant"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Alex Turner"
                        className="w-full rounded-lg border border-white/[0.08] bg-surface-lowest/90 px-4 py-3 text-[14px] text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-low focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="label-mono mb-1.5 block text-[11px] uppercase text-on-surface-variant"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="alex@enterprise.com"
                        className="w-full rounded-lg border border-white/[0.08] bg-surface-lowest/90 px-4 py-3 text-[14px] text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-low focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="label-mono mb-1.5 block text-[11px] uppercase text-on-surface-variant"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Microservices Consultation / Opportunity"
                      className="w-full rounded-lg border border-white/[0.08] bg-surface-lowest/90 px-4 py-3 text-[14px] text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-low focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="label-mono mb-1.5 block text-[11px] uppercase text-on-surface-variant"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Hello Shoron, we are scaling our backend services and would love to connect..."
                      className="w-full resize-none rounded-lg border border-white/[0.08] bg-surface-lowest/90 px-4 py-3 text-[14px] text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-all duration-300 focus:border-primary/50 focus:bg-surface-low focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Feedback states */}
                  <AnimatePresence>
                    {status === "sent" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 rounded-lg border border-emerald/20 bg-emerald/10 p-3 text-[13px] text-emerald"
                      >
                        <LuCircleCheck className="h-4 w-4 shrink-0" />
                        <span>Thank you! Your dispatch has been transmitted. I will respond promptly.</span>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-[13px] text-red-400"
                      >
                        <LuCircleAlert className="h-4 w-4 shrink-0" />
                        <span>Transmission failed. Please try again or reach out directly via email.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="label-mono group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-on-primary shadow-[0_10px_30px_-8px_rgba(129,140,248,0.55)] transition-all duration-300 hover:bg-primary-container hover:shadow-[0_14px_40px_-6px_rgba(129,140,248,0.75)] disabled:opacity-50 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <LuLoaderCircle className="h-4 w-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <LuSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
