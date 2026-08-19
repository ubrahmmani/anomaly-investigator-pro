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
import { ArrowLeft, ArrowRight, Clock, Database, Zap } from "lucide-react";

export default function Investigate() {
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [visibleEvidence, setVisibleEvidence] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
    // Map evidence moment to approximate delay
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
    <div className="min-h-screen bg-[#0a0a0c]">
      <NavBar />

      <div className="px-6 py-5">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex h-7 w-7 items-center justify-center border border-white/[0.08] text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${isComplete ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                    {isComplete ? "Investigation Complete" : "Live Investigation"}
                  </span>
                </div>
                <h1 className="text-lg font-semibold text-white/80 tracking-tight">
                  Electronics Revenue Drop — South Asia
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[10px] text-white/25 font-mono">
                <Clock className="h-3 w-3" />
                <span>{isComplete ? "1 min 42 sec" : "Running..."}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/25 font-mono">
                <Database className="h-3 w-3" />
                <span>Exasol</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/25 font-mono">
                <Zap className="h-3 w-3" />
                <span>3 queries</span>
              </div>
            </div>
          </motion.header>

          {/* ── 3-Panel Layout ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_260px]">
            {/* LEFT: Agent Pipeline */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-white/[0.06] bg-[#0c0c10] p-4"
            >
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                Agent Pipeline
              </span>
              <StepLoader
                steps={investigationSteps}
                activeIndex={activeStepIndex}
                completedIndices={completedSteps}
              />

              {/* Performance stats */}
              <div className="mt-4 border-t border-white/[0.04] pt-3">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-2">
                  Performance
                </span>
                <div className="space-y-1.5">
                  {[
                    { label: "Queries Run", value: completedSteps.length >= 2 ? "3" : "—" },
                    { label: "Avg Latency", value: completedSteps.length >= 2 ? "327ms" : "—" },
                    { label: "Dimensions", value: completedSteps.length >= 2 ? "4" : "—" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-white/25">{stat.label}</span>
                      <span className="font-mono text-[10px] text-white/40">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CENTER: Investigation Timeline (trace) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-white/[0.06] bg-[#0c0c10]"
            >
              {/* Trace header */}
              <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-2.5">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                </div>
                <span className="ml-1 font-mono text-[10px] text-white/25">
                  agent-trace.log
                </span>
                <span className="ml-auto font-mono text-[9px] text-white/15">
                  {visibleLogs}/{traceLogs.length} lines
                </span>
              </div>

              {/* Log output */}
              <div className="h-[420px] overflow-y-auto p-4 font-mono text-[12px] leading-relaxed">
                <AnimatePresence mode="popLayout">
                  {traceLogs.slice(0, visibleLogs).map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex gap-3 py-0.5"
                    >
                      <span className="shrink-0 text-white/15 w-5 text-right">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`shrink-0 w-24 ${
                          log.agent === "Watcher"
                            ? "text-amber-400/60"
                            : log.agent === "Investigator"
                              ? "text-blue-400/60"
                              : log.agent === "Reasoner"
                                ? "text-purple-400/60"
                                : "text-emerald-400/60"
                        }`}
                      >
                        {log.agent}
                      </span>
                      <span className="text-white/45">{log.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Cursor */}
                {visibleLogs < traceLogs.length && (
                  <div className="flex gap-3 py-0.5">
                    <span className="shrink-0 text-white/15 w-5 text-right">
                      {String(visibleLogs + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="h-3.5 w-1.5 bg-amber-500/60"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* RIGHT: Evidence Discovered */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-white/[0.06] bg-[#0c0c10] p-4"
            >
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                Evidence Discovered
              </span>

              <div className="space-y-2">
                <AnimatePresence>
                  {evidenceDiscovered.slice(0, visibleEvidence).map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      className="flex items-center justify-between border border-white/[0.04] bg-white/[0.02] p-3"
                    >
                      <span className="text-[11px] text-white/40">{item.label}</span>
                      <span
                        className={`font-mono text-sm font-semibold ${
                          item.color === "amber"
                            ? "text-amber-400"
                            : item.color === "green"
                              ? "text-emerald-400"
                              : "text-blue-400"
                        }`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {visibleEvidence === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-[11px] text-white/20">Waiting for evidence...</p>
                  </div>
                )}
              </div>

              {/* Root cause (shown at end) */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 border-t border-emerald-500/15 pt-3"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] text-emerald-400/70 uppercase tracking-wider">
                      Root Cause Confirmed
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed mb-2">
                    Revenue decline traced to a 15% price increase in Electronics across South Asia.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] text-emerald-400/70">94% confidence</span>
                  </div>
                  <button
                    onClick={() => navigate("/report")}
                    className="w-full flex items-center justify-center gap-1.5 bg-emerald-500/15 border border-emerald-500/20 py-2 text-[11px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/25"
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
