import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  className,
  size = 14,
}: {
  value: number;
  count?: number;
  className?: string;
  size?: number;
}) {
  const full = Math.round(value);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={cn(
              i < full ? "fill-accent text-accent" : "fill-line text-line"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-muted">
        <span className="font-medium text-ink">{value.toFixed(1)}</span>
        {count != null && ` · ${count.toLocaleString("en-IN")} reviews`}
      </span>
    </div>
  );
}
