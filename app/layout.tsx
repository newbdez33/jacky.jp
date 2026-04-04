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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jacky — Full-stack developer, Tokyo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacky | Portfolio",
    description: defaultDescription,
    images: ["/og.png"],
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
