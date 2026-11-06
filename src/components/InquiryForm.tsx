"use client";
import { useEffect, useId, useRef, useState } from "react";
import ArrowIcon from "@/components/ArrowIcon";
import { personalInfo } from "@/lib/data";

export function InquiryForm({ cv = false }: { cv?: boolean }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const pending = useRef(false);
  return <form className="inquiry-form" aria-busy={status === "sending"} onSubmit={async event => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    if (fields.botcheck) return;
    pending.current = true;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ ...fields, access_key: personalInfo.web3formsKey,
          ...(cv ? { subject: `[CV Access Request] ${fields.name} from ${fields.company}`, from_name: fields.name,
            message: `CV Access Request\nName: ${fields.name}\nCompany: ${fields.company}\nPurpose: ${fields.purpose}\nNote: ${fields.note || "No additional note provided."}` } : {}) }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
    } catch { setStatus("error"); }
    finally { pending.current = false; }
  }}>
    <fieldset disabled={status === "sending"}>
      <div className="inquiry-pair">
        <label htmlFor={`${id}-name`}>Name<input id={`${id}-name`} name="name" autoComplete="name" required maxLength={150} placeholder="Your name" /></label>
        <label htmlFor={`${id}-email`}>{cv ? "Work email" : "Email"}<input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      </div>
      {cv ? <>
        <label htmlFor={`${id}-company`}>Company / organization<input id={`${id}-company`} name="company" autoComplete="organization" required maxLength={200} placeholder="Where you work" /></label>
        <label htmlFor={`${id}-purpose`}>Inquiring for<select id={`${id}-purpose`} name="purpose"><option>Full-Time Role</option><option>Contract / Freelance</option><option>Collaboration</option><option>Other</option></select></label>
        <label htmlFor={`${id}-note`}>Additional note <span>(optional)</span><textarea id={`${id}-note`} name="note" rows={3} maxLength={5000} placeholder="Tell me a little about the opportunity" /></label>
      </> : <>
        <label htmlFor={`${id}-subject`}>Subject<input id={`${id}-subject`} name="subject" required maxLength={200} placeholder="What would you like to build?" /></label>
        <label htmlFor={`${id}-message`}>Message<textarea id={`${id}-message`} name="message" rows={5} required maxLength={10000} placeholder="Tell me about your project or opportunity…" /></label>
      </>}
      <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex={-1} aria-hidden="true" />
      <button className="contact-button" type="submit">{status === "sending" ? "Sending…" : <>{cv ? "Request CV" : "Send message"} <ArrowIcon /></>}</button>
    </fieldset>
    <div className={`form-status status-${status}`} role="status" aria-live="polite">
      {status === "sent" && (cv ? "Your CV request has been sent. I’ll get back to you by email." : "Thanks! Your message has been sent.")}
      {status === "error" && <>Couldn’t send this time. Please try again or <a href={`mailto:${personalInfo.email}`}>email me directly</a>.</>}
    </div>
  </form>;
}

export function CVDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) { dialog.current?.close(); return; }
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);
  return <dialog className="cv-dialog" ref={dialog} onClose={onClose} aria-labelledby="cv-heading" onClick={event => {
    if (event.target === event.currentTarget) {
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
    }
  }}>
    <button type="button" className="dialog-close" onClick={onClose} aria-label="Close CV request">×</button>
    <span className="mono">LET’S WORK TOGETHER</span><h2 id="cv-heading">Request my CV.</h2>
    <p>Share a few details about the opportunity, and I’ll follow up by email.</p>
    <InquiryForm cv />
  </dialog>;
}
