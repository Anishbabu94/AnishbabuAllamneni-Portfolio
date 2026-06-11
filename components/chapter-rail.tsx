"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const chapters = [
  { id: "work", label: "Projects" },
  { id: "skills", label: "Technical Skills" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

export function ChapterRail() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>(
    chapters[0].id,
  );
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = isMounted && shouldReduceMotion;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.22,
  });

  useEffect(() => {
    setIsMounted(true);

    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          )[0];

        if (activeEntry) {
          setActiveChapter(activeEntry.target.id as ChapterId);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.08, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Portfolio sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:right-5"
    >
      <div className="relative flex flex-col items-center gap-5 rounded-full border border-border/80 bg-background/70 px-2.5 py-4 shadow-soft backdrop-blur-xl">
        <span
          aria-hidden="true"
          className="absolute bottom-6 top-6 left-1/2 w-px -translate-x-1/2 overflow-hidden bg-border"
        >
          <motion.span
            className="block h-full origin-top bg-gradient-to-b from-accent via-accent-secondary to-signal"
            style={{ scaleY: reduceMotion ? 1 : progress }}
          />
        </span>

        {chapters.map((chapter, index) => {
          const isActive = activeChapter === chapter.id;

          return (
            <Link
              aria-current={isActive ? "location" : undefined}
              aria-label={`Jump to ${chapter.label}`}
              className="focus-ring group relative z-10 grid size-5 place-items-center rounded-full"
              href={`#${chapter.id}`}
              key={chapter.id}
              title={chapter.label}
            >
              <motion.span
                animate={{
                  backgroundColor: isActive
                    ? "var(--accent)"
                    : "var(--background)",
                  borderColor: isActive
                    ? "var(--accent)"
                    : "var(--border-strong)",
                  scale: isActive ? 1 : 0.72,
                }}
                className="block size-3 rounded-full border shadow-[0_0_0_4px_var(--background)]"
                transition={{
                  duration: reduceMotion ? 0 : 0.25,
                  ease: "easeOut",
                }}
              />
              {isActive && !reduceMotion ? (
                <motion.span
                  animate={{ opacity: [0.45, 0], scale: [0.8, 2.2] }}
                  aria-hidden="true"
                  className="absolute size-3 rounded-full border border-accent"
                  transition={{
                    duration: 1.8,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                />
              ) : null}
              <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-md border border-border bg-background/92 px-2.5 py-1.5 font-mono text-[0.62rem] font-semibold uppercase text-foreground opacity-0 shadow-soft transition-[opacity,transform] duration-200 translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                <span className="mr-2 text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {chapter.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
