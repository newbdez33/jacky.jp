"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n-context";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="py-6 md:py-8 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
      <div className="max-w-3xl mx-auto px-4 md:px-0 space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t.footer.reachMe}</p>
          <div className="flex gap-2">
            <Button size="icon-sm" asChild className="rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800">
              <Link href="https://x.com/z33" target="_blank" rel="noopener noreferrer">
                <XIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button size="icon-sm" asChild className="rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800">
              <Link href="https://github.com/newbdez33" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">Github</span>
              </Link>
            </Button>
            <Button size="icon-sm" asChild className="rounded-sm bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-800">
              <Link href="https://www.linkedin.com/in/newbdez33/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Linkedin</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p>{t.footer.madeWith}</p>
            <p>
              © {new Date().getFullYear()} {t.footer.rights}
            </p>
          </div>

          <div className="flex gap-2 text-sm">
            <button 
              onClick={() => setLanguage('en')} 
              className={`transition-colors ${language === 'en' ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              English
            </button>
            <span>/</span>
            <button 
              onClick={() => setLanguage('ja')} 
              className={`transition-colors ${language === 'ja' ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              日本語
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
