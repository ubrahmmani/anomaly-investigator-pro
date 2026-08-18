"use client";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/custom/GridBackground";
import { investigationDetail, comments, reportData, catalogItems } from "@/data/mockData";
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
  TrendingDown,
} from "lucide-react";

const agentColors: Record<string, string> = {
  Watcher: "text-amber-400 bg-amber-500/15",
  Investigator: "text-cyan-400 bg-cyan-500/15",
  Reasoner: "text-violet-400 bg-violet-500/15",
  Reporter: "text-emerald-400 bg-emerald-500/15",
};

export default function InvestigationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = catalogItems.find((c) => c.id === id);
  const detail = investigationDetail;
  const detailComments = comments;

  if (!item) {
    return (
      <GridBackground>
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm text-white/40 mb-3">Investigation not found.</p>
            <button
              onClick={() => navigate("/browse")}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              ← Back to catalog
            </button>
          </div>
        </div>
      </GridBackground>
    );
  }

  const isCompleted = item.status === "completed";

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/browse")}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to catalog
            </button>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      Completed
                    </span>
                  ) : item.status === "in-progress" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-medium text-amber-400">
                      <Play className="h-3 w-3" />
                      In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-medium text-blue-400">
                      <Clock className="h-3 w-3" />
                      Scheduled
                    </span>
                  )}
                  <span className="text-[10px] text-white/20">#{item.id}</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {item.title}
                </h1>
                <p className="mt-1 text-sm text-white/40">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                  <Download className="h-3.5 w-3.5" />
                  Export
                </button>
              </div>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Key metrics row */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {reportData.keyFindings.map((f) => (
                    <div
                      key={f.metric}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                    >
                      <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                        {f.metric}
                      </p>
                      <p className="font-mono text-lg font-bold text-white">
                        {f.value}
                      </p>
                      <p className="text-[10px] text-white/25">{f.detail}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Headline finding */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
                >
                  <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                    Root Cause
                  </h3>
                  <p className="text-base font-semibold text-white mb-2">
                    {reportData.headline}
                  </p>
                  <div className="space-y-2 text-sm text-white/50 leading-relaxed">
                    {reportData.summary.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Chart placeholder */}
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
                >
                  <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                    Revenue vs. Price Over Time
                  </h3>
                  <div className="flex items-end gap-3 h-32">
                    {[
                      { d: "Aug 1", r: 45, post: false },
                      { d: "Aug 2", r: 47, post: false },
                      { d: "Aug 3", r: 44, post: false },
                      { d: "Aug 4", r: 46, post: false },
                      { d: "Aug 5", r: 38, post: true },
                      { d: "Aug 6", r: 28, post: true },
                      { d: "Aug 7", r: 25, post: true },
                    ].map((d) => (
                      <div key={d.d} className="flex flex-1 flex-col items-center gap-1.5">
                        <span className="font-mono text-[9px] text-white/25">{d.r}k</span>
                        <div
                          className={`w-full rounded-t ${d.post ? "bg-red-500/50" : "bg-violet-500/50"}`}
                          style={{ height: `${(d.r / 50) * 100}%` }}
                        />
                        <span className="font-mono text-[9px] text-white/20">
                          {d.d.replace("Aug ", "")}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Comments */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Comments ({detailComments.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {detailComments.map((c) => (
                    <div
                      key={c.id}
                      className="flex gap-3 rounded-xl bg-white/[0.02] p-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-[10px] font-bold text-violet-300">
                        {c.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-white/70">
                            {c.author}
                          </span>
                          <span className="text-[10px] text-white/20">
                            {c.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-white/45 leading-relaxed">
                          {c.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Comment input */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-violet-500/30"
                  />
                  <button className="rounded-lg bg-violet-500/20 px-3 py-2 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/30">
                    Post
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Agent timeline */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              >
                <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-4">
                  Investigation Timeline
                </h3>
                <div className="space-y-2.5">
                  {detail.timeline.map((entry, i) => (
                    <div key={i} className="flex gap-2.5 text-[11px]">
                      <span className="shrink-0 font-mono text-white/20 w-14">
                        {entry.time.slice(0, 5)}
                      </span>
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
                          agentColors[entry.agent] || "text-white/30 bg-white/5"
                        }`}
                      >
                        {entry.agent}
                      </span>
                      <span className="text-white/40 leading-relaxed">
                        {entry.event}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Metadata */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              >
                <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                  Details
                </h3>
                <div className="space-y-2.5 text-[11px]">
                  {[
                    { label: "Status", value: item.status },
                    { label: "Date", value: item.date },
                    { label: "Author", value: item.author },
                    { label: "Impact", value: item.impact },
                    { label: "Metric", value: item.affectedMetric },
                    { label: "Root Cause", value: item.rootCause },
                    ...(isCompleted
                      ? [
                          { label: "Confidence", value: `${item.confidence}%` },
                          { label: "Queries Run", value: String(detail.queriesRun) },
                          { label: "Avg Latency", value: detail.avgLatency },
                          { label: "Backend", value: detail.backend },
                        ]
                      : []),
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-white/30">{row.label}</span>
                      <span className="font-mono text-white/60">{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
              >
                <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[10px] text-white/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Run new investigation CTA */}
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => navigate("/investigate")}
                  className="w-full rounded-xl border border-violet-500/20 bg-violet-500/10 p-4 text-left transition-colors hover:bg-violet-500/15"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-3.5 w-3.5 text-violet-400" />
                    <span className="text-xs font-medium text-violet-300">
                      Run New Investigation
                    </span>
                  </div>
                  <p className="text-[10px] text-violet-300/40">
                    Deploy the agent swarm on a fresh anomaly
                  </p>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
