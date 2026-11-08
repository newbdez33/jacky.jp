"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Code2, Layers3, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactMethods } from "@/components/contact-methods";
import { advisoryCopy } from "@/lib/advisory-copy";
import { getAdvisoryPricing } from "@/lib/advisory-pricing";
import { useLanguage } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

export function AdvisoryPlans() {
  const { language } = useLanguage();
  const copy = advisoryCopy[language];
  const pricing = getAdvisoryPricing(language);
  const [annual, setAnnual] = useState(false);
  const [contact, setContact] = useState<"subscription" | "session" | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const price = annual ? pricing.yearly : pricing.monthly;
  const unit = annual ? copy.yearUnit : copy.monthUnit;
  const topicIcons = [Code2, Layers3, MessageSquare];

  useEffect(() => {
    if (!contact) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [contact]);

  function openContact(kind: "subscription" | "session") {
    setContact(kind);
    dialogRef.current?.showModal();
  }

  return (
    <section id="support-plans" className="flex scroll-mt-8 flex-col px-4 md:px-0" aria-labelledby="plans-heading">
      <div className="mx-auto w-full max-w-3xl border-t border-white/10 pt-8 md:pt-10">
        <h2 id="plans-heading" className="text-2xl font-semibold tracking-tight">{copy.plansTitle}</h2>
        <p className="mt-3 text-base leading-[1.8] text-muted-foreground">{copy.plansDescription}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
          {copy.topics.map((topic, index) => {
            const Icon = topicIcons[index];
            return <span key={index} className="inline-flex items-center gap-2"><Icon className="size-4 shrink-0" aria-hidden="true" />{topic}</span>;
          })}
        </div>

        <div className="mt-8 space-y-5">
          <article className="rounded-xl border border-white/15 bg-white/[0.035] p-5 sm:p-7" aria-labelledby="casual-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="casual-heading" className="text-xl font-semibold tracking-tight">Casual</h3>
              <div className="inline-flex rounded-md border border-white/10 bg-background p-0.5" role="group" aria-label={copy.billing}>
                <button type="button" onClick={() => setAnnual(false)} aria-pressed={!annual} className={cn("rounded-sm px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring", !annual ? "bg-white/15 text-foreground" : "text-muted-foreground")}>{copy.monthly}</button>
                <button type="button" onClick={() => setAnnual(true)} aria-pressed={annual} className={cn("inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring", annual ? "bg-white/15 text-foreground" : "text-muted-foreground")}><span>{copy.yearly}</span><span className="tabular-nums">−{pricing.annualDiscount}</span></button>
              </div>
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{copy.planDescription}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-8">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1" aria-live="polite" aria-atomic="true">
                  <strong className="text-4xl font-semibold leading-none tracking-tighter tabular-nums">{price}</strong>
                  <span className="text-sm text-muted-foreground">{unit}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy.tax} · {annual ? copy.yearlyNote(pricing.yearly, pricing.monthlyEquivalent) : copy.monthlyNote}</p>
              </div>
              <ul className="space-y-3 border-t border-white/10 pt-5 text-base leading-[1.8] text-muted-foreground md:border-l md:border-t-0 md:pl-7 md:pt-0">
                {[copy.time, copy.response, copy.textLanguages].map(item => <li key={item} className="flex items-start gap-2.5"><Check className="mt-1 size-4 shrink-0 text-foreground/75" aria-hidden="true" /><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[minmax(0,1fr)_15rem] md:items-center md:gap-8">
              <div>
                <p className="text-base font-medium leading-relaxed text-foreground/90">{copy.welcome}</p>
                <p className="mt-2 text-sm leading-[1.8] text-muted-foreground">{copy.welcomeDescription}</p>
              </div>
              <div>
                <Button type="button" onClick={() => openContact("subscription")} className="h-11 w-full justify-between px-4 text-base">{copy.subscriptionAction}<ArrowUpRight className="size-4" aria-hidden="true" /></Button>
                <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">{copy.contactNote} {copy.availability}</p>
              </div>
            </div>
          </article>

          <article className="grid gap-6 rounded-xl border border-white/10 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_15rem] md:items-center md:gap-8" aria-labelledby="session-heading">
            <div>
              <h3 id="session-heading" className="text-xl font-semibold tracking-tight">{copy.sessionTitle}</h3>
              <p className="mt-3 text-base leading-[1.8] text-muted-foreground">{copy.sessionDescription}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"><MessageSquare className="size-4 shrink-0" aria-hidden="true" />{copy.callLanguages}</p>
              <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{copy.sessionNote}</p>
            </div>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><strong className="text-4xl font-semibold leading-none tracking-tighter tabular-nums">{pricing.session}</strong><span className="text-sm text-muted-foreground">{copy.sessionUnit}</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{copy.tax}</p>
              <Button type="button" variant="outline" onClick={() => openContact("session")} className="mt-4 h-11 w-full justify-between border-white/20 bg-transparent px-4 text-base hover:bg-white/5 dark:bg-transparent dark:hover:bg-white/5">{copy.sessionAction}<ArrowUpRight className="size-4" aria-hidden="true" /></Button>
              <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">{copy.contactNote}</p>
            </div>
          </article>
        </div>

        <details className="group mt-5 border-y border-white/10">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            {copy.details}<ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <dl className="space-y-4 pb-5 text-sm leading-[1.8]">{copy.rules.map(([title, description]) => <div key={title}><dt className="font-medium text-foreground/90">{title}</dt><dd className="mt-1 text-muted-foreground">{description}</dd></div>)}</dl>
        </details>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="advisory-contact-title"
        aria-describedby="advisory-contact-description"
        onClose={() => setContact(null)}
        onClick={event => {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-white/20 bg-[#111] p-6 text-foreground backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        <button type="button" onClick={() => dialogRef.current?.close()} aria-label={copy.contactClose} className="absolute right-4 top-4 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"><X className="size-4" /></button>
        <p className="pr-8 text-sm tracking-wide text-muted-foreground">{copy.contactBadge}</p>
        <h2 id="advisory-contact-title" className="mt-4 text-xl font-semibold tracking-tight">{contact === "session" ? copy.contactSessionTitle : copy.contactTitle}</h2>
        <p className="mt-3 text-base font-medium">{contact === "session" ? `${pricing.session} ${copy.sessionUnit} · ${copy.priceTax}` : `${price} ${unit} · ${copy.priceTax}`}</p>
        <p id="advisory-contact-description" className="mt-4 text-sm leading-[1.8] text-muted-foreground">{contact === "session" ? copy.contactSession : copy.contactSubscription}</p>
        <div className="mt-5"><ContactMethods key={contact} /></div>
        <Button type="button" variant="ghost" onClick={() => dialogRef.current?.close()} className="mt-6 w-full text-muted-foreground">{copy.contactBack}</Button>
      </dialog>
    </section>
  );
}
