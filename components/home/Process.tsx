import { PROCESS } from "@/constants/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { stagger, fadeUp } from "@/lib/motion";

export function Process() {
  return (
    <section className="section bg-surface">
      <div className="container">
        <SectionHeading
          eyebrow="How we build"
          title="Four steps from posture study to your desk"
          description="The order matters — we let the body set the brief before a single line is drawn."
        />

        <Reveal
          variants={stagger(0.1)}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {PROCESS.map((step) => (
            <Reveal
              key={step.step}
              variants={fadeUp}
              className="bg-canvas p-7"
            >
              <span className="display text-sm font-semibold text-accent">
                {step.step}
              </span>
              <h3 className="display mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
