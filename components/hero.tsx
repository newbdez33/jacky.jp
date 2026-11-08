"use client";

import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { advisoryCopy } from "@/lib/advisory-copy";
import { useLanguage } from "@/lib/i18n-context";

export function Hero() {
  const { language } = useLanguage();
  const copy = advisoryCopy[language];

  return (
    <section className="flex flex-col px-4 pb-10 md:px-0 md:pb-12" aria-labelledby="advisory-heading">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="text-sm tracking-[0.08em] text-muted-foreground">{copy.eyebrow}</p>
          <LanguageSwitcher />
        </div>

        <div className="flex flex-col items-start gap-4 min-[360px]:flex-row min-[360px]:items-center sm:gap-6">
          <Image src="/images/jacky-avatar.webp" alt="Jacky" width={96} height={96} loading="eager" className="size-16 shrink-0 rounded-full border border-white/20 object-contain p-1 sm:size-24" />
          <h1 id="advisory-heading" className="min-w-0 text-[32px] font-bold leading-[1.25] tracking-tighter sm:text-4xl md:text-5xl">
            <span className="block">{copy.title[0]}</span>
            <span className="block text-muted-foreground">{copy.title[1]}</span>
          </h1>
        </div>
        <p className="mt-6 text-base leading-[1.8] text-muted-foreground md:text-lg">
          {copy.description}
        </p>
        <p className="mt-4 text-base leading-[1.8] text-muted-foreground md:text-lg">
          {copy.motivation}
        </p>

        <div className="mt-10 border-t border-white/10 pt-7">
          <h2 className="text-xl font-semibold tracking-tight">{copy.experienceTitle}</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9">
            {copy.experience.map(item => (
              <article key={item.label}>
                <h3 className="text-2xl font-semibold tracking-tight">{item.label}</h3>
                <p className="mt-2 text-base font-medium">{item.title}</p>
                <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
