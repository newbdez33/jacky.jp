"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/i18n-context";
import { supportCopy } from "@/lib/support-copy";

export function SupportShell({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const copy = supportCopy[language];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="mx-auto max-w-3xl px-4 pt-10 md:px-0 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-white/10 pb-6">
          <Link href={`/?lang=${language}`} className="inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />{copy.home}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-9 md:px-0 md:py-12">{children}</main>
      <Footer />
    </div>
  );
}
