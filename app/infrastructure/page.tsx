import type { Metadata } from "next";
import { Factory, Cpu, ShieldCheck, Truck } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "Explore Officemate's state-of-the-art manufacturing plants, precision testing labs, and distribution infrastructure setup.",
  alternates: { canonical: "/infrastructure" },
  openGraph: {
    title: `Infrastructure — ${SITE.name}`,
    description: "State-of-the-art manufacturing plants, precision testing labs, and distribution setups.",
    url: `${SITE.url}/infrastructure`,
  },
};

const FACILITIES = [
  {
    icon: Factory,
    title: "Precision Tooling Plant",
    detail: "Bengaluru hub",
    description: "Our primary facility houses CNC robotic routers and high-pressure polyurethane foaming lines to shape our signature ergonomic contours.",
  },
  {
    icon: Cpu,
    title: "Mechanism Development Center",
    detail: "R&D lab",
    description: "Where our tension-adjusting tilt mechanisms are milled and dynamic weight-responsive recline springs undergo stress-cycling tests.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Testing Lab",
    detail: "BIFMA certified",
    description: "Chassis and backrests are subjected to 120,000 continuous cycle impact tests to ensure a decade of fail-safe performance.",
  },
  {
    icon: Truck,
    title: "Fulfilment Networks",
    detail: "Across 4 regions",
    description: "Strategically located logistics hubs in West, South, North and East India ensure standard flat-packed orders arrive damage-free.",
  },
];

export default function InfrastructurePage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Infrastructure" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Manufacturing & Tech</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Built for heavy-duty daily performance
          </h1>
          <p className="lede mt-6">
            We don&rsquo;t outsource the quality. Our factories combine precision robotics,
            hand-wrapped upholstery, and rigorous load-testing labs to ensure every unit
            performs like day one.
          </p>
        </Reveal>
      </section>

      {/* Facilities Grid */}
      <section className="section">
        <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FACILITIES.map((fac, i) => {
            const Icon = fac.icon;
            return (
              <Reveal key={fac.title} delay={i * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-6 transition-all hover:border-ink/20">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <h3 className="display mt-6 text-xl font-semibold text-ink">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-accent mt-1">{fac.detail}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {fac.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Manufacturing Standards Banner */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="display text-3xl font-semibold text-ink">
                Our tooling standards
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                By investing in in-house aluminium die-casting molds and proprietary tooling machinery,
                we avoid relying on off-the-shelf plastic brackets. This guarantees structural integrity
                at every pivot point and adjustment arm on our chairs.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display text-3xl font-semibold text-ink">
                Eco-conscious operations
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Our plant runs on 60% solar power offset, and all scrap metal shavings are recycled
                directly back into casting. We pack products in compact flat-packs to minimize carbon
                overhead during distribution routing.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
