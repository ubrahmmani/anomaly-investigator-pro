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
  Watcher: "text-amber-400/60",
  Investigator: "text-blue-400/60",
  Reasoner: "text-purple-400/60",
  Reporter: "text-emerald-400/60",
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
    <div className="border border-white/[0.06] bg-[#0c0c10]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-white/10" />
          <div className="h-2 w-2 rounded-full bg-white/10" />
          <div className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <span className="ml-1 font-mono text-[10px] text-white/25">
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
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex gap-3 py-0.5"
            >
              <span className="shrink-0 text-white/12 w-5 text-right">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("shrink-0 w-24", agentColors[log.agent] || "text-white/30")}>
                {log.agent}
              </span>
              <span className="text-white/40">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleCount < logs.length && (
          <div className="flex gap-3 py-0.5">
            <span className="shrink-0 text-white/12 w-5 text-right">
              {String(visibleCount + 1).padStart(2, "0")}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-3.5 w-1.5 bg-amber-500/50"
            />
          </div>
        )}
      </div>
    </div>
  );
}
