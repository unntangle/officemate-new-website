import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { overallScore } from "@/constants/healthScore";

interface HealthScoreBadgeProps {
  slug: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Compact Chair Health Score pill.
 * Renders nothing when a model hasn't been assessed yet — never invent a score.
 */
export function HealthScoreBadge({
  slug,
  size = "sm",
  className,
}: HealthScoreBadgeProps) {
  const score = overallScore(slug);
  if (!score) return null;

  return (
    <span
      title={`Officemate Chair Health Score: ${score} out of 10`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-sage-soft font-semibold text-sage-ink",
        size === "sm" ? "px-2.5 py-1 text-[0.7rem]" : "px-3 py-1.5 text-xs",
        className
      )}
    >
      <Activity size={size === "sm" ? 11 : 13} strokeWidth={2.5} />
      {score.toFixed(1)}
      <span className="font-medium text-sage-ink/60">Health</span>
    </span>
  );
}
