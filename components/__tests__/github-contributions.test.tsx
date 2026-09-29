import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import "@testing-library/jest-dom";
import { GithubContributions } from "@/components/github-contributions";
import { LanguageProvider } from "@/lib/i18n-context";

type MockActivity = { date: string; count: number; level: number };

jest.mock("react-activity-calendar", () => ({
  ActivityCalendar: function MockActivityCalendar(props: {
    loading?: boolean;
    data?: MockActivity[];
    renderBlock?: (
      block: React.ReactElement,
      activity: MockActivity
    ) => React.ReactElement;
  }) {
    return (
      <div
        data-testid="activity-calendar"
        data-loading={String(!!props.loading)}
      >
        <svg>
          {props.data?.map((activity) => {
            const block = (
              <rect key={activity.date} data-testid="block" data-date={activity.date} />
            );
            return props.renderBlock ? props.renderBlock(block, activity) : block;
          })}
        </svg>
      </div>
    );
  },
}));

jest.mock("react-tooltip", () => ({
  Tooltip: () => <span data-testid="tooltip-stub" />,
}));

function renderWithProvider(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

function mockSuccessfulFetch(contributions: MockActivity[]) {
  global.fetch = jest.fn().mockImplementation((url: string) => {
    if (url.includes("y=all")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ total: { "2024": 100, "2025": 50 } }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ contributions }),
    });
  });
}

describe("GithubContributions", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it("shows the skeleton and a number placeholder while the API is pending", async () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

    renderWithProvider(<GithubContributions />);

    const skeleton = screen.getByTestId("contributions-skeleton");
    expect(skeleton.closest("[aria-busy]")).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByTestId("activity-calendar")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText(/contributions in lifetime/)).toContainElement(
      document.querySelector(".gh-skeleton-pill")
    );
    await waitFor(() =>
      expect(skeleton).toHaveAttribute("data-wave", expect.stringMatching(/^(diag|horiz|sine)$/))
    );
  });

  it("server markup is a static skeleton so hydration matches", () => {
    const html = renderToString(
      <LanguageProvider>
        <GithubContributions />
      </LanguageProvider>
    );
    expect(html).toContain('data-testid="contributions-skeleton"');
    expect(html).not.toContain("data-wave");
    expect(html).not.toContain("animation-delay");
  });

  it("loads calendar data and shows total when API succeeds", async () => {
    mockSuccessfulFetch([{ date: "2025-01-01", count: 1, level: 1 }]);

    renderWithProvider(<GithubContributions />);

    const calendar = await screen.findByTestId("activity-calendar");
    expect(calendar).toHaveAttribute("data-loading", "false");
    await waitFor(() => {
      expect(screen.getByRole("heading")).toHaveTextContent(
        /Total 150 contributions in lifetime/
      );
    });
    expect(calendar.closest("[aria-busy]")).toHaveAttribute("aria-busy", "false");
    await waitFor(() =>
      expect(screen.queryByTestId("contributions-skeleton")).not.toBeInTheDocument()
    );
  });

  it("reveals blocks week by week once data arrives", async () => {
    // 2025-01-05 is a Sunday, so the three dates fall in weeks 0, 1 and 2
    mockSuccessfulFetch([
      { date: "2025-01-05", count: 1, level: 1 },
      { date: "2025-01-12", count: 2, level: 2 },
      { date: "2025-01-20", count: 3, level: 3 },
    ]);

    renderWithProvider(<GithubContributions />);

    const blocks = await screen.findAllByTestId("block");
    expect(blocks.map((b) => b.style.animationDelay)).toEqual(["0ms", "8ms", "16ms"]);
    blocks.forEach((b) => expect(b).toHaveClass("gh-block-in"));
  });

  it("renders the three AWS certifications as spinnable coins", () => {
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

    const { container } = renderWithProvider(<GithubContributions />);

    const coins = container.querySelectorAll(".aws-badge");
    expect(coins).toHaveLength(3);
    expect(Array.from(coins).map((c) => c.getAttribute("href"))).toEqual([
      "https://www.credly.com/badges/98723e00-f7a4-49d1-ad08-4d5e68956e4c/public_url",
      "https://www.credly.com/badges/55e18c61-b1b2-4463-b1b1-bd37554be591",
      "https://www.credly.com/badges/772d8b0d-5006-473b-9f31-e8c3a02cbda6",
    ]);
    expect(screen.getByRole("img", { name: /CloudOps Engineer/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Solutions Architect – Professional/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Solutions Architect – Associate/ })).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {
      /* expected in error path */
    });
    global.fetch = jest.fn().mockRejectedValue(new Error("network"));

    renderWithProvider(<GithubContributions />);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /Could not load GitHub contribution data/
      );
    });
    expect(screen.queryByTestId("activity-calendar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("contributions-skeleton")).not.toBeInTheDocument();
    consoleError.mockRestore();
  });
});
