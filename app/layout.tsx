import type { Metadata } from "next";

import "./globals.css";
import { SITE } from "@/constants/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquiryProvider } from "@/components/common/EnquiryProvider";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { BackToTop } from "@/components/common/BackToTop";



export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Work Ergonomics`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "ergonomic chair",
    "office chair",
    "standing desk",
    "lumbar support",
    "workspace",
    "Officemate",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  /* Served straight from /public rather than the app/icon.png convention, so
     the asset stays where the rest of the imagery lives. `apple` is the
     home-screen icon on iOS, which ignores the standard rel="icon". */
  icons: {
    icon: "/images/fav-icon.png",
    shortcut: "/images/fav-icon.png",
    apple: "/images/fav-icon.png",
  },
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <EnquiryProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
        </EnquiryProvider>
      </body>
    </html>
  );
}
