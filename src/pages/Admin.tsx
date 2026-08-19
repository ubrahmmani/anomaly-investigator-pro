"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
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
  admin: "text-amber-400/70 bg-amber-500/8",
  analyst: "text-blue-400/70 bg-blue-400/8",
  viewer: "text-white/30 bg-white/5",
};

export default function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "settings">("overview");

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <NavBar />

      <div className="px-6 py-6">
        <div className="mx-auto max-w-[1000px]">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white/45 transition-colors mb-3"
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </button>
            <h1 className="text-lg font-semibold text-white/80 tracking-tight">
              Admin
            </h1>
            <p className="mt-1 text-[12px] text-white/30">
              Manage users, monitor system health, configure settings.
            </p>
          </motion.header>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 flex gap-0 border border-white/[0.06] bg-white/[0.02] p-0.5 w-fit"
          >
            {(["overview", "users", "settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "bg-white/[0.08] px-4 py-2 text-[11px] font-medium text-white/60 transition-colors"
                    : "bg-transparent px-4 py-2 text-[11px] text-white/30 transition-colors hover:text-white/50"
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.06] mb-5 lg:grid-cols-3">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.03 }}
                      className="bg-[#0c0c10] p-4"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon className="h-3 w-3 text-white/20" />
                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="font-mono text-lg font-semibold text-white/65">{stat.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* System health */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4 mb-4">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                  System Health
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Exasol Uptime", value: adminStats.exasolUptime },
                    { label: "LLM Tokens Used", value: adminStats.llmTokensUsed },
                    { label: "Avg Investigation Time", value: adminStats.avgDuration },
                    { label: "Active Investigations", value: adminStats.activeInvestigations },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                      <span className="text-[11px] text-white/35">{item.label}</span>
                      <span className="font-mono text-[11px] text-white/50">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="border border-white/[0.06] bg-[#0c0c10] p-4">
                <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider block mb-3">
                  Recent Activity
                </span>
                <div className="space-y-2">
                  {[
                    { time: "2 min ago", event: "Priya started investigation inv-003", type: "start" },
                    { time: "15 min ago", event: "System completed investigation inv-002", type: "complete" },
                    { time: "1 hr ago", event: "Raj commented on inv-001", type: "comment" },
                    { time: "3 hrs ago", event: "System flagged anomaly in Clothing — Europe", type: "flag" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-1.5 border-b border-white/[0.03] last:border-0">
                      <span className="font-mono text-[9px] text-white/15 shrink-0 w-16">{item.time}</span>
                      <span className="text-[11px] text-white/40">{item.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="border border-white/[0.06] bg-[#0c0c10]">
                <div className="grid grid-cols-12 gap-3 border-b border-white/[0.04] px-4 py-2.5">
                  <span className="col-span-3 font-mono text-[9px] text-white/20 uppercase tracking-wider">User</span>
                  <span className="col-span-3 font-mono text-[9px] text-white/20 uppercase tracking-wider">Email</span>
                  <span className="col-span-2 font-mono text-[9px] text-white/20 uppercase tracking-wider">Role</span>
                  <span className="col-span-2 font-mono text-[9px] text-white/20 uppercase tracking-wider">Last Active</span>
                  <span className="col-span-2 font-mono text-[9px] text-white/20 uppercase tracking-wider text-right">Investigations</span>
                </div>
                {adminUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-3 items-center border-b border-white/[0.03] last:border-0 px-4 py-3 transition-colors hover:bg-white/[0.02]">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center bg-white/[0.06] text-[9px] font-mono font-bold text-white/30">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-[11px] text-white/50">{user.name}</span>
                    </div>
                    <span className="col-span-3 font-mono text-[10px] text-white/25">{user.email}</span>
                    <div className="col-span-2">
                      <span className={`font-mono text-[9px] px-1.5 py-0.5 ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </div>
                    <span className="col-span-2 font-mono text-[10px] text-white/25">{user.lastActive}</span>
                    <span className="col-span-2 font-mono text-[11px] text-white/40 text-right">{user.investigations}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {[
                { label: "Anomaly Detection Threshold", value: "15% decline", desc: "Minimum metric change to trigger investigation" },
                { label: "Max Queries Per Investigation", value: "10", desc: "Safety limit on Investigator agent SQL queries" },
                { label: "Investigation Timeout", value: "5 minutes", desc: "Maximum time before investigation is aborted" },
                { label: "Notification Channel", value: "Dashboard only", desc: "Where to send anomaly alerts" },
              ].map((setting) => (
                <div key={setting.label} className="border border-white/[0.06] bg-[#0c0c10] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[12px] text-white/50">{setting.label}</span>
                      <p className="text-[10px] text-white/20 mt-0.5">{setting.desc}</p>
                    </div>
                    <span className="font-mono text-[11px] text-amber-400/60 bg-amber-500/5 border border-amber-500/10 px-2 py-1">
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
