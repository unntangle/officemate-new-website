import { cn } from "@/lib/utils";
import { Reveal } from "@/components/common/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-accent" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="display text-3xl font-semibold leading-[1.08] text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && <p className="lede mt-5">{description}</p>}
    </Reveal>
  );
}
