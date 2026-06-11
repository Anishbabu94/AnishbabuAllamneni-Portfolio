"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { BrandMark } from "@/components/brand-mark";
import { navItems, siteConfig } from "@/lib/data";

const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

interface ViewTransitionAnimationOptions extends KeyframeAnimationOptions {
  pseudoElement: string;
}

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);

    const updateScrollState = () => {
      setHasScrolled(window.scrollY > 50);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.12, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = mobileMenuRef.current?.querySelectorAll<
          HTMLAnchorElement
        >("a[href]");

        if (!focusableElements?.length) {
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleTheme = async (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";
    const startViewTransition = document.startViewTransition;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (typeof startViewTransition !== "function" || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY),
    );
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${radius}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 560,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        pseudoElement: "::view-transition-new(root)",
      } satisfies ViewTransitionAnimationOptions,
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 sm:px-4"
      initial={{ opacity: 0, y: -20 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: easeOutQuad,
      }}
    >
      <motion.nav
        animate={{
          marginTop: hasScrolled ? 10 : 0,
          maxWidth: hasScrolled ? 940 : 1160,
        }}
        aria-label="Primary navigation"
        className={`pointer-events-auto relative mx-auto flex items-center justify-between px-3 transition-[height,background-color,border-color,border-radius,box-shadow] sm:px-5 ${
          hasScrolled
            ? "h-14 rounded-full border border-border/90 bg-background/78 shadow-elevated backdrop-blur-2xl"
            : "h-[var(--navbar-height)] rounded-none border border-transparent bg-transparent"
        }`}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.42,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent transition-opacity duration-300 ${
            hasScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <Link
          aria-label={`${siteConfig.shortName} home`}
          className="focus-ring group relative z-10 inline-flex items-center gap-2.5 rounded-lg text-sm font-semibold"
          href="#top"
          onClick={closeMenu}
        >
          <BrandMark className="transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105" />
          <span className="font-display text-[0.82rem] font-bold transition-colors duration-200 group-hover:text-accent">
            {siteConfig.shortName}
          </span>
        </Link>

        <div className="relative hidden items-center gap-1 rounded-full border border-border/70 bg-card/48 p-1 shadow-inset md:flex">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <Link
                aria-current={isActive ? "location" : undefined}
                className={`focus-ring group relative isolate inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                href={item.href}
                key={item.href}
              >
                {isActive ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full border border-accent/20 bg-accent/10 shadow-[inset_0_1px_0_color-mix(in_srgb,var(--accent)_12%,transparent)]"
                    layoutId="active-navigation-lens"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.55rem] opacity-55 transition-opacity group-hover:opacity-90"
                >
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label={
              isMounted && isDark ? "Switch to light mode" : "Switch to dark mode"
            }
            className="focus-ring group relative grid size-10 place-items-center overflow-hidden rounded-full border border-border bg-card/80 text-foreground shadow-inset transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent hover:shadow-soft"
            onClick={toggleTheme}
            type="button"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-accent/8 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                className="relative"
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                key={isMounted && isDark ? "sun" : "moon"}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.22,
                  ease: easeOutQuad,
                }}
              >
                {isMounted && isDark ? (
                  <Sun aria-hidden="true" size={18} strokeWidth={2} />
                ) : (
                  <Moon aria-hidden="true" size={18} strokeWidth={2} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="focus-ring group relative grid size-10 place-items-center overflow-hidden rounded-full border border-border bg-card/80 text-foreground shadow-inset transition duration-200 hover:border-accent/60 hover:text-accent md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            ref={menuButtonRef}
            type="button"
          >
            <motion.span
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.24,
                ease: easeOutQuad,
              }}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" size={19} strokeWidth={2} />
              ) : (
                <Menu aria-hidden="true" size={19} strokeWidth={2} />
              )}
            </motion.span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className={`pointer-events-auto fixed inset-x-0 bottom-0 z-40 overflow-hidden border-t border-border/70 bg-background/92 backdrop-blur-2xl md:hidden ${
              hasScrolled ? "top-[4.75rem]" : "top-[var(--navbar-height)]"
            }`}
            exit={{ opacity: 0 }}
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            ref={mobileMenuRef}
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            transition={{
              duration: shouldReduceMotion ? 0 : 0.24,
              ease: easeOutQuad,
            }}
          >
            <div
              aria-hidden="true"
              className="grid-background pointer-events-none absolute inset-0 opacity-55"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_13%,transparent),transparent_70%)]"
            />
            <motion.div
              animate="show"
              className="section-shell relative flex min-h-[calc(100vh-var(--navbar-height))] flex-col justify-center gap-1 py-10"
              initial="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.065,
                  },
                },
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: shouldReduceMotion ? 0 : 0.42,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                >
                  <Link
                    aria-current={
                      activeSection === item.href.slice(1)
                        ? "location"
                        : undefined
                    }
                    className={`focus-ring group grid min-h-[4.75rem] grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-lg border-b border-border/80 px-1 font-display text-[clamp(1.8rem,8vw,2.5rem)] font-semibold transition-colors duration-200 ${
                      activeSection === item.href.slice(1)
                        ? "bg-accent/8 text-accent"
                        : "text-foreground hover:bg-card/45 hover:text-accent"
                    }`}
                    href={item.href}
                    onClick={closeMenu}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.62rem] text-muted-foreground"
                    >
                      0{index + 1}
                    </span>
                    {item.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      size={20}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
