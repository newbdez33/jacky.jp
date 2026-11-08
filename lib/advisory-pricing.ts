const prices = {
  en: { locale: "en-US", prefix: "US$", monthly: 85, yearly: 850, session: 65 },
  ja: { locale: "ja-JP", prefix: "¥", monthly: 12999, yearly: 129999, session: 10000 },
  zh: { locale: "zh-CN", prefix: "CN¥", monthly: 550, yearly: 5500, session: 450 },
} as const;

export function getAdvisoryPricing(language: keyof typeof prices) {
  const plan = prices[language];
  const numbers = new Intl.NumberFormat(plan.locale, { maximumFractionDigits: 0 });
  const format = (amount: number) => `${plan.prefix}${numbers.format(amount)}`;

  return {
    monthly: format(plan.monthly),
    yearly: format(plan.yearly),
    session: format(plan.session),
    monthlyEquivalent: format(plan.yearly / 12),
    annualDiscount: `${((1 - plan.yearly / (plan.monthly * 12)) * 100).toFixed(1)}%`,
  };
}
