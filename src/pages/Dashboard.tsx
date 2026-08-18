"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import Threads from "@/components/Threads";
import SpotlightCard from "@/components/SpotlightCard";
import ClickSpark from "@/components/ClickSpark";
import { Sparkline } from "@/components/custom/Sparkline";
import { dashboardMetrics } from "@/data/mockData";
import {
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Search,
  Plus,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logo from "@/assets/logo.svg";

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
    <div className="relative min-h-screen">
      {/* Threads background — subtle, low-opacity, fixed behind content */}
      <div className="fixed inset-0 z-0 opacity-[0.12]">
        <Threads color={[0.5, 0.4, 0.9]} amplitude={0.6} distance={0.3} />
      </div>

      <div className="relative z-10 px-6 py-10">
        <div className="mx-auto max-w-6xl">
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
                { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", active: true },
                { label: "Browse", icon: Search, path: "/browse" },
                { label: "New", icon: Plus, path: "/create" },
                { label: "Admin", icon: Shield, path: "/admin" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={
                      item.active
                        ? "flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors"
                        : "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/50"
                    }
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
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Good afternoon, Priya
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Week of August 1–7, 2026 · Last synced 2 minutes ago
            </p>
          </motion.header>

          {/* Bento Grid — SpotlightCard for each metric */}
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
                >
                  <SpotlightCard
                    className={
                      isAnomaly
                        ? "!rounded-2xl !border !border-amber-500/30 !bg-gradient-to-br !from-amber-500/[0.08] !to-red-500/[0.04] !p-5"
                        : "!rounded-2xl !border !border-white/[0.06] !bg-white/[0.03] !p-5"
                    }
                    spotlightColor={
                      isAnomaly
                        ? "rgba(245, 158, 11, 0.15)"
                        : "rgba(139, 92, 246, 0.12)"
                    }
                  >
                    {isAnomaly && (
                      <div className="absolute inset-0 rounded-2xl bg-amber-500/5 blur-xl" />
                    )}

                    <div className="relative z-10">
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Icon className="h-4.5 w-4.5" style={{ color }} />
                        </div>

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

                      <p className="text-xs font-medium text-white/40 mb-1">
                        {metric.label}
                      </p>

                      <p className="font-mono text-2xl font-bold tracking-tight text-white mb-1">
                        {metric.value}
                      </p>

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
                  </SpotlightCard>
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
                  2 anomalies detected this week
                </h3>
                <p className="mt-1 text-xs text-white/40 leading-relaxed">
                  Revenue dropped 30%, driven by a sharp decline in Electronics
                  sales in South Asia. Top category performance also flagged.
                  Deploy the agent swarm to find out why — one click, under two
                  minutes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { label: "New Investigation", sub: "Deploy agents on a fresh anomaly", icon: Plus, color: "violet", path: "/create" },
              { label: "Browse Catalog", sub: "Search past investigations", icon: Search, color: "cyan", path: "/browse" },
              { label: "Admin Panel", sub: "Manage users and settings", icon: Shield, color: "emerald", path: "/admin" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-left transition-all hover:border-white/[0.12] hover:bg-white/[0.05]"
                >
                  <Icon className={`h-5 w-5 text-${action.color}-400/60`} />
                  <div>
                    <p className="text-xs font-medium text-white/60">{action.label}</p>
                    <p className="text-[10px] text-white/25">{action.sub}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* CTA Button — ClickSpark on click */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <ClickSpark
              sparkColor="#8b5cf6"
              sparkSize={12}
              sparkRadius={20}
              sparkCount={10}
              duration={500}
            >
              <button
                onClick={() => navigate("/investigate")}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
              >
                <span className="text-lg">⚡</span>
                Start Investigation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </ClickSpark>
          </motion.div>

          {/* Footer */}
          <p className="mt-8 text-center text-[11px] text-white/20">
            Powered by Exasol · All analysis runs on Exasol Personal
          </p>
        </div>
      </div>
    </div>
  );
}
