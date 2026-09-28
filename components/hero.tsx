"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n-context";

export function Hero() {
  const { t, language } = useLanguage();
  // CJK glyphs fill the full em box, so the Japanese intro reads larger than
  // the English one at the same size. Step it down one notch and loosen the
  // line-height to match.
  const isJa = language === "ja";

  return (
    <section className="flex flex-col px-4 md:px-0 pb-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {t.hero.greeting} <span className="inline-block hover:animate-wave origin-bottom-right">👋</span>
          </h1>
          
          <p
            className={cn(
              "text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100",
              isJa ? "text-base leading-relaxed md:text-lg" : "text-lg md:text-xl"
            )}
          >
            {t.hero.description.part1}
            <span className="text-foreground">{t.hero.description.role}</span>
            {t.hero.description.part2}
            <span className="text-foreground">{t.hero.description.location}</span>
            {t.hero.description.part3}
            <span className="text-foreground">{t.hero.description.ai}</span>
            {t.hero.description.comma1}
            <span className="text-foreground">{t.hero.description.blockchain}</span>
            {t.hero.description.comma2}
            <span className="text-foreground">{t.hero.description.tradingBot}</span>
            {t.hero.description.part4}
          </p>
        </div>
      </div>
    </section>
  );
}
