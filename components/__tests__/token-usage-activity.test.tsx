import React from "react";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import { TokenUsageActivity } from "@/components/token-usage-activity";
import { LanguageProvider } from "@/lib/i18n-context";

type Activity = { date: string; count: number; level: number };

jest.mock("react-activity-calendar", () => ({
  ActivityCalendar: ({
    data,
    renderBlock,
  }: {
    data: Activity[];
    renderBlock: (
      block: React.ReactElement,
      activity: Activity,
    ) => React.ReactElement;
  }) => (
    <svg data-testid="activity-calendar">
      {data.map((day) =>
        renderBlock(
          <rect key={day.date} data-testid="block" data-level={day.level} />,
          day,
        ),
      )}
    </svg>
  ),
}));

jest.mock("react-tooltip", () => ({ Tooltip: () => null }));

function payload(tokens = 12345) {
  const end = Date.parse("2026-11-10T00:00:00Z");
  const days = Array.from({ length: 365 }, (_, index) => ({
    date: new Date(end - (364 - index) * 86_400_000).toISOString().slice(0, 10),
    tokens: index === 364 ? tokens : 0,
  }));
  return {
    range: { start: days[0].date, end: days[364].date },
    totalTokens: tokens,
    days,
  };
}

function renderActivity() {
  return render(
    <LanguageProvider>
      <TokenUsageActivity />
    </LanguageProvider>,
  );
}

describe("TokenUsageActivity", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
    localStorage.clear();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("keeps the usage link visible while data is pending", async () => {
    global.fetch = jest.fn(() => new Promise(() => {}));
    renderActivity();
    expect(screen.getByTestId("contributions-skeleton")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View usage/ })).toHaveAttribute(
      "href",
      "https://tokens.jacky.jp/",
    );
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://token-beats-api.jacky-1a4.workers.dev/v1/public/users/jacky@gcu.co.jp/activity",
        expect.objectContaining({
          signal: expect.any(AbortSignal),
          credentials: "omit",
        }),
      ),
    );
  });

  it("renders daily blocks and token tooltips, with a total for the same period", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => payload() });
    renderActivity();
    const calendar = await screen.findByTestId("activity-calendar");
    const blocks = within(calendar).getAllByTestId("block");
    expect(blocks).toHaveLength(365);
    expect(blocks[364]).toHaveAttribute(
      "data-tooltip-id",
      "token-usage-tooltip",
    );
    expect(blocks[364]).toHaveAttribute(
      "data-tooltip-content",
      "12,345 tokens on 2026-11-10",
    );
    expect(blocks[364]).toHaveAttribute("data-level", "4");
    expect(blocks[0]).toHaveAttribute("data-level", "0");
    expect(
      screen.getByText("Total 12,345 tokens in the last 365 days"),
    ).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders a zero-usage calendar", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => payload(0) });
    renderActivity();
    const calendar = await screen.findByTestId("activity-calendar");
    expect(
      within(calendar)
        .getAllByTestId("block")
        .every((block) => block.dataset.level === "0"),
    ).toBe(true);
    expect(
      screen.getByText("Total 0 tokens in the last 365 days"),
    ).toBeVisible();
  });

  it.each(["network", "http", "invalid"])(
    "shows an error and keeps the usage link on %s failure",
    async (failure) => {
      global.fetch =
        failure === "network"
          ? jest.fn().mockRejectedValue(new Error("Network error"))
          : jest.fn().mockResolvedValue({
              ok: failure !== "http",
              json: async () => ({}),
            });
      renderActivity();
      expect(await screen.findByRole("status")).toHaveTextContent(
        "Could not load AI usage data.",
      );
      expect(screen.getByRole("link", { name: /View usage/ })).toBeVisible();
      expect(screen.queryByTestId("activity-calendar")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Total 0 tokens in the last 365 days"),
      ).not.toBeInTheDocument();
    },
  );

  it("translates the summary and tooltip into Japanese", async () => {
    localStorage.setItem("language", "ja");
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => payload() });
    renderActivity();
    expect(
      await screen.findByText("過去365日間の合計: 12,345 トークン"),
    ).toBeVisible();
    const blocks = screen.getAllByTestId("block");
    expect(blocks[364]).toHaveAttribute(
      "data-tooltip-content",
      "2026-11-10: 12,345 トークン",
    );
  });

  it("cancels the request when unmounted", async () => {
    global.fetch = jest.fn(() => new Promise(() => {}));
    const { unmount } = renderActivity();
    const signal = (global.fetch as jest.Mock).mock.calls[0][1]
      .signal as AbortSignal;
    unmount();
    expect(signal.aborted).toBe(true);
  });

  it("ends the loading state when the request times out", async () => {
    jest.useFakeTimers();
    global.fetch = jest.fn(
      (_url, options) =>
        new Promise((_resolve, reject) => {
          options?.signal?.addEventListener("abort", () =>
            reject(new Error("Aborted")),
          );
        }),
    );
    renderActivity();
    await act(async () => {
      await jest.advanceTimersByTimeAsync(10_000);
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Could not load AI usage data.",
    );
    expect(
      screen.queryByTestId("contributions-skeleton"),
    ).not.toBeInTheDocument();
  });
});
