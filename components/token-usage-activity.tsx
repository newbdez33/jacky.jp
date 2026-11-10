"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ActivityHeatmap } from "@/components/activity-heatmap";
import { useLanguage } from "@/lib/i18n-context";
import {
  parseTokenActivity,
  toCalendarActivities,
  type TokenActivity,
} from "@/lib/token-activity";

const ACTIVITY_URL =
  process.env.NEXT_PUBLIC_TOKEN_ACTIVITY_URL ??
  "https://token-beats-api.jacky-1a4.workers.dev/v1/public/users/jacky@gcu.co.jp/activity";

export function TokenUsageActivity() {
  const { language, t } = useLanguage();
  const [activity, setActivity] = useState<TokenActivity | null>(null);
  const [failed, setFailed] = useState(false);
  const days = useMemo(
    () => (activity ? toCalendarActivities(activity.days) : null),
    [activity],
  );
  const number = new Intl.NumberFormat(language);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    const timeout = setTimeout(() => controller.abort(), 10_000);
    async function load() {
      try {
        const response = await fetch(ACTIVITY_URL, {
          signal: controller.signal,
          credentials: "omit",
        });
        if (!response.ok) throw new Error("Token activity request failed");
        const data = parseTokenActivity(await response.json());
        if (!cancelled) setActivity(data);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section aria-label={t.tokenUsage.title}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium">{t.tokenUsage.title}</h3>
        <Link
          href="https://tokens.jacky.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {t.tokenUsage.viewUsage}
          <span aria-hidden> ↗</span>
        </Link>
      </div>
      <ActivityHeatmap
        data={days}
        error={failed ? t.tokenUsage.loadError : null}
        tooltipId="token-usage-tooltip"
        tooltipText={({ date, count }) =>
          t.tokenUsage.dayUsage
            .replace("{date}", date)
            .replace("{tokens}", number.format(count))
        }
        summary={{
          value: activity ? number.format(activity.totalTokens) : null,
          prefix: t.tokenUsage.totalPrefix,
          suffix: t.tokenUsage.totalSuffix,
        }}
      />
    </section>
  );
}
