"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorState {
  isHovering: boolean;
  isVisible: boolean;
}

const cursorSelector =
  'a, button, [role="button"], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])';

export function MagneticCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isVisible: false,
  });
  const [isEnabled, setIsEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useSpring(cursorX, { stiffness: 180, damping: 24, mass: 0.4 });
  const followerY = useSpring(cursorY, { stiffness: 180, damping: 24, mass: 0.4 });

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabledState = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabledState();
    finePointerQuery.addEventListener("change", updateEnabledState);
    reducedMotionQuery.addEventListener("change", updateEnabledState);

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabledState);
      reducedMotionQuery.removeEventListener("change", updateEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setCursorState((current) => ({ ...current, isVisible: true }));
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(cursorSelector)) {
        setCursorState((current) => ({ ...current, isHovering: true }));
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(cursorSelector)) {
        setCursorState((current) => ({ ...current, isHovering: false }));
      }
    };

    const handlePointerLeave = () => {
      setCursorState({ isHovering: false, isVisible: false });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerout", handlePointerOut);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        animate={{
          opacity: cursorState.isVisible ? 1 : 0,
          scale: cursorState.isHovering ? 1.65 : 1,
        }}
        className="fixed left-0 top-0 size-2 rounded-full bg-accent mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      />
      <motion.div
        animate={{
          opacity: cursorState.isVisible ? 1 : 0,
          scale: cursorState.isHovering ? 0.62 : 1,
        }}
        className="fixed left-0 top-0 size-8 rounded-full border border-accent/60 bg-accent/10"
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />
    </div>
  );
}
