# Jacky's Portfolio

A minimal, dark-themed portfolio website built with Next.js, Tailwind CSS, and Shadcn UI.

## Overview

This is a personal portfolio website for Jacky, a Full-Stack Developer specializing in blockchain and quantitative trading. The design focuses on simplicity and clean aesthetics, featuring a dark mode interface.

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
- 👋 **Interactive Elements**: Subtle animations (e.g., waving hand).

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

### Token usage image

The badge loads from `/api/token-usage` on the site domain. A Cloudflare Pages Function fetches the public SVG from Token Beats and caches valid responses for five minutes. The browser does not need access to `workers.dev`. Failed requests are not cached, and the existing link card remains available when the image cannot load.

`public/_routes.json` limits Function requests to the badge endpoint. All other pages and assets use static hosting. This does not require a scheduled build or GitHub Actions workflow.

`wrangler.toml` pins the runtime settings for local, preview, and production use. The `global_fetch_strictly_public` flag makes requests to the upstream Worker use its public URL. A failed image response includes an `X-Badge-Error` header for diagnosis.

To test the image route with the static site locally:

```bash
pnpm build
pnpm dlx wrangler@4.158.0 pages dev out --port 8788
```

`pnpm dev` runs Next.js only and does not run the Pages Function.

## Project Structure

- `app/`: Next.js app router pages and layout.
- `components/`: Reusable UI components (Hero, etc.).
- `lib/`: Utility functions.

## Customization

You can modify the content in `components/hero.tsx` to update the personal information.
Styles are defined in `app/globals.css`.

## License

This project is open source and available under the [MIT License](LICENSE).
