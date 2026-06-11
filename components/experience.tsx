"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { experienceEntries, motionConfig } from "@/lib/data";

const easeOutQuad = motionConfig.ease;

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEntryIndex, setActiveEntryIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });
  const activeEntry = experienceEntries[activeEntryIndex];
  const focusEntry = (index: number) => {
    setActiveEntryIndex(index);
    window.requestAnimationFrame(() => {
      document.getElementById(`experience-tab-${index + 1}`)?.focus();
    });
  };
  const selectEntryFromKey = (key: string) => {
    if (key === "ArrowDown" || key === "ArrowRight") {
      focusEntry((activeEntryIndex + 1) % experienceEntries.length);
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      focusEntry(
        (activeEntryIndex - 1 + experienceEntries.length) %
          experienceEntries.length,
      );
    } else if (key === "Home") {
      focusEntry(0);
    } else if (key === "End") {
      focusEntry(experienceEntries.length - 1);
    }
  };

  return (
    <section
      aria-labelledby="experience-heading"
      className="deferred-section portfolio-chapter portfolio-chapter--experience section-shell section-spacing"
      id="experience"
      ref={sectionRef}
    >
      <motion.p
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: easeOutQuad }}
      >
        Experience
      </motion.p>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        className="mt-6 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.08 }}
      >
        <h2 className="section-heading" id="experience-heading">
          Follow the progression from software systems to production AI.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:justify-self-end">
          Select a role to inspect its outcomes and implementation evidence
          without turning the career story into four competing cards.
        </p>
      </motion.div>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        className="relative mt-12 grid overflow-hidden rounded-lg border border-border bg-card/42 shadow-inset lg:grid-cols-[0.76fr_1.24fr]"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.52, ease: easeOutQuad, delay: 0.16 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/4 size-80 rounded-full bg-accent/5 blur-3xl"
        />
        <div
          aria-label="Career roles"
          className="relative flex snap-x snap-mandatory overflow-x-auto border-b border-border bg-background/24 [scrollbar-width:thin] lg:block lg:overflow-visible lg:border-b-0 lg:border-r"
          role="tablist"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[2.05rem] top-10 hidden w-px bg-border sm:block"
          >
            <motion.span
              animate={{
                scaleY:
                  experienceEntries.length > 1
                    ? activeEntryIndex / (experienceEntries.length - 1)
                    : 0,
              }}
              className="block h-full origin-top bg-gradient-to-b from-accent via-accent-secondary to-signal"
              initial={false}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: easeOutQuad,
              }}
            />
          </span>
          {experienceEntries.map((entry, index) => {
            const isActive = index === activeEntryIndex;
            const isPast = index < activeEntryIndex;
            const tabId = `experience-tab-${index + 1}`;

            return (
              <button
                aria-controls={`experience-panel-${index + 1}`}
                aria-selected={isActive}
                className={`focus-ring group relative grid min-h-32 w-[15rem] shrink-0 snap-start grid-cols-[2.25rem_1fr] gap-3 border-r border-border px-4 py-5 text-left last:border-r-0 transition-colors duration-300 sm:w-[17rem] sm:px-5 lg:min-h-0 lg:w-full lg:grid-cols-[2.5rem_1fr_auto] lg:border-b lg:border-r-0 lg:py-6 lg:last:border-b-0 ${
                  isActive ? "bg-accent/8" : "hover:bg-card/65"
                }`}
                id={tabId}
                key={`${entry.role}-${entry.company}`}
                onClick={() => setActiveEntryIndex(index)}
                onKeyDown={(event) => {
                  if (
                    [
                      "ArrowDown",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowLeft",
                      "Home",
                      "End",
                    ].includes(event.key)
                  ) {
                    event.preventDefault();
                    selectEntryFromKey(event.key);
                  }
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-transparent"
                    layoutId="experience-active-marker"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.32,
                      ease: easeOutQuad,
                    }}
                  />
                ) : null}
                <span
                  className={`relative z-10 grid size-7 place-items-center rounded-full border bg-card font-mono text-[0.58rem] font-bold transition-colors ${
                    isActive || isPast
                      ? "border-accent/35 text-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_7%,transparent)]"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  0{index + 1}
                </span>
                <span>
                  <span
                    className={`block font-display text-base font-bold transition-colors sm:text-lg ${
                      isActive ? "text-accent" : "group-hover:text-foreground"
                    }`}
                  >
                    {entry.role}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-muted-foreground">
                    {entry.company}
                  </span>
                  <span className="mt-2 block font-mono text-[0.65rem] text-muted-foreground">
                    {entry.dateRange}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className={`absolute bottom-4 right-4 mt-1 transition-transform duration-300 lg:static ${
                    isActive
                      ? "translate-x-1 text-accent"
                      : "text-muted-foreground group-hover:translate-x-1"
                  }`}
                  size={17}
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            aria-labelledby={`experience-tab-${activeEntryIndex + 1}`}
            className="relative p-4 sm:p-7 lg:p-9"
            exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -14 }}
            id={`experience-panel-${activeEntryIndex + 1}`}
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 14 }}
            key={`${activeEntry.role}-${activeEntry.company}`}
            role="tabpanel"
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: easeOutQuad,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            <div className="flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent shadow-inset">
                    <BriefcaseBusiness aria-hidden="true" size={17} />
                  </span>
                  <p className="technical-label text-accent">Selected Role</p>
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold leading-none sm:text-4xl">
                  {activeEntry.role}
                </h3>
                <p className="mt-3 font-semibold text-muted-foreground">
                  {activeEntry.company}
                  {activeEntry.client ? ` / Client: ${activeEntry.client}` : ""}
                </p>
              </div>
              <div className="grid gap-2 text-sm text-muted-foreground sm:min-w-44 sm:text-right">
                <p className="inline-flex items-center gap-2 font-mono text-xs font-semibold sm:justify-end">
                  <CalendarDays aria-hidden="true" size={14} />
                  {activeEntry.dateRange}
                </p>
                <p className="inline-flex items-center gap-2 sm:justify-end">
                  <MapPin aria-hidden="true" size={14} />
                  {activeEntry.location}
                </p>
              </div>
            </div>

            <div className="mt-7">
              <p className="technical-label text-muted-foreground">
                Outcome Signals
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {activeEntry.highlights.map((highlight, index) => (
                  <motion.span
                    animate={{ opacity: 1, y: 0 }}
                    className="group/signal relative overflow-hidden rounded-lg border border-accent/20 bg-accent/8 px-3 py-3 font-mono text-xs font-bold text-accent shadow-inset transition-colors hover:border-accent/40 hover:bg-accent/[0.12]"
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 8,
                    }}
                    key={highlight}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      ease: easeOutQuad,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0.5 bg-accent transition-all duration-300 group-hover/signal:w-1"
                    />
                    {highlight}
                  </motion.span>
                ))}
              </div>
            </div>

            <ol className="mt-8 grid gap-x-7 gap-y-3 md:grid-cols-2">
              {activeEntry.points.map((point, index) => (
                <motion.li
                  animate={{ opacity: 1, y: 0 }}
                  className="group/point grid grid-cols-[2rem_1fr] gap-3 rounded-lg border border-transparent px-1 py-3 text-[0.9375rem] leading-[1.7] text-muted-foreground transition-colors duration-300 hover:border-border hover:bg-card/55 hover:text-foreground sm:grid-cols-[2.25rem_1fr] sm:p-3"
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 10,
                  }}
                  key={point}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.34,
                    delay: shouldReduceMotion ? 0 : 0.08 + index * 0.045,
                    ease: easeOutQuad,
                  }}
                >
                  <span className="relative font-mono text-xs font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-0 h-px w-3 bg-accent/50 transition-all duration-300 group-hover/point:w-6"
                    />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
