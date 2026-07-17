import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Contact",
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return (
    <UnderDevelopment
      title="Contact"
      description="This page is on its way. In the meantime, the Enquire button on any product reaches us directly."
    />
  );
}
