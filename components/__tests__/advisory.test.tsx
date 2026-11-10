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
    expect(await screen.findByText("US$85")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /Yearly/ }));
    expect(screen.getByText("US$850")).toBeVisible();
    expect(screen.queryByText("US$85")).not.toBeInTheDocument();
    expect(screen.getByText("Tax included · US$850 billed yearly. About US$71/month.")).toBeVisible();
    expect(screen.getByText("90 minutes of active support each month")).toBeVisible();
    expect(screen.getByRole("button", { name: /Yearly/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Yearly/ })).toHaveTextContent("−16.7%");
    fireEvent.click(screen.getByRole("button", { name: "Discuss Casual" }));
    expect(within(screen.getByRole("dialog")).getByText("US$850 / year · tax included")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Back to plans" }));
    fireEvent.click(screen.getByRole("button", { name: "Monthly" }));
    expect(screen.getByText("US$85")).toBeVisible();
  });

  it("uses the existing language control without resetting the selected plan", async () => {
    renderAdvisory();
    fireEvent.click(await screen.findByRole("button", { name: /Yearly/ }));
    fireEvent.click(screen.getByRole("button", { name: "Switch to Japanese" }));
    expect(await screen.findByText("AIで開発を加速。")).toBeVisible();
    expect(screen.getByText("¥129,999")).toBeVisible();
    expect(screen.getByText("チャット：中国語・日本語・英語")).toBeVisible();
    expect(screen.getByText("面談：中国語・英語")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    expect(screen.getByText("CN¥5,500")).toBeVisible();
    expect(screen.getByText("含税 · 每年一次支付 CN¥5,500，折合约 CN¥458 / 月。")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("US$850")).toBeVisible();
  });

  it("offers direct contact before payment for subscriptions and sessions", async () => {
    renderAdvisory();
    fireEvent.click(await screen.findByRole("button", { name: "Discuss Casual" }));
    let contact = screen.getByRole("dialog");
    expect(within(contact).getByText(/Contact me before paying/)).toBeVisible();
    expect(within(contact).getByText("US$85 / month · tax included")).toBeVisible();
    expect(within(contact).getByRole("textbox", { name: "WeChat ID" })).toHaveValue("newbdez33");
    expect(within(contact).getByRole("textbox", { name: "LINE ID" })).toHaveValue("newbdez33");
    expect(within(contact).getByRole("link", { name: "Telegram @newbdez33" })).toHaveAttribute("href", "https://t.me/newbdez33");
    fireEvent.click(within(contact).getByRole("button", { name: "Back to plans" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Discuss a session" }));
    contact = screen.getByRole("dialog");
    expect(within(contact).getByText("US$65 / 50 minutes · tax included")).toBeVisible();
    expect(within(contact).getByText(/Chinese or English/)).toBeVisible();
    expect(within(contact).getByText(/Contact me before paying/)).toBeVisible();
  });

  it("opens Chinese links and keeps the selected language in the URL", async () => {
    localStorage.setItem("language", "en");
    window.history.replaceState(null, "", "/?lang=zh");
    renderAdvisory();
    expect(await screen.findByText("AI 加速开发。")).toBeVisible();
    expect(screen.getByText("文字：中文、日文、英文")).toBeVisible();
    expect(screen.getByText("CN¥550")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "先聊聊订阅" }));
    expect(within(screen.getByRole("dialog")).getByText("CN¥550 / 月 · 含税")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "返回服务方案" }));
    fireEvent.click(screen.getByRole("button", { name: "先聊聊面谈" }));
    expect(within(screen.getByRole("dialog")).getByText("CN¥450 / 50 分钟 · 含税")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "返回服务方案" }));
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(screen.getByAltText("Jacky")).toHaveAttribute("src", expect.stringContaining("jacky-avatar.webp"));
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("Build with AI.")).toBeVisible();
    expect(screen.getByText("US$85")).toBeVisible();
    expect(window.location.search).toBe("?lang=en");
  });
});
