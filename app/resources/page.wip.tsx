import type { Metadata } from "next";
import { Download, FileText, LayoutTemplate, HelpCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "Resources",
  description: "Download Officemate product catalogs, user manuals, assembly instructions, and workspace layout planning assets.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: `Resources — ${SITE.name}`,
    description: "Download product catalogs, user manuals, assembly instructions, and CAD assets.",
    url: `${SITE.url}/resources`,
  },
};

const RESOURCES = [
  {
    icon: FileText,
    title: "Officemate Product Catalog 2026",
    info: "PDF · 12.4 MB",
    description: "Detailed dimensions, specifications, material choices, and colorway configurations for our full task chair and standing desk lineup.",
  },
  {
    icon: LayoutTemplate,
    title: "CAD Blocks & Revit Families",
    info: "ZIP · 42.1 MB",
    description: "Planning models for architects, designers, and project leads to integrate our workspace furniture into layout drawings.",
  },
  {
    icon: HelpCircle,
    title: "Assembly & User Guides",
    info: "PDF · 5.8 MB",
    description: "Step-by-step setup guides, adjustment directions, and ergonomic posturing instructions for all models.",
  },
  {
    icon: FileText,
    title: "Material & Care Guide",
    info: "PDF · 2.1 MB",
    description: "Instructions on how to clean, maintain, and warranty-protect your mesh, premium knit, and leather seating configurations.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="pt-28 md:pt-32">
      <section className="container">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
        <Reveal className="mt-6 max-w-3xl">
          <span className="eyebrow">Downloads</span>
          <h1 className="display mt-4 text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-6xl">
            Everything you need to plan your workspace
          </h1>
          <p className="lede mt-6">
            Access brochures, 3D assets, setup manuals, and sustainability certifications
            to configure your office layout correctly.
          </p>
        </Reveal>
      </section>

      {/* Downloads list */}
      <section className="section">
        <div className="container grid gap-6 sm:grid-cols-2">
          {RESOURCES.map((res, i) => {
            const Icon = res.icon;
            return (
              <Reveal key={res.title} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-8 hover:border-ink/20 hover:shadow-soft transition-all">
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-ink leading-tight">
                          {res.title}
                        </h3>
                        <p className="text-xs text-muted mt-1">{res.info}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted">
                      {res.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface">
                      <Download size={14} />
                      Download file
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* B2B Support section */}
      <section className="section bg-surface">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <h2 className="display text-3xl font-semibold text-ink">
              Need custom layout planning?
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Our studio team works directly with layout designers to provide bespoke CAD block sizing,
              swatch samples, and spatial configuration assistance. Reach out to our team to request custom layout help.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
