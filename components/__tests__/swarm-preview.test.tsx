import { act, fireEvent, render, screen } from "@testing-library/react";
import { SwarmPreview } from "@/components/swarm-preview";
import { LanguageProvider, useLanguage } from "@/lib/i18n-context";
import { playSwarmPreview } from "@/lib/swarm-preview";

jest.mock("@/lib/swarm-preview", () => ({ playSwarmPreview: jest.fn() }));
const play = jest.mocked(playSwarmPreview);

function Controls() {
  const { setLanguage } = useLanguage();
  return <main><SwarmPreview /><button onClick={() => setLanguage("ja")}>日本語</button></main>;
}

async function renderPreview() {
  let view!: ReturnType<typeof render>;
  await act(async () => { view = render(<LanguageProvider><Controls /></LanguageProvider>); });
  return view;
}

describe("SwarmPreview", () => {
  beforeEach(() => {
    play.mockReset();
    play.mockImplementation((_root, signal, onStart) => new Promise((resolve) => {
      onStart();
      signal.addEventListener("abort", () => resolve(), { once: true });
    }));
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("starts only on request and lets the same control stop playback", async () => {
    await renderPreview();
    expect(play).not.toHaveBeenCalled();
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Watch agents build" })); });
    expect(play).toHaveBeenCalledTimes(1);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Stop animation" })); });
    expect(screen.getByRole("button", { name: "Watch agents build" })).toBeEnabled();
  });

  it("cancels playback on language changes and uses the selected language", async () => {
    await renderPreview();
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Watch agents build" })); });
    const signal = play.mock.calls[0][1];
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "日本語" })); });
    expect(signal.aborted).toBe(true);
    expect(screen.getByRole("button", { name: "エージェントの制作を見る" })).toBeEnabled();
  });

  it("cancels a pending load when the component unmounts", async () => {
    play.mockImplementation((_root, signal) => new Promise((resolve) => {
      signal.addEventListener("abort", () => resolve(), { once: true });
    }));
    const view = await renderPreview();
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Watch agents build" })); });
    expect(screen.getByRole("button", { name: "Loading animation…" })).toBeDisabled();
    view.unmount();
    expect(play.mock.calls[0][1].aborted).toBe(true);
  });

  it("shows a recoverable load error", async () => {
    play.mockRejectedValueOnce(new Error("Network error"));
    await renderPreview();
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Watch agents build" })); });
    expect(screen.getByRole("status")).toHaveTextContent("Could not load the animation. Try again.");
    expect(screen.getByRole("button", { name: "Watch agents build" })).toBeEnabled();
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Watch agents build" })); });
    expect(screen.getByRole("button", { name: "Stop animation" })).toBeEnabled();
  });
});
