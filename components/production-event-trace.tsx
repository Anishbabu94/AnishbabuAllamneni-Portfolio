"use client";

import { motion } from "framer-motion";
import { Check, Clock3 } from "lucide-react";

const traceEvents = [
  { event: "event.received", detail: "pipeline_failure", latency: "12ms" },
  { event: "cache.hit", detail: "normalized_context", latency: "<1ms" },
  { event: "agent.triage", detail: "claude_sonnet", latency: "842ms" },
  {
    event: "resolution.routed",
    detail: "operations_queue",
    latency: "24ms",
  },
] as const;

export function ProductionEventTrace() {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-[#0b0b0d] text-zinc-300 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <p className="technical-label text-zinc-500">Production Trace</p>
          <p className="mt-1 font-mono text-xs text-zinc-300">
            run_7f2a / us-east-1
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Healthy
        </span>
      </div>

      <ol className="relative px-4 py-2">
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-[1.45rem] top-5 w-px bg-white/10"
        />
        {traceEvents.map((trace, index) => (
          <motion.li
            animate={{ opacity: 1, x: 0 }}
            className="relative grid grid-cols-[1.25rem_1fr_auto] items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0"
            initial={{ opacity: 0, x: 12 }}
            key={trace.event}
            transition={{
              delay: 0.72 + index * 0.18,
              duration: 0.38,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.span
              animate={{ scale: [0.75, 1.15, 1] }}
              className="relative z-10 grid size-5 place-items-center rounded-full border border-emerald-400/30 bg-[#0b0b0d] text-emerald-400"
              transition={{
                delay: 0.78 + index * 0.18,
                duration: 0.35,
              }}
            >
              <Check aria-hidden="true" size={11} strokeWidth={3} />
            </motion.span>
            <span className="min-w-0 font-mono">
              <span className="block truncate text-xs font-semibold text-zinc-100">
                {trace.event}
              </span>
              <span className="mt-1 block truncate text-[0.68rem] text-zinc-500">
                {trace.detail}
              </span>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-zinc-500">
              <Clock3 aria-hidden="true" size={11} />
              {trace.latency}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
