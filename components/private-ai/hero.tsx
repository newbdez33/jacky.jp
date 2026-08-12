"use client";

import { useEffect, useRef, useState } from "react";
import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function Hero() {
  const { t } = usePrivateAiI18n();
  const termRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const body = termRef.current;
    if (!body) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const d = t;
      const s = d.termScenes[0];
      body.innerHTML = `<div class="line"><span style="color:#5d6f61">$</span> <span style="color:#e7ece5">${s.cmd}</span></div>` +
        s.steps.map((st) => `<div class="line" style="color:#8fd6a4">${st.t}</div>`).join("") +
        `<div class="line" style="color:#5d6f61">${d.termClosing}</div>`;
      return;
    }

    let cancelled = false;
    let idx = 0;

    async function typeCmd(text: string, container: HTMLDivElement): Promise<void> {
      return new Promise((resolve) => {
        const row = document.createElement("div");
        row.className = "line";
        row.innerHTML = `<span style="color:#5d6f61">$</span> <span style="color:#e7ece5"></span><span class="cursor" style="display:inline-block;width:7px;height:13px;background:#8fd6a4;vertical-align:-2px;margin-left:2px"></span>`;
        container.appendChild(row);
        const u = row.querySelector("span:last-child") as HTMLSpanElement;
        const textSpan = row.querySelector("span:nth-child(2)") as HTMLSpanElement;
        let i = 0;
        function tick() {
          if (cancelled) return resolve();
          if (i < text.length) {
            textSpan.textContent! += text.charAt(i++);
            setTimeout(tick, 55 + Math.random() * 60);
          } else {
            setTimeout(() => {
              if (u && u.parentNode) u.remove();
              resolve();
            }, 500);
          }
        }
        tick();
      });
    }

    const b = body; // narrowed to HTMLDivElement
    async function playScene(scene: typeof t.termScenes[0], closing: string) {
      await typeCmd(scene.cmd, b);
      await wait(500);
      for (const st of scene.steps) {
        const el = document.createElement("div");
        el.className = "line";
        el.style.color = "#8fd6a4";
        el.textContent = st.t;
        b.appendChild(el);
        await wait(st.d);
      }
      const end = document.createElement("div");
      end.className = "line";
      end.style.color = "#5d6f61";
      end.textContent = closing;
      b.appendChild(end);
      await wait(4200);
    }

    async function loop() {
      while (!cancelled) {
        b.textContent = "";
        const d = t;
        const scene = d.termScenes[idx % d.termScenes.length];
        idx++;
        idxRef.current = idx;
        await playScene(scene, d.termClosing);
      }
    }

    loop();

    return () => {
      cancelled = true;
    };
  }, [t]);

  return (
    <div className="bg-[#0f1a14] text-[#e9efe8] px-6 py-[72px] md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs tracking-[0.22em] uppercase text-[#9fae9f] mb-9">
          {mounted ? t.brand : ""}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div>
            <h1
              className="font-serif text-[clamp(32px,5vw,50px)] font-bold leading-tight tracking-tight"
              dangerouslySetInnerHTML={{ __html: mounted ? t.h1 : "" }}
            />
            <p className="text-[#9fae9f] text-base mt-5 max-w-[38em]">
              {mounted ? t.sub : ""}
            </p>
            <div className="flex gap-3.5 flex-wrap mt-8">
              <a
                href="#plans"
                className="inline-block px-[30px] py-3 rounded font-bold text-sm bg-[#d8a851] text-[#231a06] hover:brightness-110 transition-all"
              >
                {mounted ? t.ctaPlans : ""}
              </a>
              <a
                href="mailto:newbdez33@gmail.com?subject=Private%20AI%20PoC"
                className="inline-block px-[30px] py-3 rounded font-bold text-sm border border-[#27392d] text-[#e9efe8] hover:border-[#9fae9f] transition-all"
              >
                {mounted ? t.ctaPoc : ""}
              </a>
            </div>
          </div>
          <div
            ref={termRef}
            className="bg-[#0a120d] border border-[#27392d] rounded-lg font-mono text-xs leading-relaxed p-5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] min-h-[220px]"
            aria-label="Demo terminal"
          />
        </div>
      </div>
    </div>
  );
}
