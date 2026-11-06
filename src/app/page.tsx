"use client";
import { useEffect, useRef, useState } from "react";
import { personalInfo, industryProjects, academicProjects, experience, blogs, skills, education } from "@/lib/data";
import "./redesign.css";
import ArrowIcon from "@/components/ArrowIcon";
import { CVDialog, InquiryForm } from "@/components/InquiryForm";

function BrandMark() {
  return <svg className="brand-symbol" viewBox="0 0 80 80" fill="none" aria-hidden="true">
    <path className="symbol-back" d="M40 8 69 25v30L40 72 11 55V25L40 8Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m40 8 29 17-29 17-29-17L40 8Z" fill="currentColor" fillOpacity=".15"/>
    <path d="m11 25 29 17 29-17M40 42v30" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m25 34 29-17M25 34v29M54 34v29" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}

function ProjectIllustration({ index }: { index: number }) {
  return <svg className="project-illustration" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
    {index === 0 ? <>
      <path className="flow-line" d="M160 130H210M390 130h50M300 65V30M300 195v35" />
      <rect className="art-panel" x="210" y="65" width="180" height="130" rx="16" />
      <text x="230" y="94" className="art-label-small">CORE MICROFINANCE</text>
      <text x="230" y="135" className="art-number">790k+</text>
      <text x="230" y="161" className="art-label-small">MEMBERS SUPPORTED</text>
      {[60,440].map((x,i)=><g key={x}><rect className="art-panel" x={x} y="100" width="100" height="60" rx="10"/><text x={x+15} y="135" className="art-label-small">{i ? "LEDGER" : "BRANCHES"}</text></g>)}
      <circle className="signal-dot" cx="185" cy="130" r="5"/><circle className="signal-dot" cx="415" cy="130" r="5"/>
    </> : index === 1 ? <>
      <path className="flow-line" d="M247 110 156 75M353 110 444 75M247 152 156 189M353 152 444 189"/>
      {[ [130,65],[470,65],[130,200],[470,200] ].map(([x,y],i)=><g key={i}><circle className="art-panel" cx={x} cy={y} r="28"/><circle className="signal-dot" cx={x} cy={y} r="7"/></g>)}
      <circle className="art-panel" cx="300" cy="130" r="57"/><text className="art-label-small" x="300" y="134" textAnchor="middle">FIELD SYNC</text>
    </> : index === 2 ? <>
      <rect className="art-panel" x="130" y="40" width="340" height="180" rx="16"/>
      <path className="flow-line" d="M155 140h65l22-40 28 85 38-110 28 65h108"/>
      <text className="art-label-small" x="155" y="70">CONNECTED CARE</text><circle className="signal-dot" cx="441" cy="65" r="5"/>
      <path stroke="currentColor" opacity=".3" d="M155 197h100m15 0h50"/>
    </> : index === 3 ? <>
      {[0,1,2].map(i=><g key={i} transform={`translate(${140+i*100} ${60+i*20})`}><rect className="art-panel" width="120" height="130" rx="12"/><path stroke="currentColor" opacity=".5" d="M22 35h76M22 55h50M22 90h76"/><circle className="signal-dot" cx="85" cy="105" r="5"/></g>)}
    </> : index === 4 ? <>
      <path className="flow-line" d="M170 130h85M345 130h85"/>
      {[125,300,475].map((x,i)=><g key={x}><rect className="art-panel" x={x-45} y="85" width="90" height="90" rx="20"/><path stroke="currentColor" strokeWidth="3" d={`m${x-12} 129 9 9 18-20`}/><text x={x} y="205" textAnchor="middle" className="art-label-small">{["REQUEST","APPROVE","AUDIT"][i]}</text></g>)}
    </> : <>
      <path className="flow-line" d="M180 130h240"/>
      {[145,255,365].map((x,i)=><g key={x}><rect className="art-panel" x={x} y={60+i*15} width="90" height="120" rx="10"/><path stroke="currentColor" d={`m${x+25} ${100+i*15} 20-12 20 12v25l-20 12-20-12Z`}/><path stroke="currentColor" opacity=".4" d={`M${x+20} ${155+i*15}h50`}/></g>)}
    </>}
  </svg>;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        root.current?.style.setProperty("--reading-progress", String(total > 0 ? window.scrollY / total : 0));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const [motionPaused, setMotionPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (media.matches || motionPaused) return;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: "translateY(65px) scale(.96)" }, { opacity: 1, transform: "translateY(0) scale(1)" }],
          { duration: 1000, easing: "cubic-bezier(.2,.7,.2,1)", delay: Number((entry.target as HTMLElement).dataset.motionDelay || 0), fill: "backwards" }
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { threshold: 0.08 });
    root.current?.querySelectorAll(".section-top, .section-title, .project, .about-grid > *, .stats > *, .experience-grid > *, .toolkit details, .articles > a, .contact h2, .contact-bottom").forEach((element) => {
      if (element.matches(".project, .articles > a, .stats > *")) {
        const index = Array.from(element.parentElement!.children).indexOf(element);
        (element as HTMLElement).dataset.motionDelay = String((index % 3) * 70);
      }
      observer.observe(element);
    });
    const stopMotion = () => { if (media.matches) animations.forEach(animation => animation.cancel()); };
    media.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      media.removeEventListener("change", stopMotion);
    };
  }, [motionPaused]);
  const projects = [industryProjects[2], industryProjects[0], industryProjects[4], industryProjects[1], industryProjects[3], industryProjects[5]];
  return <div className={`folio${motionPaused ? " motion-paused" : ""}`} ref={root}>
    <button className="motion-toggle" onClick={() => setMotionPaused(p => !p)} aria-pressed={motionPaused}>{motionPaused ? "▶ Play motion" : "Ⅱ Pause motion"}</button>
    <div className="reading-progress" aria-hidden="true"/>
    <a className="skip" href="#main">Skip to content</a>
    <header className="nav"><a className="wordmark" href="#"><span className="brand-emblem"><BrandMark /></span>shoron</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#research">Research</a><a href="#journal">Journal</a></nav><button className="nav-contact cv-trigger" onClick={() => setCvOpen(true)}>Request CV <span><ArrowIcon /></span></button></header>
    <main id="main">
      <section className="hero" onPointerMove={event => {
        if (motionPaused || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 65}px`);
        event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - .5) * 45}px`);
      }} onPointerLeave={event => {
        event.currentTarget.style.setProperty("--pointer-x", "0px");
        event.currentTarget.style.setProperty("--pointer-y", "0px");
      }}>
        <div className="eyebrow"><span><i /> SOFTWARE ENGINEER / DHAKA, BD</span><span>INDEPENDENT MIND. SYSTEMS THINKER.</span></div>
        <div className="hero-heading"><h1>Behind every<br/>great <em>experience,</em><br/>a better system.</h1><div className="hero-emblem" aria-hidden="true"><BrandMark /></div></div>
        <div className="hero-bottom"><div className="identity"><span className="mono">MEET THE ENGINEER</span><p className="full-name">Md. Harun Or Rashid</p><span className="identity-alias">You can call me Shoron.</span><button className="inline-cv" onClick={() => setCvOpen(true)}>Request my CV <ArrowIcon /></button></div><p>I’m Shoron, a software engineer who enjoys building useful software, learning new technologies, and exploring different areas of development.</p><a className="round-link" href="#work" aria-label="Explore selected work"><ArrowIcon direction="down-left" /></a></div>
        <div className="system-strip"><div className="marquee-track">{[0,1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}><span>BACKEND ENGINEERING</span><b><ArrowIcon /></b><span>THOUGHTFUL ARCHITECTURE</span><b><ArrowIcon /></b><span>APPLIED INTELLIGENCE</span><b><ArrowIcon /></b></div>)}</div></div>
      </section>
      <section id="work" className="work section"><div className="section-top"><span className="mono">02 / SELECTED WORK</span><span className="mono">REAL PROBLEMS. WORKING SYSTEMS.</span></div><div className="section-title"><h2>Built for<br/><em>the real world.</em></h2><p>Enterprise software, built around real needs.<br/>Explore the systems I’ve helped bring to life.</p></div>
      <div className="project-list featured-projects">{projects.map((p,i)=><article key={p.title} className="project"><div className="project-heading"><div className={`project-visual visual-${i}`} aria-hidden="true"><span className="visual-index">{i === 0 ? "FEATURED SYSTEM" : "SYSTEM / 0" + (i+1)}</span><ProjectIllustration index={i} /><span className="visual-caption">{["TRANSACTION / LEDGER / INSIGHT", "CONNECT / SYNC / COORDINATE", "CARE / RECORD / CONNECT", "MEMBERS / FINANCE / GOVERNANCE", "REQUEST / APPROVE / AUDIT", "CATALOG / CHECKOUT / FULFILL"][i]}</span></div><div><span className="mono category">{p.category}</span><h3>{p.title}</h3><p>{p.subtitle}</p></div></div><div className="project-detail"><p>{p.description}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div></div></article>)}</div></section>
      <section id="experience" className="experience section"><div className="section-top"><span className="mono">03 / EXPERIENCE & TOOLKIT</span></div><div className="experience-grid"><h2>Always <em>building.</em></h2><div className="experience-content">{experience.map(e=><article className="job" key={e.company}><span className="mono">{e.duration}</span>
<div className="job-role"><h3>{e.role}</h3></div>
<div className="job-company"><a href={e.website} target="_blank" rel="noreferrer">{e.company} <ArrowIcon /></a><span className="job-affiliation">A Portfolio Company of <a href={e.parentCompany.url} target="_blank" rel="noreferrer">{e.parentCompany.name} <ArrowIcon /></a></span></div>
<p className="company-description">{e.description}</p>
<p>{e.responsibilities[0]}</p><div className="tags">{e.tech.map(t=><span key={t}>{t}</span>)}</div></article>)}<section className="education" aria-labelledby="education-heading">
  <h3 id="education-heading" className="education-heading">Education</h3>
  <ol className="education-timeline">
    {education.map(entry => <li key={entry.institution}>
      <span className="mono education-date">{entry.duration}</span>
      <h4>{entry.institution}</h4>
      <p>{entry.degree}</p>
      <span className="education-result">{entry.result}</span>
    </li>)}
  </ol>
</section></div></div><div className="toolkit">{[{name:"Languages",items:skills.languages.map(s=>s.name)},{name:"Backend & architecture",items:skills.backend},{name:"AI & machine learning",items:skills.aiml},{name:"Tools & infrastructure",items:skills.tools}].map((g,i)=><details key={g.name}><summary><span className="mono">0{i+1}</span>{g.name}<span>+</span></summary><div className="tags">{g.items.map(t=><span key={t}>{t}</span>)}</div></details>)}</div></section>
      <section id="about" className="about section"><div className="section-top"><span className="mono">04 / BACKGROUND & APPROACH</span><span className="mono">CURIOSITY / CLARITY / CODE</span></div><div className="about-grid"><div className="system-art" aria-label="Illustration of interconnected software layers"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="core core-emblem"><BrandMark /></span><span className="art-label">SYSTEMS, CONNECTED.</span><span className="node n1">API</span><span className="node n2">DATA</span><span className="node n3">LOGIC</span></div><div><h2>Complexity in.<br/><em>Clarity out.</em></h2><p className="about-lead">Good software starts with understanding what matters.</p><p>{personalInfo.summary}</p><p>I work across enterprise platforms, fintech, and applied machine learning. My focus is on the details that make a system trustworthy: clean architecture, reliable data, and thoughtful performance.</p><a className="text-link" href={personalInfo.socials.github} target="_blank" rel="noreferrer">Explore my GitHub <ArrowIcon /></a></div></div><div className="stats"><div><strong>790k<span>+</span></strong><p>Members served by a platform I contribute to</p></div><div><strong>390<span>+</span></strong><p>Branches supported by that platform</p></div><div><strong>15–20<span>%</span></strong><p>Query latency improvement delivered</p></div></div></section>
      <section id="research" className="research section"><div className="section-top"><span className="mono">05 / RESEARCH & EXPERIMENTS</span><span className="mono">A SPACE FOR CURIOSITY</span></div><div className="section-title"><h2>Beyond<br/><em>production.</em></h2><p>Academic explorations in machine learning,<br/>computer vision, and software engineering.</p></div><div className="research-list">{academicProjects.map((p,i)=><details className="project" key={p.title}><summary><span className="project-number">0{i+1}</span><div><span className="mono category">{p.category}</span><h3>{p.title}</h3></div><span className="project-arrow"><ArrowIcon /></span></summary><div className="project-detail"><p>{p.description}</p><div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div></div></details>)}</div></section>
      <section id="journal" className="journal section"><div className="section-top"><span className="mono">06 / NOTES & PERSPECTIVES</span></div><div className="section-title"><h2>Thinking<br/><em>out loud.</em></h2><p>Ideas from the intersection of<br/>software, intelligence, and everyday work.</p></div><div className="articles">{blogs.map((b,i)=><a key={b.title} href={b.url} target="_blank" rel="noreferrer"><div className="article-art" aria-hidden="true"><span>{i===0?<ArrowIcon />:i===1?"◎":"✳"}</span><small>FIELD NOTES / 0{i+1}</small></div><span className="mono">{b.category} · {b.readTime}</span><h3>{b.title} <span><ArrowIcon /></span></h3><p>{b.description}</p></a>)}</div></section>
      <section id="contact" className="contact section"><div className="section-top"><span className="mono">07 / YOUR NEXT IDEA STARTS HERE</span><span className="mono">DHAKA, BANGLADESH / UTC +6</span></div><h2>Let’s make<br/><em>something matter.</em> <span><ArrowIcon /></span></h2><div className="message-layout"><div className="message-intro"><span className="mono">HAVE SOMETHING IN MIND?</span><h3>Send a message.</h3><p>A project, a role, or an idea worth exploring — I’d love to hear about it.</p><button className="inline-cv" onClick={() => setCvOpen(true)}>Hiring? Request my CV <ArrowIcon /></button></div><InquiryForm /></div><div className="contact-bottom"><div><a className="email" href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a><button className="copy" onClick={async()=>{try{await navigator.clipboard.writeText(personalInfo.email);setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{setCopied(false)}}} aria-label="Copy email address">{copied?"Copied ✓":<>Copy <ArrowIcon /></>}</button><span role="status" className="sr-only">{copied?"Email copied":""}</span></div><a href={`mailto:${personalInfo.email}?subject=Let%E2%80%99s%20work%20together`} className="contact-button">Start a conversation <ArrowIcon /></a></div></section>
    </main><CVDialog open={cvOpen} onClose={() => setCvOpen(false)} /><footer><a className="wordmark" href="#"><span className="brand-emblem"><BrandMark /></span>shoron</a><span className="mono">© {new Date().getFullYear()} Md. Harun Or Rashid</span><div>{Object.entries(personalInfo.socials).map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name} <ArrowIcon /></a>)}</div><a href="#">Back to top <ArrowIcon direction="up" /></a></footer>
  </div>;
}
