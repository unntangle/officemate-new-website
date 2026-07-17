import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Career",
  robots: { index: false, follow: true },
};

export default function CareerPage() {
  return (
    <UnderDevelopment
      title="Career"
      description="Open roles and life at Officemate — we're putting this together now."
    />
  );
}
