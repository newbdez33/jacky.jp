import type { Activity } from "react-activity-calendar";

export type TokenDay = { date: string; tokens: number };
export type TokenActivity = {
  range: { start: string; end: string };
  totalTokens: number;
  days: TokenDay[];
};

export function parseTokenActivity(value: unknown): TokenActivity {
  const data = value as Partial<TokenActivity> | null;
  if (
    !data ||
    !data.range ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.range.start) ||
    !Array.isArray(data.days) ||
    data.days.length !== 365 ||
    typeof data.totalTokens !== "number" ||
    !Number.isSafeInteger(data.totalTokens) ||
    data.totalTokens < 0
  ) {
    throw new Error("Invalid token activity response");
  }
  const start = Date.parse(`${data.range.start}T00:00:00Z`);
  let total = 0;
  for (const [index, day] of data.days.entries()) {
    const date = new Date(start + index * 86_400_000)
      .toISOString()
      .slice(0, 10);
    if (
      !day ||
      day.date !== date ||
      !Number.isSafeInteger(day.tokens) ||
      day.tokens < 0
    ) {
      throw new Error("Invalid token activity day");
    }
    total += day.tokens;
  }
  if (total !== data.totalTokens || data.days[364].date !== data.range.end) {
    throw new Error("Invalid token activity range or total");
  }
  return data as TokenActivity;
}

export function toCalendarActivities(days: TokenDay[]): Activity[] {
  const active = days
    .map((day) => day.tokens)
    .filter((tokens) => tokens > 0)
    .sort((a, b) => a - b);
  // Quartiles keep ordinary days visible when one day has much higher usage.
  const thresholds = [0.25, 0.5, 0.75].map(
    (fraction) => active[Math.ceil(active.length * fraction) - 1],
  );
  const max = active[active.length - 1];
  return days.map(({ date, tokens }) => ({
    date,
    count: tokens,
    level:
      tokens === 0
        ? 0
        : tokens === max
          ? 4
          : 1 + thresholds.filter((threshold) => tokens > threshold).length,
  }));
}
