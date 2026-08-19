"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
import { StepLoader } from "@/components/custom/StepLoader";
import {
  investigationSteps,
  traceLogs,
  evidenceDiscovered,
} from "@/data/mockData";
import { ArrowLeft, ArrowRight, Clock, Database, Zap, ChevronDown, ChevronUp } from "lucide-react";

export default function Investigate() {
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [visibleEvidence, setVisibleEvidence] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showSQL, setShowSQL] = useState(false);

  const runInvestigation = useCallback(async () => {
    for (let i = 0; i < investigationSteps.length; i++) {
      setActiveStepIndex(i);
      await new Promise((resolve) =>
        setTimeout(resolve, investigationSteps[i].duration)
      );
      setCompletedSteps((prev) => [...prev, i]);
    }
    setActiveStepIndex(-1);
    setIsComplete(true);
  }, []);

  // Stream trace logs
  useEffect(() => {
    if (visibleLogs >= traceLogs.length) return;
    const log = traceLogs[visibleLogs];
    const prevDelay = visibleLogs > 0 ? traceLogs[visibleLogs - 1].delay : 0;
    const interval = log.delay === 0 ? 300 : log.delay - prevDelay || 600;
    const timer = setTimeout(() => {
      setVisibleLogs((prev) => prev + 1);
    }, interval);
    return () => clearTimeout(timer);
  }, [visibleLogs]);

  // Stream evidence items
  useEffect(() => {
    if (visibleEvidence >= evidenceDiscovered.length) return;
    const item = evidenceDiscovered[visibleEvidence];
    const delay = item.moment * 500;
    const timer = setTimeout(() => {
      setVisibleEvidence((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [visibleEvidence]);

  useEffect(() => {
    const timer = setTimeout(() => runInvestigation(), 500);
    return () => clearTimeout(timer);
  }, [runInvestigation]);

  return (
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-4">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex h-7 w-7 items-center justify-center border border-zinc-800 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 ${
                      isComplete ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
                    }`}
                  />
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                    {isComplete ? "Investigation Complete" : "Live Investigation"}
                  </span>
                </div>
                <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
                  Electronics Revenue Drop — South Asia
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <Clock className="h-3 w-3" />
                <span>{isComplete ? "1 min 42 sec" : "Running..."}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <Database className="h-3 w-3" />
                <span>Exasol</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <Zap className="h-3 w-3" />
                <span>{completedSteps.length >= 2 ? "3 queries" : "—"}</span>
              </div>
            </div>
          </motion.header>

          {/* ── 3-Panel Layout ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[200px_1fr_240px]">
            {/* LEFT: Agent Pipeline */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-3"
            >
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                Agent Pipeline
              </span>
              <StepLoader
                steps={investigationSteps}
                activeIndex={activeStepIndex}
                completedIndices={completedSteps}
              />

              {/* Performance stats */}
              <div className="mt-3 border-t border-zinc-800/40 pt-2.5">
                <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider block mb-1.5">
                  Performance
                </span>
                <div className="space-y-1">
                  {[
                    { label: "Queries Run", value: completedSteps.length >= 2 ? "3" : "—" },
                    { label: "Avg Latency", value: completedSteps.length >= 2 ? "327ms" : "—" },
                    { label: "Dimensions", value: completedSteps.length >= 2 ? "4" : "—" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-[9px] text-zinc-600">{stat.label}</span>
                      <span className="font-mono text-[9px] text-zinc-400">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable SQL detail */}
              {completedSteps.length >= 2 && (
                <div className="mt-3 border-t border-zinc-800/40 pt-2.5">
                  <button
                    onClick={() => setShowSQL(!showSQL)}
                    className="flex items-center gap-1 text-[9px] text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {showSQL ? <ChevronUp className="h-2.5 w-2.5" /> : <ChevronDown className="h-2.5 w-2.5" />}
                    Query detail
                  </button>
                  <AnimatePresence>
                    {showSQL && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 font-mono text-[8px] text-zinc-600 leading-relaxed">
                          <div className="text-zinc-700 mb-0.5">{"-- Exasol"}</div>
                          <div>SELECT category, region,</div>
                          <div>{"  "}SUM(revenue)</div>
                          <div>FROM sales</div>
                          <div>WHERE date &gt;= "2026-08-01"</div>
                          <div>GROUP BY category, region</div>
                          <div className="text-emerald-500/40 mt-1">→ 142ms</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            {/* CENTER: Investigation Timeline (trace) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border border-zinc-800/50 bg-zinc-900/60"
            >
              {/* Trace header */}
              <div className="flex items-center gap-2 border-b border-zinc-800/40 px-4 py-2">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                </div>
                <span className="ml-1 font-mono text-[9px] text-zinc-600">
                  agent-trace.log
                </span>
                <span className="ml-auto font-mono text-[8px] text-zinc-700">
                  {visibleLogs}/{traceLogs.length} lines
                </span>
              </div>

              {/* Log output */}
              <div className="h-[400px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed">
                <AnimatePresence mode="popLayout">
                  {traceLogs.slice(0, visibleLogs).map((log, i) => (
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
                        className={`shrink-0 w-24 ${
                          log.agent === "Watcher"
                            ? "text-amber-500/50"
                            : log.agent === "Investigator"
                              ? "text-zinc-400"
                              : log.agent === "Reasoner"
                                ? "text-zinc-400"
                                : "text-emerald-500/50"
                        }`}
                      >
                        {log.agent}
                      </span>
                      <span className="text-zinc-400">{log.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Cursor */}
                {visibleLogs < traceLogs.length && (
                  <div className="flex gap-3 py-0.5">
                    <span className="shrink-0 text-zinc-700 w-5 text-right">
                      {String(visibleLogs + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="h-3.5 w-1 bg-amber-500/50"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* RIGHT: Evidence Discovered */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-3"
            >
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                Evidence Discovered
              </span>

              <div className="space-y-1.5">
                <AnimatePresence>
                  {evidenceDiscovered.slice(0, visibleEvidence).map((item) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, type: "spring", stiffness: 200 }}
                      className="flex items-center justify-between border border-zinc-800/40 bg-zinc-800/20 px-3 py-2"
                    >
                      <span className="text-[10px] text-zinc-400">{item.label}</span>
                      <span
                        className={`font-mono text-[12px] font-semibold ${
                          item.color === "amber"
                            ? "text-amber-500"
                            : item.color === "green"
                              ? "text-emerald-500"
                              : "text-zinc-300"
                        }`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {visibleEvidence === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-[10px] text-zinc-600">Waiting for evidence...</p>
                  </div>
                )}
              </div>

              {/* Root cause (shown at end) */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 border-t border-emerald-500/15 pt-3"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-1.5 w-1.5 bg-emerald-500" />
                    <span className="font-mono text-[8px] text-emerald-500/70 uppercase tracking-wider">
                      Root Cause Confirmed
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">
                    Revenue decline traced to a 15% price increase in Electronics
                    across South Asia.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] text-emerald-500/70">
                      94% confidence
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/report")}
                    className="w-full flex items-center justify-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 py-2 text-[11px] font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  >
                    View Report
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
