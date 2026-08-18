"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import { MovingBorderButton } from "@/components/custom/MovingBorderButton";
import { Sparkline } from "@/components/custom/Sparkline";
import { dashboardMetrics } from "@/data/mockData";
import { AlertTriangle, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logo from "@/assets/logo.svg";

// Metric card config
const metricCards: {
  key: keyof typeof dashboardMetrics;
  icon: LucideIcon;
  color: string;
}[] = [
  { key: "revenue", icon: TrendingDown, color: "#8b5cf6" },
  { key: "orders", icon: TrendingUp, color: "#06b6d4" },
  { key: "topCategory", icon: AlertTriangle, color: "#f59e0b" },
  { key: "topRegion", icon: TrendingUp, color: "#10b981" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <img src={logo} alt="Logo" className="h-8 w-8" />
              <span className="font-mono text-sm text-white/40 tracking-wider uppercase">
                Anomaly Investigator
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Sales Dashboard
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Week of August 1–7, 2026 &middot; Auto-refreshes every 5 minutes
            </p>
          </motion.header>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metricCards.map(({ key, icon: Icon, color }, i) => {
              const metric = dashboardMetrics[key];
              const isAnomaly = "isAnomaly" in metric && metric.isAnomaly;
              const isNegative = metric.change < 0;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className={
                    isAnomaly
                      ? "group relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.08] to-red-500/[0.04] p-5 backdrop-blur-sm"
                      : "group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.05]"
                  }
                >
                  {/* Anomaly glow */}
                  {isAnomaly && (
                    <div className="absolute inset-0 rounded-2xl bg-amber-500/5 blur-xl" />
                  )}

                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="h-4.5 w-4.5" style={{ color }} />
                      </div>

                      {/* Anomaly badge */}
                      {isAnomaly && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                          className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-1"
                        >
                          <AlertTriangle className="h-3 w-3 text-amber-400" />
                          <span className="text-[10px] font-medium text-amber-300">
                            Anomaly
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Label */}
                    <p className="text-xs font-medium text-white/40 mb-1">
                      {metric.label}
                    </p>

                    {/* Value */}
                    <p className="font-mono text-2xl font-bold tracking-tight text-white mb-1">
                      {metric.value}
                    </p>

                    {/* Change + sparkline row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          isNegative
                            ? "text-xs font-medium text-red-400"
                            : "text-xs font-medium text-emerald-400"
                        }
                      >
                        {isNegative ? "↓" : "↑"} {Math.abs(metric.change)}%
                        this week
                      </span>

                      <Sparkline
                        data={metric.trend}
                        color={isNegative ? "#ef4444" : color}
                        className="h-6 w-16"
                      />
                    </div>

                    {/* Anomaly text */}
                    {isAnomaly && "anomalyText" in metric && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-3 rounded-lg bg-amber-500/10 px-3 py-1.5 text-[11px] text-amber-300/80"
                      >
                        {metric.anomalyText}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Anomaly Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  2 anomalies detected
                </h3>
                <p className="mt-1 text-xs text-white/40 leading-relaxed">
                  Revenue dropped 30% this week, driven by a sharp decline in
                  Electronics sales in South Asia. Top category performance also
                  flagged. Click below to start a full investigation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <MovingBorderButton
              onClick={() => navigate("/investigate")}
              className="text-base"
            >
              <span className="text-lg">⚡</span>
              Start Investigation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MovingBorderButton>
          </motion.div>

          {/* Footer note */}
          <p className="mt-8 text-center text-[11px] text-white/20">
            Powered by Exasol &middot; All analysis runs on Exasol Personal
          </p>
        </div>
      </div>
    </GridBackground>
  );
}
