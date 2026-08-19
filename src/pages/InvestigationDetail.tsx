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
} from "lucide-react";

const agentColors: Record<string, string> = {
  Watcher: "text-amber-400",
  Investigator: "text-blue-400",
  Reasoner: "text-purple-400",
  Reporter: "text-emerald-400",
};

const agentDotColors: Record<string, string> = {
  Watcher: "bg-amber-500",
  Investigator: "bg-blue-400",
  Reasoner: "bg-purple-400",
  Reporter: "bg-emerald-500",
};

export default function InvestigationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = catalogItems.find((c) => c.id === id);
  const detail = investigationDetail;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0a0a0c]">
        <NavBar />
        <div className="flex items-center justify-center px-6 py-20">
          <div className="text-center">
            <p className="text-[13px] text-white/35 mb-3">Investigation not found.</p>
            <button
              onClick={() => navigate("/browse")}
              className="text-[11px] text-amber-400/60 hover:text-amber-400/80 transition-colors"
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
    <div className="min-h-screen bg-[#0a0a0c]">
      <NavBar />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-[900px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/45 transition-colors mb-3"
            >
              <ArrowLeft className="h-3 w-3" />
              Catalog
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 font-mono text-[9px] text-emerald-400/70 bg-emerald-500/8 px-1.5 py-0.5">
                      <CheckCircle2 className="h-3 w-3" />
                      COMPLETED
                    </span>
                  ) : item.status === "in-progress" ? (
                    <span className="flex items-center gap-1 font-mono text-[9px] text-amber-400/70 bg-amber-500/8 px-1.5 py-0.5">
                      <Play className="h-3 w-3" />
                      IN PROGRESS
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[9px] text-blue-400/70 bg-blue-400/8 px-1.5 py-0.5">
                      <Clock className="h-3 w-3" />
                      SCHEDULED
                    </span>
                  )}
                  <span className="font-mono text-[9px] text-white/15">{item.id}</span>
                </div>
                <h1 className="text-lg font-semibold text-white/80 tracking-tight">
                  {item.title}
                </h1>
                <p className="mt-1 text-[12px] text-white/35">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/35 transition-colors hover:bg-white/[0.06]">
                  <Share2 className="h-3 w-3" />
                </button>
                <button className="flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/35 transition-colors hover:bg-white/[0.06]">
                  <Download className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-4 gap-px bg-white/[0.04] border border-white/[0.06] mb-5"
          >
            {[
              { label: "Duration", value: detail.duration, icon: Clock },
              { label: "Queries", value: `${detail.queriesRun}`, icon: Database },
              { label: "Confidence", value: isCompleted ? `${detail.confidence}%` : "—", icon: Zap },
              { label: "Avg Latency", value: detail.avgLatency, icon: Activity },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-[#0c0c10] p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="h-3 w-3 text-white/20" />
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className="font-mono text-[13px] font-semibold text-white/55">{stat.value}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Two-column: Timeline + Metadata */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px] mb-5">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="border border-white/[0.06] bg-[#0c0c10] p-4"
            >
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                Investigation Timeline
              </span>
              <div className="relative">
                <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/[0.06]" />
                <div className="space-y-0">
                  {detail.timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.03 }}
                      className="relative flex items-start gap-3 py-1.5"
                    >
                      <div className={`relative z-10 mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full ${agentDotColors[item.agent] || "bg-white/20"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`font-mono text-[9px] ${agentColors[item.agent] || "text-white/30"} uppercase tracking-wider`}>
                            {item.agent}
                          </span>
                          <span className="font-mono text-[9px] text-white/10">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed">{item.event}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Metadata sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Confidence */}
              {isCompleted && (
                <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                  <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-2">
                    Root Cause Confidence
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-2xl font-bold text-amber-400">{detail.confidence}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] overflow-hidden mb-2">
                    <div
                      className="h-full bg-amber-500/50"
                      style={{ width: `${detail.confidence}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    {item.rootCause}
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-2">
                  Details
                </span>
                <div className="space-y-2">
                  {[
                    { label: "Backend", value: detail.backend },
                    { label: "Dimensions", value: `${detail.dimensions} analyzed` },
                    { label: "Author", value: item.author },
                    { label: "Date", value: item.date },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-0">
                      <span className="text-[10px] text-white/25">{d.label}</span>
                      <span className="font-mono text-[10px] text-white/40">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-2">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-white/20"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-white/[0.06] bg-[#0c0c10] p-4 mb-5"
          >
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider flex items-center gap-2 mb-3">
              <MessageSquare className="h-3 w-3" />
              Discussion ({comments.length})
            </span>
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3 py-2 border-b border-white/[0.03] last:border-0">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-white/[0.06] text-[9px] font-mono font-bold text-white/30">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-medium text-white/50">{c.author}</span>
                      <span className="font-mono text-[9px] text-white/15">{c.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-white/35 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-1.5 text-[11px] text-white/25 transition-colors hover:text-white/45"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Catalog
            </button>
            {isCompleted && (
              <button
                onClick={() => navigate("/report")}
                className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-[11px] font-medium text-amber-400/70 transition-colors hover:bg-amber-500/20"
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

// Unused import to avoid build error — Activity is used in stats strip
import { Activity } from "lucide-react";
