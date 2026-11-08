import type { Metadata } from "next";
import { SupportShell } from "@/components/support-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <SupportShell>{children}</SupportShell>;
}
