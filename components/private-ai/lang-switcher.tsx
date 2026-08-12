"use client";

import { usePrivateAiI18n, type PrivateAiLang } from "@/lib/private-ai-i18n";

const langs: { code: PrivateAiLang; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" },
];

export function LangSwitcher() {
  const { lang, setLang } = usePrivateAiI18n();

  return (
    <div
      className="fixed top-3.5 right-4 z-50 flex gap-0.5 bg-[rgba(10,18,13,0.82)] border border-[#27392d] rounded-md p-[3px] backdrop-blur-sm"
      role="group"
      aria-label="Language"
    >
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          className={`border-0 cursor-pointer font-bold text-[12px] leading-none px-3 py-[7px] rounded-sm tracking-[0.04em] transition-all ${
            lang === l.code
              ? "bg-[#2e7d46] dark:bg-[#63bd85] text-white dark:text-[#0f1a14]"
              : "bg-transparent text-[#9fae9f] hover:text-[#e9efe8]"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
