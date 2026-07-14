import Link from "next/link";
import { HOME_FAQS } from "@/constants/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Accordion } from "@/components/common/Accordion";

export function FAQ() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="Everything you might ask before you enquire"
              description="Can't find what you're looking for? Our team is a message away."
            />
            <Reveal
              delay={0.1}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              <Link href="/contact" className="group inline-flex items-center gap-2">
                Talk to a specialist
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <Accordion items={HOME_FAQS} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
