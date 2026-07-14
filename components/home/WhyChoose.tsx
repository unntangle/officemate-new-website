import { Compass, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { WHY_CHOOSE } from "@/constants/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { stagger, fadeUp } from "@/lib/motion";

const icons = [Compass, Layers, ShieldCheck, Sparkles];

export function WhyChoose() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Officemate"
            title="Comfort you can measure, quality you can feel"
            description="We're a small studio obsessed with one thing: making the object you sit in for eight hours a day genuinely good for you."
          />

          <Reveal
            variants={stagger(0.08)}
            className="grid gap-x-10 gap-y-10 sm:grid-cols-2"
          >
            {WHY_CHOOSE.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={item.title} variants={fadeUp} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
