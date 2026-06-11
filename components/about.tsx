"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import {
  aboutCopy,
  certifications,
  motionConfig,
  quickFacts,
} from "@/lib/data";

const easeOutQuad = motionConfig.ease;
const engineeringPrinciples = [
  ["Observable", "Make model behavior and system state inspectable."],
  ["Reliable", "Design for deterministic paths, evaluation, and recovery."],
  ["Useful", "Measure success inside the workflow, not only in the model."],
] as const;

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      aria-labelledby="about-heading"
      className="deferred-section portfolio-chapter portfolio-chapter--about section-shell section-spacing"
      id="about"
      ref={sectionRef}
    >
      <motion.p
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: easeOutQuad }}
      >
        About
      </motion.p>

      <div className="relative mt-8 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/4 -z-10 size-72 rounded-full bg-accent/5 blur-3xl"
        />
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          initial={{ opacity: 0, y: 36 }}
          transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.08 }}
        >
          <h2 className="section-heading relative" id="about-heading">
            Closing the gap between AI research and real-world impact.
            <span
              aria-hidden="true"
              className="absolute -bottom-5 left-0 h-px w-24 bg-gradient-to-r from-accent to-transparent"
            />
          </h2>
          <p className="mt-11 max-w-[42rem] text-pretty text-lg leading-[1.75] text-muted-foreground sm:text-xl">
            {aboutCopy}
          </p>

          <blockquote className="relative mt-10 border-l-2 border-accent py-2 pl-6 sm:pl-8">
            <span
              aria-hidden="true"
              className="absolute -left-1 top-0 size-2 rounded-full bg-accent shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)]"
            />
            <Quote
              aria-hidden="true"
              className="text-accent"
              fill="currentColor"
              size={22}
            />
            <p className="mt-4 max-w-xl font-display text-xl font-semibold leading-snug sm:text-2xl">
              Good AI engineering makes intelligence observable, reliable, and
              useful inside the workflow where decisions happen.
            </p>
          </blockquote>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border shadow-inset sm:grid-cols-3">
            {engineeringPrinciples.map(([title, description], index) => (
              <motion.div
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                className="group/principle relative bg-muted/72 p-5 transition-colors duration-300 hover:bg-card"
                initial={{ opacity: 0, y: 12 }}
                key={title}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.38,
                  delay: shouldReduceMotion ? 0 : 0.24 + index * 0.06,
                  ease: easeOutQuad,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-accent">
                    0{index + 1}
                  </span>
                  <Check
                    aria-hidden="true"
                    className="text-muted-foreground transition-colors duration-300 group-hover/principle:text-signal"
                    size={15}
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold transition-colors duration-300 group-hover/principle:text-accent">
                  {title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-secondary transition-transform duration-300 group-hover/principle:scale-x-100"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
          aria-label="Quick facts"
          initial={{ opacity: 0, y: 36 }}
          transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.16 }}
        >
          <div className="overflow-hidden rounded-lg border border-border bg-card/42 shadow-inset">
            <div className="flex items-center justify-between border-b border-border bg-background/52 px-5 py-4">
              <p className="technical-label text-muted-foreground">
                Profile Ledger
              </p>
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_65%,transparent)]"
              />
            </div>
            <dl className="divide-y divide-border">
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon;

              return (
                <motion.div
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }
                  }
                  className="group/fact relative grid grid-cols-[2.5rem_1fr_auto] gap-x-3 gap-y-1 px-5 py-5 transition-colors duration-300 hover:bg-background/58 sm:grid-cols-[2.5rem_6.5rem_1fr_auto]"
                  initial={{ opacity: 0, x: 18 }}
                  key={fact.label}
                  transition={{
                    duration: 0.4,
                    ease: easeOutQuad,
                    delay: 0.22 + index * 0.05,
                  }}
                >
                  <span className="row-span-2 grid size-9 place-items-center rounded-lg border border-border bg-card/70 text-accent shadow-inset transition-colors duration-300 group-hover/fact:border-accent/30 group-hover/fact:bg-accent/10 sm:row-span-1">
                    <Icon aria-hidden="true" size={17} />
                  </span>
                  <dt className="technical-label self-center text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="col-start-2 text-sm font-medium leading-relaxed transition-colors duration-300 group-hover/fact:text-accent sm:col-start-auto">
                    {fact.value}
                  </dd>
                  <span
                    aria-hidden="true"
                    className="row-span-2 self-center font-mono text-[0.6rem] font-semibold text-muted-foreground/70 sm:row-span-1"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              );
            })}
            </dl>
          </div>
        </motion.aside>
      </div>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        aria-labelledby="certifications-heading"
        className="relative mt-20 border-t border-border pt-9"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.42 }}
      >
        <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-end">
          <div>
            <p className="technical-label text-warm">Verified Learning</p>
            <h3
              className="mt-2 font-display text-3xl font-bold"
              id="certifications-heading"
            >
              Credentials
            </h3>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:justify-self-end">
            Focused learning across cloud engineering, generative AI, software
            delivery, and applied AI foundations.
          </p>
        </div>

        <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--warm)_6%,transparent),transparent_70%)] blur-3xl"
          />
          {certifications.map((certification, index) => (
            <motion.a
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              aria-label={`Open ${certification.logoAlt.replace(
                " logo",
                "",
              )} website`}
              className={`focus-ring group relative grid min-h-32 grid-cols-[4.75rem_1fr_auto] items-center gap-4 overflow-hidden rounded-lg border border-border bg-card/58 p-4 shadow-inset transition duration-300 hover:-translate-y-1 hover:border-warm/35 hover:shadow-elevated sm:min-h-40 sm:grid-cols-1 sm:content-between sm:items-start sm:p-5 ${
                index === 0
                  ? "lg:col-span-4 lg:row-span-2 lg:min-h-[21rem] lg:p-7"
                  : "lg:col-span-4 lg:min-h-0"
              }`}
              href={certification.href}
              initial={{ opacity: 0, y: 18 }}
              key={certification.label}
              rel="noreferrer"
              target="_blank"
              transition={{
                duration: 0.4,
                ease: easeOutQuad,
                delay: 0.48 + index * 0.06,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-warm via-accent to-accent-secondary transition-transform duration-300 group-hover:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-11 top-4 font-mono text-[0.62rem] font-bold text-muted-foreground/55 transition-colors duration-300 group-hover:text-warm"
              >
                0{index + 1}
              </span>
              <span
                className={`grid place-items-center rounded-lg border border-border bg-white shadow-soft transition-transform duration-300 group-hover:scale-[1.04] ${
                  index === 0
                    ? "size-[4.5rem] p-3.5 lg:size-24 lg:p-5"
                    : "size-[4.5rem] p-3.5 sm:size-16"
                }`}
              >
                <Image
                  alt={certification.logoAlt}
                  className="h-full w-full object-contain"
                  height={40}
                  src={certification.logoSrc}
                  width={40}
                />
              </span>
              <span
                className={`relative max-w-[24rem] font-semibold leading-relaxed transition-colors duration-300 group-hover:text-warm ${
                  index === 0
                    ? "text-sm lg:text-lg"
                    : "text-[0.8125rem] lg:pr-6"
                }`}
              >
                {certification.label}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="relative text-muted-foreground transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warm sm:absolute sm:right-4 sm:top-4"
                size={16}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
