"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/data";

export function CopyEmailButton() {
  const [hasCopied, setHasCopied] = useState(false);

  const copyWithFallback = () => {
    const textArea = document.createElement("textarea");
    textArea.value = siteConfig.email;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    const didCopy = document.execCommand("copy");
    textArea.remove();

    return didCopy;
  };

  const copyEmail = async () => {
    let didCopy = false;

    try {
      await navigator.clipboard.writeText(siteConfig.email);
      didCopy = true;
    } catch {
      didCopy = copyWithFallback();
    }

    if (didCopy) {
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 1800);
    }
  };

  return (
    <button
      aria-label={`Copy ${siteConfig.email} to clipboard`}
      className={`focus-ring group inline-flex min-h-14 items-center justify-between gap-2 px-4 text-sm font-semibold transition duration-300 ${
        hasCopied
          ? "bg-signal/10 text-signal"
          : "bg-background/88 hover:bg-card hover:text-accent"
      }`}
      onClick={copyEmail}
      type="button"
    >
      <AnimatePresence initial={false} mode="wait">
        {hasCopied ? (
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            initial={{ opacity: 0, scale: 0.88 }}
            key="check"
          >
            <Check aria-hidden="true" size={18} />
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            initial={{ opacity: 0, scale: 0.88 }}
            key="copy"
          >
            <Copy aria-hidden="true" size={18} />
          </motion.span>
        )}
      </AnimatePresence>
      {hasCopied ? "Email Copied" : "Copy Email"}
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full transition-colors ${
          hasCopied ? "bg-signal" : "bg-muted-foreground/45 group-hover:bg-accent"
        }`}
      />
      <span aria-live="polite" className="sr-only">
        {hasCopied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
