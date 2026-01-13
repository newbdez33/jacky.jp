"use client";

import { useEffect, useState, cloneElement } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n-context";

export function GithubContributions() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [contributions, setContributions] = useState<Activity[]>([]);

  useEffect(() => {
    setMounted(true);

    // Fetch fresh data
    const fetchGithubData = async () => {
      try {
        // Fetch total contributions (lifetime)
        const totalRes = await fetch("https://github-contributions-api.jogruber.de/v4/newbdez33?y=all");
        const totalData = await totalRes.json();
        if (totalData.total) {
          const total = Object.values(totalData.total).reduce((acc: any, curr: any) => acc + curr, 0) as number;
          setTotalContributions(total);
        }

        // Fetch grid data (last year)
        const gridRes = await fetch("https://github-contributions-api.jogruber.de/v4/newbdez33?y=last");
        const gridData = await gridRes.json();
        if (gridData.contributions) {
          setContributions(gridData.contributions);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <section className="flex flex-col px-4 md:px-0 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="w-full max-w-3xl mx-auto space-y-0">
        <div className="flex justify-start overflow-hidden">
          <ActivityCalendar
            data={contributions}
            loading={contributions.length === 0}
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
        </div>
        {totalContributions !== null ? (
          <h2 className="text-xs font-normal text-muted-foreground">
            {t.github.totalContributionsPrefix}{totalContributions}{t.github.totalContributionsSuffix}
          </h2>
        ) : (
          <div className="h-4 w-48 bg-muted animate-pulse rounded mt-1" />
        )}

        <div className="flex gap-3 pt-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
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
      </div>
    </section>
  );
}
