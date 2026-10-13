"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { setScrollLocked } from "@/components/SmoothScroll";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    setScrollLocked(isOpen);
    return () => setScrollLocked(false);
  }, [isOpen]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    purpose: "Full-Time Role",
    note: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: personalInfo.web3formsKey,
          subject: `[CV Access Request] ${formState.name} from ${formState.company}`,
          from_name: formState.name,
          email: formState.email,
          company: formState.company,
          purpose: formState.purpose,
          note: formState.note || "No additional note provided.",
          message: `CV Access Request Details:\n- Name: ${formState.name}\n- Work Email: ${formState.email}\n- Company / Organization: ${formState.company}\n- Inquiring For: ${formState.purpose}\n- Note: ${formState.note || "N/A"}`,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormState({
          name: "",
          email: "",
          company: "",
          purpose: "Full-Time Role",
          note: "",
        });
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
    padding: "11px 14px",
    fontSize: "13.5px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(17, 17, 24, 0.85)",
    color: "#f4f4f7",
    outline: "none",
    fontFamily: "var(--font-sans)",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          {/* Backdrop click to close */}
          <div
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0, 1] }}
            className="relative w-full max-w-lg overflow-hidden border border-white/[0.1] bg-[#0d0d13]"
            style={{
              borderRadius: "20px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Top Accent Gradient Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, #6366f1, #818cf8, #a855f7)",
              }}
            />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-text-muted/60 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="p-4 sm:p-7">
              {status === "success" ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center"
                  style={{ padding: "20px 8px 10px" }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(52, 211, 153, 0.12)",
                      border: "1px solid rgba(52, 211, 153, 0.25)",
                      color: "#34d399",
                      marginBottom: "18px",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h3
                    className="font-display font-bold text-text"
                    style={{
                      fontSize: "22px",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Access Request Sent
                  </h3>

                  <p
                    className="text-text-muted"
                    style={{
                      fontSize: "13.5px",
                      lineHeight: 1.65,
                      maxWidth: "380px",
                      margin: "0 auto 26px auto",
                    }}
                  >
                    Thank you! Your request has been routed directly to Shoron. A copy of the resume will be sent to your work email shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      onClose();
                    }}
                    className="inline-flex items-center justify-center font-sans font-medium text-white transition-all duration-200 cursor-pointer"
                    style={{
                      padding: "9px 28px",
                      fontSize: "13px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      boxShadow: "0 2px 12px rgba(99, 102, 241, 0.35)",
                    }}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* Request Form */
                <>
                  {/* Header */}
                  <div style={{ marginBottom: "22px" }}>
                    {/* Restricted Document Badge */}
                    <div
                      className="inline-flex items-center font-mono text-accent"
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        backgroundColor: "rgba(129, 140, 248, 0.1)",
                        border: "1px solid rgba(129, 140, 248, 0.2)",
                        gap: "6px",
                        marginBottom: "12px",
                        lineHeight: 1,
                        width: "fit-content",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Restricted Document</span>
                    </div>

                    <h3
                      className="font-display font-bold text-text mb-1 text-[18px] sm:text-[22px] tracking-tight"
                    >
                      Request Resume Access
                    </h3>

                    <p
                      className="text-text-muted text-[11px] sm:text-xs leading-relaxed"
                      style={{ lineHeight: 1.5 }}
                    >
                      Direct CV access is gated for hiring teams, recruiters, and engineering leaders. Provide your organization details below to receive access.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          className="font-mono text-text-muted/70 uppercase block mb-1"
                          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          style={inputStyle}
                          className="focus:!border-accent focus:!ring-1 focus:!ring-accent/30"
                        />
                      </div>

                      <div>
                        <label
                          className="font-mono text-text-muted/70 uppercase block mb-1"
                          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                        >
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          style={inputStyle}
                          className="focus:!border-accent focus:!ring-1 focus:!ring-accent/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          className="font-mono text-text-muted/70 uppercase block mb-1"
                          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                        >
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formState.company}
                          onChange={handleChange}
                          placeholder="e.g. Google / Acme Corp"
                          style={inputStyle}
                          className="focus:!border-accent focus:!ring-1 focus:!ring-accent/30"
                        />
                      </div>

                      <div>
                        <label
                          className="font-mono text-text-muted/70 uppercase block mb-1"
                          style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                        >
                          Inquiring For
                        </label>
                        <select
                          name="purpose"
                          value={formState.purpose}
                          onChange={handleChange}
                          style={{
                            ...inputStyle,
                            cursor: "pointer",
                          }}
                          className="focus:!border-accent focus:!ring-1 focus:!ring-accent/30"
                        >
                          <option value="Full-Time Role" style={{ backgroundColor: "#111118" }}>
                            Full-Time Role
                          </option>
                          <option value="Contract / Project" style={{ backgroundColor: "#111118" }}>
                            Contract / Project
                          </option>
                          <option value="Recruiter / Talent Team" style={{ backgroundColor: "#111118" }}>
                            Recruiter / Talent Team
                          </option>
                          <option value="Other Opportunity" style={{ backgroundColor: "#111118" }}>
                            Other Opportunity
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className="font-mono text-text-muted/70 uppercase block mb-1"
                        style={{ fontSize: "10px", letterSpacing: "0.06em" }}
                      >
                        Optional Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        value={formState.note}
                        onChange={handleChange}
                        placeholder="Brief message or role details..."
                        style={inputStyle}
                        className="focus:!border-accent focus:!ring-1 focus:!ring-accent/30"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-400 font-mono text-xs text-center">
                        Something went wrong. Please try again or reach out via contact form.
                      </p>
                    )}

                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="font-mono text-xs text-text-muted/80 hover:text-white px-4 py-2 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center justify-center font-sans font-medium text-xs text-white transition-all duration-200 cursor-pointer disabled:opacity-50"
                        style={{
                          padding: "9px 20px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                          boxShadow: "0 2px 12px rgba(99, 102, 241, 0.35)",
                          gap: "8px",
                        }}
                      >
                        {status === "submitting" ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Access</span>
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
