import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "About",
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <UnderDevelopment
      title="About"
      description="Our story, our people and how we got here — coming shortly."
    />
  );
}
