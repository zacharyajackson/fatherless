import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Sophia Smiles",
  description:
    "Support the film — pay what you want to watch Sophia Smiles, a moving story about the struggles of a single mother by Tiffani D.",
};

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
