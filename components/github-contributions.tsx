"use client";

import { useEffect, useState, cloneElement } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";

type FetchState = "loading" | "ready" | "error";

export function GithubContributions() {
  const { t } = useLanguage();
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [contributions, setContributions] = useState<Activity[]>([]);

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
            <>
              <ActivityCalendar
                data={contributions}
                loading={fetchState === "loading"}
                colorScheme="dark"
                blockSize={11}
                blockMargin={3}
                fontSize={12}
                theme={{
                  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                showColorLegend={false}
                showTotalCount={false}
                renderBlock={(block, activity) =>
                  cloneElement(block, {
                    'data-tooltip-id': 'github-tooltip',
                    'data-tooltip-content': `${activity.count} contributions on ${activity.date}`,
                  })
                }
                style={{
                  color: 'var(--muted-foreground)',
                  maxWidth: '100%',
                }}
              />
              <Tooltip id="github-tooltip" className="z-50" />
            </>
          )}
        </div>
        {fetchState === "error" ? null : totalContributions !== null ? (
          <h2 className="text-xs font-normal text-muted-foreground">
            {t.github.totalContributionsPrefix}{totalContributions}{t.github.totalContributionsSuffix}
          </h2>
        ) : fetchState === "loading" ? (
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" aria-hidden />
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
