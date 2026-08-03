"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function FlowSection() {
  const { t } = usePrivateAiI18n();

  const steps = [
    { h: t.fl1h, p: t.fl1p },
    { h: t.fl2h, p: t.fl2p },
    { h: t.fl3h, p: t.fl3p },
    { h: t.fl4h, p: t.fl4p },
  ];

  return (
    <section className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">Flow</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.flowH2}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-9">
          {steps.map((step, i) => (
            <div key={i} className="bg-[#ffffff] dark:bg-[#1a221a] border border-[#dee3dc] dark:border-[#2b352b] rounded-lg p-[22px_22px_18px]">
              <div className="font-mono text-[13px] font-bold text-[#b98a2e] tracking-[0.1em] mb-2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-[15px] font-semibold mb-1">{step.h}</h3>
              <p className="text-[13px] text-[#4b564d] dark:text-[#a9b4a7] m-0">{step.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
