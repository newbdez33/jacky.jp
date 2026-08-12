import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private AI — Jacky",
  description:
    "Bank-grade on-premises private LLM powered by NVIDIA DGX Spark. Zero data leaves your network. Air-gapped by design.",
  openGraph: {
    title: "Private AI — Jacky",
    description:
      "Bank-grade on-premises private LLM powered by NVIDIA DGX Spark. Zero data leaves your network. Air-gapped by design.",
    url: "https://jacky.jp/private-ai",
    siteName: "Jacky",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Private AI — On-Premises LLM by Jacky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private AI — Jacky",
    description:
      "Bank-grade on-premises private LLM powered by NVIDIA DGX Spark. Zero data leaves your network.",
    images: ["/og.png"],
  },
};

export default function PrivateAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
