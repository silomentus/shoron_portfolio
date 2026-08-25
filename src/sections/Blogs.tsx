"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { blogs } from "@/lib/data";

export default function Blogs() {
  return (
    <section id="blogs" style={{ padding: "140px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeading title="Blogs" subtitle="Writing & Insights" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "28px",
          }}
        >
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: [0.25, 0.1, 0, 1],
              }}
              whileHover={{ y: -6 }}
              className="group"
              style={{ position: "relative" }}
            >
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full glass-card-hover flex flex-col justify-between"
                style={{
                  padding: "36px",
                  borderRadius: "20px",
                  border: "1px solid rgba(129, 140, 248, 0.12)",
                  background: "rgba(17, 17, 24, 0.65)",
                  textDecoration: "none",
                }}
              >
                <div>
                  {/* Category, Platform & Read Time */}
                  <div
                    className="flex items-center justify-between flex-wrap"
                    style={{ gap: "10px", marginBottom: "22px" }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        padding: "5px 12px",
                        fontSize: "11px",
                        borderRadius: "6px",
                        background: "rgba(129, 140, 248, 0.1)",
                        color: "var(--color-accent-light)",
                        border: "1px solid rgba(129, 140, 248, 0.15)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {blog.category}
                    </span>

                    <span
                      className="font-mono text-text-muted/60"
                      style={{ fontSize: "12px" }}
                    >
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display font-bold text-text group-hover:text-accent transition-colors duration-300"
                    style={{
                      fontSize: "22px",
                      lineHeight: 1.35,
                      marginBottom: "14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-text-muted leading-relaxed"
                    style={{
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                      marginBottom: "24px",
                    }}
                  >
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div
                    className="flex flex-wrap"
                    style={{ gap: "6px", marginBottom: "28px" }}
                  >
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono"
                        style={{
                          padding: "4px 10px",
                          fontSize: "11px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(12, 12, 17, 0.8)",
                          border: "1px solid rgba(129, 140, 248, 0.12)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link / Platform Callout */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span
                    className="font-mono text-text-muted/70"
                    style={{ fontSize: "12px" }}
                  >
                    Published on <span className="text-text-muted font-medium">{blog.platform}</span>
                  </span>

                  <span
                    className="inline-flex items-center font-mono font-medium text-accent group-hover:text-accent-light transition-colors"
                    style={{ gap: "6px", fontSize: "12px" }}
                  >
                    <span>Read Post</span>
                    <svg
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                      style={{ width: "13px", height: "13px" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
