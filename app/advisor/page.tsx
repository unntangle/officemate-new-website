import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/constants/site";
import { Reveal } from "@/components/common/Reveal";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { AdvisorFlow } from "@/components/advisor/AdvisorFlow";

export const metadata: Metadata = {
  title: "Officemate AI Ergonomic Advisor",
  description:
    "Answer four questions about how you work and we'll match you to the right chair, scored against the Officemate Chair Health Score.",
  alternates: { canonical: "/advisor" },
  openGraph: {
    title: `Officemate AI Ergonomic Advisor — ${SITE.name}`,
    description:
      "A digital ergonomic consultant. Four questions, then a chair matched to how you actually sit.",
    url: `${SITE.url}/advisor`,
  },
};

export default function AdvisorPage() {
  return (
    <div className="bg-surface pb-12 pt-28 md:pb-16 md:pt-32">
      <div className="container">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Ergonomic Advisor" }]}
        />

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-sage-soft px-3 py-1.5 text-xs font-semibold text-sage-ink">
            Officemate AI Ergonomic Advisor
          </span>
          <h1 className="display mt-5 text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
            Let&apos;s find your chair
          </h1>
          <p className="lede mt-5">
            Four questions about how you work. We&apos;ll weight the Chair Health
            Score against your answers and show you what actually fits.
          </p>
        </Reveal>

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="mx-auto h-64 max-w-2xl rounded-3xl bg-card shadow-soft" />
            }
          >
            <AdvisorFlow />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
