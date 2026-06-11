import type { Metadata } from "next";
import { ArrowLeft, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { PrintResumeButton } from "@/components/print-resume-button";
import {
  certifications,
  experienceEntries,
  projects,
  siteConfig,
  skillCategories,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `${siteConfig.name}'s AI Engineer resume, experience, projects, and technical skills.`,
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

export default function ResumePage() {
  return (
    <main className="resume-page min-h-screen bg-background text-foreground">
      <div className="resume-toolbar section-shell flex items-center justify-between gap-4 py-5">
        <Link
          className="focus-ring group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/65 px-4 text-sm font-semibold shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-soft"
          href="/"
        >
          <ArrowLeft
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
            size={17}
          />
          Back to portfolio
        </Link>
        <PrintResumeButton />
      </div>

      <article className="resume-sheet relative mx-auto mb-12 max-w-[980px] overflow-hidden border border-border bg-white px-6 py-10 text-zinc-950 shadow-elevated sm:px-10 lg:px-14">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-700 via-cyan-600 to-emerald-600"
        />
        <header className="border-b-2 border-zinc-900 pb-6">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs font-bold uppercase text-indigo-700">
              AI Engineer
            </p>
            <BrandMark />
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-700">
            Production-focused AI Engineer with 4+ years building agentic
            pipelines, RAG systems, real-time ML infrastructure, and scalable
            cloud applications.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-zinc-200 pt-4 text-xs font-medium text-zinc-700">
            <li className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" size={14} />
              {siteConfig.location}
            </li>
            <li>
              <a className="inline-flex items-center gap-1.5" href={`mailto:${siteConfig.email}`}>
                <Mail aria-hidden="true" size={14} />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1.5" href="tel:+17349379247">
                <Phone aria-hidden="true" size={14} />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1.5" href={siteConfig.linkedin}>
                <Linkedin aria-hidden="true" size={14} />
                LinkedIn
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1.5" href={siteConfig.github}>
                <Github aria-hidden="true" size={14} />
                GitHub
              </a>
            </li>
          </ul>
        </header>

        <section className="resume-section mt-8" aria-labelledby="resume-experience">
          <h2
            className="text-sm font-bold uppercase tracking-widest text-indigo-700"
            id="resume-experience"
          >
            Experience
          </h2>
          <div className="mt-4 space-y-7">
            {experienceEntries.map((entry) => (
              <article className="resume-entry" key={`${entry.role}-${entry.company}`}>
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-bold">
                      {entry.role} | {entry.company}
                    </h3>
                    {entry.client ? (
                      <p className="mt-1 text-sm font-semibold text-zinc-700">
                        Client: {entry.client}
                      </p>
                    ) : null}
                  </div>
                  <p className="shrink-0 text-xs font-semibold text-zinc-600 sm:text-right">
                    {entry.dateRange}
                    <br />
                    {entry.location}
                  </p>
                </div>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-5 text-zinc-700">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section mt-8" aria-labelledby="resume-projects">
          <h2
            className="text-sm font-bold uppercase tracking-widest text-indigo-700"
            id="resume-projects"
          >
            Selected Projects
          </h2>
          <div className="mt-4 grid gap-5">
            {projects.slice(0, 3).map((project) => (
              <article className="resume-entry" key={project.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-xs font-semibold text-zinc-600">
                    {project.tags.join(" | ")}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-5 text-zinc-700">
                  {project.summary} {project.impact}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section mt-8" aria-labelledby="resume-skills">
          <h2
            className="text-sm font-bold uppercase tracking-widest text-indigo-700"
            id="resume-skills"
          >
            Technical Skills
          </h2>
          <dl className="mt-4 grid gap-2 text-sm leading-5">
            {skillCategories.map((category) => (
              <div className="grid gap-1 sm:grid-cols-[190px_1fr]" key={category.title}>
                <dt className="font-bold">{category.title}</dt>
                <dd className="text-zinc-700">{category.skills.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="resume-section mt-8 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="resume-education">
            <h2
              className="text-sm font-bold uppercase tracking-widest text-indigo-700"
              id="resume-education"
            >
              Education
            </h2>
            <p className="mt-4 font-bold">Master&apos;s in Computer Science</p>
            <p className="mt-1 text-sm text-zinc-700">
              Lawrence Technological University
            </p>
          </section>

          <section aria-labelledby="resume-certifications">
            <h2
              className="text-sm font-bold uppercase tracking-widest text-indigo-700"
              id="resume-certifications"
            >
              Certifications
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm text-zinc-700">
              {certifications.map((certification) => (
                <li key={certification.label}>{certification.label}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
