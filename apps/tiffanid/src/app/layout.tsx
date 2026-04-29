import type { Metadata } from "next";
import { Syne, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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

const siteUrl = "https://tiffanid.com";

export const metadata: Metadata = {
  title: {
    default: "TIFFANI D | Actor | Rapper | Storyteller",
    template: "%s | TIFFANI D",
  },
  description:
    "Official website for TIFFANI D — actor, rapper, storyteller, and founder of Heal The Fatherless. Stream music, watch videos, and connect.",
  keywords: [
    "Tiffani D",
    "rapper",
    "actor",
    "storyteller",
    "hip hop",
    "Heal The Fatherless",
    "Sophia Smiles",
    "independent artist",
    "Charlotte",
    "music",
    "film",
  ],
  authors: [{ name: "Tiffani D", url: siteUrl }],
  creator: "Tiffani D",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "TIFFANI D",
    title: "TIFFANI D — Actor, Rapper, Storyteller",
    description:
      "Stream music, watch videos, and connect with TIFFANI D — actor, rapper, storyteller, and founder of Heal The Fatherless.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TIFFANI D — Actor, Rapper, Storyteller",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TIFFANI D — Actor, Rapper, Storyteller",
    description:
      "Stream music, watch videos, and connect with TIFFANI D.",
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
      "TIFFANI D is a versatile artist — actor, rapper, and storyteller — known for empowering lyrics born from resilience. She is the founder of Heal The Fatherless, a community organization empowering individuals impacted by fatherlessness. Her music is available on Spotify and Apple Music. She directed the short film Sophia Smiles.",
    "ai:site_type": "artist_portfolio",
    "ai:creator": "Tiffani D",
    "ai:platforms": "Spotify, Apple Music, YouTube, Instagram, Facebook, X",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
