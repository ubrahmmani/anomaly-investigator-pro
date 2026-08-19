"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
import {
  ArrowLeft,
  Zap,
  Upload,
  BarChart3,
  Clock,
  Tag,
} from "lucide-react";

export default function Create() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"new" | "upload">("new");
  const [metric, setMetric] = useState("revenue");
  const [region, setRegion] = useState("all");
  const [schedule, setSchedule] = useState("now");

  return (
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-5">
        <div className="mx-auto max-w-[640px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors mb-3"
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </button>
            <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
              New Investigation
            </h1>
            <p className="mt-1 text-[12px] text-zinc-500">
              Deploy the agent swarm on a new anomaly or upload data for analysis.
            </p>
          </motion.header>

          {/* Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="mb-4 flex gap-0 border border-zinc-800/50 bg-zinc-800/20 p-0.5 w-fit"
          >
            {(["new", "upload"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={
                  mode === m
                    ? "bg-zinc-800/50 px-4 py-2 text-[11px] font-medium text-zinc-200 transition-colors"
                    : "bg-transparent px-4 py-2 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
                }
              >
                <span className="flex items-center gap-1.5">
                  {m === "new" ? (
                    <>
                      <Zap className="h-3 w-3" />
                      New Investigation
                    </>
                  ) : (
                    <>
                      <Upload className="h-3 w-3" />
                      Upload Data
                    </>
                  )}
                </span>
              </button>
            ))}
          </motion.div>

          {mode === "new" ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="space-y-3"
            >
              {/* Metric */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-3.5 w-3.5 text-zinc-600" />
                  <span className="text-[11px] font-medium text-zinc-400">
                    What to investigate
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "revenue", label: "Revenue" },
                    { value: "orders", label: "Order Volume" },
                    { value: "category", label: "Category Performance" },
                    { value: "region", label: "Regional Anomaly" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setMetric(opt.value)}
                      className={
                        metric === opt.value
                          ? "border border-amber-500/25 bg-amber-500/8 px-3 py-2 text-[11px] font-medium text-amber-500/80 text-left transition-colors"
                          : "border border-zinc-800/50 bg-zinc-800/20 px-3 py-2 text-[11px] text-zinc-400 text-left transition-colors hover:border-zinc-700/50"
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3.5 w-3.5 text-zinc-600" />
                  <span className="text-[11px] font-medium text-zinc-400">
                    Region scope
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["all", "south-asia", "europe", "north-america", "apac", "global"].map(
                    (r) => (
                      <button
                        key={r}
                        onClick={() => setRegion(r)}
                        className={
                          region === r
                            ? "border border-amber-500/25 bg-amber-500/8 px-3 py-2 text-[11px] font-medium text-amber-500/80 text-left transition-colors"
                            : "border border-zinc-800/50 bg-zinc-800/20 px-3 py-2 text-[11px] text-zinc-400 text-left transition-colors hover:border-zinc-700/50"
                        }
                      >
                        {r === "all"
                          ? "All Regions"
                          : r
                              .split("-")
                              .map((w) => w[0].toUpperCase() + w.slice(1))
                              .join(" ")}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Schedule */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-3.5 w-3.5 text-zinc-600" />
                  <span className="text-[11px] font-medium text-zinc-400">
                    When to run
                  </span>
                </div>
                <div className="flex gap-2">
                  {[
                    { value: "now", label: "Now" },
                    { value: "scheduled", label: "Scheduled" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSchedule(opt.value)}
                      className={
                        schedule === opt.value
                          ? "border border-amber-500/25 bg-amber-500/8 px-4 py-2 text-[11px] font-medium text-amber-500/80 transition-colors"
                          : "border border-zinc-800/50 bg-zinc-800/20 px-4 py-2 text-[11px] text-zinc-400 transition-colors hover:border-zinc-700/50"
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Launch */}
              <button
                onClick={() => navigate("/investigate")}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 py-3 text-[13px] font-medium text-zinc-950 transition-colors hover:bg-amber-400"
              >
                <Zap className="h-3.5 w-3.5" />
                Launch Investigation
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="border border-dashed border-zinc-800/60 bg-zinc-900/40 p-10 text-center"
            >
              <Upload className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
              <p className="text-[13px] text-zinc-400 mb-1">
                Drop a CSV or Parquet file
              </p>
              <p className="text-[10px] text-zinc-600">or click to browse</p>
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] text-zinc-600">
                <span>Supports CSV, Parquet, JSON</span>
                <span>·</span>
                <span>Max 100MB</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
