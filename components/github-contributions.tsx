"use client";

import { useEffect, useState } from "react";
import type { Activity } from "react-activity-calendar";
import { ActivityHeatmap } from "@/components/activity-heatmap";
import { AwsBadge } from "@/components/aws-badge";
import { TokenUsageActivity } from "@/components/token-usage-activity";
import { useLanguage } from "@/lib/i18n-context";
import { advisoryCopy } from "@/lib/advisory-copy";

type FetchState = "loading" | "ready" | "error";

const REVEAL_DELAY_MS = 500; // badges spin in once their container has faded in
const REVEAL_STAGGER_MS = 150;

const AWS_BADGES = [
  {
    src: "/images/mla.png",
    alt: "AWS Certified Machine Learning Engineer – Associate",
    href: "https://www.credly.com/badges/52060e45-d086-445e-a85f-447d798c6c2c",
    rim: "#3c92f8",
  },
  {
    src: "/images/soa.png",
    alt: "AWS Certified CloudOps Engineer – Associate",
    href: "https://www.credly.com/badges/98723e00-f7a4-49d1-ad08-4d5e68956e4c/public_url",
    rim: "#3c92f8",
  },
  {
    src: "/images/sap.png",
    alt: "AWS Certified Solutions Architect – Professional",
    href: "https://www.credly.com/badges/55e18c61-b1b2-4463-b1b1-bd37554be591",
    rim: "#1cc9f7",
  },
  {
    src: "/images/saa.png",
    alt: "AWS Certified Solutions Architect – Associate",
    href: "https://www.credly.com/badges/772d8b0d-5006-473b-9f31-e8c3a02cbda6",
    rim: "#3c92f8",
  },
];

export function GithubContributions() {
  const { t, language } = useLanguage();
  const copy = advisoryCopy[language];
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
        <header className="mb-5">
          <h2 className="text-xl font-semibold tracking-tight">{copy.evidenceTitle}</h2>
          <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{copy.evidenceDescription}</p>
        </header>
        <ActivityHeatmap
          data={fetchState === "ready" ? contributions : null}
          error={fetchState === "error" ? t.github.loadError : null}
          tooltipId="github-tooltip"
          tooltipText={({ count, date }) => `${count} contributions on ${date}`}
          summary={{
            value: totalContributions === null ? null : String(totalContributions),
            prefix: t.github.totalContributionsPrefix,
            suffix: t.github.totalContributionsSuffix,
          }}
        />

        <div className="flex flex-wrap gap-3 pt-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          {AWS_BADGES.map((badge, i) => (
            <AwsBadge key={badge.src} {...badge} spinDelay={REVEAL_DELAY_MS + i * REVEAL_STAGGER_MS} />
          ))}
        </div>
        <div className="pt-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
          <TokenUsageActivity />
        </div>
      </div>
    </section>
  );
}
