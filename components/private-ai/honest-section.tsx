"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function HonestSection() {
  const { t } = usePrivateAiI18n();

  return (
    <section className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">Fair Expectations</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.honH2}</h2>
        <div className="bg-[#e7f1e9] dark:bg-[#22331f] rounded-xl p-[26px_30px] text-[14px] text-[#4b564d] dark:text-[#a9b4a7] space-y-3">
          <p dangerouslySetInnerHTML={{ __html: t.honP1 }} />
          <p style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: t.honP2 }} />
        </div>
      </div>
    </section>
  );
}
