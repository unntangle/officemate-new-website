import { Armchair, MapPin, ShieldCheck, Star } from "lucide-react";
import { STATS } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { stagger, fadeUp } from "@/lib/motion";

/** Icon + pastel tile per stat, in source order. */
const DECOR = [
  { Icon: Armchair, tile: "bg-sage-soft text-sage-ink" },
  { Icon: Star, tile: "bg-honey-soft text-honey-ink" },
  { Icon: ShieldCheck, tile: "bg-sage-soft text-sage-ink" },
  { Icon: MapPin, tile: "bg-honey-soft text-honey-ink" },
];

export function Stats() {
  return (
    <section className="bg-canvas">
      <div className="container">
        <Reveal variants={stagger(0.1)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => {
            const { Icon, tile } = DECOR[i % DECOR.length];
            return (
              <Reveal
                key={s.label}
                variants={fadeUp}
                className="rounded-3xl bg-surface p-7 transition-shadow duration-300 hover:shadow-soft"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tile}`}
                >
                  <Icon size={19} />
                </span>

                <p className="mt-5 text-4xl font-bold tracking-tightest text-ink">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-1.5 text-sm font-medium text-muted">{s.label}</p>
              </Reveal>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
