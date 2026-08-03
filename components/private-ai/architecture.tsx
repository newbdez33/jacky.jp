"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function Architecture() {
  const { t } = usePrivateAiI18n();

  const benefits = [
    { h: t.archB1h, p: t.archB1p },
    { h: t.archB2h, p: t.archB2p },
    { h: t.archB3h, p: t.archB3p },
  ];

  return (
    <section className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">Architecture</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.archH2}</h2>
        <p className="text-[#4b564d] dark:text-[#a9b4a7] max-w-[44em]">{t.archLead}</p>

        {/* Architecture diagram */}
        <div className="flex gap-3.5 items-stretch my-9 flex-wrap">
          <div className="bg-[#ffffff] dark:bg-[#1a221a] border border-[#dee3dc] dark:border-[#2b352b] rounded-lg p-[22px_24px] flex-1 min-w-[240px]">
            <h3 className="text-[15.5px] font-semibold mb-1.5">{t.archN1h}</h3>
            <p className="text-[13.5px] text-[#4b564d] dark:text-[#a9b4a7] m-0">{t.archN1p}</p>
          </div>
          <div className="flex flex-col justify-center items-center min-w-[170px] gap-1.5 px-1.5 max-sm:min-w-full">
            <span className="text-[28px] text-[#b98a2e] leading-none max-sm:rotate-90">⟶</span>
            <span className="text-[11.5px] text-[#7e897f] dark:text-[#78847a] text-center tracking-[0.04em]">{t.archArrow}</span>
          </div>
          <div className="bg-[#ffffff] dark:bg-[#1a221a] border-2 border-[#2e7d46] dark:border-[#63bd85] rounded-lg p-[22px_24px] flex-1 min-w-[240px]">
            <h3 className="text-[15.5px] font-semibold mb-1.5">{t.archN2h}</h3>
            <p className="text-[13.5px] text-[#4b564d] dark:text-[#a9b4a7] m-0">{t.archN2p}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="bg-[#ffffff] dark:bg-[#1a221a] border border-[#dee3dc] dark:border-[#2b352b] rounded-lg p-[22px_24px]">
              <h3 className="text-[15.5px] font-semibold mb-1.5">{b.h}</h3>
              <p className="text-[13.5px] text-[#4b564d] dark:text-[#a9b4a7] m-0">{b.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
