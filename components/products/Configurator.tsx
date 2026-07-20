"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
}
interface Group {
  name: string;
  options: Option[];
}

/* Configuration groups. Presentational for now — the selections don't yet
   feed the enquiry, but the structure is ready for it. */
const GROUPS: Group[] = [
  {
    name: "Back",
    options: [{ label: "High Back" }, { label: "Medium Back" }],
  },
  {
    name: "Armrest",
    options: [
      { label: "Fixed Arms" },
      { label: "2D Adjustable Arms" },
      { label: "3D Adjustable Arms" },
      { label: "4D Adjustable Arms" },
    ],
  },
  {
    name: "Base",
    options: [
      { label: "Nylon Base" },
      { label: "Aluminium Base" },
      { label: "Polished Aluminium Base" },
    ],
  },
];

export function Configurator() {
  const [open, setOpen] = useState(0);
  const [selected, setSelected] = useState<number[]>(GROUPS.map(() => 0));

  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-line">
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm text-muted">Configurator</p>
      </div>

      <div className="divide-y divide-line">
        {GROUPS.map((group, gi) => {
          const isOpen = open === gi;
          const selIdx = selected[gi];
          return (
            <div key={group.name}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : gi)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/50"
              >
                <span className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-muted">
                    {gi + 1}
                  </span>
                  <span className="text-base font-semibold text-ink">
                    {group.name}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm text-muted">
                  <span className="max-w-[11rem] truncate text-right">
                    {group.options[selIdx].label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-2.5 px-4 pb-4 sm:grid-cols-3">
                      {group.options.map((opt, oi) => {
                        const isSel = oi === selIdx;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setSelected((s) =>
                                s.map((v, i) => (i === gi ? oi : v))
                              )
                            }
                            className={cn(
                              "flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-colors",
                              isSel
                                ? "border-ink"
                                : "border-line hover:border-ink/40"
                            )}
                          >
                            <span className="text-xs font-medium leading-snug text-ink">
                              {opt.label}
                            </span>
                            {isSel && (
                              <span className="rounded-full bg-ink px-3 py-1 text-[0.62rem] font-semibold text-white">
                                Selected
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
