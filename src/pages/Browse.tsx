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
  { label: string; color: string; dotColor: string }
> = {
  completed: {
    label: "Completed",
    color: "text-emerald-500/70",
    dotColor: "bg-emerald-500",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-500/70",
    dotColor: "bg-amber-500",
  },
  scheduled: {
    label: "Scheduled",
    color: "text-zinc-400",
    dotColor: "bg-zinc-500",
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
            <h1 className="text-[15px] font-semibold text-zinc-200 tracking-tight">
              Investigation Catalog
            </h1>
            <p className="mt-1 text-[12px] text-zinc-500">
              Browse past and upcoming investigations — search by metric, region, or keyword.
            </p>
          </motion.header>

          {/* Search + Filters */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                placeholder="Search investigations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-zinc-800/50 bg-zinc-800/20 py-2 pl-9 pr-4 text-[12px] text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-amber-500/20"
              />
            </div>
            <div className="flex items-center gap-0.5">
              <Filter className="h-3.5 w-3.5 text-zinc-600 mr-1" />
              {["all", "completed", "in-progress", "scheduled"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={
                    filterStatus === s
                      ? "bg-zinc-800/50 px-2.5 py-1 text-[10px] font-medium text-zinc-300 transition-colors"
                      : "bg-transparent px-2.5 py-1 text-[10px] text-zinc-600 transition-colors hover:text-zinc-400"
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

          <p className="mb-3 font-mono text-[9px] text-zinc-600">
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
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.02 }}
                  onClick={() => navigate(`/investigation/${item.id}`)}
                  className="group cursor-pointer border border-zinc-800/50 bg-zinc-900/40 p-4 transition-colors hover:bg-zinc-800/20 hover:border-zinc-700/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-1.5 w-1.5 ${status.dotColor}`} />
                        <span
                          className={`font-mono text-[8px] ${status.color} uppercase tracking-wider`}
                        >
                          {status.label}
                        </span>
                        {item.confidence > 0 && (
                          <span className="font-mono text-[8px] text-zinc-600">
                            {item.confidence}%
                          </span>
                        )}
                        <span className="text-zinc-800">·</span>
                        <span className="font-mono text-[8px] text-zinc-700">
                          {item.id}
                        </span>
                      </div>
                      <h3 className="text-[13px] font-medium text-zinc-300 mb-0.5 group-hover:text-zinc-100 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1.5">
                        {isNegative ? (
                          <TrendingDown className="h-3 w-3 text-amber-500/50" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-emerald-500/50" />
                        )}
                        <span className="font-mono text-[12px] font-semibold text-zinc-300">
                          {item.impact}
                        </span>
                      </div>
                      <span className="font-mono text-[8px] text-zinc-600">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="mt-2 flex gap-1.5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="bg-zinc-800/30 px-1.5 py-0.5 font-mono text-[8px] text-zinc-600"
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
              <p className="text-[12px] text-zinc-600">
                No investigations match your search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStatus("all");
                }}
                className="mt-2 text-[11px] text-amber-500/50 hover:text-amber-500/70 transition-colors"
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
