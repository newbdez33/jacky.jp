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
    <section className="flex flex-col items-center justify-center px-4 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="w-full max-w-4xl space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-center md:text-left md:pl-4">Contributions</h2>
        <div className="flex justify-center md:justify-start">
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
