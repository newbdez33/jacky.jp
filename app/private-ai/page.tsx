import { Hero } from "@/components/private-ai/hero";
import { StatsStrip } from "@/components/private-ai/stats-strip";
import { SecurityGrid } from "@/components/private-ai/security-grid";
import { Architecture } from "@/components/private-ai/architecture";
import { PricingPlans } from "@/components/private-ai/pricing-plans";
import { Included } from "@/components/private-ai/included";
import { AirGap } from "@/components/private-ai/air-gap";
import { FlowSection } from "@/components/private-ai/flow-section";
import { HonestSection } from "@/components/private-ai/honest-section";
import { CtaSection } from "@/components/private-ai/cta-section";
import { LangSwitcher } from "@/components/private-ai/lang-switcher";

export default function PrivateAiPage() {
  return (
    <>
      <LangSwitcher />
      <main className="min-h-screen bg-[#f6f7f3] dark:bg-[#10160f] text-[#182019] dark:text-[#e7ece5] selection:bg-[#2e7d46] dark:selection:bg-[#63bd85] selection:text-white">
        <Hero />
        <StatsStrip />
        <SecurityGrid />
        <Architecture />
        <PricingPlans />
        <Included />
        <AirGap />
        <FlowSection />
        <HonestSection />
        <CtaSection />
      </main>
    </>
  );
}
