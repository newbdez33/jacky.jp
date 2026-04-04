import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GithubContributions } from "@/components/github-contributions";
import { LanguageProvider } from "@/lib/i18n-context";

jest.mock("react-activity-calendar", () => ({
  ActivityCalendar: function MockActivityCalendar(props: {
    loading?: boolean;
    data?: unknown[];
  }) {
    return (
      <div
        data-testid="activity-calendar"
        data-loading={String(!!props.loading)}
      >
        blocks:{props.data?.length ?? 0}
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

describe("GithubContributions", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it("loads calendar data and shows total when API succeeds", async () => {
    global.fetch = jest.fn().mockImplementation((url: string) => {
      if (url.includes("y=all")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total: { "2024": 100, "2025": 50 } }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            contributions: [{ date: "2025-01-01", count: 1, level: 1 }],
          }),
      });
    });

    renderWithProvider(<GithubContributions />);

    expect(await screen.findByTestId("activity-calendar")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/Total 150 contributions in lifetime/)
      ).toBeInTheDocument();
    });
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
    consoleError.mockRestore();
  });
});
