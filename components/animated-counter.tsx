"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  suffix?: string;
  value: number;
}

export function AnimatedCounter({
  suffix = "",
  value,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration: 1.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    });

    return controls.stop;
  }, [count, isInView, prefersReducedMotion, value]);

  return <motion.span ref={counterRef}>{rounded}</motion.span>;
}
