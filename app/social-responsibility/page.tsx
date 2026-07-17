import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Social responsibility",
  robots: { index: false, follow: true },
};

export default function SocialResponsibilityPage() {
  return (
    <UnderDevelopment
      title="Social responsibility"
      description="How we work with our people, partners and planet — coming shortly."
    />
  );
}
