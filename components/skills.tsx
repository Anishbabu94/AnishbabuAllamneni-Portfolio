"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Circle } from "lucide-react";
import { useRef, useState } from "react";
import { motionConfig, skillCategories } from "@/lib/data";

const easeOutQuad = motionConfig.ease;
const capabilityStages = [
  {
    number: "01",
    label: "Reason",
    eyebrow: "Intelligence Layer",
    description:
      "Ground models in context, orchestrate tools, and evaluate outputs before they reach production workflows.",
    categoryIndexes: [1, 2, 3],
    tone: "accent",
    outcome: "Context-aware, evaluated intelligence",
  },
  {
    number: "02",
    label: "Build",
    eyebrow: "Application Layer",
    description:
      "Turn model behavior into typed APIs, dependable services, and data paths that product teams can use.",
    categoryIndexes: [0, 5, 6],
    tone: "cyan",
    outcome: "Reliable services and data contracts",
  },
  {
    number: "03",
    label: "Operate",
    eyebrow: "Production Layer",
    description:
      "Deploy, observe, and present AI systems through cloud infrastructure and interfaces designed for daily decisions.",
    categoryIndexes: [4, 7, 8],
    tone: "signal",
    outcome: "Observable systems in real workflows",
  },
] as const;

const toneStyles = {
  accent: {
    text: "text-accent",
    border: "border-accent",
    surface: "bg-accent/10",
    hoverSurface: "group-hover/category:bg-accent/10",
    line: "bg-gradient-to-b from-accent to-transparent",
  },
  cyan: {
    text: "text-accent-secondary",
    border: "border-accent-secondary",
    surface: "bg-accent-secondary/10",
    hoverSurface: "group-hover/category:bg-accent-secondary/10",
    line: "bg-gradient-to-b from-accent-secondary to-transparent",
  },
  signal: {
    text: "text-signal",
    border: "border-signal",
    surface: "bg-signal/10",
    hoverSurface: "group-hover/category:bg-signal/10",
    line: "bg-gradient-to-b from-signal to-transparent",
  },
} as const;

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });
  const activeStage = capabilityStages[activeStageIndex];
  const activeTone = toneStyles[activeStage.tone];
  const focusStage = (index: number) => {
    setActiveStageIndex(index);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`capability-tab-${capabilityStages[index].number}`)
        ?.focus();
    });
  };
  const selectStageFromKey = (key: string) => {
    if (key === "ArrowRight") {
      focusStage((activeStageIndex + 1) % capabilityStages.length);
    } else if (key === "ArrowLeft") {
      focusStage(
        (activeStageIndex - 1 + capabilityStages.length) %
          capabilityStages.length,
      );
    } else if (key === "Home") {
      focusStage(0);
    } else if (key === "End") {
      focusStage(capabilityStages.length - 1);
    }
  };

  return (
    <section
      aria-labelledby="skills-heading"
      className="deferred-section portfolio-chapter portfolio-chapter--skills section-shell section-spacing"
      id="skills"
      ref={sectionRef}
    >
      <motion.p
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.45, ease: easeOutQuad }}
      >
        Technical Skills
      </motion.p>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.08 }}
      >
        <h2 className="section-heading" id="skills-heading">
          Inspect the system behind how I ship AI.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:justify-self-end">
          Three connected layers turn model capability into dependable product
          behavior. Select a stage to inspect the tools and engineering focus.
        </p>
      </motion.div>

      <motion.div
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        className="relative mt-12 overflow-hidden rounded-lg border border-border bg-card/42 shadow-inset"
        initial={{ opacity: 0, y: 28 }}
        transition={{ duration: 0.5, ease: easeOutQuad, delay: 0.16 }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-20 size-72 rounded-full bg-accent/5 blur-3xl"
        />
        <div
          aria-label="AI delivery stages"
          className="relative grid grid-cols-3 lg:grid-cols-3"
          role="tablist"
        >
          <span
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-8 hidden h-px bg-border lg:block"
          >
            <motion.span
              animate={{
                scaleX: activeStageIndex / (capabilityStages.length - 1),
              }}
              className="block h-full origin-left bg-gradient-to-r from-accent via-accent-secondary to-signal"
              initial={false}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: easeOutQuad,
              }}
            />
          </span>
          {capabilityStages.map((stage, index) => {
            const isActive = index === activeStageIndex;
            const isComplete = index < activeStageIndex;
            const tone = toneStyles[stage.tone];

            return (
              <button
                aria-controls={`capability-panel-${stage.number}`}
                aria-selected={isActive}
                className={`focus-ring group relative flex min-h-28 min-w-0 flex-col items-center justify-center gap-2 border-r border-border px-2 py-4 text-center transition-colors duration-300 last:border-r-0 lg:min-h-40 lg:grid lg:grid-cols-[3rem_1fr] lg:items-start lg:justify-start lg:gap-3 lg:px-6 lg:pb-6 lg:pt-12 lg:text-left ${
                  isActive ? tone.surface : "hover:bg-card/70"
                }`}
                id={`capability-tab-${stage.number}`}
                key={stage.number}
                onClick={() => setActiveStageIndex(index)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    selectStageFromKey(event.key);
                  }
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <span
                  className={`relative z-10 grid size-8 shrink-0 place-items-center rounded-full border font-mono text-[0.62rem] font-bold transition-colors duration-300 lg:absolute lg:left-1/2 lg:top-4 lg:-translate-x-1/2 ${
                    isActive || isComplete
                      ? `${tone.border} ${tone.surface} ${tone.text}`
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {isComplete ? (
                    <Check aria-hidden="true" size={13} strokeWidth={3} />
                  ) : (
                    stage.number
                  )}
                </span>
                <span className="min-w-0">
                  <span className="technical-label block text-[0.55rem] leading-tight text-muted-foreground sm:text-[0.65rem]">
                    {stage.eyebrow}
                  </span>
                  <span
                    className={`mt-1.5 block font-display text-base font-bold transition-colors duration-300 sm:text-xl lg:mt-2 lg:text-2xl ${
                      isActive ? tone.text : ""
                    }`}
                  >
                    {stage.label}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className={`hidden transition-transform duration-300 lg:absolute lg:bottom-6 lg:right-6 lg:block ${
                    isActive
                      ? `${tone.text} translate-x-1`
                      : "text-muted-foreground group-hover:translate-x-1"
                  }`}
                  size={18}
                />
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300 ${tone.border} ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            aria-labelledby={`capability-tab-${activeStage.number}`}
            className="relative grid gap-7 border-t border-border bg-background/28 p-4 sm:p-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8 lg:p-9"
            exit={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : -12,
            }}
            id={`capability-panel-${activeStage.number}`}
            initial={{
              opacity: 0,
              x: shouldReduceMotion ? 0 : 12,
            }}
            key={activeStage.number}
            role="tabpanel"
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: easeOutQuad }}
          >
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
                activeStage.tone === "accent"
                  ? "via-accent"
                  : activeStage.tone === "cyan"
                    ? "via-accent-secondary"
                    : "via-signal"
              } to-transparent`}
            />
            <div className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-2 top-0 hidden h-full w-px opacity-60 lg:block ${activeTone.line}`}
              />
              <p className={`technical-label ${activeTone.text}`}>
                {activeStage.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {activeStage.label}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {activeStage.description}
              </p>
              <div
                className={`mt-7 inline-flex items-center gap-3 rounded-lg border px-4 py-3 shadow-inset ${activeTone.border} ${activeTone.surface}`}
              >
                <Check aria-hidden="true" className={activeTone.text} size={17} />
                <span className="text-sm font-semibold">
                  {activeStage.outcome}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {activeStage.categoryIndexes.map((categoryIndex, categoryOrder) => {
                const category = skillCategories[categoryIndex];
                const Icon = category.icon;

                return (
                  <motion.section
                    animate={{ opacity: 1, y: 0 }}
                    className="group/category relative overflow-hidden rounded-lg border border-border bg-card/65 p-5 shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-soft"
                    initial={{
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 10,
                    }}
                    key={category.title}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.32,
                      delay: shouldReduceMotion ? 0 : categoryOrder * 0.06,
                      ease: easeOutQuad,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover/category:scale-x-100 ${activeTone.border}`}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-background shadow-inset transition-colors duration-300 ${activeTone.hoverSurface} ${activeTone.text}`}
                      >
                        <Icon aria-hidden="true" size={18} />
                      </span>
                      <span className="font-mono text-[0.62rem] text-muted-foreground">
                        {String(category.skills.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mt-4 min-h-9 text-sm font-bold leading-tight">
                      {category.title}
                    </h4>
                    <ul className="mt-4 space-y-2.5 border-t border-border/70 pt-4">
                      {category.skills.map((skill) => (
                        <li
                          className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-muted-foreground transition-colors duration-200 group-hover/category:text-foreground"
                          key={`${category.title}-${skill}`}
                        >
                          <Circle
                            aria-hidden="true"
                            className={`mt-[0.33rem] shrink-0 ${activeTone.text}`}
                            fill="currentColor"
                            size={5}
                          />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
