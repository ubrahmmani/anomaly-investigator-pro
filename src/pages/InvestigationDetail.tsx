"use client";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { investigationDetail, comments, catalogItems } from "@/data/mockData";
import {
  ArrowLeft,
  Clock,
  Database,
  Zap,
  CheckCircle2,
  MessageSquare,
  Share2,
  Download,
  Play,
  Activity,
} from "lucide-react";

const agentColors: Record<string, string> = {
  Watcher: "text-amber-500/70",
  Investigator: "text-zinc-300",
  Reasoner: "text-zinc-300",
  Reporter: "text-emerald-500/70",
};

const agentDotColors: Record<string, string> = {
  Watcher: "bg-amber-500",
  Investigator: "bg-zinc-400",
  Reasoner: "bg-zinc-400",
  Reporter: "bg-emerald-500",
};

export default function InvestigationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = catalogItems.find((c) => c.id === id);
  const detail = investigationDetail;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#09090b]">
        <NavBar />
        <div className="flex items-center justify-center px-5 py-20">
          <div className="text-center">
            <p className="text-[13px] text-zinc-500 mb-3">Investigation not found.</p>
            <button
              onClick={() => navigate("/browse")}
              className="text-[11px] text-amber-500/60 hover:text-amber-500/80 transition-colors"
            >
              ← Back to catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = item.status === "completed";

  return (
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-5">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors mb-3"
            >
              <ArrowLeft className="h-3 w-3" />
              Catalog
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 font-mono text-[8px] text-emerald-500/70 bg-emerald-500/8 px-1.5 py-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                      COMPLETED
                    </span>
                  ) : item.status === "in-progress" ? (
                    <span className="flex items-center gap-1 font-mono text-[8px] text-amber-500/70 bg-amber-500/8 px-1.5 py-0.5">
                      <Play className="h-3 w-3" />
                      IN PROGRESS
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[8px] text-zinc-400 bg-zinc-800/50 px-1.5 py-0.5">
                      <Clock className="h-3 w-3" />
                      SCHEDULED
                    </span>
                  )}
                  <span className="font-mono text-[8px] text-zinc-700">
                    {item.id}
                  </span>
                </div>
                <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
                  {item.title}
                </h1>
                <p className="mt-1 text-[12px] text-zinc-500">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800/60">
                  <Share2 className="h-3 w-3" />
                </button>
                <button className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800/60">
                  <Download className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-4 gap-px bg-zinc-800/30 border border-zinc-800/50 mb-4"
          >
            {[
              { label: "Duration", value: detail.duration, icon: Clock },
              { label: "Queries", value: `${detail.queriesRun}`, icon: Database },
              { label: "Confidence", value: isCompleted ? `${detail.confidence}%` : "—", icon: Zap },
              { label: "Avg Latency", value: detail.avgLatency, icon: Activity },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-zinc-900/60 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="h-3 w-3 text-zinc-600" />
                    <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <p className="font-mono text-[13px] font-semibold text-zinc-300">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Two-column: Timeline + Metadata */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_260px] mb-4">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-4"
            >
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                Investigation Timeline
              </span>
              <div className="relative">
                <div className="absolute left-[3px] top-0 bottom-0 w-px bg-zinc-800/40" />
                <div className="space-y-0">
                  {detail.timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.16 + i * 0.02 }}
                      className="relative flex items-start gap-3 py-1.5"
                    >
                      <div
                        className={`relative z-10 mt-1.5 h-[5px] w-[5px] shrink-0 ${
                          agentDotColors[item.agent] || "bg-zinc-700"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`font-mono text-[8px] ${
                              agentColors[item.agent] || "text-zinc-500"
                            } uppercase tracking-wider`}
                          >
                            {item.agent}
                          </span>
                          <span className="font-mono text-[8px] text-zinc-700">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {item.event}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Metadata sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.16 }}
              className="space-y-3"
            >
              {/* Confidence */}
              {isCompleted && (
                <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                  <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider block mb-2">
                    Root Cause Confidence
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-2xl font-bold text-amber-500">
                      {detail.confidence}%
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-800/40 overflow-hidden mb-2">
                    <div
                      className="h-full bg-amber-500/40"
                      style={{ width: `${detail.confidence}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {item.rootCause}
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider block mb-2">
                  Details
                </span>
                <div className="space-y-1.5">
                  {[
                    { label: "Backend", value: detail.backend },
                    { label: "Dimensions", value: `${detail.dimensions} analyzed` },
                    { label: "Author", value: item.author },
                    { label: "Date", value: item.date },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className="flex items-center justify-between py-1 border-b border-zinc-800/20 last:border-0"
                    >
                      <span className="text-[10px] text-zinc-600">{d.label}</span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider block mb-2">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-zinc-800/30 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Discussion */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="border border-zinc-800/50 bg-zinc-900/60 p-4 mb-4"
          >
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider flex items-center gap-2 mb-2.5">
              <MessageSquare className="h-3 w-3" />
              Discussion ({comments.length})
            </span>
            <div className="space-y-2.5">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex gap-3 py-2 border-b border-zinc-800/20 last:border-0"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-zinc-800/50 text-[9px] font-mono font-bold text-zinc-500">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-medium text-zinc-300">
                        {c.author}
                      </span>
                      <span className="font-mono text-[8px] text-zinc-600">
                        {c.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-1.5 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Catalog
            </button>
            {isCompleted && (
              <button
                onClick={() => navigate("/report")}
                className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-[11px] font-medium text-amber-500/70 transition-colors hover:bg-amber-500/20"
              >
                View Report →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
