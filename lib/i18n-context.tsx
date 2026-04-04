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
        part1: "I'm a passionate ",
        role: "Full-Stack Developer",
        part2: " based in ",
        location: "Tokyo",
        part3: ", currently focusing on ",
        ai: "AI",
        comma1: ", ",
        blockchain: "Blockchain",
        comma2: ", and ",
        tradingBot: "trading bot",
        part4:
          " projects, spanning internal tools and consumer apps. Lately I'm focused on public-sector work—collaborating with teams of 10+ and guiding new products from 0 to 1.",
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
        part3: "を拠点に活動しています。現在は",
        ai: "AI",
        comma1: "、",
        blockchain: "ブロックチェーン",
        comma2: "、",
        tradingBot: "トレードボット",
        part4:
          "の領域で、実際に使われるプロダクトを作り込むのが好きです。社内ツールから一般向けアプリまで幅広く手がけ、最近は公共系の案件も増えてきました。10名を超えるチームで協力しながら、新規プロジェクトをゼロから立ち上げるところにやりがいを感じています。",
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
