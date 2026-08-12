"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function CtaSection() {
  const { t } = usePrivateAiI18n();

  return (
    <>
      <div className="bg-[#0f1a14] text-[#e9efe8] text-center px-6 py-[76px]">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-[clamp(24px,3.4vw,32px)]">{t.ctaH2}</h2>
          <p className="text-[#9fae9f] max-w-[40em] mx-auto mt-3.5 mb-8">{t.ctaP}</p>
          <a
            href="mailto:newbdez33@gmail.com?subject=Private%20AI%20PoC"
            className="inline-block px-[30px] py-3 rounded font-bold text-sm bg-[#d8a851] text-[#231a06] hover:brightness-110 transition-all"
          >
            {t.ctaBtn}
          </a>
        </div>
      </div>
      <div className="bg-[#0f1a14] text-[#9fae9f] text-xs text-center pb-10 px-6">
        <div className="max-w-5xl mx-auto border-t border-[#27392d] pt-6" dangerouslySetInnerHTML={{ __html: t.foot }} />
      </div>
    </>
  );
}
