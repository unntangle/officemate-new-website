import type { Metadata } from "next";
import { UnderDevelopment } from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false, follow: true },
};

export default function ProjectsPage() {
  return (
    <UnderDevelopment
      title="Projects"
      description="Workspaces we've delivered — the case studies are coming shortly."
    />
  );
}
