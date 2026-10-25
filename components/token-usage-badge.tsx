"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";

export function TokenUsageBadge() {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href="https://tokens.jacky.jp/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.tokenUsage.title}
      className="block h-[62px] w-[294px] max-w-full rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {!imageLoaded && (
        <div className="flex h-full flex-col justify-center rounded-xl bg-[#171717] px-5">
          <span className="text-xs text-muted-foreground">{t.tokenUsage.title}</span>
          <span className="text-sm text-foreground">
            {t.tokenUsage.viewUsage}<span aria-hidden> ↗</span>
          </span>
        </div>
      )}
      <Image
        src="https://token-beats-api.jacky-1a4.workers.dev/v1/badge/jacky@gcu.co.jp.svg"
        alt={t.tokenUsage.title}
        width={294}
        height={62}
        loading="eager"
        unoptimized
        onLoad={(event) => setImageLoaded(event.currentTarget.naturalWidth > 0)}
        onError={() => setImageLoaded(false)}
        className="h-full w-full object-contain"
        style={{ display: imageLoaded ? "block" : "none" }}
      />
    </Link>
  );
}
