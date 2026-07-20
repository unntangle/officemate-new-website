"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientEnquireButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

/**
 * Header CTA — a dark pill with a multi-colour gradient light running
 * continuously around its border. Links through to the AI Ergonomic Advisor.
 * The animated border itself lives in `.gradient-pill` (globals.css) and
 * reuses the registered --neon-angle property.
 */
export function GradientEnquireButton({
  href = "/advisor",
  label = "Ask oAI",
  className,
}: GradientEnquireButtonProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn("gradient-pill group", className)}
    >
      <span className="relative z-[1] inline-flex items-center gap-2">
        <Sparkles
          size={15}
          className="text-white/90 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        />
        <span>{label}</span>
      </span>
    </Link>
  );
}
