"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { ProjectArchitectureVisual } from "@/components/project-architecture-visual";
import { motionConfig, projects } from "@/lib/data";

const easeOutQuad = motionConfig.ease;
const featuredProjects = projects.slice(0, 2);
const additionalProjects = projects.slice(2);
const projectDomains = [
  "Agentic Operations",
  "Industrial Intelligence",
  "AI Education",
  "Health Platforms",
  "Predictive ML",
] as const;

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      aria-labelledby="work-heading"
      className="portfolio-chapter portfolio-chapter--work section-shell section-spacing"
      id="work"
      ref={sectionRef}
    >
      <motion.p
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: easeOutQuad }}
      >
        Projects
      </motion.p>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.08 }}
      >
        <h2 className="section-heading" id="work-heading">
          Systems selected for signal, scale, and measurable impact.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">
          A concise index of production work. Open any project for the full
          challenge, architecture, engineering decisions, and outcomes.
        </p>
      </motion.div>

      <div className="relative mt-12 space-y-6 sm:mt-14">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-12 top-1/3 -z-10 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_7%,transparent),transparent_70%)] blur-3xl"
        />

        {featuredProjects.map((project, index) => (
          <motion.article
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="group relative isolate overflow-hidden rounded-lg border border-border bg-card/58 shadow-inset transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent/35 hover:shadow-elevated"
            initial={{ opacity: 0, y: 30 }}
            key={project.slug}
            transition={{
              duration: 0.56,
              ease: easeOutQuad,
              delay: 0.14 + index * 0.1,
            }}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
                index === 0
                  ? "bg-gradient-to-r from-accent via-accent-secondary to-transparent"
                  : "bg-gradient-to-r from-signal via-accent-secondary to-transparent"
              }`}
            />

            <Link
              aria-label={`View case study: ${project.title}`}
              className="focus-ring block rounded-lg"
              href={`/work/${project.slug}`}
            >
              <div className="pointer-events-none grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
                <div className="relative flex flex-col border-b border-border/80 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-accent">
                        /{project.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-7 bg-border-strong"
                      />
                      <span className="technical-label text-muted-foreground">
                        {projectDomains[index]}
                      </span>
                    </div>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background/65 text-muted-foreground shadow-inset transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-white">
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </span>
                  </div>

                  <div className="my-auto py-8 lg:py-12">
                    <h3 className="max-w-[14ch] font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[0.94] transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-border/70 pt-5">
                    {project.metrics.map((metric) => (
                      <span className="min-w-0" key={metric.label}>
                        <span className="metric-value block truncate text-base font-semibold text-foreground sm:text-xl">
                          {metric.value}
                        </span>
                        <span className="technical-label mt-1 block text-[0.56rem] text-muted-foreground sm:text-[0.62rem]">
                          {metric.label}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-0 flex-col bg-background/32 p-3 sm:p-5 lg:p-7">
                  <div className="relative min-h-[15rem] flex-1 overflow-hidden rounded-lg border border-border/80 bg-background/62 p-2 shadow-inset transition-colors duration-300 group-hover:border-border-strong sm:min-h-[23rem] sm:p-3">
                    <ProjectArchitectureVisual
                      projectNumber={project.number}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span className="pill" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
                      Read case study
                      <ArrowRight
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                        size={16}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="mt-14 flex items-end justify-between border-b border-border pb-5"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.48, ease: easeOutQuad, delay: 0.24 }}
      >
        <div>
          <p className="technical-label text-muted-foreground">
            More Selected Systems
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold">
            Additional projects
          </h3>
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground sm:block">
          03 - 05
        </span>
      </motion.div>

      <div className="divide-y divide-border">
        {additionalProjects.map((project, index) => {
          const projectIndex = index + 2;

          return (
            <motion.article
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              className="group relative isolate"
              initial={{ opacity: 0, y: 22 }}
              key={project.slug}
              transition={{
                duration: 0.46,
                ease: easeOutQuad,
                delay: 0.26 + index * 0.07,
              }}
            >
              <Link
                aria-label={`View case study: ${project.title}`}
                className="focus-ring relative grid gap-5 overflow-hidden rounded-lg px-1 py-7 transition-colors duration-300 hover:bg-card/48 sm:px-4 lg:grid-cols-[4rem_minmax(0,0.9fr)_minmax(18rem,0.75fr)_auto] lg:items-center [&>*]:pointer-events-none"
                href={`/work/${project.slug}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gradient-to-b from-accent via-accent-secondary to-transparent transition-transform duration-500 group-hover:scale-y-100"
                />

                <div className="flex items-center gap-3 lg:block">
                  <span className="font-mono text-sm font-bold text-accent">
                    /{project.number}
                  </span>
                  <p className="technical-label mt-0 text-muted-foreground lg:mt-2">
                    {projectDomains[projectIndex]}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-bold transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {project.title}
                    </h3>
                    <span className="rounded-full border border-warm/30 bg-warm/10 px-2.5 py-1 font-mono text-[0.65rem] font-semibold text-warm">
                      {project.label ?? "Case Study"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                    {project.tags.map((tag) => (
                      <span className="pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden h-36 overflow-hidden rounded-lg border border-border/80 bg-background/55 p-2 shadow-inset transition-colors duration-300 group-hover:border-accent/25 lg:block">
                  <ProjectArchitectureVisual projectNumber={project.number} />
                </div>

                <span className="inline-flex items-center gap-3 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-accent">
                  Read story
                  <span className="grid size-9 place-items-center rounded-full border border-border bg-background/55 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </span>
                </span>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
