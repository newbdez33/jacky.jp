"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function Included() {
  const { t } = usePrivateAiI18n();

  const items = [
    { h: t.inc1h, p: t.inc1p },
    { h: t.inc2h, p: t.inc2p },
    { h: t.inc3h, p: t.inc3p },
    { h: t.inc4h, p: t.inc4p },
    { h: t.inc5h, p: t.inc5p },
    { h: t.inc6h, p: t.inc6p },
  ];

  return (
    <section className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">All-Inclusive</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.incH2}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-9">
          {items.map((item, i) => (
            <div key={i} className="bg-[#ffffff] dark:bg-[#1a221a] border border-[#dee3dc] dark:border-[#2b352b] rounded-lg p-[22px_24px]">
              <h3 className="text-[15.5px] font-semibold mb-1.5">{item.h}</h3>
              <p className="text-[13.5px] text-[#4b564d] dark:text-[#a9b4a7] m-0">{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
