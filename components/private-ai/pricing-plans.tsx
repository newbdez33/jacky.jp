"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

const plans = [
  {
    id: "s",
    name: "PLAN S",
    scaleKey: "pSscale" as const,
    modelKey: "pSmodel" as const,
    initKey: "pSinit" as const,
    price: "¥69,800",
    features: ["pS1", "pS2", "pS3", "pS4"] as const,
    featured: false,
  },
  {
    id: "m",
    name: "PLAN M",
    scaleKey: "pMscale" as const,
    modelKey: "pMmodel" as const,
    initKey: "pMinit" as const,
    price: "¥125,000",
    features: ["pM1", "pM2", "pM3", "pM4"] as const,
    featured: true,
  },
  {
    id: "l",
    name: "PLAN L",
    scaleKey: "pLscale" as const,
    modelKey: "pLmodel" as const,
    initKey: "pLinit" as const,
    price: "¥260,000",
    features: ["pL1", "pL2", "pL3", "pL4"] as const,
    featured: false,
  },
];

export function PricingPlans() {
  const { t } = usePrivateAiI18n();

  return (
    <section id="plans" className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">Pricing</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.plansH2}</h2>
        <p className="text-[#4b564d] dark:text-[#a9b4a7] max-w-[44em]">{t.plansLead}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-[#ffffff] dark:bg-[#1a221a] border rounded-xl p-[30px_28px] flex flex-col relative transition-transform hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(20,30,22,0.12)] ${
                plan.featured
                  ? "border-2 border-[#2e7d46] dark:border-[#63bd85]"
                  : "border border-[#dee3dc] dark:border-[#2b352b]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-[26px] bg-[#2e7d46] dark:bg-[#63bd85] text-white dark:text-[#0f1a14] text-[11.5px] font-bold px-3.5 py-[3px] rounded-sm tracking-[0.1em]">
                  {t.reco}
                </div>
              )}
              <div className="text-[13px] font-bold tracking-[0.14em] text-[#7e897f] dark:text-[#78847a]">{plan.name}</div>
              <div className="font-serif text-[21px] font-bold mt-1 mb-0.5">{t[plan.scaleKey]}</div>
              <div className="self-start bg-[#e7f1e9] dark:bg-[#22331f] text-[#2e7d46] dark:text-[#63bd85] text-[12.5px] font-bold px-3 py-1 rounded mt-2.5 mb-3.5">
                {t[plan.modelKey]}
              </div>
              <div className="text-[34px] font-extrabold tabular-nums tracking-tight">
                {plan.price}<small className="text-[13px] font-medium text-[#7e897f] dark:text-[#78847a]">{t.priceSuffix}</small>
              </div>
              <div className="text-[13px] text-[#4b564d] dark:text-[#a9b4a7] mb-3.5">{t[plan.initKey]}</div>
              <ul className="m-0 pt-3.5 list-none border-t border-[#dee3dc] dark:border-[#2b352b] text-[13.5px] text-[#4b564d] dark:text-[#a9b4a7] space-y-1">
                {plan.features.map((fk) => (
                  <li key={fk} className="pl-[22px] relative before:content-['✓'] before:absolute before:left-[2px] before:text-[#2e7d46] dark:before:text-[#63bd85] before:font-bold">
                    {t[fk]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-[12.5px] text-[#7e897f] dark:text-[#78847a] mt-3.5">{t.taxnote}</p>
      </div>
    </section>
  );
}
