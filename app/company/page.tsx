import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Company",
  robots: { index: false, follow: true },
};

export default function CompanyPage() {
  return (
    <UnderDevelopment
      title="Company"
      description="Who we are and what we build — this section is on its way."
    />
  );
}
