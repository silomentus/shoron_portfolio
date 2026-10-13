"use client";

import { LuArrowUpRight, LuBookOpen } from "react-icons/lu";
import { blogs } from "@/lib/data";
import { Reveal, SectionHeader, SpotlightCard, Stagger, StaggerItem, Tag } from "@/components/ui";

export default function Blogs() {
  return (
    <section id="writing" className="relative py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Writing & Insights"
          title="Technical Publications"
          subtitle="Published technical essays on developer augmentation and transformer architectures."
          accent="cyan"
        />

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.15}>
          {blogs.map((blog, idx) => {
            const isFirst = idx === 0;
            const accent = isFirst ? "primary" : "secondary";
            return (
              <StaggerItem key={blog.title} className="h-full">
                <SpotlightCard
                  as="a"
                  href={blog.url}
                  target="_blank"
                  rel="noreferrer"
                  accent={accent}
                  className="hairline-top glass flex h-full flex-col justify-between rounded-2xl p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)] sm:p-8"
                >
                  <span className="hairline opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <Tag tone={accent}>{blog.category}</Tag>
                      <span className="label-mono text-on-surface-variant/70">{blog.readTime}</span>
                    </div>

                    <h3 className="font-display text-[20px] font-bold leading-snug tracking-tight text-on-surface transition-colors duration-300 group-hover:text-primary sm:text-[22px]">
                      {blog.title}
                    </h3>

                    <p className="text-[14px] leading-relaxed text-on-surface-variant">
                      {blog.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="badge-tag rounded bg-surface-lowest/80 px-2 py-0.5 text-on-surface-variant/70"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <span className="badge-tag text-on-surface-variant/80">
                      Published on <span className="text-on-surface font-medium">{blog.platform}</span>
                    </span>

                    <div
                      className={`inline-flex items-center gap-1 font-mono text-[12px] font-semibold transition-colors duration-300 ${
                        isFirst ? "text-primary" : "text-secondary"
                      }`}
                    >
                      <span className="group-hover:underline">Read Post</span>
                      <LuArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
