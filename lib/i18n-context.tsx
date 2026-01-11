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
        part4: " projects, creating innovative solutions that tackle complex user challenges.",
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
        tradingBot: "トレーディングボット",
        part4: "のプロジェクトに注力し、複雑なユーザー課題を解決する革新的なソリューションを作成しています。",
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
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ja")) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("ja")) {
        setLanguage("ja");
      } else {
        setLanguage("en");
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Prevent hydration mismatch by rendering children only after mount, 
  // or accept the mismatch for initial render. 
  // Better approach for SEO is to default to EN on server and update on client,
  // but for a simple portfolio this is fine.
  
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
