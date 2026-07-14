import { STATS } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { stagger, fadeUp } from "@/lib/motion";

export function Stats() {
  return (
    <section className="border-y border-line bg-canvas">
      <div className="container py-16 md:py-20">
        <Reveal
          variants={stagger(0.1)}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <Reveal
              key={s.label}
              variants={fadeUp}
              className="text-center md:text-left"
            >
              <p className="display text-4xl font-semibold text-ink md:text-5xl">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </p>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
