"use client";

import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

export function StatsStrip() {
  const { t } = usePrivateAiI18n();

  const stats = [
    { n: t.st1n, l: t.st1l },
    { n: t.st2n, l: t.st2l },
    { n: t.st3n, l: t.st3l },
    { n: t.st4n, l: t.st4l },
  ];

  return (
    <div className="bg-[#16241b] text-[#e9efe8] py-[22px] border-t border-[#27392d]">
      <div className="max-w-5xl mx-auto px-6 flex gap-10 flex-wrap justify-between">
        {stats.map((s, i) => (
          <div key={i}>
            <div
              className="text-[22px] font-extrabold tabular-nums"
              dangerouslySetInnerHTML={{ __html: s.n }}
            />
            <div className="text-xs tracking-[0.06em] text-[#9fae9f]">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
