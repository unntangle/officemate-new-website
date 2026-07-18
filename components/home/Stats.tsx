import { STATS } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { AnimatedCounter } from "@/components/common/AnimatedCounter";
import { stagger, fadeUp } from "@/lib/motion";

/**
 * A real Unsplash photograph behind each stat, chosen to match its title:
 * chairs → shipped, five stars → rating, handshake → warranty, skyline → cities.
 * All are free under the Unsplash License. Reorder to change the pairing.
 *
 * These are hotlinked from Unsplash's CDN so they work without touching
 * next.config. To self-host later, download each and drop it in /public/images.
 */
const IMAGES = [
  // Chairs shipped — stacked chairs (Photo: ObjectType RAW / Unsplash)
  "https://images.unsplash.com/photo-1748975026870-1f7041b9c8d1?auto=format&fit=crop&w=1000&q=80",
  // Average rating — five stars (Photo: Towfiqu barbhuiya / Unsplash)
  "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&w=1000&q=80",
  // Warranty — handshake / deal (Photo: Ambre Estève / Unsplash)
  "https://images.unsplash.com/photo-1752159684779-0639174cdfac?auto=format&fit=crop&w=1000&q=80",
  // Cities served — city skyline (Photo: JC Gellidon / Unsplash)
  "https://images.unsplash.com/photo-1526731955462-f6085f39e742?auto=format&fit=crop&w=1000&q=80",
];

export function Stats() {
  return (
    <section className="bg-canvas">
      <div className="container">
        <Reveal
          variants={stagger(0.1)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              variants={fadeUp}
              className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-3xl p-7 shadow-soft"
            >
              {/* Real photo background, matched to the stat */}
              <img
                src={IMAGES[i % IMAGES.length]}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient keeps the numbers legible over any photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />

              {/* Numbers sit above the image */}
              <div className="relative">
                <p className="text-4xl font-bold tracking-tightest text-white">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-1.5 text-sm font-medium text-white/85">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
