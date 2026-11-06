"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointer2, Square } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { playSwarmPreview } from "@/lib/swarm-preview";

export function SwarmPreview() {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");
  const [failed, setFailed] = useState(false);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => { request.current?.abort(); }, [language]);
  useEffect(() => () => {
    request.current?.abort();
    request.current = null;
  }, []);

  async function toggle(root: HTMLElement | null) {
    if (request.current) { request.current.abort(); return; }
    if (!root) return;
    const controller = new AbortController();
    request.current = controller;
    setFailed(false);
    setStatus("loading");
    try {
      await playSwarmPreview(root, controller.signal, () => setStatus("playing"));
    } catch {
      if (!controller.signal.aborted) setFailed(true);
    } finally {
      if (request.current === controller) {
        request.current = null;
        setStatus("idle");
      }
    }
  }

  const Icon = status === "playing" ? Square : MousePointer2;

  return (
    <div className="swarm-preview-control" data-swarm-control>
      <button
        type="button"
        disabled={status === "loading"}
        aria-pressed={status === "playing"}
        onClick={(event) => { void toggle(event.currentTarget.closest("main")); }}
        className="inline-flex min-h-9 items-center gap-2 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:opacity-50"
      >
        <Icon className="size-3.5" aria-hidden="true" />
        {status === "loading" ? t.swarm.loading : status === "playing" ? t.swarm.stop : t.swarm.play}
      </button>
      {failed && <p role="status" className="text-xs text-muted-foreground">{t.swarm.error}</p>}
    </div>
  );
}
