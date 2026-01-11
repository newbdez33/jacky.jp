"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GithubContributions() {
  const [mounted, setMounted] = useState(false);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Fetch total contributions
    fetch('https://github-contributions-api.jogruber.de/v4/newbdez33?y=all')
      .then(res => res.json())
      .then(data => {
        if (data.total) {
          const total = Object.values(data.total).reduce((acc: any, curr: any) => acc + curr, 0) as number;
          setTotalContributions(total);
        }
      })
      .catch(err => console.error('Failed to fetch total contributions:', err));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="flex flex-col px-4 md:px-0 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="w-full max-w-3xl mx-auto space-y-0">
        <div className="flex justify-start overflow-hidden">
          <GitHubCalendar  
            username="newbdez33" 
            colorScheme="dark"
            blockSize={11}
            blockMargin={3}
            fontSize={12}
            year="last"
            showTotalCount={false}
            labels={{
              legend: {
                less: "",
                more: "",
              },
            }}
            renderColorLegend={() => <div style={{ display: "none" }} />}
            style={{
              color: 'var(--muted-foreground)',
              maxWidth: '100%',
            }}
          />
        </div>
        {totalContributions !== null && (
          <h2 className="text-xs font-normal text-muted-foreground">
            Total {totalContributions} contributions in lifetime
          </h2>
        )}
      </div>
    </section>
  );
}
