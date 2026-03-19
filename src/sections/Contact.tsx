"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="glass-card-hover flex items-center justify-center"
      style={{ width: "48px", height: "48px", borderRadius: "12px" }}
      aria-label={label}
    >
      {children}
    </motion.a>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

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
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontSize: "14px",
    borderRadius: "12px",
    border: "1px solid var(--color-border)",
    backgroundColor: "rgba(17, 17, 24, 0.6)",
    color: "var(--color-text)",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "var(--font-sans)",
  };

  return (
    <section id="contact" style={{ padding: "140px 24px" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-mono uppercase"
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted"
            style={{
              fontSize: "16px",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            I&apos;m always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="md:!grid-cols-contact"
        >
          {/* Left — Info + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          >
            {/* Info cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "36px",
              }}
            >
              {/* LinkedIn */}
              <motion.a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="glass-card-hover group flex items-center"
                style={{
                  padding: "20px 22px",
                  borderRadius: "14px",
                  gap: "16px",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(167, 139, 250, 0.06))",
                  }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                      marginBottom: "3px",
                    }}
                  >
                    LinkedIn
                  </p>
                  <p
                    className="text-text/80 group-hover:text-accent transition-colors duration-500"
                    style={{ fontSize: "14px" }}
                  >
                    Connect with me
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                whileHover={{ y: -2 }}
                className="glass-card-hover flex items-center"
                style={{
                  padding: "20px 22px",
                  borderRadius: "14px",
                  gap: "16px",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(167, 139, 250, 0.06))",
                  }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                      marginBottom: "3px",
                    }}
                  >
                    Location
                  </p>
                  <p className="text-text/80" style={{ fontSize: "14px" }}>
                    {personalInfo.location}
                  </p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.a
                href="mailto:silomentus@gmail.com"
                whileHover={{ y: -2 }}
                className="glass-card-hover group flex items-center"
                style={{
                  padding: "20px 22px",
                  borderRadius: "14px",
                  gap: "16px",
                  textDecoration: "none",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "11px",
                    background:
                      "linear-gradient(135deg, rgba(129, 140, 248, 0.12), rgba(167, 139, 250, 0.06))",
                  }}
                >
                  <svg
                    className="text-accent"
                    style={{ width: "18px", height: "18px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.05em",
                      marginBottom: "3px",
                    }}
                  >
                    Email
                  </p>
                  <p
                    className="text-text/80 group-hover:text-accent transition-colors duration-500"
                    style={{ fontSize: "14px" }}
                  >
                    silomentus@gmail.com
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Social buttons */}
            <div>
              <p
                className="text-text-muted/70 font-mono uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  marginBottom: "14px",
                }}
              >
                Socials
              </p>
              <div className="flex" style={{ gap: "10px" }}>
                {/* GitHub */}
                <SocialButton
                  href={personalInfo.socials.github}
                  label="GitHub"
                >
                  <svg
                    className="text-text-muted group-hover:text-accent transition-colors"
                    style={{ width: "20px", height: "20px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </SocialButton>

                {/* LinkedIn */}
                <SocialButton
                  href={personalInfo.socials.linkedin}
                  label="LinkedIn"
                >
                  <svg
                    className="text-text-muted group-hover:text-accent transition-colors"
                    style={{ width: "18px", height: "18px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialButton>

                {/* Facebook */}
                <SocialButton
                  href={personalInfo.socials.facebook}
                  label="Facebook"
                >
                  <svg
                    className="text-text-muted group-hover:text-accent transition-colors"
                    style={{ width: "18px", height: "18px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </SocialButton>

                {/* Instagram */}
                <SocialButton
                  href={personalInfo.socials.instagram}
                  label="Instagram"
                >
                  <svg
                    className="text-text-muted group-hover:text-accent transition-colors"
                    style={{ width: "18px", height: "18px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </SocialButton>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.1, 0, 1],
            }}
          >
            <div
              className="glass-card"
              style={{ padding: "36px", borderRadius: "20px" }}
            >
              <h3
                className="font-display font-semibold text-text"
                style={{
                  fontSize: "20px",
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                Send a Message
              </h3>
              <p
                className="text-text-muted/80"
                style={{ fontSize: "14px", marginBottom: "32px" }}
              >
                Fill out the form and I&apos;ll get back to you as soon as
                possible.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div>
                  <label
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="text-text-muted/80 font-mono uppercase"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="text-white font-semibold transition-all duration-500 disabled:opacity-50"
                  style={{
                    padding: "15px 32px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    border: "none",
                    cursor:
                      status === "sending" ? "not-allowed" : "pointer",
                    marginTop: "8px",
                    background:
                      "linear-gradient(135deg, var(--color-accent-dark), var(--color-accent))",
                    boxShadow: "0 4px 24px rgba(99, 102, 241, 0.25)",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                    ? "Message Sent!"
                    : status === "error"
                    ? "Failed — Try Again"
                    : "Send Message"}
                </motion.button>

                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-center"
                    style={{ fontSize: "13px" }}
                  >
                    Thanks! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .md\\:!grid-cols-contact {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
      `}</style>
    </section>
  );
}
