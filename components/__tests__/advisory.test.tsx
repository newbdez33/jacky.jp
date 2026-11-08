import { fireEvent, render, screen, within } from "@testing-library/react";
import { AdvisoryPlans } from "@/components/advisory-plans";
import { Hero } from "@/components/hero";
import { LanguageProvider, useLanguage } from "@/lib/i18n-context";

function LanguageControl() {
  const { setLanguage } = useLanguage();
  return <button onClick={() => setLanguage("ja")}>Switch to Japanese</button>;
}

function renderAdvisory() {
  return render(
    <LanguageProvider>
      <Hero />
      <AdvisoryPlans />
      <LanguageControl />
    </LanguageProvider>
  );
}

describe("Technical advisory page", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  afterEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  it("shows the annual total while keeping the monthly support allowance", async () => {
    renderAdvisory();
    expect(await screen.findByText("¥12,999")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /Yearly/ }));
    expect(screen.getByText("¥129,999")).toBeVisible();
    expect(screen.queryByText("¥12,999")).not.toBeInTheDocument();
    expect(screen.getByText("90 minutes of active support each month")).toBeVisible();
    expect(screen.getByRole("button", { name: /Yearly/ })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
    expect(screen.getByText("¥12,999")).toBeVisible();
  });

  it("uses the existing language control without resetting the selected plan", async () => {
    renderAdvisory();
    fireEvent.click(await screen.findByRole("button", { name: /Yearly/ }));
    fireEvent.click(screen.getByRole("button", { name: "Switch to Japanese" }));
    expect(await screen.findByText("AIで開発を加速。")).toBeVisible();
    expect(screen.getByText("¥129,999")).toBeVisible();
    expect(screen.getByText("チャット：中国語・日本語・英語")).toBeVisible();
    expect(screen.getByText("面談：中国語・英語")).toBeVisible();
  });

  it("offers direct contact before payment for subscriptions and sessions", async () => {
    renderAdvisory();
    fireEvent.click(await screen.findByRole("button", { name: "Discuss Casual" }));
    let contact = screen.getByRole("dialog");
    expect(within(contact).getByText(/Contact me before paying/)).toBeVisible();
    expect(within(contact).getByText("¥12,999 / month · tax included")).toBeVisible();
    expect(within(contact).getByRole("textbox", { name: "WeChat ID" })).toHaveValue("newbdez33");
    expect(within(contact).getByRole("link", { name: "Telegram @newbdez33" })).toHaveAttribute("href", "https://t.me/newbdez33");
    fireEvent.click(within(contact).getByRole("button", { name: "Back to plans" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Discuss a session" }));
    contact = screen.getByRole("dialog");
    expect(within(contact).getByText("¥10,000 / 50 minutes · tax included")).toBeVisible();
    expect(within(contact).getByText(/Chinese or English/)).toBeVisible();
    expect(within(contact).getByText(/Contact me before paying/)).toBeVisible();
  });

  it("opens Chinese links and keeps the selected language in the URL", async () => {
    localStorage.setItem("language", "en");
    window.history.replaceState(null, "", "/?lang=zh");
    renderAdvisory();
    expect(await screen.findByText("AI 加速开发。")).toBeVisible();
    expect(screen.getByText("文字：中文、日文、英文")).toBeVisible();
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(screen.getByAltText("Jacky")).toHaveAttribute("src", expect.stringContaining("jacky-avatar.webp"));
    fireEvent.click(screen.getByRole("button", { name: "EN", exact: true }));
    expect(screen.getByText("Build with AI.")).toBeVisible();
    expect(window.location.search).toBe("?lang=en");
  });
});
