import type { Metadata } from "next";
import { SupportTerms } from "@/components/support-terms";

export const metadata: Metadata = {
  title: "Service rules | Jacky",
  description: "Technical advisory plans, support time, annual refunds, and draft service terms.",
};

export default function SupportTermsPage() {
  return <SupportTerms />;
}
