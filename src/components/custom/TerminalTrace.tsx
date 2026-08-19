"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface LogLine {
  agent: string;
  message: string;
  delay: number;
}

const agentColors: Record<string, string> = {
  Watcher: "text-amber-500/50",
  Investigator: "text-zinc-400",
  Reasoner: "text-zinc-400",
  Reporter: "text-emerald-500/50",
};

export function TerminalTrace({
  logs,
  visibleCount,
}: {
  logs: LogLine[];
  visibleCount: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div className="border border-zinc-800/50 bg-zinc-900/60">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800/40 px-4 py-2">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
        </div>
        <span className="ml-1 font-mono text-[9px] text-zinc-600">
          agent-trace.log
        </span>
      </div>

      {/* Log output */}
      <div
        ref={containerRef}
        className="h-[400px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed"
      >
        <AnimatePresence mode="popLayout">
          {logs.slice(0, visibleCount).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex gap-3 py-0.5"
            >
              <span className="shrink-0 text-zinc-700 w-5 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "shrink-0 w-24",
                  agentColors[log.agent] || "text-zinc-500"
                )}
              >
                {log.agent}
              </span>
              <span className="text-zinc-400">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleCount < logs.length && (
          <div className="flex gap-3 py-0.5">
            <span className="shrink-0 text-zinc-700 w-5 text-right">
              {String(visibleCount + 1).padStart(2, "0")}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-3.5 w-1 bg-amber-500/40"
            />
          </div>
        )}
      </div>
    </div>
  );
}
