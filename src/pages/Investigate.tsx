"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import { StepLoader } from "@/components/custom/StepLoader";
import { TerminalTrace } from "@/components/custom/TerminalTrace";
import { investigationSteps, traceLogs } from "@/data/mockData";
import { ArrowLeft, Zap } from "lucide-react";

export default function Investigate() {
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const runInvestigation = useCallback(async () => {
    // Simulate step progression
    for (let i = 0; i < investigationSteps.length; i++) {
      setActiveStepIndex(i);

      // Wait for the step's duration
      await new Promise((resolve) =>
        setTimeout(resolve, investigationSteps[i].duration)
      );

      setCompletedSteps((prev) => [...prev, i]);
    }

    // After all steps complete, show complete state
    setActiveStepIndex(-1);
    setIsComplete(true);
  }, []);

  // Stream trace logs
  useEffect(() => {
    if (visibleLogs >= traceLogs.length) return;

    const log = traceLogs[visibleLogs];
    const timer = setTimeout(() => {
      setVisibleLogs((prev) => prev + 1);
    }, log.delay === 0 ? 300 : traceLogs[visibleLogs]?.delay - (traceLogs[visibleLogs - 1]?.delay || 0) || 600);

    return () => clearTimeout(timer);
  }, [visibleLogs]);

  // Start investigation on mount
  useEffect(() => {
    const timer = setTimeout(() => runInvestigation(), 500);
    return () => clearTimeout(timer);
  }, [runInvestigation]);

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-violet-400" />
                <span className="font-mono text-xs text-violet-400/70 tracking-wider uppercase">
                  Live Investigation
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Analyzing Revenue Anomaly
              </h1>
            </div>
          </motion.header>

          {/* Main content: two columns */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left: Step progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="mb-4 text-xs font-medium text-white/30 uppercase tracking-wider">
                Agent Progress
              </div>
              <StepLoader
                steps={investigationSteps}
                activeIndex={activeStepIndex}
                completedIndices={completedSteps}
              />

              {/* Completion state */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center"
                >
                  <p className="text-sm font-medium text-emerald-400">
                    ✓ Investigation Complete
                  </p>
                  <p className="mt-1 text-xs text-emerald-300/50">
                    Root cause identified with 94% confidence
                  </p>
                  <button
                    onClick={() => navigate("/report")}
                    className="mt-3 rounded-lg bg-emerald-500/20 px-4 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/30"
                  >
                    View Report →
                  </button>
                </motion.div>
              )}

              {/* Status info */}
              <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-3">
                  Query Performance
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-mono text-lg font-bold text-white">3</p>
                    <p className="text-[10px] text-white/30">Queries Run</p>
                  </div>
                  <div>
                    <p className="font-mono text-lg font-bold text-white">327ms</p>
                    <p className="text-[10px] text-white/30">Avg Latency</p>
                  </div>
                  <div>
                    <p className="font-mono text-lg font-bold text-white">4</p>
                    <p className="text-[10px] text-white/30">Dimensions</p>
                  </div>
                  <div>
                    <p className="font-mono text-lg font-bold text-emerald-400">
                      Exasol
                    </p>
                    <p className="text-[10px] text-white/30">Backend</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Terminal trace */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="mb-4 text-xs font-medium text-white/30 uppercase tracking-wider">
                Agent Trace
              </div>
              <TerminalTrace logs={traceLogs} visibleCount={visibleLogs} />
            </motion.div>
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
