"use client";

import { useLanguage } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
] as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="ml-auto flex shrink-0 items-center gap-3 text-sm" role="group" aria-label="Language">
      {languages.map(({ code, label }) => (
        <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={language === code} className={cn("rounded-sm py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring", language === code ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
          {label}
        </button>
      ))}
    </div>
  );
}
