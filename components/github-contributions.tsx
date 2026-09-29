"use client";

import { useEffect, useMemo, useState, cloneElement } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";
import {
  CALENDAR,
  CALENDAR_THEME,
  ContributionsSkeleton,
  NumberPill,
  WAVES,
  type Wave,
} from "@/components/github-contributions-skeleton";

type FetchState = "loading" | "ready" | "error";
type SkeletonMotion = { wave: Wave; seed: number };

const REVEAL_STEP_MS = 8; // per-week stagger when the real calendar fades in
const SKELETON_FADE_MS = 200;

// Weeks start on Sunday, matching the calendar's default grouping.
function weekDelays(contributions: Activity[]): Map<string, number> {
  const delays = new Map<string, number>();
  if (contributions.length === 0) return delays;
  const dayMs = 86_400_000;
  const toUtc = (date: string) => Date.parse(`${date}T00:00:00Z`);
  const first = toUtc(contributions[0].date);
  const offset = new Date(first).getUTCDay();
  for (const { date } of contributions) {
    const days = Math.round((toUtc(date) - first) / dayMs);
    delays.set(date, Math.floor((days + offset) / 7) * REVEAL_STEP_MS);
  }
  return delays;
}

export function GithubContributions() {
  const { t } = useLanguage();
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [contributions, setContributions] = useState<Activity[]>([]);
  const [motion, setMotion] = useState<SkeletonMotion | null>(null);
  const [skeletonGone, setSkeletonGone] = useState(false);

  // The wave is picked on the client only, so the static HTML and the first
  // client render are identical (a still grid) and hydration matches.
  useEffect(() => {
    queueMicrotask(() => {
      setMotion({
        wave: WAVES[Math.floor(Math.random() * WAVES.length)],
        seed: Math.floor(Math.random() * 0x7fffffff),
      });
    });
  }, []);

  // Keep the skeleton mounted while it fades out underneath the real calendar.
  useEffect(() => {
    if (fetchState !== "ready") return;
    const timer = setTimeout(() => setSkeletonGone(true), SKELETON_FADE_MS);
    return () => clearTimeout(timer);
  }, [fetchState]);

  const revealDelays = useMemo(() => weekDelays(contributions), [contributions]);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const totalRes = await fetch(
          "https://github-contributions-api.jogruber.de/v4/newbdez33?y=all"
        );
        if (!totalRes.ok) throw new Error("total request failed");
        const totalData = await totalRes.json();
        if (totalData.total && typeof totalData.total === "object") {
          const total = Object.values(totalData.total).reduce(
            (acc: number, curr: unknown) =>
              acc + (typeof curr === "number" ? curr : 0),
            0
          );
          setTotalContributions(total);
        }

        const gridRes = await fetch(
          "https://github-contributions-api.jogruber.de/v4/newbdez33?y=last"
        );
        if (!gridRes.ok) throw new Error("grid request failed");
        const gridData = await gridRes.json();
        if (Array.isArray(gridData.contributions)) {
          setContributions(gridData.contributions);
        }

        setFetchState("ready");
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
        setFetchState("error");
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section
      className="flex flex-col px-4 md:px-0 pb-12"
      aria-label={t.github.sectionAriaLabel}
    >
      <div className="w-full max-w-3xl mx-auto space-y-0">
        <div
          className="flex justify-start overflow-hidden"
          aria-busy={fetchState === "loading"}
        >
          {fetchState === "error" ? (
            <p className="text-xs text-muted-foreground py-2" role="status">
              {t.github.loadError}
            </p>
          ) : (
            <div className="grid max-w-full">
              {!skeletonGone && (
                <div
                  className={cn(
                    "min-w-0 [grid-area:1/1]",
                    fetchState === "ready" && "animate-out fade-out fill-mode-forwards duration-200"
                  )}
                >
                  <ContributionsSkeleton wave={motion?.wave ?? null} seed={motion?.seed ?? 0} />
                </div>
              )}
              {fetchState === "ready" && (
                <div className="min-w-0 [grid-area:1/1] animate-in fade-in duration-300">
                  <ActivityCalendar
                    data={contributions}
                    colorScheme="dark"
                    blockSize={CALENDAR.blockSize}
                    blockMargin={CALENDAR.blockMargin}
                    fontSize={CALENDAR.fontSize}
                    theme={CALENDAR_THEME}
                    showColorLegend={false}
                    showTotalCount={false}
                    renderBlock={(block, activity) =>
                      cloneElement(block, {
                        'data-tooltip-id': 'github-tooltip',
                        'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                        className: "gh-block-in",
                        style: { animationDelay: `${revealDelays.get(activity.date) ?? 0}ms` },
                      })
                    }
                    style={{
                      color: 'var(--muted-foreground)',
                      maxWidth: '100%',
                    }}
                  />
                  <Tooltip id="github-tooltip" className="z-50" />
                </div>
              )}
            </div>
          )}
        </div>
        {fetchState === "error" ? null : totalContributions !== null ? (
          <h2 className="text-xs font-normal text-muted-foreground animate-in fade-in duration-300">
            {t.github.totalContributionsPrefix}{totalContributions}{t.github.totalContributionsSuffix}
          </h2>
        ) : fetchState === "loading" ? (
          <p className="text-xs text-muted-foreground" aria-hidden>
            {t.github.totalContributionsPrefix}
            <NumberPill wave={motion?.wave ?? null} />
            {t.github.totalContributionsSuffix}
          </p>
        ) : null}

        <div className="flex gap-3 pt-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          <Link href="https://www.credly.com/badges/98723e00-f7a4-49d1-ad08-4d5e68956e4c/public_url" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/soa.png"
              alt="AWS Certified CloudOps Engineer – Associate"
              width={100}
              height={100}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="https://www.credly.com/badges/55e18c61-b1b2-4463-b1b1-bd37554be591" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/sap.png"
              alt="AWS Certified Solutions Architect – Professional"
              width={100}
              height={100}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
          <Link href="https://www.credly.com/badges/772d8b0d-5006-473b-9f31-e8c3a02cbda6" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/saa.png"
              alt="AWS Certified Solutions Architect – Associate"
              width={100}
              height={100}
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        <div className="pt-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
          <Link href="https://tokens.jacky.jp/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://token-beats-api.jacky-1a4.workers.dev/v1/badge/jacky@gcu.co.jp.svg"
              alt="AI Token Usage"
              className="hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
