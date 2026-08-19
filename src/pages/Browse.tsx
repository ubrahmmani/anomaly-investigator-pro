"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { NavBar } from "@/components/NavBar";
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

const statusConfig: Record<
  CatalogItem["status"],
  { label: string; color: string; dotColor: string; icon: React.ElementType }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-400/70",
    dotColor: "bg-emerald-500",
    icon: CheckCircle2,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-400/70",
    dotColor: "bg-amber-500",
    icon: Loader2,
  },
  scheduled: {
    label: "Scheduled",
    color: "text-blue-400/70",
    dotColor: "bg-blue-400",
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
            <h1 className="text-lg font-semibold text-white/80 tracking-tight">
              Investigation Catalog
            </h1>
            <p className="mt-1 text-[12px] text-white/30">
              Browse past and upcoming investigations — search by metric, region, or keyword.
            </p>
          </motion.header>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Search investigations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-white/[0.06] bg-white/[0.03] py-2 pl-9 pr-4 text-[12px] text-white/70 placeholder-white/20 outline-none transition-colors focus:border-amber-500/20"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-white/20 mr-1" />
              {["all", "completed", "in-progress", "scheduled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={
                    filterStatus === s
                      ? "bg-white/[0.08] px-2.5 py-1 text-[10px] font-medium text-white/50 transition-colors"
                      : "bg-transparent px-2.5 py-1 text-[10px] text-white/25 transition-colors hover:text-white/40"
                  }
                >
                  {s === "all"
                    ? "All"
                    : s === "in-progress"
                      ? "In Progress"
                      : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <p className="mb-4 font-mono text-[10px] text-white/20">
            {filtered.length} investigation{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Catalog List */}
          <div className="space-y-px">
            {filtered.map((item, i) => {
              const status = statusConfig[item.status];
              const isNegative = item.impact.startsWith("−") || item.impact.startsWith("-");

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  onClick={() => navigate(`/investigation/${item.id}`)}
                  className="group cursor-pointer border border-white/[0.06] bg-[#0c0c10] p-4 transition-colors hover:bg-white/[0.02] hover:border-white/[0.1]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
                        <span className={`font-mono text-[9px] ${status.color} uppercase tracking-wider`}>
                          {status.label}
                        </span>
                        {item.confidence > 0 && (
                          <span className="font-mono text-[9px] text-white/20">
                            {item.confidence}%
                          </span>
                        )}
                        <span className="text-white/10">·</span>
                        <span className="font-mono text-[9px] text-white/15">{item.id}</span>
                      </div>
                      <h3 className="text-[13px] font-medium text-white/60 mb-1 group-hover:text-white/80 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-white/30 leading-relaxed line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5">
                        {isNegative ? (
                          <TrendingDown className="h-3 w-3 text-amber-400/50" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-emerald-400/50" />
                        )}
                        <span className="font-mono text-[12px] font-semibold text-white/50">
                          {item.impact}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-white/15">{item.date}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="mt-2 flex gap-1.5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/[0.03] px-1.5 py-0.5 font-mono text-[9px] text-white/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[12px] text-white/25">No investigations match your search.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStatus("all");
                }}
                className="mt-2 text-[11px] text-amber-400/50 hover:text-amber-400/70 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
