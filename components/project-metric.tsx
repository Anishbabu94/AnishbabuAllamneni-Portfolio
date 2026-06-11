"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProjectMetricProps {
  index: number;
  label: string;
  value: string;
}

export function ProjectMetric({
  index,
  label,
  value,
}: ProjectMetricProps) {
  const metricRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(metricRef, {
    once: true,
    margin: "-40px",
  });

  return (
    <motion.span
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      className="group/metric relative overflow-hidden rounded-lg border border-border/80 bg-background/72 p-3 shadow-inset transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:bg-card"
      initial={{ opacity: 0, y: 12 }}
      ref={metricRef}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.07,
      }}
    >
      <span className="metric-value block text-lg font-semibold text-foreground transition-colors duration-300 group-hover/metric:text-accent">
        {value}
      </span>
      <span className="technical-label mt-1 block text-muted-foreground">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mt-3 block h-0.5 overflow-hidden rounded-full bg-muted"
      >
        <motion.span
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          className="block h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          initial={{ scaleX: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.12 + index * 0.08,
          }}
        />
      </span>
      <motion.span
        aria-hidden="true"
        animate={isInView ? { x: ["-120%", "260%"] } : { x: "-120%" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          delay: 0.35 + index * 0.1,
        }}
      />
    </motion.span>
  );
}
