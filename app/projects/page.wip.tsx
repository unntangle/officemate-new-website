import type { Metadata } from "next";
import { FolderKanban, Users, ShieldAlert, Award } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Officemate's custom workspace setups, office layouts, and dynamic commercial seating projects across standard-setting offices.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${SITE.name}`,
    description: "Browse custom office layouts, ergonomic installations and dynamic workspaces.",
    url: `${SITE.url}/projects`,
  },
};

const PROJECTS = [
  {
    title: "Innov8 Co-working Spaces",
    location: "Bengaluru, IN",
    headcount: "450+ workstations",
    description: "Equipped collaborative lounges and standard desks with custom Mesh Task Pro chairs to ensure postural health across hours of focus.",
    tag: "Co-working",
  },
  {
    title: "Alpha Tech Headquarters",
    location: "Pune, IN",
    headcount: "1,200+ employees",
    description: "Full-floor fit-out featuring Orbit standing desks and custom-tuned ergonomic executive seating matching the brand's layout identity.",
    tag: "Corporate",
  },
  {
    title: "Hedge Mutual Offices",
    location: "Mumbai, IN",
    headcount: "180+ executive rooms",
    description: "Designed executive boardrooms and private offices with Flow Executive leather chairs and matching custom wood finish desks.",
    tag: "Financial",
  },
];

export default function ProjectsPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Portfolio</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Workspaces we&rsquo;ve transformed
          </h1>
          <p className="lede mt-6">
            From single-floor design studios to campus-wide corporate installations,
            we partner with clients to engineer seating and desks around how their
            teams actually move.
          </p>
        </Reveal>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-8 transition-all hover:border-ink/20 hover:shadow-soft">
                <div>
                  <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    {project.tag}
                  </span>
                  <h3 className="display mt-4 text-2xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {project.location} · <span className="text-accent">{project.headcount}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust & Scale stats */}
      <section className="section bg-surface">
        <div className="container">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <FolderKanban size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-ink">38+ Cities Served</h4>
                <p className="mt-2 text-sm text-muted">Active setups and client support networks across the country.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Users size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-ink">B2B Fit-out Expertise</h4>
                <p className="mt-2 text-sm text-muted">Custom adjustments, fabric options, and staggered staging delivery.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-ink">BIFMA-Tested Quality</h4>
                <p className="mt-2 text-sm text-muted">Certified layout chairs built for heavy-duty commercial usage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
