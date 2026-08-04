"use client";

import { useState } from "react";
import { usePrivateAiI18n } from "@/lib/private-ai-i18n";

const tabs = ["mon", "audit", "set"] as const;

export function AdminConsole() {
  const { t } = usePrivateAiI18n();
  const [active, setActive] = useState<string>("mon");

  return (
    <section className="px-6 py-[72px] pb-2">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#b98a2e]">Admin Console</div>
        <h2 className="font-serif text-[clamp(24px,3.4vw,32px)] mt-2.5 mb-3.5">{t.consoleH2}</h2>
        <p className="text-[#4b564d] dark:text-[#a9b4a7] max-w-[44em]">{t.consoleLead}</p>

        <div className="flex gap-2 flex-wrap mt-5 mb-3" role="group" aria-label="Console screens">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`appearance-none font-inherit text-[13px] font-bold cursor-pointer px-5 py-[7px] rounded-full border transition-all ${
                active === tab
                  ? "bg-[#2e7d46] dark:bg-[#63bd85] border-[#2e7d46] dark:border-[#63bd85] text-white dark:text-[#0f1a14]"
                  : "bg-[#ffffff] dark:bg-[#1a221a] text-[#4b564d] dark:text-[#a9b4a7] border-[#dee3dc] dark:border-[#2b352b] hover:text-[#182019] dark:hover:text-[#e7ece5]"
              }`}
            >
              {tab === "mon" ? t.consoleTab1 : tab === "audit" ? t.consoleTab2 : t.consoleTab3}
            </button>
          ))}
        </div>

        <div className="relative">
          {tabs.map((tab) => (
            <img
              key={tab}
              src={`/images/console-${tab}.png`}
              alt={`${tab === "mon" ? t.consoleTab1 : tab === "audit" ? t.consoleTab2 : t.consoleTab3}`}
              className={`w-full h-auto border border-[#dee3dc] dark:border-[#2b352b] rounded-xl shadow-[0_14px_40px_rgba(15,26,20,0.14)] ${
                active === tab ? "block" : "hidden"
              }`}
            />
          ))}
        </div>

        <p className="text-[12px] text-[#7e897f] dark:text-[#78847a] mt-2.5">{t.consoleNote}</p>
      </div>
    </section>
  );
}
