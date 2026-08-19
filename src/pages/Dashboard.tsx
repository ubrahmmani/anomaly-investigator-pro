"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Sparkline } from "@/components/custom/Sparkline";
import { dashboardMetrics, revenueChartData, evidenceTimeline } from "@/data/mockData";
import { NavBar } from "@/components/NavBar";
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

const ACCENT = "#f59e0b";

const metricCards: {
  key: keyof typeof dashboardMetrics;
  icon: LucideIcon;
}[] = [
  { key: "revenue", icon: TrendingDown },
  { key: "orders", icon: TrendingUp },
  { key: "conversion", icon: TrendingUp },
  { key: "anomalyScore", icon: AlertTriangle },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <NavBar />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-[1400px]">
          {/* ── Top metrics strip ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-3"
          >
            <p className="font-mono text-[11px] text-white/25">
              Week of Aug 1–7, 2026
            </p>
            <span className="text-white/10">·</span>
            <p className="font-mono text-[11px] text-white/25">
              Last synced 2m ago
            </p>
            <span className="text-white/10">·</span>
            <p className="font-mono text-[11px] text-amber-400/60">
              2 anomalies active
            </p>
          </motion.div>

          {/* ── Metric cards — compact strip ──────────────────────────── */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.06] mb-5 lg:grid-cols-4">
            {metricCards.map(({ key, icon: Icon }, i) => {
              const metric = dashboardMetrics[key];
              const isAnomaly = "isAnomaly" in metric && metric.isAnomaly;
              const isNegative = metric.change < 0;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className={`bg-[#0c0c10] p-4 ${
                    isAnomaly ? "border-t-2 border-t-amber-500/40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    {isAnomaly && (
                      <span className="font-mono text-[9px] text-amber-400/70 bg-amber-500/8 px-1.5 py-0.5 rounded-sm">
                        ANOMALY
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-mono text-xl font-semibold text-white/80 tracking-tight">
                        {metric.value}
                      </p>
                      <span
                        className={
                          isNegative || (key === "anomalyScore" && metric.change > 50)
                            ? "font-mono text-[11px] text-amber-400/70"
                            : "font-mono text-[11px] text-emerald-400/60"
                        }
                      >
                        {key === "anomalyScore" ? "Score" : ""}
                        {isNegative ? `↓ ${Math.abs(metric.change)}%` : ""}
                        {!isNegative && key !== "anomalyScore" ? `↑ ${metric.change}%` : ""}
                      </span>
                    </div>
                    <Sparkline
                      data={metric.trend}
                      color={
                        isNegative || (key === "anomalyScore" && metric.change > 50)
                          ? ACCENT
                          : "#52525b"
                      }
                      className="h-5 w-14"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Main area: Chart (left) + Investigation Summary (right) ── */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-white/[0.06] bg-[#0c0c10] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[13px] font-medium text-white/60">Revenue Trend</h3>
                  <p className="font-mono text-[10px] text-white/20 mt-0.5">
                    Jul 28 – Aug 7, 2026 · Daily
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-px bg-amber-500/60" />
                    <span className="font-mono text-[9px] text-white/20">Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-px bg-white/15" />
                    <span className="font-mono text-[9px] text-white/20">Baseline</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-amber-500/15 border border-amber-500/20" />
                    <span className="font-mono text-[9px] text-white/20">Anomaly zone</span>
                  </div>
                </div>
              </div>

              {/* Chart area — SVG-based for reliability */}
              <div className="relative h-[240px]">
                <DashboardChart />
              </div>
            </motion.div>

            {/* Investigation Summary */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Why card */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                    Why did this happen?
                  </span>
                </div>
                <p className="text-[13px] text-white/55 leading-relaxed mb-3">
                  Revenue dropped 30% due to a 15% price increase on Electronics in South Asia.
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[11px] text-emerald-400/70">94% confidence</span>
                  <span className="text-white/10">·</span>
                  <span className="font-mono text-[10px] text-white/25">3 queries · 327ms</span>
                </div>
                <button
                  onClick={() => navigate("/report")}
                  className="w-full flex items-center justify-center gap-1.5 border border-white/[0.08] bg-white/[0.03] py-2 text-[11px] text-white/40 transition-all hover:bg-white/[0.06] hover:text-white/60"
                >
                  View Full Report
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Agent status */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                  Agent Pipeline
                </span>
                {[
                  { name: "Watcher", status: "complete", color: "bg-emerald-500" },
                  { name: "Investigator", status: "complete", color: "bg-emerald-500" },
                  { name: "Reasoner", status: "complete", color: "bg-emerald-500" },
                  { name: "Reporter", status: "complete", color: "bg-emerald-500" },
                ].map((a) => (
                  <div key={a.name} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                    <span className="text-[11px] text-white/40">{a.name}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${a.color}`} />
                      <span className="font-mono text-[9px] text-white/25 uppercase">
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/investigate")}
                  className="w-full mt-3 flex items-center justify-center gap-1.5 bg-amber-500 py-2 text-[11px] font-medium text-black transition-colors hover:bg-amber-400"
                >
                  Re-run Investigation
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Quick actions */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                  Quick Actions
                </span>
                {[
                  { label: "New Investigation", icon: Plus, path: "/create" },
                  { label: "Browse Catalog", icon: Search, path: "/browse" },
                  { label: "Admin Panel", icon: Shield, path: "/admin" },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.path}
                      onClick={() => navigate(action.path)}
                      className="w-full flex items-center gap-2 py-2 text-left text-[11px] text-white/35 transition-colors hover:text-white/55 border-b border-white/[0.03] last:border-0"
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── Evidence Timeline ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 border border-white/[0.06] bg-[#0c0c10] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                Evidence Timeline
              </span>
              <span className="font-mono text-[10px] text-white/20">
                {evidenceTimeline.length} events
              </span>
            </div>

            <div className="relative">
              <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/[0.06]" />
              <div className="space-y-0">
                {evidenceTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="relative flex items-start gap-4 py-2"
                  >
                    <div
                      className={`relative z-10 mt-1 h-[6px] w-[6px] shrink-0 rounded-full ${
                        item.type === "cause"
                          ? "bg-amber-500"
                          : item.type === "confirmed"
                            ? "bg-emerald-500"
                            : item.type === "effect"
                              ? "bg-amber-500/40"
                              : "bg-white/15"
                      }`}
                    />
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-[10px] text-white/20 shrink-0 w-14">
                        {item.date}
                      </span>
                      <span
                        className={`text-[11px] ${
                          item.type === "cause"
                            ? "text-amber-400/80 font-medium"
                            : item.type === "confirmed"
                              ? "text-emerald-400/70 font-medium"
                              : "text-white/40"
                        }`}
                      >
                        {item.event}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── SVG Chart: Revenue with anomaly overlay ──────────────────────────────────
function DashboardChart() {
  const data = revenueChartData;
  const w = 900;
  const h = 220;
  const padL = 50;
  const padR = 20;
  const padT = 10;
  const padB = 30;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const maxRev = Math.max(...data.map((d) => d.baseline)) * 1.1;
  const minRev = 0;

  const x = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const y = (v: number) => padT + chartH - ((v - minRev) / (maxRev - minRev)) * chartH;

  const revenuePoints = data.map((d, i) => `${x(i)},${y(d.revenue)}`).join(" ");
  const baselinePoints = data.map((d, i) => `${x(i)},${y(d.baseline)}`).join(" ");

  // Anomaly zone polygon (fills the gap between baseline and revenue during anomaly)
  const anomalyData = data.filter((d) => d.anomaly);
  const firstAnomalyIdx = data.findIndex((d) => d.anomaly);
  const lastAnomalyIdx = data.length - 1;

  // Area path for revenue
  const revenueArea =
    `M ${x(0)},${y(0)} ` +
    data.map((d, i) => `L ${x(i)},${y(d.revenue)}`).join(" ") +
    ` L ${x(lastAnomalyIdx)},${y(0)} Z`;

  // Anomaly zone fill (between baseline and actual during anomaly)
  let anomalyPath = "";
  if (anomalyData.length > 0) {
    anomalyPath =
      `M ${x(firstAnomalyIdx)},${y(data[firstAnomalyIdx].baseline)} ` +
      anomalyData.map((d, i) => `L ${x(firstAnomalyIdx + i)},${y(d.revenue)}`).join(" ") +
      ` L ${x(lastAnomalyIdx)},${y(data[lastAnomalyIdx].baseline)} Z`;
  }

  // Y-axis ticks
  const yTicks = [0, 50000, 100000, 150000, 200000];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid lines */}
      {yTicks.map((tick) => (
        <g key={tick}>
          <line x1={padL} y1={y(tick)} x2={w - padR} y2={y(tick)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={padL - 8} y={y(tick) + 3} textAnchor="end" fill="rgba(255,255,255,0.18)" fontSize="9" fontFamily="monospace">
            {tick >= 1000 ? `$${tick / 1000}k` : `$${tick}`}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">
          {d.date}
        </text>
      ))}

      {/* Anomaly zone highlight */}
      {anomalyPath && (
        <path d={anomalyPath} fill="rgba(245, 158, 11, 0.08)" stroke="none" />
      )}

      {/* Baseline (dashed) */}
      <polyline
        points={baselinePoints}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="4,3"
      />

      {/* Revenue area fill */}
      <path d={revenueArea} fill="url(#revGrad)" />

      {/* Revenue line */}
      <polyline
        points={revenuePoints}
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Anomaly dot */}
      {anomalyData.length > 0 && (
        <>
          <circle cx={x(firstAnomalyIdx)} cy={y(data[firstAnomalyIdx].revenue)} r="3" fill={ACCENT} stroke="#0c0c10" strokeWidth="1.5" />
          {/* Anomaly annotation */}
          <g transform={`translate(${x(firstAnomalyIdx) + 8}, ${y(data[firstAnomalyIdx].revenue) - 12})`}>
            <rect x="0" y="-8" width="64" height="14" rx="1" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.5" />
            <text x="4" y="2" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="500">
              −30% decline
            </text>
          </g>
        </>
      )}

      {/* Gradient def */}
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.12" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
