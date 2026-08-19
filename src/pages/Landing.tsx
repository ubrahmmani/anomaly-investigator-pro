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
  BarChart3,
} from "lucide-react";
import logo from "@/assets/logo.svg";

// ─── Agent Pipeline ──────────────────────────────────────────────────────────
const agents = [
  {
    icon: Eye,
    label: "Watcher",
    purpose: "Detects anomalies in live metrics",
    input: "Revenue, Orders, Conversion — real-time stream",
    output: "Anomaly flagged with context",
    color: "text-amber-500/80",
  },
  {
    icon: Search,
    label: "Investigator",
    purpose: "Writes and executes SQL queries against Exasol",
    input: "Anomaly context from Watcher",
    output: "Dimensional breakdown (category × region × product × time)",
    color: "text-zinc-300",
  },
  {
    icon: Brain,
    label: "Reasoner",
    purpose: "Cross-references evidence to form a hypothesis",
    input: "Query results from Investigator",
    output: "Root cause hypothesis with confidence score",
    color: "text-zinc-300",
  },
  {
    icon: FileText,
    label: "Reporter",
    purpose: "Produces a plain-English explanation with data",
    input: "Hypothesis + supporting data",
    output: "Investigation report with evidence chain",
    color: "text-zinc-300",
  },
];

// ─── Investigation Flow ──────────────────────────────────────────────────────
const investigationFlow = [
  { label: "Revenue ↓ 30%", status: "detected" as const },
  { label: "Electronics", status: "isolated" as const },
  { label: "South Asia", status: "isolated" as const },
  { label: "Orders ↓ 60%", status: "evidence" as const },
  { label: "Price +15%", status: "cause" as const },
  { label: "Root cause", status: "confirmed" as const },
];

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 200;
  const h = 40;
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / range) * (h - 8)}`
    )
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="rgba(234,179,8,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between border-b border-zinc-800/60 px-5 h-11">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Anomalo" className="h-3.5 w-3.5 opacity-60" />
          <span className="text-[11px] font-medium text-zinc-400 tracking-wide">
            Anomalo
          </span>
          <span className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">
            Pro
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/browse")}
            className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Catalog
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 bg-amber-500 px-3 py-1.5 text-[11px] font-medium text-zinc-950 hover:bg-amber-400 transition-colors"
          >
            Open Dashboard
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </nav>

      {/* ── Hero — Asymmetric ─────────────────────────────────────────── */}
      <section className="border-b border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] items-start">
            {/* Left: Product statement */}
            <div className="pt-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 inline-flex items-center gap-1.5"
              >
                <div className="h-1.5 w-1.5 bg-amber-500 animate-pulse" />
                <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
                  Autonomous anomaly investigation
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[2.8rem] font-bold leading-[1.1] tracking-tight text-zinc-100"
              >
                Your numbers changed.
                <br />
                <span className="text-amber-500">Find out why.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-[14px] text-zinc-500 leading-relaxed max-w-md"
              >
                Anomalo deploys four autonomous agents that detect anomalies,
                investigate root causes by querying Exasol directly, and deliver
                evidence-backed explanations — no SQL required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-7 flex items-center gap-3"
              >
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group flex items-center gap-2 bg-amber-500 px-5 py-2.5 text-[13px] font-medium text-zinc-950 hover:bg-amber-400 transition-colors"
                >
                  Investigate an anomaly
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-1.5 border border-zinc-800 px-5 py-2.5 text-[13px] text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                >
                  See how it works
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6"
              >
                {[
                  { label: "All analysis on Exasol" },
                  { label: "Under 2 minutes" },
                  { label: "94% avg confidence" },
                  { label: "Zero SQL required" },
                ].map((item) => (
                  <div key={item.label} className="text-[11px] text-zinc-600">
                    {item.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Live investigation visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-zinc-800/60 bg-zinc-900/40 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1.5 w-1.5 bg-amber-500 animate-pulse" />
                <span className="font-mono text-[10px] text-zinc-500 tracking-wider uppercase">
                  Investigation in progress
                </span>
                <span className="ml-auto font-mono text-[10px] text-zinc-600">
                  1 min 42 sec
                </span>
              </div>

              {/* Metric strip */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Revenue", value: "−30%", anomaly: true },
                  { label: "Electronics", value: "−45%", anomaly: true },
                  { label: "South Asia", value: "−38%", anomaly: true },
                  { label: "Price", value: "+15%", anomaly: false },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">
                      {m.label}
                    </div>
                    <div
                      className={`font-mono text-sm font-semibold ${
                        m.anomaly ? "text-amber-500" : "text-zinc-400"
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Agent progress */}
              <div className="flex items-center gap-0.5 mb-4">
                {agents.map((a, i) => (
                  <div key={a.label} className="flex items-center flex-1">
                    <div
                      className={`h-1 flex-1 ${
                        i < 3 ? "bg-emerald-500/50" : "bg-zinc-800"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Root cause */}
              <div className="border-t border-zinc-800/60 pt-3">
                <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
                  Root cause identified
                </div>
                <p className="text-[12px] text-zinc-400 leading-relaxed">
                  Revenue decline traced to a 15% price increase in Electronics
                  across South Asia.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[9px] font-mono text-emerald-500/70">
                    94% confidence
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-[9px] font-mono text-zinc-600">
                    3 queries · 327ms avg
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Investigation Timeline ────────────────────────────────────── */}
      <section className="border-b border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8">
            <h2 className="text-[13px] font-semibold text-zinc-300">
              How an investigation flows
            </h2>
            <p className="mt-1 text-[12px] text-zinc-600">
              From anomaly detection to root cause — fully autonomous, under 2 minutes.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-2.5 left-0 right-0 h-px bg-zinc-800/60" />

            <div className="relative grid grid-cols-6 gap-3">
              {investigationFlow.map((step, i) => {
                const colors = {
                  detected: "bg-amber-500",
                  isolated: "bg-zinc-500",
                  evidence: "bg-zinc-500",
                  cause: "bg-amber-500/70",
                  confirmed: "bg-emerald-500",
                };
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto mb-2 h-2 w-2">
                      <div className={`h-full w-full ${colors[step.status]}`} />
                    </div>
                    <p className="font-mono text-[10px] text-zinc-500 leading-tight">
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Capabilities (visual examples) ─────────────────────── */}
      <section className="border-b border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8">
            <h2 className="text-[13px] font-semibold text-zinc-300">
              What the product does
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Live Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-zinc-800/60 bg-zinc-900/30 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Live Dashboard
                </span>
              </div>
              <div className="h-20 mb-3">
                <MiniChart data={[82, 85, 78, 91, 88, 72, 51]} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-semibold text-zinc-200">
                  $1.24M
                </span>
                <span className="font-mono text-[10px] text-amber-500/70">
                  −30%
                </span>
              </div>
            </motion.div>

            {/* Autonomous SQL */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="border border-zinc-800/60 bg-zinc-900/30 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Autonomous SQL
                </span>
              </div>
              <div className="h-20 font-mono text-[10px] leading-relaxed">
                <div className="text-zinc-600 mb-1">{"-- Investigator Agent"}</div>
                <div>
                  <span className="text-zinc-400">SELECT</span>{" "}
                  <span className="text-zinc-500">category, region,</span>
                </div>
                <div>
                  {"  "}
                  <span className="text-zinc-400">SUM</span>
                  <span className="text-zinc-500">(revenue)</span>
                </div>
                <div>
                  <span className="text-zinc-400">FROM</span>{" "}
                  <span className="text-zinc-500">sales</span>
                </div>
                <div className="text-emerald-500/50 mt-1">
                  {"→ 142ms on Exasol"}
                </div>
              </div>
            </motion.div>

            {/* Plain-English Reports */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="border border-zinc-800/60 bg-zinc-900/30 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-3.5 w-3.5 text-zinc-500" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                  Plain-English Reports
                </span>
              </div>
              <div className="h-20 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-medium text-amber-500/70 tracking-wider uppercase">
                    Root Cause Confirmed
                  </span>
                  <span className="font-mono text-[9px] text-zinc-600">
                    94%
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Revenue dropped 30% due to a 15% price increase on Electronics
                  in South Asia.
                </p>
                <div className="flex gap-2 mt-1">
                  {["Price +15%", "Orders −60%", "Revenue −30%"].map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9px] text-zinc-500 bg-zinc-800/50 border border-zinc-800 px-1.5 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Agent Pipeline ────────────────────────────────────────────── */}
      <section id="how-it-works" className="border-b border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8">
            <h2 className="text-[13px] font-semibold text-zinc-300">
              Agent pipeline
            </h2>
            <p className="mt-1 text-[12px] text-zinc-600">
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
                  transition={{ delay: i * 0.08 }}
                  className={`grid grid-cols-12 gap-4 border-l-2 ${
                    i === 0
                      ? "border-l-amber-500/40"
                      : "border-l-zinc-800/40"
                  } pl-4 py-4 ${
                    i < agents.length - 1
                      ? "border-b border-zinc-800/20"
                      : ""
                  }`}
                >
                  {/* Agent name */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`h-4 w-4 ${agent.color}`} />
                      <span className={`text-sm font-semibold ${agent.color}`}>
                        {agent.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-600">
                      {agent.purpose}
                    </span>
                  </div>

                  {/* Input */}
                  <div className="col-span-4">
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider block mb-0.5">
                      Input
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {agent.input}
                    </span>
                  </div>

                  {/* Output */}
                  <div className="col-span-5">
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider block mb-0.5">
                      Output
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {agent.output}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-200 mb-1">
              Stop guessing. Start investigating.
            </h2>
            <p className="text-[13px] text-zinc-500">
              See how Anomalo traces a revenue anomaly to its root cause — automatically.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="group flex items-center gap-2 bg-amber-500 px-5 py-2.5 text-[13px] font-medium text-zinc-950 hover:bg-amber-400 transition-colors shrink-0"
          >
            Launch Dashboard
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/40 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Anomalo" className="h-3 w-3 opacity-40" />
            <span className="font-mono text-[10px] text-zinc-600">
              Anomalo Investigator Pro
            </span>
          </div>
          <span className="font-mono text-[10px] text-zinc-700">
            Exasol AI Build Challenge 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
