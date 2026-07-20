"use client";

import { cn } from "@/lib/utils";
import { useProductColor } from "@/components/products/ColorProvider";

/**
 * Colour swatches for the buy column. Selecting one updates the shared
 * ColorProvider state, which the gallery reads to swap its photography.
 */
export function ColorPicker() {
  const { colors, active, setActive } = useProductColor();

  return (
    <div className="mt-6 rounded-2xl border border-line p-4">
      <p className="text-sm text-muted">
        Colour: <span className="font-semibold text-ink">{active.name}</span>
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Colour">
        {colors.map((c) => {
          const selected = c.name === active.name;
          return (
            <button
              key={c.name}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={c.name}
              title={c.name}
              onClick={() => setActive(c)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition",
                selected
                  ? "ring-2 ring-accent"
                  : "ring-1 ring-line hover:ring-ink/40"
              )}
            >
              <span
                className="h-8 w-8 rounded-full"
                style={{ backgroundColor: c.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
