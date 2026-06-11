"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 900);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-5 right-5 z-50"
          exit={{ opacity: 0, y: 12 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Link
            aria-label="Back to top"
            className="focus-ring grid size-11 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-soft backdrop-blur-md transition-colors duration-200 hover:border-accent hover:text-accent"
            href="#top"
          >
            <ArrowUp aria-hidden="true" size={18} />
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
