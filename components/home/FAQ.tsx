import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_FAQS } from "@/constants/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Accordion } from "@/components/common/Accordion";

export function FAQ() {
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="rounded-3xl bg-surface p-8 md:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Questions"
                title="Everything you might ask before you enquire"
                description="Can't find what you're looking for? Our team is a message away."
              />
              <Reveal delay={0.1} className="mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
                >
                  Talk to a specialist
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </Reveal>
            </div>

            <Reveal>
              <Accordion items={HOME_FAQS} variant="card" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
