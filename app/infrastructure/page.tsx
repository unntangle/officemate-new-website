import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Infrastructure",
  robots: { index: false, follow: true },
};

export default function InfrastructurePage() {
  return (
    <UnderDevelopment
      title="Infrastructure"
      description="Our manufacturing and facilities — this section is being built."
    />
  );
}
