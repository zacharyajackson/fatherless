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

export const metadata: Metadata = {
  title: "Heal The Fatherless | Sophia Smiles — A Film by Tiffani D",
  description:
    "A moving story about the struggles of a single mother. Watch now on Heal The Fatherless.",
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
