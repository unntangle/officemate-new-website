import type { Metadata } from "next";
import { Recycle, Heart, GraduationCap, ShieldCheck } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Social Responsibility",
  description: "Learn about Officemate's commitment to circular economy design, occupational health, fair labor, and ergonomic research.",
  alternates: { canonical: "/social-responsibility" },
  openGraph: {
    title: `Social Responsibility — ${SITE.name}`,
    description: "Circular economy design, occupational health, fair labor, and ergonomic research.",
    url: `${SITE.url}/social-responsibility`,
  },
};

const PILLARS = [
  {
    icon: Recycle,
    title: "Circular Design",
    description: "Our materials are chosen for their end-of-life reuse. Backrest components and base frames are designed to be easily disassembled and recycled.",
  },
  {
    icon: Heart,
    title: "Fair Operations",
    description: "We enforce safe workplace conditions and support local tooling artisans. Fair wages and healthcare support are default conditions, not options.",
  },
  {
    icon: GraduationCap,
    title: "Postural Literacy",
    description: "We work with educational institutions to share posture map data, helping teachers and students design ergonomic study rooms.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Toxins",
    description: "We source fabrics certified free of harmful chemicals and use off-gas testing to ensure zero dynamic fumes in confined workspaces.",
  },
];

export default function SocialResponsibilityPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Social Responsibility" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Sustainability & Impact</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Chairs built with consideration
          </h1>
          <p className="lede mt-6">
            We believe that a chair designed to protect the human body shouldn&rsquo;t harm the
            environment or the community that builds it. Here is how we enforce corporate responsibility.
          </p>
        </Reveal>
      </section>

      {/* Pillars Grid */}
      <section className="section">
        <div className="container grid gap-8 sm:grid-cols-2">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="flex gap-4 rounded-3xl border border-line bg-card p-8">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink leading-none">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {p.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Our Pledge section */}
      <section className="section bg-surface">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <h2 className="display text-3xl font-semibold text-ink">
              The Officemate Pledge
            </h2>
            <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
              By 2028, we pledge to source 80% of our plastics from ocean-recovered polymers,
              and maintain zero-waste assembly operations across our major domestic tooling locations.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
