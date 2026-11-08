"use client";

import { advisoryCopy } from "@/lib/advisory-copy";
import { useLanguage } from "@/lib/i18n-context";
import { supportCopy } from "@/lib/support-copy";

export function SupportTerms() {
  const { language } = useLanguage();
  const shared = supportCopy[language];
  const copy = shared.terms;
  const advisory = advisoryCopy[language];

  return (
    <>
      <p className="text-sm tracking-wide text-muted-foreground">{shared.preview}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{copy.title}</h1>
      <p className="mt-4 text-base leading-[1.8] text-muted-foreground">{copy.introduction}</p>

      <section aria-labelledby="support-pricing-heading" className="mt-9">
        <h2 id="support-pricing-heading" className="text-xl font-semibold tracking-tight">{copy.pricing}</h2>
        <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {[[copy.monthly, "¥12,999", advisory.monthUnit], [copy.yearly, "¥129,999", advisory.yearUnit], [copy.session, "¥10,000", advisory.sessionUnit]].map(([name, price, unit]) => (
            <div key={name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 py-4">
              <dt className="text-base">{name}</dt>
              <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><strong className="text-xl font-semibold tracking-tight tabular-nums">{price}</strong><span className="text-sm text-muted-foreground">{unit}</span></dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">{copy.paymentNote}</p>
      </section>

      <section aria-labelledby="support-scope-heading" className="mt-10">
        <h2 id="support-scope-heading" className="text-xl font-semibold tracking-tight">{copy.scope}</h2>
        <dl className="mt-6 space-y-6 text-base leading-[1.8]">
          {[...advisory.rules, [copy.languagesTitle, copy.languages]].map(([title, description]) => (
            <div key={title}><dt className="font-medium">{title}</dt><dd className="mt-1 text-muted-foreground">{description}</dd></div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="annual-refund-heading" className="mt-10 rounded-xl border border-white/15 bg-white/[0.035] p-5 sm:p-7">
        <h2 id="annual-refund-heading" className="text-xl font-semibold tracking-tight">{copy.annualTitle}</h2>
        <p className="mt-3 text-base leading-[1.8] text-muted-foreground">{copy.annualDescription}</p>
        <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-[1.8]">{copy.annualFormula}</p>
      </section>

      <section aria-labelledby="draft-terms-heading" className="mt-10 border-t border-dashed border-white/20 pt-8">
        <h2 id="draft-terms-heading" className="text-xl font-semibold tracking-tight">{copy.draftTitle}</h2>
        <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{copy.draftNote}</p>
        <dl className="mt-6 space-y-6 text-base leading-[1.8]">
          {copy.draftRules.map(([title, description]) => (
            <div key={title}><dt className="font-medium">{title}</dt><dd className="mt-1 text-muted-foreground">{description}</dd></div>
          ))}
        </dl>
        <p className="mt-7 text-sm leading-[1.8] text-muted-foreground">{copy.disclosure}</p>
      </section>

    </>
  );
}
