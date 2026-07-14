import type { Metadata } from "next";
import { Target, Eye, Award, Check } from "lucide-react";
import { VALUES, TIMELINE, ACHIEVEMENTS, SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Stats } from "@/components/home/Stats";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Officemate is a small studio obsessed with one thing — making the object you sit in for eight hours a day genuinely good for you. Meet the team, the mission and the milestones.",
  alternates: { canonical: "/company" },
  openGraph: {
    title: `Company — ${SITE.name}`,
    description:
      "A small studio building ergonomic seating and workspaces around how the body actually moves.",
    url: `${SITE.url}/company`,
  },
};

export default function CompanyPage() {
  return (
    <div className="pt-28 md:pt-32">
      {/* Hero */}
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Company" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Our story</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            We build chairs the body agrees with
          </h1>
          <p className="lede mt-6">
            Officemate started with a simple frustration: the objects we sit in all day
            are designed to be looked at, not lived in. So we set out to fix the
            office chair from the inside out — starting with posture data, not mood
            boards.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              In 2016, two engineers borrowed a pressure mat and spent a month
              measuring what happens to the spine over an eight-hour day. What they
              found became the brief for everything Officemate makes: support has to be
              continuous, movement has to be effortless, and nothing should demand
              your attention while you work.
            </p>
            <p>
              A decade later we&apos;re still a small studio — deliberately so. We
              would rather make a tight range of things we&apos;re proud of than a
              catalogue we can&apos;t stand behind. Every chair and desk that carries
              our name has been lived in for weeks before it ships.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-surface p-8">
              <p className="display text-xl font-medium leading-snug text-ink">
                &ldquo;If an adjustment doesn&apos;t earn its place, it doesn&apos;t
                make the chair.&rdquo;
              </p>
              <p className="mt-4 text-sm text-muted">— The Officemate design principle</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Mission + Vision */}
      <section className="section">
        <div className="container grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-card p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Target size={22} />
              </div>
              <h2 className="display mt-6 text-2xl font-semibold text-ink">
                Our mission
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                To make ergonomic support the default, not the upgrade — so that
                sitting well for a full working day is something everyone can afford
                and feel, not a luxury reserved for the corner office.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-line bg-card p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Eye size={22} />
              </div>
              <h2 className="display mt-6 text-2xl font-semibold text-ink">
                Our vision
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                A workspace that moves with people instead of against them — where
                every seat, surface and accessory is engineered around the body, and
                good posture is something you never have to think about.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four principles behind every product"
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex gap-4">
                  <span className="display text-lg font-semibold text-accent">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="The journey" title="Ten years, measured in millimetres" />
          <div className="mt-12 border-l border-line pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.6rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-canvas">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="display text-sm font-semibold text-accent">
                    {t.year}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold text-ink">{t.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose (reused) */}
      <WhyChoose />

      {/* Achievements */}
      <section className="section bg-surface">
        <div className="container">
          <SectionHeading
            eyebrow="Recognition"
            title="A few things we&rsquo;re proud of"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Award size={18} />
                  </span>
                  <span className="font-medium text-ink">{a}</span>
                  <Check size={18} className="ml-auto shrink-0 text-accent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
