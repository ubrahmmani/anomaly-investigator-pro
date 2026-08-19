"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Search,
  Brain,
  FileText,
  AlertTriangle,
  TrendingDown,
  ShoppingCart,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import logo from "@/assets/logo.svg";

// ─── Investigation Timeline (horizontal) ─────────────────────────────────────
const investigationFlow = [
  { label: "Revenue drops 30%", color: "bg-amber-500" },
  { label: "Electronics identified", color: "bg-amber-500/70" },
  { label: "South Asia isolated", color: "bg-amber-500/50" },
  { label: "Orders down 60%", color: "bg-amber-500/70" },
  { label: "Price +15% detected", color: "bg-amber-500" },
  { label: "Root cause confirmed", color: "bg-emerald-500" },
];

// ─── Agent Pipeline ──────────────────────────────────────────────────────────
const agents = [
  {
    icon: Eye,
    label: "Watcher",
    purpose: "Detects anomalies",
    input: "Live metrics stream",
    output: "Anomaly flagged",
    color: "text-amber-400",
    borderColor: "border-amber-500/20",
    bgColor: "bg-amber-500/5",
  },
  {
    icon: Search,
    label: "Investigator",
    purpose: "Queries relevant dimensions",
    input: "Anomaly context",
    output: "Dimensional data",
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/5",
  },
  {
    icon: Brain,
    label: "Reasoner",
    purpose: "Cross-checks evidence",
    input: "Query results",
    output: "Root cause hypothesis",
    color: "text-purple-400",
    borderColor: "border-purple-500/20",
    bgColor: "bg-purple-500/5",
  },
  {
    icon: FileText,
    label: "Reporter",
    purpose: "Produces explanation",
    input: "Hypothesis + data",
    output: "Plain-English report",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/5",
  },
];

// ─── Mini Sparkline ──────────────────────────────────────────────────────────
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 48;
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / range) * (h - 8)}`
    )
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── SQL Preview ─────────────────────────────────────────────────────────────
function SQLPreview() {
  return (
    <div className="font-mono text-[11px] leading-relaxed">
      <div className="text-white/25 mb-1">{"-- Investigator Agent"}</div>
      <div>
        <span className="text-purple-400/80">SELECT</span>{" "}
        <span className="text-white/60">category, region,</span>
      </div>
      <div>
        {"  "}
        <span className="text-purple-400/80">SUM</span>
        <span className="text-white/60">(revenue)</span>
      </div>
      <div>
        <span className="text-purple-400/80">FROM</span>{" "}
        <span className="text-white/60">sales</span>
      </div>
      <div>
        <span className="text-purple-400/80">WHERE</span>{" "}
        <span className="text-white/60">date &gt;= </span>
        <span className="text-amber-400/70">"2026-08-01"</span>
      </div>
      <div>
        <span className="text-purple-400/80">GROUP BY</span>{" "}
        <span className="text-white/60">category, region</span>
      </div>
      <div className="text-emerald-400/50 mt-1">{"→ 142ms on Exasol"}</div>
    </div>
  );
}

// ─── Report Preview ──────────────────────────────────────────────────────────
function ReportPreview() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono font-medium text-amber-400/80 tracking-wider uppercase">
          Root Cause Confirmed
        </span>
        <span className="text-[9px] font-mono text-white/30">94% confidence</span>
      </div>
      <p className="text-[12px] text-white/60 leading-relaxed">
        Revenue dropped 30% due to a 15% price increase on Electronics in South Asia.
      </p>
      <div className="flex gap-3 mt-2">
        {["Price +15%", "Orders −60%", "Revenue −30%"].map((s) => (
          <span key={s} className="font-mono text-[10px] text-amber-400/60 bg-amber-500/5 border border-amber-500/10 rounded-sm px-1.5 py-0.5">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between border-b border-white/[0.04] px-6 py-3">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Anomalo" className="h-4 w-4" />
          <span className="font-mono text-[11px] font-medium text-white/50 tracking-widest uppercase">
            Anomalo
          </span>
          <span className="font-mono text-[10px] text-amber-500/60 tracking-wider">
            PRO
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/browse")}
            className="text-[11px] text-white/30 hover:text-white/50 transition-colors"
          >
            Catalog
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 rounded-sm bg-amber-500 px-3 py-1.5 text-[11px] font-medium text-black transition-colors hover:bg-amber-400"
          >
            Open Dashboard
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-16 border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 inline-flex items-center gap-1.5 border border-amber-500/15 bg-amber-500/5 px-2.5 py-1"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-[10px] text-amber-400/70 tracking-wider uppercase">
                  Autonomous anomaly investigation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-bold leading-[1.15] tracking-tight text-white/90 sm:text-5xl"
              >
                Your numbers changed.
                <br />
                <span className="text-amber-400">Find out why.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-[15px] text-white/35 leading-relaxed max-w-lg"
              >
                Anomalo deploys an autonomous agent system that detects anomalies in your data,
                investigates root causes by querying Exasol directly, and delivers an
                evidence-backed explanation — no SQL required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-7 flex items-center gap-3"
              >
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group flex items-center gap-2 bg-amber-500 px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-amber-400"
                >
                  Investigate an anomaly
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-1.5 border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-[13px] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/60"
                >
                  See how it works
                </a>
              </motion.div>
            </div>

            {/* Right: Mini Investigation Flow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-white/[0.06] bg-[#0e0e12] p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-[10px] text-white/30 tracking-wider uppercase">
                  Investigation in progress
                </span>
                <span className="ml-auto font-mono text-[10px] text-emerald-400/60">
                  1 min 42 sec
                </span>
              </div>

              {/* Mini metric strip */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { label: "Revenue", value: "−30%", anomaly: true },
                  { label: "Electronics", value: "−45%", anomaly: true },
                  { label: "South Asia", value: "−38%", anomaly: true },
                  { label: "Price", value: "+15%", anomaly: false },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-[9px] text-white/25 uppercase tracking-wider mb-0.5">
                      {m.label}
                    </div>
                    <div
                      className={
                        m.anomaly
                          ? "font-mono text-sm font-medium text-amber-400"
                          : "font-mono text-sm font-medium text-white/50"
                      }
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent status strip */}
              <div className="flex items-center gap-1 mb-4">
                {agents.map((a, i) => (
                  <div key={a.label} className="flex items-center gap-1 flex-1">
                    <div
                      className={`h-1.5 flex-1 rounded-full ${
                        i < 3 ? "bg-emerald-500/60" : "bg-white/10"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Conclusion */}
              <div className="border-t border-white/[0.05] pt-3">
                <div className="text-[9px] font-mono text-white/25 uppercase tracking-wider mb-1">
                  Root cause identified
                </div>
                <p className="text-[12px] text-white/60 leading-relaxed">
                  Revenue decline traced to a 15% price increase in Electronics across South Asia.
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-emerald-400/70">94% confidence</span>
                  <span className="text-white/10">·</span>
                  <span className="text-[9px] font-mono text-white/25">3 queries · 327ms avg</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Investigation Timeline ────────────────────────────────────── */}
      <section className="px-6 py-12 border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white/70">How an investigation flows</h2>
            <p className="mt-1 text-[12px] text-white/30">
              From anomaly detection to root cause — fully autonomous, under 2 minutes.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-3 left-0 right-0 h-px bg-white/[0.06]" />

            <div className="relative grid grid-cols-6 gap-3">
              {investigationFlow.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 mx-auto mb-2 h-2 w-2">
                    <div className={`h-full w-full rounded-full ${step.color}`} />
                  </div>
                  <p className="font-mono text-[10px] text-white/40 leading-tight">
                    {step.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Capabilities (visual) ─────────────────────────────── */}
      <section className="px-6 py-12 border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white/70">What the product does</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Live Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/[0.06] bg-[#0e0e12] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-3.5 w-3.5 text-white/30" />
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Live Dashboard
                </span>
              </div>
              <div className="h-24 mb-3">
                <MiniChart
                  data={[82, 85, 78, 91, 88, 72, 51]}
                  color="#f59e0b"
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-semibold text-white/80">$1.24M</span>
                <span className="font-mono text-[10px] text-amber-400/70">−30%</span>
              </div>
            </motion.div>

            {/* Autonomous SQL */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="border border-white/[0.06] bg-[#0e0e12] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-3.5 w-3.5 text-white/30" />
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Autonomous SQL
                </span>
              </div>
              <div className="h-24 flex items-end">
                <SQLPreview />
              </div>
            </motion.div>

            {/* Plain-English Reports */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="border border-white/[0.06] bg-[#0e0e12] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-3.5 w-3.5 text-white/30" />
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Plain-English Reports
                </span>
              </div>
              <div className="h-24 flex items-end">
                <ReportPreview />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Agent Pipeline ────────────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-12 border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white/70">Agent pipeline</h2>
            <p className="mt-1 text-[12px] text-white/30">
              Four specialized agents. One autonomous pipeline. Zero manual queries.
            </p>
          </div>

          <div className="space-y-0">
            {agents.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`grid grid-cols-12 gap-4 border-l-2 ${agent.borderColor} pl-4 py-4 ${
                    i < agents.length - 1 ? "border-b border-white/[0.03]" : ""
                  }`}
                >
                  {/* Agent name + icon */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-4 w-4 ${agent.color}`} />
                      <span className={`text-sm font-semibold ${agent.color}`}>
                        {agent.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/30">{agent.purpose}</span>
                  </div>

                  {/* Input */}
                  <div className="col-span-4">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-0.5">
                      Input
                    </span>
                    <span className="text-[11px] text-white/45">{agent.input}</span>
                  </div>

                  {/* Output */}
                  <div className="col-span-5">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block mb-0.5">
                      Output
                    </span>
                    <span className="text-[11px] text-white/45">{agent.output}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust / Technical Details ─────────────────────────────────── */}
      <section className="px-6 py-12 border-b border-white/[0.04]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { label: "All analysis on Exasol", sub: "Every SQL query runs on Exasol Personal" },
              { label: "Under 2 minutes", sub: "End-to-end from detection to report" },
              { label: "94% avg confidence", sub: "Hypothesis backed by independent data slices" },
              { label: "Zero SQL required", sub: "Agent writes and executes its own queries" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-[12px] font-medium text-white/50 mb-0.5">{item.label}</div>
                <div className="text-[11px] text-white/25">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-white/80 mb-1">
              Stop guessing. Start investigating.
            </h2>
            <p className="text-[13px] text-white/30">
              See how Anomalo traces a revenue anomaly to its root cause — automatically.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center gap-2 bg-amber-500 px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-amber-400 shrink-0"
          >
            Launch Dashboard
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Anomalo" className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] text-white/20">
              Anomalo Investigator Pro
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/15">
            Exasol AI Build Challenge 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
