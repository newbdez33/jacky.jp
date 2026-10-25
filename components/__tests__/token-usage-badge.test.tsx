import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TokenUsageBadge } from "@/components/token-usage-badge";
import { LanguageProvider } from "@/lib/i18n-context";

function renderBadge() {
  return render(
    <LanguageProvider>
      <TokenUsageBadge />
    </LanguageProvider>
  );
}

describe("TokenUsageBadge", () => {
  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("keeps a local link visible while the image is pending or fails", async () => {
    renderBadge();

    const fallback = await screen.findByText("View usage");
    const image = screen.getByAltText("AI Token Usage");
    expect(fallback).toBeVisible();
    expect(image).not.toBeVisible();

    fireEvent.error(image);

    expect(fallback).toBeVisible();
    expect(image).not.toBeVisible();
    expect(screen.getByRole("link", { name: "AI Token Usage" })).toHaveAttribute(
      "href", "https://tokens.jacky.jp/"
    );
  });

  it("shows a valid image and restores the fallback if it later fails", async () => {
    renderBadge();

    const image = screen.getByAltText("AI Token Usage");
    Object.defineProperty(image, "naturalWidth", { configurable: true, value: 294 });
    fireEvent.load(image);

    await waitFor(() => expect(image).toBeVisible());
    expect(screen.queryByText("View usage")).not.toBeInTheDocument();

    fireEvent.error(image);

    expect(await screen.findByText("View usage")).toBeVisible();
    expect(image).not.toBeVisible();
  });

  it.each([
    { naturalWidth: 0, visible: false, state: "failed" },
    { naturalWidth: 294, visible: true, state: "loaded" },
  ])("handles an image that $state before hydration", async ({ naturalWidth, visible }) => {
    jest.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    jest.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(naturalWidth);

    await act(async () => { renderBadge(); });

    const image = screen.getByAltText("AI Token Usage");
    await waitFor(() => {
      if (visible) {
        expect(image).toBeVisible();
        expect(screen.queryByText("View usage")).not.toBeInTheDocument();
      } else {
        expect(image).not.toBeVisible();
        expect(screen.getByText("View usage")).toBeVisible();
      }
    });
  });

  it("renders the fallback in Japanese", async () => {
    localStorage.setItem("language", "ja");
    renderBadge();

    expect(await screen.findByText("使用量を見る")).toBeVisible();
    expect(screen.getByRole("link", { name: "AIトークン使用量" })).toHaveAttribute(
      "href", "https://tokens.jacky.jp/"
    );
  });
});
