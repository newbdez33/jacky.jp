"use client";

import { cloneElement, useEffect, useMemo, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { cn } from "@/lib/utils";
import {
  CALENDAR,
  CALENDAR_THEME,
  ContributionsSkeleton,
  NumberPill,
  WAVES,
  type Wave,
} from "@/components/github-contributions-skeleton";

type Props = {
  data: Activity[] | null;
  error: string | null;
  tooltipId: string;
  tooltipText: (activity: Activity) => string;
  summary: { value: string | null; prefix: string; suffix: string };
  theme?: typeof CALENDAR_THEME;
};

// Weeks start on Sunday, matching the calendar's default grouping.
function weekDelays(data: Activity[]): Map<string, number> {
  const delays = new Map<string, number>();
  if (data.length === 0) return delays;
  const first = Date.parse(`${data[0].date}T00:00:00Z`);
  const offset = new Date(first).getUTCDay();
  for (const { date } of data) {
    const days = Math.round(
      (Date.parse(`${date}T00:00:00Z`) - first) / 86_400_000,
    );
    delays.set(date, Math.floor((days + offset) / 7) * 8);
  }
  return delays;
}

export function ActivityHeatmap({
  data,
  error,
  tooltipId,
  tooltipText,
  summary,
  theme = CALENDAR_THEME,
}: Props) {
  const [motion, setMotion] = useState<{ wave: Wave; seed: number } | null>(
    null,
  );
  const [skeletonGone, setSkeletonGone] = useState(false);
  const revealDelays = useMemo(() => weekDelays(data ?? []), [data]);

  // Keep the server and first client render identical before choosing motion.
  useEffect(() => {
    queueMicrotask(() =>
      setMotion({
        wave: WAVES[Math.floor(Math.random() * WAVES.length)],
        seed: Math.floor(Math.random() * 0x7fffffff),
      }),
    );
  }, []);

  useEffect(() => {
    if (data === null) return;
    const timer = setTimeout(() => setSkeletonGone(true), 200);
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <>
      <div
        className="flex justify-start overflow-hidden"
        aria-busy={data === null && !error}
      >
        {error ? (
          <p className="text-sm text-muted-foreground py-2" role="status">
            {error}
          </p>
        ) : (
          <div className="grid max-w-full">
            {!skeletonGone && (
              <div
                className={cn(
                  "min-w-0 [grid-area:1/1]",
                  data !== null &&
                    "animate-out fade-out fill-mode-forwards duration-200",
                )}
              >
                <ContributionsSkeleton
                  wave={motion?.wave ?? null}
                  seed={motion?.seed ?? 0}
                  colors={theme.dark}
                />
              </div>
            )}
            {data !== null && (
              <div className="min-w-0 [grid-area:1/1] animate-in fade-in duration-300">
                <ActivityCalendar
                  data={data}
                  colorScheme="dark"
                  blockSize={CALENDAR.blockSize}
                  blockMargin={CALENDAR.blockMargin}
                  fontSize={CALENDAR.fontSize}
                  theme={theme}
                  showColorLegend={false}
                  showTotalCount={false}
                  renderBlock={(block, activity) =>
                    cloneElement(block, {
                      "data-tooltip-id": tooltipId,
                      "data-tooltip-content": tooltipText(activity),
                      "aria-label": tooltipText(activity),
                      tabIndex: 0,
                      className: "gh-block-in",
                      style: {
                        animationDelay: `${revealDelays.get(activity.date) ?? 0}ms`,
                      },
                    })
                  }
                  style={{ color: "var(--muted-foreground)", maxWidth: "100%" }}
                />
                <Tooltip id={tooltipId} className="z-50" />
              </div>
            )}
          </div>
        )}
      </div>
      {!error && (
        <p
          className="text-sm text-muted-foreground animate-in fade-in duration-300"
          aria-hidden={summary.value === null || undefined}
        >
          {summary.prefix}
          {summary.value ?? <NumberPill wave={motion?.wave ?? null} />}
          {summary.suffix}
        </p>
      )}
    </>
  );
}
