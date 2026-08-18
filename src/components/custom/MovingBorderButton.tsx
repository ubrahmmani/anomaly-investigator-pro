"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function MovingBorderButton({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-background/80 px-8 py-4 text-foreground backdrop-blur-sm transition-colors hover:bg-background/90",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      {/* Animated gradient border */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-[1px] rounded-[11px] bg-background/90 transition-colors group-hover:bg-background/80" />

      {/* Moving border effect */}
      <span className="absolute inset-0 rounded-xl">
        <span className="absolute inset-[-2px] rounded-xl bg-[conic-gradient(from_var(--angle),transparent_70%,#8b5cf6_100%)] animate-[spin_3s_linear_infinite] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute inset-[1px] rounded-[11px] bg-background/90 group-hover:bg-background/80" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 font-medium">
        {children}
      </span>

      <style>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </button>
  );
}
