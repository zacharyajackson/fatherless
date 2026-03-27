import type { Metadata } from "next";
import HTFHeader from "@/components/HTFHeader";
import HeroBanner from "@/components/HeroBanner";
import HTFFooter from "@/components/HTFFooter";

export const metadata: Metadata = {
  title: "Heal The Fatherless | Community, Healing, Empowerment",
  description:
    "Empowering individuals impacted by fatherlessness through community, creativity, and connection.",
};

export default function HTFPage() {
  return (
    <div className="min-h-screen bg-cream text-brown">
      <HTFHeader />
      <main>
        <HeroBanner />
        {/* Wave divider */}
        <div className="relative -mt-1">
          <svg className="w-full h-12 text-cream" viewBox="0 0 1440 48" preserveAspectRatio="none" fill="currentColor">
            <path d="M0 48h1440V0c-240 32-480 48-720 32S240 16 0 48z" />
          </svg>
        </div>
      </main>
      <HTFFooter />
    </div>
  );
}
