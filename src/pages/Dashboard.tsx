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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ACCENT = "#eab308";

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
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-5">
        <div className="mx-auto max-w-[1400px]">
          {/* ── Status bar ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3"
          >
            <p className="font-mono text-[10px] text-zinc-600">
              Week of Aug 1–7, 2026
            </p>
            <span className="text-zinc-800">·</span>
            <p className="font-mono text-[10px] text-zinc-600">
              Last synced 2m ago
            </p>
            <span className="text-zinc-800">·</span>
            <p className="font-mono text-[10px] text-amber-500/70">
              2 anomalies active
            </p>
          </motion.div>

          {/* ── Metric strip — compact, data-dense ────────────────────── */}
          <div className="grid grid-cols-2 gap-px bg-zinc-800/40 border border-zinc-800/50 mb-4 lg:grid-cols-4">
            {metricCards.map(({ key, icon: Icon }, i) => {
              const metric = dashboardMetrics[key];
              const isAnomaly = "isAnomaly" in metric && metric.isAnomaly;
              const isNegative = metric.change < 0;
              const isAnomalyScore = key === "anomalyScore";

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.04 }}
                  className={`bg-zinc-900/60 px-4 py-3.5 ${
                    isAnomaly ? "border-t-2 border-t-amber-500/50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                      {metric.label}
                    </span>
                    {isAnomaly && (
                      <span className="font-mono text-[8px] text-amber-500/70 bg-amber-500/8 px-1 py-0.5">
                        ANOMALY
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-mono text-lg font-semibold text-zinc-100 tracking-tight">
                        {metric.value}
                      </p>
                      <span
                        className={
                          isNegative || (isAnomalyScore && metric.change > 50)
                            ? "font-mono text-[10px] text-amber-500/60"
                            : "font-mono text-[10px] text-emerald-500/50"
                        }
                      >
                        {isAnomalyScore
                          ? ""
                          : isNegative
                            ? `↓ ${Math.abs(metric.change)}%`
                            : `↑ ${metric.change}%`}
                      </span>
                    </div>
                    <Sparkline
                      data={metric.trend}
                      color={
                        isNegative || (isAnomalyScore && metric.change > 50)
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[13px] font-medium text-zinc-300">
                    Revenue Trend
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-600 mt-0.5">
                    Jul 28 – Aug 7, 2026 · Daily
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-px bg-amber-500/50" />
                    <span className="font-mono text-[9px] text-zinc-600">
                      Revenue
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-px bg-zinc-700" />
                    <span className="font-mono text-[9px] text-zinc-600">
                      Baseline
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 bg-amber-500/10 border border-amber-500/20" />
                    <span className="font-mono text-[9px] text-zinc-600">
                      Anomaly zone
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative h-[240px]">
                <DashboardChart />
              </div>
            </motion.div>

            {/* Investigation Summary */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.24 }}
              className="space-y-3"
            >
              {/* Why card */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 bg-amber-500" />
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                    Why did this happen?
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 leading-relaxed mb-3">
                  Revenue dropped 30% due to a 15% price increase on Electronics
                  in South Asia.
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] text-emerald-500/70">
                    94% confidence
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span className="font-mono text-[10px] text-zinc-600">
                    3 queries · 327ms
                  </span>
                </div>
                <button
                  onClick={() => navigate("/report")}
                  className="w-full flex items-center justify-center gap-1.5 border border-zinc-800 bg-zinc-800/30 py-2 text-[11px] text-zinc-400 transition-all hover:bg-zinc-800/60 hover:text-zinc-200"
                >
                  View Full Report
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Agent status */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                  Agent Pipeline
                </span>
                {[
                  { name: "Watcher", status: "completed", color: "bg-emerald-500" },
                  { name: "Investigator", status: "completed", color: "bg-emerald-500" },
                  { name: "Reasoner", status: "completed", color: "bg-emerald-500" },
                  { name: "Reporter", status: "completed", color: "bg-emerald-500" },
                ].map((a) => (
                  <div
                    key={a.name}
                    className="flex items-center justify-between py-1.5 border-b border-zinc-800/30 last:border-0"
                  >
                    <span className="text-[11px] text-zinc-400">{a.name}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 ${a.color}`} />
                      <span className="font-mono text-[8px] text-zinc-600 uppercase">
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/investigate")}
                  className="w-full mt-2.5 flex items-center justify-center gap-1.5 bg-amber-500 py-2 text-[11px] font-medium text-zinc-950 hover:bg-amber-400 transition-colors"
                >
                  Re-run Investigation
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Quick actions */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
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
                      className="w-full flex items-center gap-2 py-2 text-left text-[11px] text-zinc-500 transition-colors hover:text-zinc-300 border-b border-zinc-800/20 last:border-0"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-4 border border-zinc-800/50 bg-zinc-900/60 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                Evidence Timeline
              </span>
              <span className="font-mono text-[9px] text-zinc-600">
                {evidenceTimeline.length} events
              </span>
            </div>

            <div className="relative">
              <div className="absolute left-[3px] top-0 bottom-0 w-px bg-zinc-800/40" />
              <div className="space-y-0">
                {evidenceTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.36 + i * 0.04 }}
                    className="relative flex items-start gap-4 py-1.5"
                  >
                    <div
                      className={`relative z-10 mt-1 h-[5px] w-[5px] shrink-0 ${
                        item.type === "cause"
                          ? "bg-amber-500"
                          : item.type === "confirmed"
                            ? "bg-emerald-500"
                            : item.type === "effect"
                              ? "bg-amber-500/30"
                              : "bg-zinc-700"
                      }`}
                    />
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="font-mono text-[9px] text-zinc-600 shrink-0 w-12">
                        {item.date}
                      </span>
                      <span
                        className={`text-[11px] ${
                          item.type === "cause"
                            ? "text-amber-500/80 font-medium"
                            : item.type === "confirmed"
                              ? "text-emerald-500/70 font-medium"
                              : "text-zinc-500"
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

  const firstAnomalyIdx = data.findIndex((d) => d.anomaly);
  const lastAnomalyIdx = data.length - 1;

  const revenueArea =
    `M ${x(0)},${y(0)} ` +
    data.map((d, i) => `L ${x(i)},${y(d.revenue)}`).join(" ") +
    ` L ${x(lastAnomalyIdx)},${y(0)} Z`;

  const anomalyData = data.filter((d) => d.anomaly);
  let anomalyPath = "";
  if (anomalyData.length > 0) {
    anomalyPath =
      `M ${x(firstAnomalyIdx)},${y(data[firstAnomalyIdx].baseline)} ` +
      anomalyData.map((d, i) => `L ${x(firstAnomalyIdx + i)},${y(d.revenue)}`).join(" ") +
      ` L ${x(lastAnomalyIdx)},${y(data[lastAnomalyIdx].baseline)} Z`;
  }

  const yTicks = [0, 50000, 100000, 150000, 200000];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {yTicks.map((tick) => (
        <g key={tick}>
          <line x1={padL} y1={y(tick)} x2={w - padR} y2={y(tick)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <text x={padL - 8} y={y(tick) + 3} textAnchor="end" fill="rgba(255,255,255,0.15)" fontSize="9" fontFamily="monospace">
            {tick >= 1000 ? `$${tick / 1000}k` : `$${tick}`}
          </text>
        </g>
      ))}

      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 8} textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="9" fontFamily="monospace">
          {d.date}
        </text>
      ))}

      {/* Anomaly zone */}
      {anomalyPath && (
        <path d={anomalyPath} fill="rgba(234,179,8,0.06)" stroke="none" />
      )}

      {/* Baseline (dashed) */}
      <polyline
        points={baselinePoints}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
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

      {/* Anomaly dot + annotation */}
      {anomalyData.length > 0 && (
        <>
          <circle cx={x(firstAnomalyIdx)} cy={y(data[firstAnomalyIdx].revenue)} r="3" fill={ACCENT} stroke="#09090b" strokeWidth="1.5" />
          <g transform={`translate(${x(firstAnomalyIdx) + 8}, ${y(data[firstAnomalyIdx].revenue) - 12})`}>
            <rect x="0" y="-8" width="62" height="14" fill="rgba(234,179,8,0.1)" stroke="rgba(234,179,8,0.2)" strokeWidth="0.5" />
            <text x="4" y="2" fill="#eab308" fontSize="8" fontFamily="monospace" fontWeight="500">
              −30% decline
            </text>
          </g>
        </>
      )}

      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.1" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
