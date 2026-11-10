import { parseTokenActivity, toCalendarActivities } from "@/lib/token-activity";

const days = [0, 100, 200, 300, 1_000_000].map((tokens, index) => ({
  date: `2026-11-${String(index + 1).padStart(2, "0")}`,
  tokens,
}));

describe("token activity", () => {
  it("uses four nonzero levels without letting one outlier flatten the calendar", () => {
    expect(toCalendarActivities(days).map((day) => day.level)).toEqual([
      0, 1, 2, 3, 4,
    ]);
    expect(toCalendarActivities(days).map((day) => day.count)).toEqual(
      days.map((day) => day.tokens),
    );
  });

  it("handles zero usage, equal values, and a single active day", () => {
    expect(
      toCalendarActivities(days.map((day) => ({ ...day, tokens: 0 }))).map(
        (day) => day.level,
      ),
    ).toEqual([0, 0, 0, 0, 0]);
    expect(
      toCalendarActivities(days.map((day) => ({ ...day, tokens: 50 }))).map(
        (day) => day.level,
      ),
    ).toEqual([4, 4, 4, 4, 4]);
    expect(
      toCalendarActivities([{ date: "2026-11-01", tokens: 1 }])[0].level,
    ).toBe(4);
  });

  it("rejects malformed responses instead of showing a false zero total", () => {
    for (const data of [
      null,
      {},
      { days: [], totalTokens: 0 },
      { days, totalTokens: -1 },
    ]) {
      expect(() => parseTokenActivity(data)).toThrow();
    }
  });
});
