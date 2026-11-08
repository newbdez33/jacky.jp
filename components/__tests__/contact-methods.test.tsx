import { fireEvent, render, screen } from "@testing-library/react";
import { ContactMethods } from "@/components/contact-methods";
import { LanguageProvider } from "@/lib/i18n-context";

function renderContacts() {
  return render(<LanguageProvider><ContactMethods /></LanguageProvider>);
}

describe("Service contacts", () => {
  afterEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", "/");
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
  });

  it("shows the correct WeChat and LINE IDs and Telegram destination", async () => {
    renderContacts();
    expect(await screen.findByRole("textbox", { name: "WeChat ID" })).toHaveValue("newbdez33");
    expect(screen.getByRole("textbox", { name: "LINE ID" })).toHaveValue("newbdez33");
    const telegram = screen.getByRole("link", { name: "Telegram @newbdez33" });
    expect(telegram).toHaveAttribute("href", "https://t.me/newbdez33");
    expect(telegram).toHaveAttribute("rel", "noopener noreferrer");
  });

  it.each(["WeChat", "LINE"])("copies only the %s ID", async channel => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    renderContacts();
    fireEvent.click(await screen.findByRole("button", { name: `Copy ${channel} ID` }));
    expect(await screen.findByText(`${channel} ID copied. Search for it in ${channel} to add me.`)).toBeVisible();
    expect(writeText).toHaveBeenCalledWith("newbdez33");
  });

  it.each([
    ["WeChat", undefined],
    ["WeChat", { writeText: () => Promise.reject(new Error("Not allowed")) }],
    ["LINE", undefined],
    ["LINE", { writeText: () => Promise.reject(new Error("Not allowed")) }],
  ])("selects the %s ID for manual copying if clipboard access fails", async (channel, clipboard) => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: clipboard });
    renderContacts();
    fireEvent.click(await screen.findByRole("button", { name: `Copy ${channel} ID` }));
    expect(await screen.findByText(`The ${channel} ID is selected. Copy it, then search for it in ${channel}.`)).toBeVisible();
    const input = screen.getByRole("textbox", { name: `${channel} ID` }) as HTMLInputElement;
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe("newbdez33".length);
    expect(input).toHaveFocus();
  });
});
