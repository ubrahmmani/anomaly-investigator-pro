"use client";
import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Search, Plus, Shield, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.svg";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Catalog", icon: Search, path: "/browse" },
  { label: "New", icon: Plus, path: "/create" },
  { label: "Admin", icon: Shield, path: "/admin" },
];

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between border-b border-white/[0.04] bg-[#0c0c10]/80 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="Anomalo" className="h-4 w-4" />
        <span className="font-mono text-[11px] font-medium text-white/50 tracking-widest uppercase">
          Anomalo
        </span>
        <span className="font-mono text-[10px] text-amber-500/60 tracking-wider">
          PRO
        </span>
      </div>

      <div className="flex items-center gap-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={
                isActive
                  ? "flex items-center gap-1.5 rounded-sm bg-white/[0.06] px-2.5 py-1.5 text-[11px] font-medium text-white/60"
                  : "flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-[11px] text-white/25 transition-colors hover:bg-white/[0.04] hover:text-white/45"
              }
            >
              <Icon className="h-3 w-3" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-white/15 hidden sm:inline">
          Exasol Personal
        </span>
        <a
          href="#"
          className="flex items-center gap-1 text-[10px] text-white/20 transition-colors hover:text-white/40"
        >
          Docs <ArrowUpRight className="h-2.5 w-2.5" />
        </a>
      </div>
    </nav>
  );
}
