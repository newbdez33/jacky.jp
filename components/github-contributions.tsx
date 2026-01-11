"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GithubContributions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section className="flex flex-col items-center justify-center px-4 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Contributions</h2>
        <div className="flex justify-center p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
          <GitHubCalendar 
            username="newbdez33" 
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            style={{
              color: 'var(--foreground)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
