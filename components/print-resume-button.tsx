"use client";

import { Printer } from "lucide-react";

export function PrintResumeButton() {
  return (
    <button
      aria-label="Print or save resume as PDF"
      className="focus-ring group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--accent)_32%,transparent)]"
      onClick={() => window.print()}
      type="button"
    >
      <Printer
        aria-hidden="true"
        className="transition-transform group-hover:scale-105"
        size={17}
      />
      Print / Save PDF
    </button>
  );
}
