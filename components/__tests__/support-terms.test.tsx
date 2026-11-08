import { render, screen } from "@testing-library/react";
import { SupportTerms } from "@/components/support-terms";
import { LanguageProvider } from "@/lib/i18n-context";

describe("Localized service pricing", () => {
  afterEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  it.each([
    { language: "en", monthly: "US$85", yearly: "US$850", session: "US$65", currency: "US dollars (USD)" },
    { language: "ja", monthly: "¥12,999", yearly: "¥129,999", session: "¥10,000", currency: "日本円（JPY）" },
    { language: "zh", monthly: "CN¥550", yearly: "CN¥5,500", session: "CN¥450", currency: "人民币（CNY）" },
  ])("quotes $language prices in the payment currency", async ({ language, monthly, yearly, session, currency }) => {
    window.history.replaceState(null, "", `/?lang=${language}`);
    render(<LanguageProvider><SupportTerms /></LanguageProvider>);

    expect(await screen.findByText(monthly)).toBeVisible();
    expect(screen.getByText(yearly)).toBeVisible();
    expect(screen.getByText(session)).toBeVisible();
    expect(screen.getByText(text => text.includes(currency))).toBeVisible();
  });
});
