"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import {
  ArrowLeft,
  Zap,
  Upload,
  BarChart3,
  FileText,
  Clock,
  Tag,
  AlertTriangle,
} from "lucide-react";
import logo from "@/assets/logo.svg";

export default function Create() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"new" | "upload">("new");
  const [metric, setMetric] = useState("revenue");
  const [region, setRegion] = useState("all");
  const [schedule, setSchedule] = useState("now");

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
                <Zap className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  New Investigation
                </h1>
                <p className="text-xs text-white/35">
                  Deploy the agent swarm on a new anomaly or upload data for analysis
                </p>
              </div>
            </div>
          </motion.header>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 w-fit"
          >
            {(["new", "upload"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={
                  mode === m
                    ? "rounded-lg bg-violet-500/20 px-4 py-2 text-xs font-medium text-violet-300 transition-colors"
                    : "rounded-lg px-4 py-2 text-xs text-white/35 transition-colors hover:text-white/50"
                }
              >
                {m === "new" ? (
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" />
                    New Investigation
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Upload Data
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {mode === "new" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {/* Metric selection */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-violet-400/60" />
                  <span className="text-xs font-medium text-white/50">What to investigate</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "revenue", label: "Revenue Dips", icon: "📉" },
                    { value: "orders", label: "Order Volume Drops", icon: "📦" },
                    { value: "category", label: "Category Performance", icon: "🏷️" },
                    { value: "region", label: "Regional Anomalies", icon: "🌍" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setMetric(opt.value)}
                      className={
                        metric === opt.value
                          ? "flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-left transition-colors"
                          : "flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-colors hover:bg-white/[0.04]"
                      }
                    >
                      <span className="text-lg">{opt.icon}</span>
                      <span className="text-xs font-medium text-white/60">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-cyan-400/60" />
                  <span className="text-xs font-medium text-white/50">Region scope</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All Regions", "South Asia", "North America", "Europe", "APAC", "Latin America"].map(
                    (r) => (
                      <button
                        key={r}
                        onClick={() => setRegion(r.toLowerCase().replace(" ", "-"))}
                        className={
                          region === r.toLowerCase().replace(" ", "-")
                            ? "rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-colors"
                            : "rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/35 transition-colors hover:bg-white/10 hover:text-white/50"
                        }
                      >
                        {r}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-amber-400/60" />
                  <span className="text-xs font-medium text-white/50">When to run</span>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "now", label: "Run Now" },
                    { value: "schedule", label: "Schedule" },
                    { value: "recurring", label: "Recurring" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSchedule(opt.value)}
                      className={
                        schedule === opt.value
                          ? "rounded-lg bg-amber-500/20 px-4 py-2 text-xs font-medium text-amber-300 transition-colors"
                          : "rounded-lg bg-white/5 px-4 py-2 text-xs text-white/35 transition-colors hover:bg-white/10 hover:text-white/50"
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom note */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-emerald-400/60" />
                  <span className="text-xs font-medium text-white/50">Additional context (optional)</span>
                </div>
                <textarea
                  placeholder="e.g., Focus on Electronics category in South Asia, investigate after the price change on Aug 5..."
                  className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-violet-500/30 resize-none h-24"
                />
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center pt-2"
              >
                <button
                  onClick={() => navigate("/investigate")}
                  className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
                >
                  <Zap className="h-4 w-4" />
                  Deploy Agent Swarm
                </button>
              </motion.div>

              {/* Warning */}
              <div className="flex items-start gap-2 rounded-xl bg-amber-500/[0.06] border border-amber-500/10 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-400/50 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-300/40 leading-relaxed">
                  All SQL queries will run against Exasol Personal. The Investigator agent
                  will automatically generate and execute queries to isolate the root cause.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Upload Mode */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="rounded-2xl border-2 border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
                <Upload className="h-10 w-10 mx-auto mb-4 text-white/15" />
                <h3 className="text-sm font-semibold text-white mb-1">
                  Upload your data
                </h3>
                <p className="text-xs text-white/30 mb-4 max-w-sm mx-auto">
                  Drag and drop a CSV, JSON, or Parquet file here, or click to browse.
                  The Investigator agent will analyze the data for anomalies.
                </p>
                <button className="rounded-xl bg-violet-500/20 px-6 py-2.5 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/30">
                  Browse Files
                </button>
                <p className="mt-3 text-[10px] text-white/15">
                  Supported formats: CSV, JSON, Parquet &middot; Max 100 MB
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </GridBackground>
  );
}
