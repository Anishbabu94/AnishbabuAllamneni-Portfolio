"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const rotateXRaw = useTransform(pointerY, [0, 1], [3, -3]);
  const rotateYRaw = useTransform(pointerX, [0, 1], [-3, 3]);
  const rotateX = useSpring(rotateXRaw, {
    stiffness: 180,
    damping: 24,
    mass: 0.35,
  });
  const rotateY = useSpring(rotateYRaw, {
    stiffness: 180,
    damping: 24,
    mass: 0.35,
  });
  const glowX = useTransform(pointerX, [0, 1], [0, 100]);
  const glowY = useTransform(pointerY, [0, 1], [0, 100]);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${glowX}% ${glowY}%, rgb(99 102 241 / 0.15), transparent 55%)`;

  const resetPosition = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <motion.article
      className={`designer-card group relative transform-gpu rounded-lg border border-border bg-card/70 p-5 shadow-[0_1px_0_rgb(255_255_255/0.04)] transition-[border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-soft ${className}`}
      onMouseLeave={resetPosition}
      onMouseMove={(event) => {
        if (shouldReduceMotion) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}
