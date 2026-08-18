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
  Watcher: "text-amber-400",
  Investigator: "text-cyan-400",
  Reasoner: "text-violet-400",
  Reporter: "text-emerald-400",
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
    <div className="rounded-xl border border-white/5 bg-[#0a0a0f]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-white/30">
          agent-trace.log
        </span>
      </div>

      {/* Log output */}
      <div
        ref={containerRef}
        className="h-[400px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
      >
        <AnimatePresence mode="popLayout">
          {logs.slice(0, visibleCount).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex gap-3"
            >
              <span className="shrink-0 text-white/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("shrink-0", agentColors[log.agent] || "text-white/50")}>
                [{log.agent}]
              </span>
              <span className="text-white/70">{log.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Blinking cursor */}
        {visibleCount < logs.length && (
          <div className="flex gap-3">
            <span className="shrink-0 text-white/20">
              {String(visibleCount + 1).padStart(2, "0")}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-4 w-2 bg-violet-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
