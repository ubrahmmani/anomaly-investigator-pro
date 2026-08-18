"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import {
  Zap,
  Eye,
  Search,
  Brain,
  FileText,
  ArrowRight,
  AlertTriangle,
  Clock,
  Shield,
} from "lucide-react";
import logo from "@/assets/logo.svg";

const steps = [
  {
    icon: Eye,
    label: "Watcher",
    description: "Automatically scans metrics and flags anomalies as they appear",
    color: "#f59e0b",
  },
  {
    icon: Search,
    label: "Investigator",
    description: "Generates and runs SQL queries to isolate the root cause",
    color: "#06b6d4",
  },
  {
    icon: Brain,
    label: "Reasoner",
    description: "Correlates findings across dimensions to form a hypothesis",
    color: "#8b5cf6",
  },
  {
    icon: FileText,
    label: "Reporter",
    description: "Delivers a plain-English summary backed by real numbers",
    color: "#10b981",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <GridBackground>
      <div className="min-h-screen">
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between px-6 py-5"
        >
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Logo" className="h-7 w-7" />
            <span className="font-mono text-sm text-white/60 tracking-wider">
              Anomaly Investigator
            </span>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            Open Dashboard
          </button>
        </motion.nav>

        {/* Hero */}
        <section className="px-6 pt-20 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-medium text-violet-300">
                Exasol AI Build Challenge 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
            >
              Stop asking{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                "why"
              </span>{" "}
              — get the answer in minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-lg text-white/40 leading-relaxed max-w-xl mx-auto"
            >
              A multi-agent system that autonomously investigates sales anomalies
              — detect, query, reason, report — all running on Exasol. No SQL
              required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate("/dashboard")}
                className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
              >
                Start Investigating
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                How it works
              </a>
            </motion.div>
          </div>
        </section>

        {/* Problem statement */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    The Problem
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    Dashboards show that something changed, but someone still has
                    to spend hours writing SQL to figure out why. That
                    investigation doesn't scale.
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                    <Zap className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    The Solution
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    Four AI agents work together — Watcher, Investigator,
                    Reasoner, Reporter — to autonomously investigate anomalies
                    end-to-end. One click, minutes, done.
                  </p>
                </div>
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Clock className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    The Result
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    What used to take hours of analyst time now takes under two
                    minutes. Plain-English root-cause explanations, backed by
                    real numbers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — Agent pipeline */}
        <section id="how-it-works" className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-white">How it works</h2>
              <p className="mt-2 text-sm text-white/35">
                Four agents, one pipeline, zero SQL from you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
                  >
                    {/* Step number */}
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-white/15">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: step.color }} />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">
                      {step.label}
                    </h3>
                    <p className="text-xs text-white/35 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow connector (hidden on last item) */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 z-20 -translate-y-1/2 text-white/15">
                        →
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-white/20">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5" />
                All analysis runs on Exasol
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5" />
                Sub-2-minute investigation
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                Transparent agent reasoning
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to investigate?
            </h2>
            <p className="text-sm text-white/35 mb-6">
              See how an autonomous agent swarm investigates a revenue anomaly
              end-to-end.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110"
            >
              Launch Dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.04] px-6 py-6">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-5 w-5" />
              <span className="font-mono text-[11px] text-white/25">
                Anomaly Investigator
              </span>
            </div>
            <span className="text-[11px] text-white/15">
              Exasol AI Build Challenge 2026
            </span>
          </div>
        </footer>
      </div>
    </GridBackground>
  );
}
