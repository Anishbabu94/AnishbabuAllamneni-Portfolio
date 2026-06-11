"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BookOpenCheck,
  BellRing,
  Bot,
  Building2,
  ChartNoAxesCombined,
  CircleCheckBig,
  Container,
  DatabaseZap,
  Factory,
  FileSearch,
  Gauge,
  GitBranch,
  GraduationCap,
  KeyRound,
  Network,
  ScanLine,
  ServerCog,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useRef } from "react";

interface ProjectArchitectureVisualProps {
  projectNumber: string;
}

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

interface ActiveVisualProps {
  isActive: boolean;
}

function SignalLine({
  delay = 0,
  isActive,
}: {
  delay?: number;
  isActive: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative hidden h-px min-w-5 flex-1 overflow-hidden bg-border sm:block"
    >
      <motion.span
        animate={isActive ? { x: ["-100%", "350%"] } : { x: "-100%" }}
        className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-accent to-transparent"
        transition={{
          delay,
          duration: 2.2,
          ease: "linear",
          repeat: isActive ? Infinity : 0,
        }}
      />
    </span>
  );
}

function AgenticPipelineVisual({ isActive }: ActiveVisualProps) {
  const stages = [
    { icon: GitBranch, label: "Event", detail: "Pipeline signal" },
    { icon: DatabaseZap, label: "Normalize", detail: "Cache + context" },
    { icon: Bot, label: "Claude Agent", detail: "Triage + reason" },
    { icon: BellRing, label: "Route", detail: "Alert + action" },
  ] as const;

  return (
    <span className="relative flex h-full min-h-[14rem] flex-col overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_45%),var(--background)] p-3 sm:min-h-[21rem] sm:p-4">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:26px_26px]"
      />
      <span className="relative flex items-center justify-between gap-3">
        <span>
          <span className="technical-label block text-accent">
            Architecture Flow
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Event-driven triage from production signal to routed action
          </span>
        </span>
        <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 sm:block">
          60% faster MTTR
        </span>
      </span>

      <span className="relative my-auto grid gap-3 py-5 sm:flex sm:items-center">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <span
              className="contents"
              key={stage.label}
            >
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="group/node grid min-w-0 flex-1 grid-cols-[2.5rem_1fr] items-center gap-3 rounded-lg border border-border bg-card/90 p-3 shadow-soft backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 sm:block sm:text-center"
                initial={{ opacity: 0, y: 12 }}
                transition={{
                  delay: 0.08 + index * 0.1,
                  duration: 0.42,
                  ease: easeOutQuad,
                }}
              >
                <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover/node:bg-accent group-hover/node:text-white sm:mx-auto">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground sm:mt-2">
                    {stage.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {stage.detail}
                  </span>
                </span>
              </motion.span>
              {index < stages.length - 1 ? (
                <SignalLine delay={index * 0.35} isActive={isActive} />
              ) : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function TelemetryVisual() {
  const hierarchy = [
    { icon: Building2, label: "Plant", value: "01" },
    { icon: Factory, label: "Line", value: "12" },
    { icon: ServerCog, label: "Machine", value: "48" },
  ] as const;
  const bars = [38, 58, 45, 72, 52, 84, 64, 92, 68, 78] as const;

  return (
    <span className="relative flex h-full min-h-[14rem] items-center overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--signal)_9%,transparent),transparent_45%),var(--background)] p-3 sm:min-h-[21rem] sm:p-4">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:26px_26px]"
      />
      <span className="relative grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <span>
          <span className="technical-label block text-signal">
            Operational Drill-Down
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Real-time hierarchy with ML-derived machine health signals
          </span>

          <span className="mt-5 flex items-center gap-2">
            {hierarchy.map((item, index) => {
              const Icon = item.icon;

              return (
                <span className="contents" key={item.label}>
                  <motion.span
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-w-0 flex-1 rounded-lg border border-border bg-card/90 p-3 text-center shadow-soft transition duration-300 hover:-translate-y-0.5 hover:border-signal/35"
                    initial={{ opacity: 0, scale: 0.94 }}
                    transition={{
                      delay: 0.08 + index * 0.1,
                      duration: 0.4,
                      ease: easeOutQuad,
                    }}
                  >
                    <Icon
                      aria-hidden="true"
                      className="mx-auto text-emerald-600 dark:text-emerald-400"
                      size={18}
                    />
                    <span className="mt-2 block text-sm font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {item.value}
                    </span>
                  </motion.span>
                  {index < hierarchy.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="text-sm font-semibold text-muted-foreground"
                    >
                      /
                    </span>
                  ) : null}
                </span>
              );
            })}
          </span>
        </span>

        <span className="rounded-lg border border-border bg-card/90 p-3 shadow-soft">
          <span className="flex items-center justify-between">
            <span className="technical-label flex items-center gap-2 text-muted-foreground">
              <Gauge aria-hidden="true" size={15} />
              Sensor Signal
            </span>
            <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
              96x less traffic
            </span>
          </span>
          <span className="mt-4 flex h-20 items-end gap-1.5">
            {bars.map((height, index) => (
              <motion.span
                animate={{ height: [`${height * 0.55}%`, `${height}%`] }}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/35 to-accent"
                initial={{ height: 0 }}
                key={`${height}-${index}`}
                transition={{
                  delay: index * 0.06,
                  duration: 0.7,
                  ease: easeOutQuad,
                }}
              />
            ))}
          </span>
          <span className="mt-2 flex justify-between text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
            <span>Live</span>
            <span>Historical</span>
          </span>
        </span>
      </span>
    </span>
  );
}

function LearningPlatformVisual({ isActive }: ActiveVisualProps) {
  const services = [
    { icon: GraduationCap, label: "Generate" },
    { icon: Bot, label: "Tutor" },
    { icon: BookOpenCheck, label: "Grade" },
  ] as const;

  return (
    <span className="relative flex h-full min-h-[7rem] items-center overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--warm)_10%,transparent),transparent_52%),var(--background)] p-3">
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_34%)]"
      />
      <span className="relative grid w-full grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <span className="contents" key={service.label}>
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                className="grid min-w-0 place-items-center rounded-lg border border-border bg-card/90 px-2 py-3 text-center shadow-soft"
                initial={{ opacity: 0, y: 8 }}
                transition={{
                  delay: index * 0.09,
                  duration: 0.4,
                  ease: easeOutQuad,
                }}
              >
                <Icon aria-hidden="true" className="text-warm" size={17} />
                <span className="mt-1 truncate text-[0.66rem] font-semibold text-foreground">
                  {service.label}
                </span>
              </motion.span>
              {index < services.length - 1 ? (
                <ArrowPulse delay={index * 0.28} isActive={isActive} />
              ) : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function ClinicalPlatformVisual({ isActive }: ActiveVisualProps) {
  const roles = [
    { icon: Stethoscope, label: "Clinical" },
    { icon: FileSearch, label: "Research" },
    { icon: ShieldCheck, label: "Admin" },
  ] as const;

  return (
    <span className="relative flex h-full min-h-[7rem] overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--signal)_9%,transparent),transparent_55%),var(--background)] p-3">
      <span className="grid w-full grid-cols-[1fr_3.5rem_1fr] items-center gap-2">
        <span className="space-y-1.5">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <span
                className="flex items-center gap-2 rounded-md border border-border bg-card/85 px-2 py-1.5"
                key={role.label}
              >
                <Icon aria-hidden="true" className="text-signal" size={13} />
                <span className="truncate text-[0.62rem] font-semibold">
                  {role.label}
                </span>
              </span>
            );
          })}
        </span>
        <motion.span
          animate={
            isActive
              ? {
                  boxShadow: [
                    "0 0 0 0 rgb(139 92 246 / 0)",
                    "0 0 0 8px rgb(139 92 246 / 0.08)",
                    "0 0 0 0 rgb(139 92 246 / 0)",
                  ],
                }
              : { boxShadow: "0 0 0 0 rgb(139 92 246 / 0)" }
          }
          className="grid aspect-square place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent"
          transition={{ duration: 2.4, repeat: isActive ? Infinity : 0 }}
        >
          <KeyRound aria-hidden="true" size={17} />
        </motion.span>
        <span className="grid gap-1.5">
          <span className="rounded-md border border-border bg-card/85 p-2 text-center font-mono text-[0.58rem] font-semibold text-muted-foreground">
            GraphQL
          </span>
          <span className="rounded-md border border-border bg-card/85 p-2 text-center font-mono text-[0.58rem] font-semibold text-muted-foreground">
            20+ APIs
          </span>
        </span>
      </span>
    </span>
  );
}

function PredictiveMaintenanceVisual() {
  const bars = [26, 42, 31, 58, 46, 68, 54, 83, 64, 92] as const;

  return (
    <span className="relative flex h-full min-h-[7rem] items-center overflow-hidden rounded-lg border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent-secondary)_10%,transparent),transparent_55%),var(--background)] p-3">
      <span className="grid w-full grid-cols-[1fr_auto] items-end gap-4">
        <span>
          <span className="flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase text-muted-foreground">
            <ScanLine aria-hidden="true" size={13} />
            CAN signal
          </span>
          <span className="mt-3 flex h-14 items-end gap-1">
            {bars.map((height, index) => (
              <motion.span
                animate={{ height: `${height}%` }}
                className="flex-1 rounded-t-[2px] bg-gradient-to-t from-accent-secondary/35 to-accent-secondary"
                initial={{ height: 0 }}
                key={`${height}-${index}`}
                transition={{
                  delay: index * 0.045,
                  duration: 0.58,
                  ease: easeOutQuad,
                }}
              />
            ))}
          </span>
        </span>
        <span className="grid size-16 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/8 text-center shadow-soft">
          <span>
            <CircleCheckBig
              aria-hidden="true"
              className="mx-auto text-emerald-600 dark:text-emerald-400"
              size={17}
            />
            <span className="mt-1 block font-mono text-xs font-bold">87%</span>
          </span>
        </span>
      </span>
    </span>
  );
}

function ArrowPulse({
  delay,
  isActive,
}: {
  delay: number;
  isActive: boolean;
}) {
  return (
    <span className="relative h-px w-3 overflow-hidden bg-border">
      <motion.span
        animate={isActive ? { x: ["-100%", "160%"] } : { x: "-100%" }}
        className="absolute inset-y-0 left-0 w-2 bg-accent"
        transition={{
          delay,
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
        }}
      />
    </span>
  );
}

export function ProjectArchitectureVisual({
  projectNumber,
}: ProjectArchitectureVisualProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(visualRef, {
    amount: 0.2,
  });
  const shouldReduceMotion = useReducedMotion();
  const isActive = isInView && !shouldReduceMotion;
  let visual = null;

  if (projectNumber === "01") {
    visual = <AgenticPipelineVisual isActive={isActive} />;
  }

  if (projectNumber === "02") {
    visual = <TelemetryVisual />;
  }

  if (projectNumber === "03") {
    visual = <LearningPlatformVisual isActive={isActive} />;
  }

  if (projectNumber === "04") {
    visual = <ClinicalPlatformVisual isActive={isActive} />;
  }

  if (projectNumber === "05") {
    visual = <PredictiveMaintenanceVisual />;
  }

  return (
    <div className="h-full" ref={visualRef}>
      {visual}
    </div>
  );
}
