"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { GridBackground } from "@/components/custom/GridBackground";
import { catalogItems, type CatalogItem } from "@/data/mockData";
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  CheckCircle2,
  Loader2,
  Calendar,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import logo from "@/assets/logo.svg";

const statusConfig: Record<
  CatalogItem["status"],
  { label: string; color: string; icon: React.ElementType }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-400 bg-emerald-500/15",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-400 bg-amber-500/15",
    icon: Loader2,
  },
  scheduled: {
    label: "Scheduled",
    color: "text-blue-400 bg-blue-500/15",
    icon: Calendar,
  },
};

export default function Browse() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.includes(search.toLowerCase()));
      const matchesStatus =
        filterStatus === "all" || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  return (
    <GridBackground>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <img src={logo} alt="Anomalo Investigator Pro" className="h-6 w-6" />
              <span className="font-mono text-[11px] text-white/30 tracking-wider uppercase">
                Anomalo Investigator Pro
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Investigation Catalog
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Browse past and upcoming investigations — search by metric, region, or keyword.
            </p>
          </motion.header>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search investigations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-violet-500/30 focus:bg-white/[0.05]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/30" />
              {["all", "completed", "in-progress", "scheduled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={
                    filterStatus === s
                      ? "rounded-lg bg-violet-500/20 px-3 py-1.5 text-xs font-medium text-violet-300 transition-colors"
                      : "rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
                  }
                >
                  {s === "all" ? "All" : s === "in-progress" ? "In Progress" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-4 text-xs text-white/25"
          >
            {filtered.length} investigation{filtered.length !== 1 ? "s" : ""} found
          </motion.p>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((item, i) => {
              const status = statusConfig[item.status];
              const StatusIcon = status.icon;
              const isNegative = item.impact.startsWith("−") || item.impact.startsWith("-");

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => navigate(`/investigation/${item.id}`)}
                  className="group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${status.color}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </span>
                      {item.confidence > 0 && (
                        <span className="text-[10px] text-white/25">
                          {item.confidence}% confidence
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/15 transition-all group-hover:text-violet-400 group-hover:translate-x-0.5" />
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-violet-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/35 leading-relaxed mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-white/25">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        {isNegative ? (
                          <TrendingDown className="h-3 w-3 text-red-400/60" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-emerald-400/60" />
                        )}
                        {item.impact} {item.affectedMetric}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/20">
                      {item.author}
                    </span>
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-[10px] text-white/15">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-sm text-white/30">No investigations match your search.</p>
              <button
                onClick={() => { setSearch(""); setFilterStatus("all"); }}
                className="mt-3 text-xs text-violet-400/60 hover:text-violet-300 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          {/* Nav back */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
