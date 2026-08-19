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
  purpose?: string;
  description?: string;
  input?: string;
  output?: string;
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
    <div className="space-y-1">
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || Eye;
        const isActive = i === activeIndex;
        const isCompleted = completedIndices.includes(i);
        const isPending = !isActive && !isCompleted;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.25 }}
            className={cn(
              "flex items-center gap-3 py-2.5 px-2 border-l-2 transition-all duration-300",
              isActive && "border-l-amber-500 bg-amber-500/5",
              isCompleted && "border-l-emerald-500/50",
              isPending && "border-l-white/[0.06]"
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center shrink-0 transition-colors duration-300",
                isActive && "text-amber-400",
                isCompleted && "text-emerald-400/70",
                isPending && "text-white/15"
              )}
            >
              {isCompleted ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Icon className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "text-[11px] font-medium transition-colors duration-300",
                  isActive && "text-white/80",
                  isCompleted && "text-white/45",
                  isPending && "text-white/20"
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
                    className="text-white/80"
                    encryptedClassName="text-amber-400/30"
                  />
                ) : (
                  step.label
                )}
              </div>
              {(step.description || step.purpose) && (
                <div
                  className={cn(
                    "text-[9px] mt-0.5 transition-colors duration-300",
                    isActive && "text-amber-400/40",
                    isCompleted && "text-white/20",
                    isPending && "text-white/10"
                  )}
                >
                  {step.description || step.purpose}
                </div>
              )}
            </div>

            {/* Status indicator */}
            <div className="shrink-0">
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-1.5 w-1.5 rounded-full bg-amber-400"
                />
              )}
              {isCompleted && (
                <span className="font-mono text-[8px] text-emerald-400/50 uppercase">✓</span>
              )}
              {isPending && (
                <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
