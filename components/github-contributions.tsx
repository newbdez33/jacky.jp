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
    <section className="flex flex-col px-4 md:px-0 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
      <div className="w-full max-w-3xl mx-auto space-y-4">
        <div className="flex justify-start overflow-hidden">
          <GitHubCalendar  
            username="newbdez33" 
            colorScheme="dark"
            blockSize={11}
            blockMargin={3}
            fontSize={12}
            style={{
              color: 'var(--foreground)',
              maxWidth: '100%',
            }}
          />
        </div>
      </div>
    </section>
  );
}
