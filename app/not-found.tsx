import { ArrowLeft, RadioTower } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-svh place-items-center overflow-hidden px-5">
      <div
        aria-hidden="true"
        className="grid-background absolute inset-0 -z-20 opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[min(80vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_65%)]"
      />
      <div className="relative max-w-xl rounded-lg border border-border bg-background/72 p-7 text-center shadow-elevated backdrop-blur-xl sm:p-10">
        <span
          aria-hidden="true"
          className="absolute -left-2 -top-2 size-8 border-l border-t border-accent/60"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-2 -right-2 size-8 border-b border-r border-accent-secondary/60"
        />
        <div className="mx-auto flex items-center justify-center gap-3">
          <BrandMark />
          <span className="grid size-10 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
            <RadioTower aria-hidden="true" size={19} />
          </span>
        </div>
        <p className="section-label justify-center">404 | Signal Lost</p>
        <h1 className="section-heading mx-auto mt-6">
          This page is outside the system.
        </h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          The address may have changed, or the page may no longer exist.
        </p>
        <Link
          className="focus-ring group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_12px_30px_color-mix(in_srgb,var(--accent)_24%,transparent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--accent)_32%,transparent)]"
          href="/"
        >
          <ArrowLeft
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
            size={18}
          />
          Return to portfolio
        </Link>
      </div>
    </main>
  );
}
