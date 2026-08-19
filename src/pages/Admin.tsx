"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
import { adminUsers, adminStats } from "@/data/mockData";
import {
  ArrowLeft,
  BarChart3,
  Activity,
  Zap,
  Clock,
  CheckCircle2,
  Database,
} from "lucide-react";

const statCards = [
  { label: "Total Investigations", value: adminStats.totalInvestigations, icon: BarChart3 },
  { label: "Active Now", value: adminStats.activeInvestigations, icon: Activity },
  { label: "Completed This Week", value: adminStats.completedThisWeek, icon: CheckCircle2 },
  { label: "Avg Confidence", value: `${adminStats.avgConfidence}%`, icon: Zap },
  { label: "Avg Duration", value: adminStats.avgDuration, icon: Clock },
  { label: "Queries Run", value: adminStats.totalQueriesRun, icon: Database },
];

const roleColors: Record<string, string> = {
  admin: "text-amber-500/70 bg-amber-500/8",
  analyst: "text-zinc-300 bg-zinc-800/50",
  viewer: "text-zinc-500 bg-zinc-800/30",
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings">("overview");

  return (
    <div className="min-h-screen bg-[#09090b]">
      <NavBar />

      <div className="px-5 py-5">
        <div className="mx-auto max-w-[1000px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors mb-3"
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </button>
            <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
              Admin
            </h1>
            <p className="mt-1 text-[12px] text-zinc-500">
              Manage users, monitor system health, configure settings.
            </p>
          </motion.header>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="mb-4 flex gap-0 border border-zinc-800/50 bg-zinc-800/20 p-0.5 w-fit"
          >
            {(["overview", "users", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "bg-zinc-800/50 px-4 py-2 text-[11px] font-medium text-zinc-200 transition-colors"
                    : "bg-transparent px-4 py-2 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              <div className="grid grid-cols-2 gap-px bg-zinc-800/30 border border-zinc-800/50 mb-4 lg:grid-cols-3">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.08 + i * 0.02 }}
                      className="bg-zinc-900/60 p-4"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon className="h-3 w-3 text-zinc-600" />
                        <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="font-mono text-lg font-semibold text-zinc-200">
                        {stat.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* System health */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4 mb-3">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                  System Health
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Exasol Uptime", value: adminStats.exasolUptime },
                    { label: "LLM Tokens Used", value: adminStats.llmTokensUsed },
                    { label: "Avg Investigation Time", value: adminStats.avgDuration },
                    { label: "Active Investigations", value: adminStats.activeInvestigations },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-1.5 border-b border-zinc-800/20 last:border-0"
                    >
                      <span className="text-[11px] text-zinc-500">{item.label}</span>
                      <span className="font-mono text-[11px] text-zinc-300">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="border border-zinc-800/50 bg-zinc-900/60 p-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                  Recent Activity
                </span>
                <div className="space-y-1.5">
                  {[
                    { time: "2 min ago", event: "Priya started investigation inv-003" },
                    { time: "15 min ago", event: "System completed investigation inv-002" },
                    { time: "1 hr ago", event: "Raj commented on inv-001" },
                    { time: "3 hrs ago", event: "System flagged anomaly in Clothing — Europe" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-1.5 border-b border-zinc-800/20 last:border-0"
                    >
                      <span className="font-mono text-[8px] text-zinc-600 shrink-0 w-16">
                        {item.time}
                      </span>
                      <span className="text-[11px] text-zinc-400">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              <div className="border border-zinc-800/50 bg-zinc-900/60">
                <div className="grid grid-cols-12 gap-3 border-b border-zinc-800/40 px-4 py-2.5">
                  <span className="col-span-3 font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                    User
                  </span>
                  <span className="col-span-3 font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                    Email
                  </span>
                  <span className="col-span-2 font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                    Role
                  </span>
                  <span className="col-span-2 font-mono text-[8px] text-zinc-600 uppercase tracking-wider">
                    Last Active
                  </span>
                  <span className="col-span-2 font-mono text-[8px] text-zinc-600 uppercase tracking-wider text-right">
                    Investigations
                  </span>
                </div>
                {adminUsers.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-12 gap-3 items-center border-b border-zinc-800/20 last:border-0 px-4 py-3 transition-colors hover:bg-zinc-800/20"
                  >
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center bg-zinc-800/50 text-[9px] font-mono font-bold text-zinc-500">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[11px] text-zinc-300">{user.name}</span>
                    </div>
                    <span className="col-span-3 font-mono text-[10px] text-zinc-500">
                      {user.email}
                    </span>
                    <div className="col-span-2">
                      <span
                        className={`font-mono text-[8px] px-1.5 py-0.5 ${roleColors[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <span className="col-span-2 font-mono text-[10px] text-zinc-500">
                      {user.lastActive}
                    </span>
                    <span className="col-span-2 font-mono text-[11px] text-zinc-400 text-right">
                      {user.investigations}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="space-y-3"
            >
              {[
                {
                  label: "Anomaly Detection Threshold",
                  value: "15% decline",
                  desc: "Minimum metric change to trigger investigation",
                },
                {
                  label: "Max Queries Per Investigation",
                  value: "10",
                  desc: "Safety limit on Investigator agent SQL queries",
                },
                {
                  label: "Investigation Timeout",
                  value: "5 minutes",
                  desc: "Maximum time before investigation is aborted",
                },
                {
                  label: "Notification Channel",
                  value: "Dashboard only",
                  desc: "Where to send anomaly alerts",
                },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className="border border-zinc-800/50 bg-zinc-900/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[12px] text-zinc-300">
                        {setting.label}
                      </span>
                      <p className="text-[10px] text-zinc-600 mt-0.5">
                        {setting.desc}
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-amber-500/60 bg-amber-500/5 border border-amber-500/10 px-2 py-1">
                      {setting.value}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
