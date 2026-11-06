import { readFileSync } from "node:fs";
import { join } from "node:path";
import { playSwarmPreview } from "@/lib/swarm-preview";

const script = readFileSync(
  join(process.cwd(), "public/vendor/swarm-animation/swarm.js"),
  "utf8",
);

describe("swarm preview", () => {
  let root: HTMLElement;
  let controller: AbortController;

  beforeEach(() => {
    jest.useFakeTimers();
    window.eval(script);
    root = document.createElement("main");
    root.innerHTML = '<h1 id="greeting" data-swarm-target>Hello <span>Jacky</span></h1><p id="live">Live data</p>';
    document.body.append(root);
    controller = new AbortController();
    jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      x: 24, y: 80, top: 80, left: 24, bottom: 120, right: 424,
      width: 400, height: 40, toJSON: () => ({}),
    });
  });

  afterEach(() => {
    controller.abort();
    document.body.replaceChildren();
    jest.restoreAllMocks();
    jest.useRealTimers();
    delete window.Swarm;
  });

  it("animates an inert snapshot without changing React-owned text nodes", async () => {
    const heading = root.querySelector("h1")!;
    const text = heading.firstChild;
    const content = heading.innerHTML;
    const onStart = jest.fn();
    const playback = playSwarmPreview(root, controller.signal, onStart);
    await Promise.resolve();

    const snapshot = document.querySelector<HTMLElement>(".swarm-preview")!;
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(snapshot).toHaveAttribute("aria-hidden", "true");
    expect(snapshot).toHaveAttribute("inert");
    expect(snapshot.querySelector("[id]")).toBeNull();
    expect(snapshot).not.toHaveTextContent("Live data");
    expect(snapshot.querySelector("sw-ghost")).not.toBeNull();
    expect(heading.firstChild).toBe(text);
    expect(heading.innerHTML).toBe(content);
    expect(heading).toHaveAttribute("data-swarm-hidden");

    // A concurrent React update must survive animation cleanup.
    text!.textContent = "こんにちは ";
    controller.abort();
    await playback;
    expect(heading).toHaveTextContent("こんにちは Jacky");
    expect(heading).not.toHaveAttribute("data-swarm-hidden");
    expect(document.querySelector(".swarm-preview, .sw-layer, .sw-bar")).toBeNull();
  });

  it.each(["scroll", "resize", "pagehide"])("restores the page on %s", async (event) => {
    const playback = playSwarmPreview(root, controller.signal, jest.fn());
    await Promise.resolve();
    window.dispatchEvent(new Event(event));
    await playback;
    expect(document.querySelector(".swarm-preview, [data-swarm-hidden]")).toBeNull();
  });

  it("stops before a language control changes the page", async () => {
    const playback = playSwarmPreview(root, controller.signal, jest.fn());
    await Promise.resolve();
    const button = document.createElement("button");
    root.append(button);
    button.onclick = () => {
      expect(document.querySelector(".swarm-preview")).toBeNull();
      root.querySelector("h1")!.textContent = "こんにちは";
    };
    button.click();
    await playback;
    expect(root.querySelector("h1")).toHaveTextContent("こんにちは");
  });

  it("restores the page when Escape is pressed", async () => {
    const playback = playSwarmPreview(root, controller.signal, jest.fn());
    await Promise.resolve();
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await playback;
    expect(window.Swarm!.state()).toBeNull();
    expect(document.querySelector("[data-swarm-hidden]")).toBeNull();
  });

  it("cleans up when the engine finishes", async () => {
    const playback = playSwarmPreview(root, controller.signal, jest.fn());
    await Promise.resolve();
    window.Swarm!.skip();
    await playback;
    expect(document.querySelector(".swarm-preview, [data-swarm-hidden]")).toBeNull();
  });

  it("restores the page within five seconds even if frames stop", async () => {
    jest.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
    const playback = playSwarmPreview(root, controller.signal, jest.fn());
    await Promise.resolve();
    jest.advanceTimersByTime(5000);
    await playback;
    expect(document.querySelector(".swarm-preview, [data-swarm-hidden]")).toBeNull();
  });

  it("leaves the page visible if the engine cannot start", async () => {
    jest.spyOn(window.Swarm!, "run").mockImplementation(() => {
      throw new Error("Cannot start");
    });
    await expect(playSwarmPreview(root, controller.signal, jest.fn())).rejects.toThrow("Cannot start");
    expect(document.querySelector(".swarm-preview, [data-swarm-hidden]")).toBeNull();
  });

  it("does not start when reduced motion is enabled", async () => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    jest.spyOn(window, "matchMedia").mockReturnValue({ ...media, matches: true });
    const run = jest.spyOn(window.Swarm!, "run");
    await playSwarmPreview(root, controller.signal, jest.fn());
    expect(run).not.toHaveBeenCalled();
    expect(document.querySelector(".swarm-preview")).toBeNull();
  });

  it("ignores a script that loads after cancellation", async () => {
    delete window.Swarm;
    const onStart = jest.fn();
    const playback = playSwarmPreview(root, controller.signal, onStart);
    controller.abort();
    window.eval(script);
    document.querySelector<HTMLScriptElement>('script[src="/vendor/swarm-animation/swarm.js"]')!
      .dispatchEvent(new Event("load"));
    await playback;
    expect(onStart).not.toHaveBeenCalled();
    expect(document.querySelector(".swarm-preview")).toBeNull();
  });

  it("can retry after the script fails to load", async () => {
    delete window.Swarm;
    const failed = playSwarmPreview(root, controller.signal, jest.fn());
    const failure = expect(failed).rejects.toThrow("could not load");
    document.querySelector("script")!.dispatchEvent(new Event("error"));
    await failure;
    expect(document.querySelector(".swarm-preview, [data-swarm-hidden]")).toBeNull();

    const onStart = jest.fn();
    const playback = playSwarmPreview(root, controller.signal, onStart);
    window.eval(script);
    document.querySelector("script")!.dispatchEvent(new Event("load"));
    // The shared script promise settles before playback can start.
    for (let i = 0; i < 6; i++) await Promise.resolve();
    expect(onStart).toHaveBeenCalledTimes(1);
    controller.abort();
    await playback;
  });
});
