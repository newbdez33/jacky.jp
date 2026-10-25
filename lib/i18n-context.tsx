"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ja";

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
    github: {
      totalContributionsPrefix: "生涯のコントリビューション総数: ",
      totalContributionsSuffix: "",
      loadError: "GitHub のコントリビューションを読み込めませんでした。しばらくしてから再度お試しください。",
      sectionAriaLabel: "GitHub のコントリビューション",
    },
  },
};

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
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "ja")) {
        setLanguage(savedLang);
        return;
      }
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith("ja") ? "ja" : "en");
    });
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
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
