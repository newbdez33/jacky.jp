type SwarmRun = { stop: () => void };

type SwarmEngine = {
  run: (options: {
    root: HTMLElement;
    controls: boolean;
    agents: number;
    mobileAgents: number;
    speed: number;
    tour: boolean;
    returnToTop: boolean;
    targetSeconds: number;
    maxSeconds: number;
    onStop: () => void;
  }) => SwarmRun;
  skip: () => void;
  state: () => unknown;
};

declare global {
  interface Window {
    Swarm?: SwarmEngine;
  }
}

let enginePromise: Promise<SwarmEngine> | undefined;

function loadEngine(): Promise<SwarmEngine> {
  if (window.Swarm) return Promise.resolve(window.Swarm);
  if (enginePromise) return enginePromise;

  enginePromise = new Promise<SwarmEngine>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/vendor/swarm-animation/swarm.js";
    script.async = true;
    const finish = (error?: Error) => {
      clearTimeout(timeout);
      script.onload = script.onerror = null;
      script.remove();
      if (error) reject(error);
      else if (window.Swarm) resolve(window.Swarm);
      else reject(new Error("The animation script did not initialize."));
    };
    const timeout = setTimeout(() => finish(new Error("The animation script timed out.")), 10000);
    script.onload = () => finish();
    script.onerror = () => finish(new Error("The animation script could not load."));
    document.body.append(script);
  }).finally(() => {
    enginePromise = undefined;
  });
  return enginePromise;
}

export async function playSwarmPreview(
  root: HTMLElement,
  signal: AbortSignal,
  onStart: () => void,
): Promise<void> {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (signal.aborted || motion.matches) return;
  const engine = await loadEngine();
  if (signal.aborted || motion.matches || !root.isConnected) return;

  // The engine owns only these inert copies. React keeps ownership of the page.
  return new Promise<void>((resolve, reject) => {
    const snapshot = document.createElement("div");
    snapshot.className = "swarm-preview";
    snapshot.setAttribute("aria-hidden", "true");
    snapshot.setAttribute("inert", "");
    const sources: HTMLElement[] = [];
    let run: SwarmRun | undefined;
    let finished = false;

    const finish = (error?: unknown) => {
      if (finished) return;
      finished = true;
      run?.stop();
      snapshot.remove();
      sources.forEach((source) => source.removeAttribute("data-swarm-hidden"));
      signal.removeEventListener("abort", stop);
      ["scroll", "resize", "pagehide"].forEach((event) => window.removeEventListener(event, stop));
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
      if (error) reject(error);
      else resolve();
    };
    const stop = () => finish();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") stop();
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-swarm-control]")) stop();
    };
    const onVisibility = () => { if (document.hidden) stop(); };
    const onMotion = () => { if (motion.matches) stop(); };

    try {
      for (const source of root.querySelectorAll<HTMLElement>("[data-swarm-target]")) {
        const rect = source.getBoundingClientRect();
        if (!rect.width || !rect.height || rect.bottom <= 0 || rect.top >= innerHeight) continue;
        const copy = source.cloneNode(true) as HTMLElement;
        const style = getComputedStyle(source);
        copy.removeAttribute("id");
        copy.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
        // These properties can come from ancestors outside the copied subtree.
        for (const key of ["fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight", "letterSpacing", "color", "textAlign", "textTransform"] as const) {
          copy.style[key] = style[key];
        }
        Object.assign(copy.style, {
          position: "absolute", margin: "0", boxSizing: "border-box",
          left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`,
        });
        snapshot.append(copy);
        sources.push(source);
      }
      if (!sources.length) { resolve(); return; }
      document.body.append(snapshot);
      sources.forEach((source) => source.setAttribute("data-swarm-hidden", ""));
      signal.addEventListener("abort", stop, { once: true });
      ["scroll", "resize", "pagehide"].forEach((event) => window.addEventListener(event, stop, { passive: true }));
      window.addEventListener("keydown", onKey);
      document.addEventListener("click", onClick, true);
      document.addEventListener("visibilitychange", onVisibility);
      motion.addEventListener("change", onMotion);
      run = engine.run({
        root: snapshot, controls: false, agents: 8, mobileAgents: 6,
        speed: 1, tour: false, returnToTop: false,
        targetSeconds: 4, maxSeconds: 5, onStop: stop,
      });
      onStart();
    } catch (error) {
      finish(error);
    }
  });
}
