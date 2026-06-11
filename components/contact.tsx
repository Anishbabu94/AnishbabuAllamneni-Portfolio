"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { CopyEmailButton } from "@/components/copy-email-button";
import { motionConfig, siteConfig } from "@/lib/data";

const easeOutQuad = motionConfig.ease;

interface ContactSignal {
  href?: string;
  icon: LucideIcon;
  label: string;
  value: string;
}

const contactSignals: ContactSignal[] = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Detroit, MI",
  },
  {
    icon: Phone,
    label: "Call",
    value: siteConfig.phone,
    href: "tel:+17349379247",
  },
  {
    icon: Mail,
    label: "Response",
    value: "Usually within 24 hours",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerX}px ${pointerY}px, color-mix(in srgb, var(--accent) 15%, transparent), transparent 58%)`;
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      aria-labelledby="contact-heading"
      className="deferred-section portfolio-chapter portfolio-chapter--contact section-shell section-spacing"
      id="contact"
      ref={sectionRef}
    >
      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        className="contact-scene relative isolate overflow-hidden rounded-lg border border-border bg-card/32 shadow-inset"
        initial={{ opacity: 0, y: 36 }}
        onPointerMove={(event) => {
          if (shouldReduceMotion) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set(event.clientX - rect.left);
          pointerY.set(event.clientY - rect.top);
        }}
        transition={{ duration: 0.55, ease: easeOutQuad }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: spotlight }}
        />

        <div
          aria-hidden="true"
          className="grid-background pointer-events-none absolute inset-0 -z-20 opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-[30rem] rounded-full bg-accent/8 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 -z-10 size-[30rem] rounded-full bg-accent-secondary/7 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        >
          <motion.span
            animate={
              isInView && !shouldReduceMotion
                ? { x: ["-15%", "115%"] }
                : { x: "-15%" }
            }
            className="block h-px w-40 bg-gradient-to-r from-transparent via-accent-secondary to-transparent"
            transition={{
              duration: 4.8,
              ease: "linear",
              repeat: isInView && !shouldReduceMotion ? Infinity : 0,
            }}
          />
        </div>

        <div className="grid gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:px-10 lg:py-20">
          <div>
            <motion.div
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.08 }}
            >
              <p className="section-label">Connect</p>
              <span className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/8 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase text-signal shadow-inset">
                <motion.span
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: [0.55, 1, 0.55], scale: [0.9, 1.1, 0.9] }
                  }
                  className="size-2 rounded-full bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_70%,transparent)]"
                  transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                />
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h2
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              className="relative mt-7 max-w-2xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-bold leading-[0.88] text-balance"
              id="contact-heading"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.52, ease: easeOutQuad, delay: 0.14 }}
            >
              Let&apos;s build the system people rely on.
              <span
                aria-hidden="true"
                className="absolute -bottom-6 left-0 h-px w-28 bg-gradient-to-r from-accent via-accent-secondary to-transparent"
              />
            </motion.h2>

            <motion.p
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              className="mt-12 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.22 }}
            >
              Open to AI Engineer roles, product-focused collaborations, and
              conversations about dependable LLM and ML systems.
            </motion.p>
          </div>

          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.24 }}
          >
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent shadow-inset">
                  <Mail aria-hidden="true" size={17} />
                </span>
                <p className="technical-label text-muted-foreground">
                Start a conversation
                </p>
              </div>
              <Link
                aria-label={`Email ${siteConfig.name}`}
                className="focus-ring group relative mt-5 flex min-h-32 items-end overflow-hidden rounded-lg border border-border-strong bg-background/72 p-5 shadow-elevated transition duration-300 hover:-translate-y-1 hover:border-accent/45 sm:min-h-40 sm:p-6"
                href={`mailto:${siteConfig.email}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(circle_at_88%_18%,color-mix(in_srgb,var(--accent-secondary)_12%,transparent),transparent_34%),linear-gradient(135deg,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_52%)] opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-transparent transition-all duration-300 group-hover:w-1"
                />
                <span className="relative min-w-0 break-all font-display text-base font-bold leading-[1.05] transition-colors group-hover:text-accent sm:text-[clamp(1.25rem,2.2vw,2rem)] lg:break-normal">
                  {siteConfig.email}
                </span>
                <span className="absolute right-5 top-5 grid size-12 place-items-center rounded-full border border-accent/25 bg-accent/10 text-accent transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-accent group-hover:text-white sm:right-6 sm:top-6">
                  <ArrowUpRight aria-hidden="true" size={22} />
                </span>
              </Link>

              <div className="mt-3 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                <CopyEmailButton />
                <Link
                  aria-label="Connect with Anish on LinkedIn"
                  className="focus-ring group inline-flex min-h-14 items-center justify-between gap-2 bg-background/88 px-4 text-sm font-semibold transition duration-300 hover:bg-card hover:text-accent"
                  href={siteConfig.linkedin}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="inline-flex items-center gap-2">
                    <Linkedin aria-hidden="true" size={18} />
                    LinkedIn
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    size={15}
                  />
                </Link>
                <Link
                  aria-label="View Anish on GitHub"
                  className="focus-ring group inline-flex min-h-14 items-center justify-between gap-2 bg-background/88 px-4 text-sm font-semibold transition duration-300 hover:bg-card hover:text-accent"
                  href={siteConfig.github}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github aria-hidden="true" size={18} />
                    GitHub
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    size={15}
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          aria-label="Contact details"
          className="grid border-t border-border bg-background/30 sm:grid-cols-3"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.34 }}
        >
          {contactSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                className="group/signal grid min-h-28 grid-cols-[2.75rem_1fr] items-center gap-3 border-b border-border px-5 py-5 transition-colors duration-300 hover:bg-card/55 sm:border-b-0 sm:border-r sm:last:border-r-0"
                initial={{ opacity: 0, y: 10 }}
                key={signal.label}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.35,
                  delay: shouldReduceMotion ? 0 : 0.38 + index * 0.06,
                  ease: easeOutQuad,
                }}
              >
                <span className="grid size-10 place-items-center rounded-lg border border-border bg-card/70 text-accent shadow-inset transition-colors duration-300 group-hover/signal:border-accent/30 group-hover/signal:bg-accent/10">
                  <Icon aria-hidden="true" size={17} />
                </span>
                <span>
                  <p className="technical-label text-muted-foreground">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {signal.href ? (
                      <Link
                        className="focus-ring rounded-sm transition-colors hover:text-accent"
                        href={signal.href}
                      >
                        {signal.value}
                      </Link>
                    ) : (
                      signal.value
                    )}
                  </p>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
