import type { Metadata } from "next";
import { Briefcase, Sparkles, Users, Heart } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Join Officemate — explore open positions in design engineering, product development, operations and marketing at a studio obsessed with ergonomic excellence.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: `Career — ${SITE.name}`,
    description:
      "Explore open positions in design engineering, product development, operations and marketing.",
    url: `${SITE.url}/career`,
  },
};

const PERKS = [
  {
    icon: Sparkles,
    title: "Build what matters",
    description:
      "Work on products used by thousands of people every day — where a millimetre of adjustment makes a real difference.",
  },
  {
    icon: Users,
    title: "Small team, big impact",
    description:
      "No layers of approval. Everyone ships, everyone owns, and everyone has a voice in the design review.",
  },
  {
    icon: Heart,
    title: "Wellbeing first",
    description:
      "Flexible hours, comprehensive health cover, and — naturally — the best ergonomic setup you've ever sat in.",
  },
];

const OPENINGS = [
  {
    role: "Senior Product Designer",
    team: "Design Studio",
    location: "Bengaluru, IN",
    type: "Full-time",
  },
  {
    role: "Mechanical Engineer — Mechanisms",
    team: "R&D",
    location: "Bengaluru, IN",
    type: "Full-time",
  },
  {
    role: "Operations Manager",
    team: "Supply Chain",
    location: "Pune, IN",
    type: "Full-time",
  },
  {
    role: "Digital Marketing Lead",
    team: "Growth",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareerPage() {
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <section className="container">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Career" }]}
        />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Join us</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Help us fix the office chair — for good
          </h1>
          <p className="lede mt-6">
            We&rsquo;re a tight-knit studio of engineers, designers and
            operators who believe that the thing you sit in for eight hours
            a day deserves obsessive attention. If that sounds like your kind
            of problem, we&rsquo;d love to talk.
          </p>
        </Reveal>
      </section>

      {/* Perks */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why work here"
            title="What you get besides a great chair"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <Reveal key={perk.title} delay={i * 0.06}>
                  <div className="rounded-3xl border border-line bg-card p-8 transition-all hover:border-ink/20">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-ink">
                      {perk.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {perk.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Open roles"
            title="Current openings"
          />
          <div className="mt-10 grid gap-4">
            {OPENINGS.map((job, i) => (
              <Reveal key={job.role} delay={i * 0.04}>
                <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between transition-all hover:border-ink/20 hover:shadow-soft">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.team} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                      {job.type}
                    </span>
                    <span className="flex h-9 items-center rounded-full border border-line px-4 text-xs font-semibold text-ink transition-colors hover:bg-accent hover:text-white hover:border-accent cursor-pointer">
                      Apply
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spontaneous application note */}
      <section className="section">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Briefcase size={22} />
              </div>
            </div>
            <h2 className="display mt-6 text-3xl font-semibold text-ink">
              Don&rsquo;t see your role?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted leading-relaxed">
              We&rsquo;re always interested in meeting talented people. Send
              your portfolio or CV to{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-accent hover:underline"
              >
                {SITE.email}
              </a>{" "}
              and tell us what excites you about ergonomic design.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
