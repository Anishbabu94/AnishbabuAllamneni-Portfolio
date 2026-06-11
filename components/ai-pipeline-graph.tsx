"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Bot,
  Database,
  RadioTower,
  SearchCheck,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface PipelineNode {
  id: "ingest" | "cache" | "rag" | "agent" | "eval";
  icon: LucideIcon;
  label: string;
  tone: "accent" | "cyan" | "signal";
  x: number;
  y: number;
}

const nodes: PipelineNode[] = [
  {
    id: "ingest",
    icon: RadioTower,
    label: "Ingest",
    tone: "cyan",
    x: 13,
    y: 50,
  },
  {
    id: "cache",
    icon: Database,
    label: "Cache",
    tone: "accent",
    x: 40,
    y: 27,
  },
  {
    id: "rag",
    icon: Waypoints,
    label: "RAG",
    tone: "accent",
    x: 40,
    y: 73,
  },
  {
    id: "agent",
    icon: Bot,
    label: "Agent",
    tone: "signal",
    x: 72,
    y: 27,
  },
  {
    id: "eval",
    icon: SearchCheck,
    label: "Eval",
    tone: "cyan",
    x: 72,
    y: 73,
  },
];

const paths = [
  "M 18 50 H 27 V 27 H 35",
  "M 18 50 H 27 V 73 H 35",
  "M 45 27 H 67",
  "M 45 73 H 67",
  "M 72 66 V 36",
] as const;

const toneStyles = {
  accent: {
    icon: "text-accent",
    surface: "bg-accent/10",
    border: "border-accent/30",
    status: "bg-accent",
  },
  cyan: {
    icon: "text-accent-secondary",
    surface: "bg-accent-secondary/10",
    border: "border-accent-secondary/30",
    status: "bg-accent-secondary",
  },
  signal: {
    icon: "text-signal",
    surface: "bg-signal/10",
    border: "border-signal/30",
    status: "bg-signal",
  },
} as const;

export function AiPipelineGraph() {
  const graphRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(graphRef, { amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const isActive = isInView && !shouldReduceMotion;

  return (
    <div
      className="relative h-48 overflow-hidden rounded-lg border border-border-strong/70 bg-background/72 shadow-inset sm:h-56"
      ref={graphRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_44%),linear-gradient(color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-[size:auto,28px_28px,28px_28px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[27%] w-px bg-gradient-to-b from-transparent via-border to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[57%] w-px bg-gradient-to-b from-transparent via-border to-transparent"
      />

      <div className="absolute inset-x-3 top-3 flex justify-between font-mono text-[0.55rem] font-semibold uppercase text-muted-foreground/70 sm:inset-x-5 sm:text-[0.6rem]">
        <span>Signal</span>
        <span>Context</span>
        <span>Reasoning</span>
      </div>

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <marker
            id="pipeline-arrow"
            markerHeight="4"
            markerWidth="4"
            orient="auto"
            refX="3"
            refY="2"
          >
            <path
              className="fill-accent-secondary"
              d="M 0 0 L 4 2 L 0 4 Z"
            />
          </marker>
        </defs>

        {paths.map((path, index) => (
          <g key={path}>
            <path
              className="fill-none stroke-border-strong"
              d={path}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.75"
            />
            <motion.path
              animate={
                isActive
                  ? { strokeDashoffset: [18, 0], opacity: [0.35, 0.9, 0.35] }
                  : { strokeDashoffset: 0, opacity: 0.55 }
              }
              className="fill-none stroke-accent-secondary"
              d={path}
              markerEnd="url(#pipeline-arrow)"
              strokeDasharray="2.4 3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.8"
              transition={{
                delay: index * 0.16,
                duration: 1.8,
                ease: "linear",
                repeat: isActive ? Infinity : 0,
              }}
            />
          </g>
        ))}
      </svg>

      {nodes.map((node, index) => {
        const Icon = node.icon;
        const tone = toneStyles[node.tone];

        return (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            key={node.id}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            transition={{
              duration: 0.4,
              delay: index * 0.07,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span
              className={`relative grid min-w-14 place-items-center rounded-lg border bg-card/92 px-2 py-2 shadow-soft backdrop-blur-md transition duration-300 group-hover:-translate-y-0.5 sm:min-w-[4.6rem] sm:px-3 sm:py-2.5 ${tone.border}`}
            >
              <span
                className={`grid size-6 place-items-center rounded-md sm:size-7 ${tone.surface} ${tone.icon}`}
              >
                <Icon aria-hidden="true" size={14} />
              </span>
              <span className="mt-1.5 text-[0.62rem] font-semibold text-foreground sm:text-xs">
                {node.label}
              </span>
              <motion.span
                animate={
                  isActive
                    ? { opacity: [0.45, 1, 0.45] }
                    : { opacity: 0.75 }
                }
                aria-hidden="true"
                className={`absolute right-1.5 top-1.5 size-1 rounded-full ${tone.status}`}
                transition={{
                  delay: index * 0.18,
                  duration: 2.2,
                  ease: "easeInOut",
                  repeat: isActive ? Infinity : 0,
                }}
              />
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
