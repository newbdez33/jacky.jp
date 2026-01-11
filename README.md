# Jacky's Portfolio

A minimal, dark-themed portfolio website built with Next.js, Tailwind CSS, and Shadcn UI.

## Overview

This is a personal portfolio website for Jacky, a Full-Stack Developer specializing in blockchain and finance. The design focuses on simplicity and clean aesthetics, featuring a dark mode interface.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom CSS animations & [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

## Features

- 🌓 **Dark Mode**: Deep dark theme by default.
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

## Deployment

This project is configured for **Static Export** (`output: 'export'`), making it easy to deploy to **Cloudflare Pages**, GitHub Pages, or any static hosting service.

### Build

To create the production build:

```bash
npm run build
# or
pnpm run build
```

This will generate an `out/` directory containing the static files.

### Deploy to Cloudflare Pages

You can deploy using [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```bash
npx wrangler pages deploy out
```

## Project Structure

- `app/`: Next.js app router pages and layout.
- `components/`: Reusable UI components (Hero, etc.).
- `lib/`: Utility functions.

## Customization

You can modify the content in `components/hero.tsx` to update the personal information.
Styles are defined in `app/globals.css`.

## License

This project is open source and available under the [MIT License](LICENSE).
