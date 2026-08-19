"use client";
import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Search, Plus, Shield, ExternalLink } from "lucide-react";
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
    <nav className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm px-5 h-11">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img src={logo} alt="Anomalo" className="h-3.5 w-3.5 opacity-70" />
        <span className="text-[11px] font-medium text-zinc-400 tracking-wide">
          Anomalo
        </span>
        <span className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">
          Pro
        </span>
      </div>

      {/* Nav items */}
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
                  ? "flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-zinc-200 bg-zinc-800/60"
                  : "flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] text-zinc-500 transition-colors hover:text-zinc-300 hover:bg-zinc-800/30"
              }
            >
              <Icon className="h-3 w-3" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-zinc-600 hidden sm:inline">
          Exasol Personal
        </span>
        <a
          href="#"
          className="flex items-center gap-1 text-[10px] text-zinc-600 transition-colors hover:text-zinc-400"
        >
          Docs <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </nav>
  );
}
