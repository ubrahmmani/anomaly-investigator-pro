"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
import { reportData, chartData, comments } from "@/data/mockData";
import {
  ArrowLeft,
  Download,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  MapPin,
  Share2,
  MessageSquare,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const strengthConfig = {
  strong: { label: "Strong", color: "text-emerald-500" },
  corroborating: { label: "Corroborating", color: "text-zinc-500" },
};

const likelihoodConfig = {
  confirmed: { label: "Confirmed", color: "text-emerald-500", icon: CheckCircle2 },
  unlikely: { label: "Unlikely", color: "text-zinc-600", icon: XCircle },
};

const findingIcons = [TrendingDown, ShoppingCart, DollarSign, MapPin];

export default function Report() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-5">
        <div className="mx-auto max-w-[1000px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex h-7 w-7 items-center justify-center border border-zinc-800 text-zinc-500 transition-colors hover:bg-zinc-800/50 hover:text-zinc-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-emerald-500/70 uppercase tracking-wider">
                    Investigation Report
                  </span>
                  <span className="font-mono text-[8px] text-emerald-500/50 bg-emerald-500/8 px-1.5 py-0.5">
                    COMPLETE
                  </span>
                </div>
                <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
                  Root Cause Analysis
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200">
                <Share2 className="h-3 w-3" />
                Share
              </button>
              <button className="flex items-center gap-1.5 border border-zinc-800 bg-zinc-800/30 px-3 py-1.5 text-[11px] text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-200">
                <Download className="h-3 w-3" />
                Export
              </button>
            </div>
          </motion.header>

          {/* ── Hero: Root Cause + Confidence ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="border border-zinc-800/50 bg-zinc-900/60 p-6 mb-3"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-mono text-[9px] text-amber-500/70 uppercase tracking-wider block mb-1.5">
                  Root Cause Confirmed
                </span>
                <h2 className="text-xl font-bold text-zinc-100 leading-snug">
                  {reportData.headline}
                </h2>
              </div>
              <div className="text-right shrink-0 ml-6">
                <div className="font-mono text-3xl font-bold text-amber-500">
                  {reportData.confidence}%
                </div>
                <div className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                  Confidence
                </div>
              </div>
            </div>

            <p className="text-[13px] text-zinc-400 leading-relaxed max-w-2xl">
              {reportData.summary}
            </p>

            {/* Confidence bar */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider shrink-0">
                Evidence strength
              </span>
              <div className="flex-1 h-1 bg-zinc-800/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${reportData.confidence}%` }}
                  transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                  className="h-full bg-amber-500/50"
                />
              </div>
              <span className="font-mono text-[9px] text-zinc-600">
                {reportData.confidence}/100
              </span>
            </div>

            {/* Stats row */}
            <div className="mt-4 flex items-center gap-4 border-t border-zinc-800/40 pt-3">
              {[
                { label: "Queries executed", value: `${reportData.queriesExecuted}` },
                { label: "Records analyzed", value: `${(reportData.recordsAnalyzed / 1000000).toFixed(1)}M` },
                { label: "Dimensions sliced", value: `${reportData.dimensionsSliced}` },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-600">{stat.label}</span>
                  <span className="font-mono text-[10px] text-zinc-400">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Evidence Chain ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="border border-zinc-800/50 bg-zinc-900/60 p-5 mb-3"
          >
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-3">
              Evidence Chain
            </span>
            <div className="flex items-center gap-0">
              {reportData.evidenceChain.map((step, i) => (
                <div key={step.step} className="flex items-center flex-1">
                  <div className="flex-1">
                    <div className="font-mono text-sm font-semibold text-amber-500/80 mb-0.5">
                      {step.step}
                    </div>
                    <div className="text-[10px] text-zinc-500">{step.detail}</div>
                  </div>
                  {i < reportData.evidenceChain.length - 1 && (
                    <div className="mx-3 text-zinc-700 text-sm">→</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Key Findings (compact) ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-px bg-zinc-800/30 border border-zinc-800/50 mb-3 lg:grid-cols-4">
            {reportData.keyFindings.map((finding, i) => {
              const Icon = findingIcons[i];
              return (
                <motion.div
                  key={finding.metric}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.04 }}
                  className="bg-zinc-900/60 p-4"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="h-3 w-3 text-zinc-600" />
                    <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                      {finding.metric}
                    </span>
                  </div>
                  <p className="font-mono text-lg font-semibold text-zinc-200">
                    {finding.value}
                  </p>
                  <p className="text-[10px] text-zinc-600">{finding.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── Chart ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="border border-zinc-800/50 bg-zinc-900/60 p-5 mb-3"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[13px] font-medium text-zinc-300">
                  Revenue vs. Price
                </h3>
                <p className="font-mono text-[10px] text-zinc-600 mt-0.5">
                  Aug 1–7, 2026 · Price increase on Aug 5
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-amber-500/50" />
                  <span className="font-mono text-[9px] text-zinc-600">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-blue-400/50" />
                  <span className="font-mono text-[9px] text-zinc-600">Price</span>
                </div>
              </div>
            </div>
            <div className="h-[200px]">
              <ReportChart />
            </div>
          </motion.div>

          {/* ── Two-column: Why We Believe + Alternatives ────────────── */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mb-3">
            {/* Why We Believe This */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-5"
            >
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-3">
                Why we believe this
              </span>
              <div className="space-y-1.5">
                {reportData.whyWeBelieve.map((item, i) => {
                  const cfg = strengthConfig[item.strength];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 py-1.5 border-b border-zinc-800/20 last:border-0"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/50 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="text-[11px] text-zinc-400">
                          {item.evidence}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[8px] ${cfg.color} shrink-0`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Alternatives Considered */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="border border-zinc-800/50 bg-zinc-900/60 p-5"
            >
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-3">
                Alternatives considered
              </span>
              <div className="space-y-1.5">
                {reportData.alternatives.map((item, i) => {
                  const cfg = likelihoodConfig[item.likelihood];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2.5 py-1.5 border-b border-zinc-800/20 last:border-0 ${
                        item.likelihood === "confirmed"
                          ? "bg-emerald-500/5 -mx-2 px-2"
                          : ""
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${cfg.color}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-zinc-400">
                            {item.explanation}
                          </span>
                          <span
                            className={`font-mono text-[8px] ${cfg.color}`}
                          >
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-0.5">
                          {item.reason}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* ── Supporting Evidence ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36 }}
            className="mb-3"
          >
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
              Supporting Evidence
            </span>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {reportData.supportingEvidence.map((item) => (
                <div
                  key={item.title}
                  className="border border-zinc-800/50 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {item.title}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-amber-500/70">
                      {item.metric}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Discussion ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-zinc-800/50 bg-zinc-900/60 p-5 mb-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="h-3 w-3" />
                Discussion ({comments.length})
              </span>
            </div>

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

            {/* Future: Replace with @kokonutui/ai-prompt for follow-up question bar */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Ask a follow-up question..."
                className="flex-1 border border-zinc-800/50 bg-zinc-800/20 px-3 py-2 text-[11px] text-zinc-300 placeholder-zinc-600 outline-none focus:border-amber-500/30"
              />
              <button className="border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-[11px] font-medium text-amber-500/70 transition-colors hover:bg-amber-500/15">
                Ask
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Dashboard
            </button>
            <span className="font-mono text-[9px] text-zinc-700">
              Generated by Anomalo Investigator Pro · Powered by Exasol
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SVG Line Chart: Revenue vs Price ─────────────────────────────────────────
function ReportChart() {
  const data = chartData.revenueVsPrice;
  const w = 800;
  const h = 180;
  const padL = 45;
  const padR = 15;
  const padT = 10;
  const padB = 25;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const maxRev = 50000;
  const maxPrice = 650;

  const x = (i: number) => padL + (i / (data.length - 1)) * chartW;
  const yRev = (v: number) => padT + chartH - (v / maxRev) * chartH;
  const yPrice = (v: number) => padT + chartH - (v / maxPrice) * chartH;

  const revPoints = data.map((d, i) => `${x(i)},${yRev(d.revenue)}`).join(" ");
  const pricePoints = data.map((d, i) => `${x(i)},${yPrice(d.price)}`).join(" ");

  const revArea =
    `M ${x(0)},${yRev(0)} ` +
    data.map((d, i) => `L ${x(i)},${yRev(d.revenue)}`).join(" ") +
    ` L ${x(data.length - 1)},${yRev(0)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {[0, 10000, 20000, 30000, 40000, 50000].map((tick) => (
        <g key={tick}>
          <line x1={padL} y1={yRev(tick)} x2={w - padR} y2={yRev(tick)} stroke="rgba(255,255,255,0.04)" />
          <text x={padL - 6} y={yRev(tick) + 3} textAnchor="end" fill="rgba(255,255,255,0.12)" fontSize="8" fontFamily="monospace">
            ${tick >= 1000 ? `${tick / 1000}k` : tick}
          </text>
        </g>
      ))}

      {/* X labels */}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 6} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="monospace">
          {d.date}
        </text>
      ))}

      {/* Aug 5 marker */}
      <line x1={x(4)} y1={padT} x2={x(4)} y2={h - padB} stroke="rgba(234,179,8,0.15)" strokeWidth="1" strokeDasharray="3,3" />
      <text x={x(4) + 4} y={padT + 10} fill="rgba(234,179,8,0.35)" fontSize="8" fontFamily="monospace">
        Price +15%
      </text>

      {/* Revenue area */}
      <path d={revArea} fill="rgba(234,179,8,0.06)" />

      {/* Revenue line */}
      <polyline points={revPoints} fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Price line */}
      <polyline points={pricePoints} fill="none" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4,3" />
    </svg>
  );
}
