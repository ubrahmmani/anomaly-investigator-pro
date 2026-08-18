"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Sparkline } from "@/components/custom/Sparkline";
import { dashboardMetrics } from "@/data/mockData";
import AcidSquares from "@/components/AcidSquares";
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

const ACCENT = "#f59e0b";
const ACCENT_DIM = "rgba(245, 158, 11, 0.12)";

const metricCards: {
  key: keyof typeof dashboardMetrics;
  icon: LucideIcon;
}[] = [
  { key: "revenue", icon: TrendingDown },
  { key: "orders", icon: TrendingUp },
  { key: "topCategory", icon: AlertTriangle },
  { key: "topRegion", icon: TrendingUp },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      {/* Background — AcidSquares effect at low opacity over near-black */}
      <div className="fixed inset-0 z-0 bg-[#09090b]">
        <div className="absolute inset-0 opacity-[0.15]">
          <AcidSquares
            color1="#5227FF"
            color2="#A855F7"
            color3="#FFFFFF"
            detail="medium"
            speed={0.7}
            waveDepth={1}
            zoom={1.3}
            density={10}
            glow={1}
            exposure={2700}
            spread={0.3}
            stepSize={0.002}
            colorShift={0}
            contrast={1}
            brightness={1}
            blur={0}
            opacity={1}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseRadius={0.35}
            mouseStrength={0.1}
          />
        </div>
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
              <img src={logo} alt="Anomalo Investigator Pro" className="h-5 w-5" />
              <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
                Anomalo Investigator Pro
              </span>
            </div>
            <div className="flex items-center gap-0.5">
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
                        ? "flex items-center gap-1.5 rounded-md bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/70 transition-colors"
                        : "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/50"
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
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Good afternoon, Priya
            </h1>
            <p className="mt-1 font-mono text-xs text-white/30">
              Week of August 1–7, 2026 · Last synced 2 min ago
            </p>
          </motion.header>

          {/* Metric Cards — plain dark cards, hairline borders, monospace data */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metricCards.map(({ key, icon: Icon }, i) => {
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
                      ? "group relative rounded-lg border border-[rgba(245,158,11,0.2)] bg-[#0c0c0e] p-5"
                      : "group relative rounded-lg border border-white/[0.06] bg-[#0c0c0e] p-5 transition-colors hover:border-white/[0.1]"
                  }
                >
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      {/* Plain icon — no colored container */}
                      <Icon className="h-4 w-4 text-white/25" />

                      {isAnomaly && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                          className="flex items-center gap-1 rounded-sm bg-[rgba(245,158,11,0.1)] px-1.5 py-0.5"
                        >
                          <AlertTriangle className="h-2.5 w-2.5 text-amber-500" />
                          <span className="font-mono text-[9px] font-medium text-amber-500/80 uppercase tracking-wider">
                            Anomaly
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <p className="text-[11px] font-medium text-white/35 uppercase tracking-wider mb-1.5">
                      {metric.label}
                    </p>

                    {/* Monospace number */}
                    <p className="font-mono text-xl font-semibold tracking-tight text-white mb-2">
                      {metric.value}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={
                          isNegative
                            ? "font-mono text-[11px] text-amber-500/80"
                            : "font-mono text-[11px] text-emerald-500/70"
                        }
                      >
                        {isNegative ? "↓" : "↑"} {Math.abs(metric.change)}%
                      </span>

                      <Sparkline
                        data={metric.trend}
                        color={isNegative ? ACCENT : "#52525b"}
                        className="h-5 w-14"
                      />
                    </div>

                    {isAnomaly && "anomalyText" in metric && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-3 border-l-2 border-amber-500/30 pl-2.5 text-[11px] text-white/30"
                      >
                        {metric.anomalyText}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Revenue Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 rounded-lg border border-white/[0.06] bg-[#0c0c0e] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/80">Revenue Trend</h3>
                <p className="font-mono text-[10px] text-white/25 mt-0.5">
                  Aug 1–7, 2026
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-amber-500/60" />
                  <span className="font-mono text-[9px] text-white/25">Anomaly zone</span>
                </div>
              </div>
            </div>
            <DashboardAreaChart />
          </motion.div>

          {/* Anomaly Summary — plain bordered card, accent only on icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-4 rounded-lg border border-white/[0.06] bg-[#0c0c0e] p-5"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500/70" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white/70">
                  2 anomalies detected this week
                </h3>
                <p className="mt-1 text-xs text-white/35 leading-relaxed">
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
            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {[
              { label: "New Investigation", sub: "Deploy agents on a fresh anomaly", icon: Plus, path: "/create" },
              { label: "Browse Catalog", sub: "Search past investigations", icon: Search, path: "/browse" },
              { label: "Admin Panel", sub: "Manage users and settings", icon: Shield, path: "/admin" },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#0c0c0e] p-4 text-left transition-all hover:border-white/[0.12]"
                >
                  <Icon className="h-4 w-4 text-white/25" />
                  <div>
                    <p className="text-xs font-medium text-white/50">{action.label}</p>
                    <p className="font-mono text-[10px] text-white/20">{action.sub}</p>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* CTA Button — flat accent, sharp corners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => navigate("/investigate")}
              className="group flex items-center gap-2.5 rounded-md bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-amber-400"
            >
              Start Investigation
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Footer */}
          <p className="mt-8 text-center font-mono text-[10px] text-white/15">
            Powered by Exasol · All analysis runs on Exasol Personal
          </p>
        </div>
      </div>
    </div>
  );
}

import { AreaChart } from "@/components/charts/area-chart";
import { Area } from "@/components/charts/area";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";

/** Revenue trend — flat amber line, subtle single-color fill, no gradient */
function DashboardAreaChart() {
  const chartData = [
    { date: "Aug 1", revenue: 198000 },
    { date: "Aug 2", revenue: 205000 },
    { date: "Aug 3", revenue: 192000 },
    { date: "Aug 4", revenue: 210000 },
    { date: "Aug 5", revenue: 168000 },
    { date: "Aug 6", revenue: 142000 },
    { date: "Aug 7", revenue: 135000 },
  ];

  return (
    <div className="h-[200px] w-full">
      <AreaChart
        data={chartData}
        xDataKey="date"
        aspectRatio="3 / 1"
        loadingLabel="Loading revenue data..."
      >
        <Grid horizontal vertical={false} numTicksRows={5} />
        <XAxis />
        <Area
          dataKey="revenue"
          fill="rgba(245, 158, 11, 0.12)"
          stroke={ACCENT}
          strokeWidth={1.5}
        />
      </AreaChart>
    </div>
  );
}
