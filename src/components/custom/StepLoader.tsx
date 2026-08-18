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

/** Kokonut-style spinning ring progress indicator */
function SpinnerRing({ progress }: { progress: number }) {
  return (
    <div className="relative h-5 w-5">
      <svg
        className="h-full w-full"
        fill="none"
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="step-progress-mask">
            <rect fill="black" height="240" width="240" />
            <circle
              cx="120"
              cy="120"
              fill="white"
              r="120"
              strokeDasharray={`${(progress / 100) * 754}, 754`}
              transform="rotate(-90 120 120)"
            />
          </mask>
        </defs>
        <g
          className="origin-center animate-spin"
          style={{ animationDuration: "8s" }}
          mask="url(#step-progress-mask)"
          strokeDasharray="18% 40%"
          strokeWidth="16"
        >
          <circle cx="120" cy="120" opacity="0.95" r="150" stroke="#8b5cf6" />
          <circle cx="120" cy="120" opacity="0.95" r="130" stroke="#06b6d4" />
          <circle cx="120" cy="120" opacity="0.95" r="110" stroke="#10b981" />
          <circle cx="120" cy="120" opacity="0.95" r="90" stroke="#f59e0b" />
        </g>
      </svg>
    </div>
  );
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
  const progress =
    activeIndex >= 0
      ? ((activeIndex + 0.5) / steps.length) * 100
      : completedIndices.length === steps.length
        ? 100
        : 0;

  const currentStep = activeIndex >= 0 ? steps[activeIndex] : null;

  return (
    <div className="space-y-3">
      {/* Kokonut-style spinner + status */}
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        {activeIndex >= 0 ? (
          <SpinnerRing progress={progress} />
        ) : completedIndices.length === steps.length ? (
          <div className="flex h-5 w-5 items-center justify-center">
            <Check className="h-4 w-4 text-emerald-400" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full border-2 border-white/10" />
        )}
        <span className="text-sm font-medium text-white/70">
          {currentStep
            ? `${currentStep.label} — ${currentStep.description}`
            : completedIndices.length === steps.length
              ? "Investigation complete"
              : "Waiting to start..."}
        </span>
      </div>

      {/* Stage cards — Motion-staggered */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const Icon = iconMap[step.icon] || Eye;
          const isActive = i === activeIndex;
          const isCompleted = completedIndices.includes(i);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 transition-all duration-500",
                isActive &&
                  "border-violet-500/30 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.1)]",
                isCompleted && "border-emerald-500/20 bg-emerald-500/5",
                !isActive && !isCompleted && "border-white/[0.04] bg-white/[0.02]"
              )}
            >
              {/* Icon with Kokonut-style ring for active */}
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-500",
                  isActive && "bg-violet-500/20 text-violet-400",
                  isCompleted && "bg-emerald-500/20 text-emerald-400",
                  !isActive && !isCompleted && "bg-white/5 text-white/25"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-violet-400/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>

              {/* Label — DecryptedText only for active stage */}
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "text-xs font-medium transition-colors duration-500",
                    isActive && "text-white",
                    isCompleted && "text-white/60",
                    !isActive && !isCompleted && "text-white/25"
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
                      className="text-white"
                      encryptedClassName="text-violet-400/40"
                    />
                  ) : (
                    step.label
                  )}
                </div>
                <div
                  className={cn(
                    "text-[10px] transition-colors duration-500",
                    isActive && "text-violet-300/50",
                    isCompleted && "text-emerald-300/30",
                    !isActive && !isCompleted && "text-white/15"
                  )}
                >
                  {step.description}
                </div>
              </div>

              {/* Status dot */}
              <div className="shrink-0">
                {isActive && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-2 w-2 rounded-full bg-violet-400"
                  />
                )}
                {isCompleted && (
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                )}
                {!isActive && !isCompleted && (
                  <div className="h-2 w-2 rounded-full bg-white/10" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
