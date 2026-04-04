import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = new URL("https://jacky.jp");
const defaultDescription =
  "Full-stack developer in Tokyo shipping AI products—internal tools, consumer apps, and public-sector work—with blockchain and trading-bot experience.";

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Jacky | Portfolio",
  description: defaultDescription,
  openGraph: {
    title: "Jacky | Portfolio",
    description: defaultDescription,
    url: siteUrl,
    siteName: "Jacky",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jacky | Portfolio",
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
