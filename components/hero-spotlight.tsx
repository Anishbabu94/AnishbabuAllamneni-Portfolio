"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSpotlight() {
  const [isEnabled, setIsEnabled] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(35);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 28, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 28, mass: 0.4 });
  const background = useMotionTemplate`
    radial-gradient(circle at ${smoothX}% ${smoothY}%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 24rem),
    radial-gradient(circle at ${smoothX}% ${smoothY}%, color-mix(in srgb, var(--accent-secondary) 10%, transparent), transparent 40rem)
  `;

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabledState = () => {
      setIsEnabled(pointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabledState();
    pointerQuery.addEventListener("change", updateEnabledState);
    reducedMotionQuery.addEventListener("change", updateEnabledState);

    return () => {
      pointerQuery.removeEventListener("change", updateEnabledState);
      reducedMotionQuery.removeEventListener("change", updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 100);
      pointerY.set((event.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [isEnabled, pointerX, pointerY]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-10 opacity-75 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
      style={{ background }}
    />
  );
}
