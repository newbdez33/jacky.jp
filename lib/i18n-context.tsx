"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ja" | "zh";

type Translations = {
  hero: {
    greeting: string;
    description: {
      part1: string;
      role: string;
      part2: string;
      location: string;
      part3: string;
      ai: string;
      comma1: string;
      blockchain: string;
      comma2: string;
      tradingBot: string;
      part4: string;
    };
  };
  footer: {
    reachMe: string;
    madeWith: string;
    rights: string;
  };
  tokenUsage: {
    title: string;
    viewUsage: string;
    loadError: string;
    totalPrefix: string;
    totalSuffix: string;
    dayUsage: string;
  };
  github: {
    totalContributionsPrefix: string;
    totalContributionsSuffix: string;
    loadError: string;
    sectionAriaLabel: string;
  };
};

const translations: Record<Language, Translations> = {
  en: {
    hero: {
      greeting: "Hello! I'm Jacky",
      description: {
        part1: "I'm a ",
        role: "Full-Stack Developer",
        part2: " based in ",
        location: "Tokyo",
        part3: ", focused on ",
        ai: "machine learning and AI",
        comma1: ". I build internal tools and consumer apps, with experience in ",
        blockchain: "blockchain",
        comma2: " and ",
        tradingBot: "trading bots",
        part4:
          ". I also work with teams of 10+ on public-sector projects, helping bring new products from idea to launch.",
      },
    },
    footer: {
      reachMe: "Reach me from",
      madeWith: "Made with ❤️",
      rights: "Jacky. All rights reserved.",
    },
    tokenUsage: {
      title: "AI Token Usage",
      viewUsage: "View usage",
      loadError: "Could not load AI usage data. Try again later.",
      totalPrefix: "Total ",
      totalSuffix: " tokens in the last 365 days",
      dayUsage: "{tokens} tokens on {date}",
    },
    github: {
      totalContributionsPrefix: "Total ",
      totalContributionsSuffix: " contributions in lifetime",
      loadError: "Could not load GitHub contribution data. Try again later.",
      sectionAriaLabel: "GitHub contributions",
    },
  },
  ja: {
    hero: {
      greeting: "こんにちは！Jackyです",
      description: {
        part1: "",
        role: "フルスタック開発者",
        part2: "として",
        location: "東京",
        part3: "を拠点に活動し、",
        ai: "機械学習とAI",
        comma1: "に注力しています。社内ツールや一般向けアプリを開発し、",
        blockchain: "ブロックチェーン",
        comma2: "や",
        tradingBot: "トレードボット",
        part4:
          "の開発経験もあります。公共系プロジェクトでは10名を超えるチームと協力し、新しいプロダクトの企画からリリースまでを支援しています。",
      },
    },
    footer: {
      reachMe: "お問い合わせ",
      madeWith: "Made with ❤️",
      rights: "Jacky. All rights reserved.",
    },
    tokenUsage: {
      title: "AIトークン使用量",
      viewUsage: "使用量を見る",
      loadError: "AI使用量を読み込めませんでした。しばらくしてから再度お試しください。",
      totalPrefix: "過去365日間の合計: ",
      totalSuffix: " トークン",
      dayUsage: "{date}: {tokens} トークン",
    },
    github: {
      totalContributionsPrefix: "生涯のコントリビューション総数: ",
      totalContributionsSuffix: "",
      loadError: "GitHub のコントリビューションを読み込めませんでした。しばらくしてから再度お試しください。",
      sectionAriaLabel: "GitHub のコントリビューション",
    },
  },
  zh: {
    hero: {
      greeting: "你好，我是 Jacky",
      description: {
        part1: "我是一名", role: "全栈开发者", part2: "，在", location: "东京",
        part3: "工作，专注于", ai: "机器学习与 AI",
        comma1: "。我开发内部工具和面向用户的应用，也有", blockchain: "区块链",
        comma2: "与", tradingBot: "交易机器人",
        part4: "的开发经验。在公共系项目中，我与十余人的团队协作，帮助产品从构想到上线。",
      },
    },
    footer: { reachMe: "联系我", madeWith: "Made with ❤️", rights: "Jacky. 保留所有权利。" },
    tokenUsage: {
      title: "AI Token 用量", viewUsage: "查看用量",
      loadError: "无法加载 AI 用量，请稍后重试。",
      totalPrefix: "过去 365 天累计 ", totalSuffix: " Token",
      dayUsage: "{date}：{tokens} Token",
    },
    github: {
      totalContributionsPrefix: "累计 ", totalContributionsSuffix: " 次贡献",
      loadError: "无法加载 GitHub 贡献数据，请稍后重试。", sectionAriaLabel: "GitHub 贡献记录",
    },
  },
};

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ja" || value === "zh";
}

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    queueMicrotask(() => {
      const requested = new URLSearchParams(window.location.search).get("lang");
      let saved: string | null = null;
      try { saved = localStorage.getItem("language"); } catch { /* Use the browser language if storage is blocked. */ }
      if (isLanguage(requested) || isLanguage(saved)) {
        setLanguage(isLanguage(requested) ? requested : saved as Language);
        return;
      }
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith("zh") ? "zh" : browserLang.startsWith("ja") ? "ja" : "en");
    });
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try { localStorage.setItem("language", lang); } catch { /* Keep the selected language for this page. */ }
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", lang);
      window.history.replaceState(window.history.state, "", url);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
