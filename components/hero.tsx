"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  FileText,
  Gauge,
  Network,
  Radar,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { AiPipelineGraph } from "@/components/ai-pipeline-graph";
import { AnimatedCounter } from "@/components/animated-counter";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { ProductionEventTrace } from "@/components/production-event-trace";
import { heroStats, motionConfig, siteConfig } from "@/lib/data";

const easeOutQuad = motionConfig.ease;
const consoleMetrics = [
  { icon: Gauge, label: "Cached response", value: "<1ms" },
  { icon: Radar, label: "Pipeline triage", value: "60% faster" },
  { icon: Network, label: "API traffic", value: "96x lower" },
] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.62]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const canvasRotate = useTransform(scrollYProgress, [0, 1], [0, -1.4]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerRotateX = useSpring(pointerY, {
    stiffness: 150,
    damping: 24,
    mass: 0.35,
  });
  const pointerRotateY = useSpring(pointerX, {
    stiffness: 150,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-[var(--navbar-height)]"
      ref={heroRef}
    >
      <div aria-hidden="true" className="grid-background absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="hero-horizon absolute inset-x-0 top-0 -z-10 h-[34rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 size-[min(72vw,62rem)] -translate-x-1/2 rounded-full border border-accent/10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[25%] -z-10 size-[min(54vw,46rem)] -translate-x-1/2 rounded-full border border-accent-secondary/10 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_68%)]"
      />
      <HeroSpotlight />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-secondary),transparent)] opacity-60 motion-safe:animate-[signal-sweep_5.5s_ease-in-out_infinite]"
      />

      <div className="section-shell grid min-h-[calc(100svh-var(--navbar-height))] content-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(26rem,0.98fr)] lg:items-center lg:gap-16">
        <motion.div
          className="relative z-10 max-w-3xl lg:py-8"
          style={{ opacity: copyOpacity, y: shouldReduceMotion ? 0 : copyY }}
        >
          <motion.span
            animate={{ scaleY: 1 }}
            aria-hidden="true"
            className="absolute -left-5 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-accent-secondary/60 to-transparent lg:block"
            initial={{ scaleY: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              ease: easeOutQuad,
              delay: 0.12,
            }}
          />
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: easeOutQuad }}
          >
            <p className="section-label">AI Engineer</p>
            <span className="font-mono text-[0.68rem] uppercase text-muted-foreground">
              Detroit / Open to relocate
            </span>
          </motion.div>

          <h1
            className="relative mt-7 font-display text-[clamp(3.3rem,7.2vw,6.9rem)] font-bold leading-[0.84] text-balance"
            id="hero-heading"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-x-4 inset-y-0 -z-10 bg-[radial-gradient(ellipse_at_left,color-mix(in_srgb,var(--accent)_8%,transparent),transparent_68%)] blur-xl"
            />
            <span className="block overflow-hidden pb-2">
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="block text-foreground"
                initial={{ opacity: 0, y: 48 }}
                transition={{ duration: 0.58, ease: easeOutQuad, delay: 0.08 }}
              >
                Anish Babu
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="gradient-text block"
                initial={{ opacity: 0, y: 48 }}
                transition={{ duration: 0.58, ease: easeOutQuad, delay: 0.15 }}
              >
                Allamneni
              </motion.span>
            </span>
          </h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl font-display text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.48, ease: easeOutQuad, delay: 0.28 }}
          >
            I turn production signals into AI systems that act.
          </motion.p>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.38 }}
          >
            Production-focused AI Engineer building agentic pipelines, RAG
            systems, and real-time ML infrastructure from sensor data to cloud
            deployment.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs font-medium"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.48 }}
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-2 text-signal">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_70%,transparent)]"
              />
              Available for new opportunities
            </span>
            <span className="font-mono uppercase text-muted-foreground">
              Bedrock / FastAPI / React / ML
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 22 }}
            transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.56 }}
          >
            <Link
              aria-label="View projects"
              className="focus-ring group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_12px_32px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_color-mix(in_srgb,var(--accent)_32%,transparent)]"
              href="#work"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[450%]"
              />
              Explore selected systems
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
                size={18}
              />
            </Link>
            <Link
              aria-label="View Anish Babu Allamneni resume"
              className="focus-ring group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface-subtle px-5 text-sm font-semibold shadow-inset backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card/80 hover:text-accent hover:shadow-soft"
              href={siteConfig.resumeHref}
            >
              View resume
              <FileText
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
                size={18}
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative mx-auto w-full max-w-[34rem] transform-gpu lg:max-w-none"
          initial={{ opacity: 0, scale: 0.97 }}
          onPointerLeave={() => {
            pointerX.set(0);
            pointerY.set(0);
          }}
          onPointerMove={(event) => {
            if (shouldReduceMotion || event.pointerType === "touch") {
              return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
            const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

            pointerX.set(normalizedX * 2.4);
            pointerY.set(normalizedY * -2.4);
          }}
          style={{
            rotateX: shouldReduceMotion ? 0 : pointerRotateX,
            rotateY: shouldReduceMotion ? 0 : pointerRotateY,
            rotateZ: shouldReduceMotion ? 0 : canvasRotate,
            transformPerspective: 1200,
            y: shouldReduceMotion ? 0 : canvasY,
          }}
          transition={{ duration: 0.68, ease: easeOutQuad, delay: 0.28 }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 bg-[conic-gradient(from_210deg,var(--accent),transparent_24%,var(--accent-secondary),transparent_62%,var(--accent))] opacity-[0.1] blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -left-2 -top-2 z-20 size-7 border-l border-t border-accent/60"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 z-20 size-7 border-b border-r border-accent-secondary/60"
          />
          <div className="hero-console relative overflow-hidden rounded-lg border border-border-strong/80 bg-card/78 shadow-elevated backdrop-blur-xl">
            <motion.span
              animate={{ x: ["-30%", "230%"] }}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-20 h-px w-1/3 bg-gradient-to-r from-transparent via-accent-secondary to-transparent"
              transition={{
                duration: 5.5,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="relative grid size-9 place-items-center rounded-lg border border-accent/25 bg-accent/10">
                  <span className="size-2 rounded-full bg-signal shadow-[0_0_14px_color-mix(in_srgb,var(--signal)_76%,transparent)]" />
                </span>
                <div>
                  <p className="technical-label text-accent">Operational AI Canvas</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Signal → context → reasoning → action
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full border border-signal/25 bg-signal/10 px-2.5 py-1 font-mono text-[0.62rem] font-bold uppercase text-signal sm:inline-flex">
                Live system
              </span>
            </div>

            <div className="grid grid-cols-3 border-b border-border">
              {consoleMetrics.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative border-r border-border px-3 py-4 last:border-r-0 sm:px-4"
                    initial={{ opacity: 0, y: 12 }}
                    key={item.label}
                    transition={{
                      duration: 0.4,
                      ease: easeOutQuad,
                      delay: 0.52 + index * 0.08,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-secondary transition-transform duration-300 group-hover:scale-x-100"
                    />
                    <Icon
                      aria-hidden="true"
                      className="text-accent"
                      size={17}
                    />
                    <p className="metric-value mt-3 text-base font-bold sm:text-lg">
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.62rem] leading-tight text-muted-foreground sm:text-xs">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-3 sm:p-4">
              <AiPipelineGraph />
              <div className="hidden sm:block">
                <ProductionEventTrace />
              </div>
            </div>
          </div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="absolute -bottom-4 right-4 hidden items-center gap-3 rounded-lg border border-border bg-background/90 px-3 py-2 shadow-soft backdrop-blur-xl sm:flex"
            initial={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.9 }}
          >
            <span className="font-mono text-[0.62rem] uppercase text-muted-foreground">
              Current focus
            </span>
            <span className="text-xs font-semibold">Reliable agentic systems</span>
          </motion.div>
        </motion.div>

        <motion.dl
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 overflow-hidden rounded-lg border border-border bg-card/42 shadow-inset backdrop-blur-sm lg:col-span-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: easeOutQuad, delay: 0.76 }}
        >
          {heroStats.map((stat, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`group relative border-border px-4 py-4 transition-colors duration-300 hover:bg-card/65 lg:border-b-0 lg:border-r lg:px-5 lg:last:border-r-0 ${
                index < 2 ? "border-b" : ""
              } ${index % 2 === 0 ? "border-r" : ""}`}
              initial={{ opacity: 0, y: 14 }}
              key={`${stat.value}-${stat.label}`}
              transition={{
                duration: 0.4,
                ease: easeOutQuad,
                delay: 0.8 + index * 0.07,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-10 bg-accent/60 transition-all duration-300 group-hover:w-full group-hover:bg-accent-secondary"
              />
              <dt className="metric-value text-xl font-bold sm:text-2xl">
                {stat.value === "4+" ? (
                  <AnimatedCounter suffix="+" value={4} />
                ) : stat.value === "10+" ? (
                  <AnimatedCounter suffix="+" value={10} />
                ) : (
                  stat.value
                )}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="hidden justify-center sm:flex lg:col-span-2"
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: easeOutQuad, delay: 1.02 }}
        >
          <Link
            aria-label="Scroll to projects"
            className="focus-ring grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            href="#work"
          >
            <ArrowDown
              aria-hidden="true"
              className="motion-safe:animate-bounce"
              size={18}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
