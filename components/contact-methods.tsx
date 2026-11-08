"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Copy } from "lucide-react";
import { useLanguage } from "@/lib/i18n-context";
import { supportCopy } from "@/lib/support-copy";

const telegramHandle = "newbdez33";

// Brand paths: Simple Icons, CC0-1.0.
// https://github.com/simple-icons/simple-icons/tree/1bb2f6e6ea50f920de8d2f3d273ae48564a5eaee/icons
function WeChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-foreground/80" aria-hidden="true" focusable="false">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-foreground/80" aria-hidden="true" focusable="false">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-foreground/80" aria-hidden="true" focusable="false">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const idContacts = [
  { channel: "wechat", name: "WeChat", id: "newbdez33", Icon: WeChatIcon },
  { channel: "line", name: "LINE", id: "newbdez33", Icon: LineIcon },
] as const;

export function ContactMethods() {
  const { language } = useLanguage();
  const copy = supportCopy[language].contact;
  const inputRefs = {
    wechat: useRef<HTMLInputElement>(null),
    line: useRef<HTMLInputElement>(null),
  };
  const [status, setStatus] = useState<{ channel: "wechat" | "line"; result: "copied" | "manual" } | null>(null);

  async function copyId({ channel, id }: typeof idContacts[number]) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(id);
      setStatus({ channel, result: "copied" });
    } catch {
      inputRefs[channel].current?.focus();
      inputRefs[channel].current?.select();
      setStatus({ channel, result: "manual" });
    }
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13rem),1fr))] gap-3">
        {idContacts.map(contact => (
          <div key={contact.channel} className="flex min-w-0 items-center gap-3 rounded-lg border border-white/15 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><contact.Icon />{contact.name}</p>
              <input ref={inputRefs[contact.channel]} aria-label={copy[contact.channel].idLabel} readOnly value={contact.id} spellCheck={false} className="mt-1 block w-full min-w-0 rounded-sm bg-transparent font-sans text-base font-medium text-foreground focus-visible:outline-2 focus-visible:outline-ring" />
            </div>
            <button type="button" onClick={() => copyId(contact)} aria-label={copy[contact.channel].copyLabel} className="shrink-0 rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"><Copy className="size-4" aria-hidden="true" /></button>
          </div>
        ))}
        <a href={`https://t.me/${telegramHandle}`} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center justify-between gap-3 rounded-lg border border-white/15 px-4 py-3 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-ring">
          <span className="min-w-0"><span className="flex items-center gap-2 text-sm text-muted-foreground"><TelegramIcon />Telegram</span><span className="mt-1 block text-base font-medium text-foreground">@{telegramHandle}</span></span>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">{copy.purposeNote}</p>
      <p role="status" className={status ? "mt-3 text-sm leading-[1.8] text-muted-foreground" : "sr-only"}>{status ? copy[status.channel][status.result] : ""}</p>
    </div>
  );
}
