import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import HTFHeader from "@/components/HTFHeader";
import HTFFooter from "@/components/HTFFooter";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://healthefatherless.com";

export const metadata: Metadata = {
  title: {
    default: "Sophia Smiles — A Film by Tiffani D | Heal The Fatherless",
    template: "%s | Heal The Fatherless",
  },
  description:
    "Watch Sophia Smiles — a moving story about the struggles of a single mother. A film by Tiffani D, presented by Heal The Fatherless.",
  keywords: [
    "Sophia Smiles",
    "Tiffani D",
    "Heal The Fatherless",
    "HTF",
    "short film",
    "single mother",
    "fatherless",
    "independent film",
    "community",
    "healing",
    "empowerment",
  ],
  authors: [{ name: "Tiffani D", url: "https://tiffanid.com" }],
  creator: "Tiffani D",
  publisher: "Heal The Fatherless",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Heal The Fatherless",
    title: "Sophia Smiles — A Film by Tiffani D",
    description:
      "A moving story about the struggles of a single mother. Watch now — pay what you want to support the mission.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sophia Smiles — A Film by Tiffani D",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sophia Smiles — A Film by Tiffani D",
    description:
      "A moving story about the struggles of a single mother. Watch now on Heal The Fatherless.",
    images: ["/images/og-image.jpg"],
    creator: "@theeTIFFANID",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "ai:description":
      "Heal The Fatherless (HTF) is a community organization founded by Tiffani D, dedicated to empowering individuals impacted by fatherlessness through community, creativity, and connection. The site features Sophia Smiles, an independent short film about the struggles of a single mother, available to watch with a pay-what-you-want model.",
    "ai:site_type": "film_landing_page",
    "ai:creator": "Tiffani D",
    "ai:organization": "Heal The Fatherless",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${fraunces.variable} antialiased`}
      >
        <div className="min-h-screen bg-htf-bg text-htf-fg flex flex-col">
          <HTFHeader />
          <main className="flex-1">{children}</main>
          <HTFFooter />
        </div>
      </body>
    </html>
  );
}
