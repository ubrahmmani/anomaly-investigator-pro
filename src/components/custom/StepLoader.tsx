"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, Search, Brain, FileText, Check } from "lucide-react";
import DecryptedText from "@/components/DecryptedText";

const iconMap: Record<string, React.ElementType> = {
  eye: Eye,
  search: Search,
  brain: Brain,
  "file-text": FileText,
};

interface Step {
  id: string;
  label: string;
  description: string;
  icon: string;
  duration: number;
}

export function StepLoader({
  steps,
  activeIndex,
  completedIndices,
}: {
  steps: Step[];
  activeIndex: number;
  completedIndices: number[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || Eye;
        const isActive = i === activeIndex;
        const isCompleted = completedIndices.includes(i);

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={cn(
              "relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-500",
              isActive &&
                "border-violet-500/50 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]",
              isCompleted &&
                "border-emerald-500/30 bg-emerald-500/5",
              !isActive &&
                !isCompleted &&
                "border-white/5 bg-white/[0.02]"
            )}
          >
            {/* Glow effect for active step */}
            {isActive && (
              <motion.div
                layoutId="activeGlow"
                className="absolute inset-0 rounded-xl border border-violet-500/30"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Icon */}
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-500",
                isActive && "bg-violet-500/20 text-violet-400",
                isCompleted && "bg-emerald-500/20 text-emerald-400",
                !isActive && !isCompleted && "bg-white/5 text-white/30"
              )}
            >
              {isCompleted ? (
                <Check className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>

            {/* Text */}
            <div className="relative z-10 flex-1">
              <div
                className={cn(
                  "text-sm font-medium transition-colors duration-500",
                  isActive && "text-foreground",
                  isCompleted && "text-foreground/70",
                  !isActive && !isCompleted && "text-white/30"
                )}
              >
                {isActive ? (
                  <DecryptedText
                    text={step.label}
                    speed={40}
                    maxIterations={8}
                    sequential
                    revealDirection="start"
                    animateOn="view"
                    className="text-foreground"
                    encryptedClassName="text-violet-400/50"
                  />
                ) : (
                  step.label
                )}
              </div>
              <div
                className={cn(
                  "text-xs transition-colors duration-500",
                  isActive && "text-violet-300/70",
                  isCompleted && "text-emerald-300/50",
                  !isActive && !isCompleted && "text-white/20"
                )}
              >
                {step.description}
              </div>
            </div>

            {/* Status indicator */}
            <div className="relative z-10">
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-2.5 w-2.5 rounded-full bg-violet-400"
                />
              )}
              {isCompleted && (
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              )}
              {!isActive && !isCompleted && (
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
