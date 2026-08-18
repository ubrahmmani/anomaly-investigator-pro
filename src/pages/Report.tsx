"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import { reportData, chartPlaceholder, comments } from "@/data/mockData";
import {
  ArrowLeft,
  Download,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  MapPin,
  ExternalLink,
  Share2,
  MessageSquare,
  Search,
  Plus,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import logo from "@/assets/logo.svg";

const findingIcons = [TrendingDown, ShoppingCart, DollarSign, MapPin];

export default function Report() {
  const navigate = useNavigate();

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {/* Nav Bar */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Anomalo Investigator Pro" className="h-6 w-6" />
              <span className="font-mono text-sm text-white/50 tracking-wider">
                Anomalo Investigator Pro
              </span>
            </div>
            <div className="flex items-center gap-1">
              {[
                { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
                { label: "Browse", icon: Search, path: "/browse" },
                { label: "New", icon: Plus, path: "/create" },
                { label: "Admin", icon: Shield, path: "/admin" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/50"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.nav>

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
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400/70 tracking-wider uppercase">
                  Investigation Report
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                  Complete
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Root Cause Analysis
              </h1>
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
          </motion.header>

          {/* Main Report Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-[11px] font-medium text-violet-300">
                94% Confidence
              </span>
              <span className="text-[11px] text-white/30">
                Backed by 3 independent data slices
              </span>
            </div>

            <h2 className="text-xl font-bold leading-snug text-white mb-4">
              {reportData.headline}
            </h2>

            <div className="space-y-3 text-sm leading-relaxed text-white/60">
              {reportData.summary.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Key Findings Grid */}
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {reportData.keyFindings.map((finding, i) => {
              const Icon = findingIcons[i];
              return (
                <motion.div
                  key={finding.metric}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-violet-400/60" />
                    <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">
                      {finding.metric}
                    </span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-white mb-0.5">
                    {finding.value}
                  </p>
                  <p className="text-[11px] text-white/35">{finding.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {chartPlaceholder.title}
                </h3>
                <p className="text-[11px] text-white/30 mt-0.5">
                  Aug 1–7, 2026 &middot; Price increase on Aug 5 highlighted
                </p>
              </div>
            </div>

            <div className="flex items-end gap-3 h-40 mt-4">
              {chartPlaceholder.data.map((d, i) => {
                const maxRev = Math.max(
                  ...chartPlaceholder.data.map((x) => x.revenue)
                );
                const heightPct = (d.revenue / maxRev) * 100;
                const isPostIncrease = i >= 4;

                return (
                  <div
                    key={d.date}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="font-mono text-[10px] text-white/30">
                      {(d.revenue / 1000).toFixed(0)}k
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{
                        delay: 0.7 + i * 0.05,
                        duration: 0.4,
                        type: "spring",
                      }}
                      className={
                        "w-full rounded-t-md " +
                        (isPostIncrease ? "bg-red-500/60" : "bg-violet-500/60")
                      }
                    />
                    <span className="font-mono text-[10px] text-white/30">
                      {d.date.replace("Aug ", "")}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-[10px] text-white/30">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-violet-500/60" />
                Pre-increase
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500/60" />
                Post-increase (Aug 5+)
              </div>
            </div>
          </motion.div>

          {/* Supporting Evidence Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="mb-3 text-xs font-medium text-white/30 uppercase tracking-wider">
              Supporting Evidence
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {reportData.evidence.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.05]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-violet-500/0 transition-colors group-hover:from-violet-500/5 group-hover:to-transparent" />

                  <div className="relative z-10">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-white/60">
                        {item.title}
                      </span>
                      <span className="font-mono text-xs font-bold text-violet-400">
                        {item.metric}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-white/35">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                Discussion ({comments.length})
              </h3>
            </div>

            <div className="space-y-3">
              {comments.map((c) => (
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

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex items-center justify-between"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
              >
                <ExternalLink className="h-3 w-3" />
                View in Exasol Console
              </a>
            </div>
          </motion.div>

          <p className="mt-8 text-center text-[11px] text-white/20">
            Generated by Anomalo Investigator Pro &middot; Powered by Exasol
          </p>
        </div>
      </div>
    </GridBackground>
  );
}
