"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import { adminUsers, adminStats } from "@/data/mockData";
import {
  ArrowLeft,
  Users,
  BarChart3,
  Activity,
  Settings,
  Shield,
  Database,
  Zap,
  Clock,
  CheckCircle2,
  Search,
  MoreVertical,
} from "lucide-react";

const statCards = [
  { label: "Total Investigations", value: adminStats.totalInvestigations, icon: BarChart3, color: "#8b5cf6" },
  { label: "Active Now", value: adminStats.activeInvestigations, icon: Activity, color: "#f59e0b" },
  { label: "Completed This Week", value: adminStats.completedThisWeek, icon: CheckCircle2, color: "#10b981" },
  { label: "Avg Confidence", value: `${adminStats.avgConfidence}%`, icon: Zap, color: "#06b6d4" },
  { label: "Avg Duration", value: adminStats.avgDuration, icon: Clock, color: "#ec4899" },
  { label: "Queries Run", value: adminStats.totalQueriesRun, icon: Database, color: "#8b5cf6" },
];

const roleColors: Record<string, string> = {
  admin: "bg-violet-500/15 text-violet-300",
  analyst: "bg-cyan-500/15 text-cyan-300",
  viewer: "bg-white/10 text-white/40",
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings">("overview");

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/50 transition-colors mb-4"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
                <Shield className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Admin Panel
                </h1>
                <p className="text-xs text-white/35">
                  Manage users, monitor system health, and configure settings
                </p>
              </div>
            </div>
          </motion.header>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 w-fit"
          >
            {(["overview", "users", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "rounded-lg bg-violet-500/20 px-4 py-2 text-xs font-medium text-violet-300 transition-colors"
                    : "rounded-lg px-4 py-2 text-xs text-white/35 transition-colors hover:text-white/50"
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 mb-6">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                    >
                      <Icon className="h-4 w-4 mb-2" style={{ color: stat.color }} />
                      <p className="font-mono text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* System health */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                    System Health
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Exasol Uptime", value: adminStats.exasolUptime, status: "healthy" },
                      { label: "LLM API", value: "Connected", status: "healthy" },
                      { label: "Agent Pipeline", value: "Operational", status: "healthy" },
                      { label: "LLM Tokens Used", value: adminStats.llmTokensUsed, status: "info" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
                        <span className="text-xs text-white/40">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-white/60">{item.value}</span>
                          <div
                            className={`h-2 w-2 rounded-full ${
                              item.status === "healthy"
                                ? "bg-emerald-400"
                                : "bg-blue-400"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { time: "2 min ago", text: "Priya Mehta ran investigation inv-001" },
                      { time: "15 min ago", text: "Raj Kumar commented on inv-002" },
                      { time: "1 hr ago", text: "System completed investigation inv-005" },
                      { time: "3 hrs ago", text: "Sarah Chen scheduled inv-004" },
                      { time: "1 day ago", text: "Dev Patel created inv-006" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-[11px]">
                        <span className="shrink-0 text-white/20 w-16">{activity.time}</span>
                        <span className="text-white/40">{activity.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/[0.04] px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-white/30" />
                    <span className="text-xs font-medium text-white/50">Team Members</span>
                  </div>
                  <button className="rounded-lg bg-violet-500/20 px-3 py-1.5 text-[11px] font-medium text-violet-300 transition-colors hover:bg-violet-500/30">
                    + Invite Member
                  </button>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {adminUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-[11px] font-bold text-violet-300">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-[11px] text-white/25">{user.email}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                      <span className="text-[11px] text-white/25 w-20 text-right">
                        {user.investigations} investigations
                      </span>
                      <span className="text-[11px] text-white/20 w-20 text-right">
                        {user.lastActive}
                      </span>
                      <button className="text-white/15 hover:text-white/40 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {[
                {
                  title: "Investigation Threshold",
                  description: "Anomalies below this percentage change won't trigger automatic investigation.",
                  value: "15%",
                },
                {
                  title: "Agent Timeout",
                  description: "Maximum time any single agent can run before timing out.",
                  value: "120 sec",
                },
                {
                  title: "Exasol Connection",
                  description: "Database endpoint for all SQL queries.",
                  value: "exasol://localhost:8563",
                },
                {
                  title: "LLM Provider",
                  description: "Model used for SQL generation and reasoning.",
                  value: "Claude 3.5 Sonnet",
                },
                {
                  title: "Notification Email",
                  description: "Send completed investigation reports to this address.",
                  value: "team@company.com",
                },
              ].map((setting, i) => (
                <motion.div
                  key={setting.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{setting.title}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{setting.description}</p>
                  </div>
                  <span className="font-mono text-xs text-white/50 shrink-0 ml-4">
                    {setting.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </GridBackground>
  );
}
