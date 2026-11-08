# Jacky's Portfolio and Technical Advisory

A minimal, dark-themed portfolio and technical advisory website built with Next.js, Tailwind CSS, and Shadcn UI.

## Overview

This website presents Jacky's development and infrastructure experience, technical advisory plans, and contact options in English, Japanese, and Chinese. Visitors can discuss their needs through WeChat, LINE, or Telegram, then agree on a payment method. The site does not process payments or bookings.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **GitHub Calendar**: [react-activity-calendar](https://github.com/grubersjoe/react-activity-calendar) + [react-tooltip](https://react-tooltip.com/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom CSS animations & [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## Features

- 🌓 **Dark Mode**: Deep dark theme by default.
- 📊 **GitHub Contributions**: Interactive GitHub contribution graph with lifetime stats.
- ⚡ **Responsive Design**: Optimized for mobile and desktop.
- 🎨 **Minimalist UI**: Clean typography and spacing.
- 💬 **Technical Advisory**: Casual subscriptions, separate consultations, and direct contact options.
- 🌐 **Three Languages**: English, Japanese, and Chinese, with a shared font and language selection through `?lang=en`, `?lang=ja`, or `?lang=zh`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production deploys run on **Cloudflare** from the connected Git repository (no manual upload steps in this README).

## Project Structure

- `app/`: Next.js app router pages and layout.
- `components/`: Reusable UI components (Hero, etc.).
- `lib/`: Utility functions.

## Customization

Profile and plan content is in `lib/advisory-copy.ts`. Fixed advisory prices are in `lib/advisory-pricing.ts`: USD for English, JPY for Japanese, and CNY for Chinese. Service rules and contact labels are in `lib/support-copy.ts`. The `/support/terms` page separates confirmed rules from draft terms and is excluded from indexing while those terms are under review. See [advisory service notes](docs/advisory-launch.md) for the manual payment and booking process.

Styles are defined in `app/globals.css`.

## License

This project is open source and available under the [MIT License](LICENSE).
