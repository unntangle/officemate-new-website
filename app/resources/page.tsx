import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: true },
};

export default function ResourcesPage() {
  return (
    <UnderDevelopment
      title="Resources"
      description="Guides, brochures and downloads — we're assembling these now."
    />
  );
}
