"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * `divided` — hairline rules, used on product and inner pages.
 * `card`    — each row is its own rounded panel, used on the homepage.
 */
type AccordionVariant = "divided" | "card";

export function Accordion({
  items,
  className,
  defaultOpen = 0,
  variant = "divided",
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
  variant?: AccordionVariant;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const isCard = variant === "card";

  return (
    <div
      className={cn(
        isCard
          ? "flex flex-col gap-3"
          : "divide-y divide-line border-y border-line",
        className
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              isCard &&
                "overflow-hidden rounded-2xl bg-card px-6 transition-shadow duration-300",
              isCard && isOpen && "shadow-soft"
            )}
          >
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center justify-between gap-6 text-left",
                  isCard ? "py-5" : "py-5"
                )}
              >
                <span
                  className={cn(
                    "text-base transition-colors md:text-lg",
                    isCard ? "font-semibold" : "font-medium",
                    isOpen ? "text-ink" : "text-ink/80"
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCard ? "bg-surface text-ink" : "border border-line",
                    isOpen && "rotate-45 bg-accent text-white",
                    isOpen && !isCard && "border-accent"
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pr-12 text-muted leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
