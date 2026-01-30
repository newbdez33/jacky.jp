# CLAUDE.md

This file provides guidance for AI assistants working with the jacky.jp portfolio codebase.

## Project Overview

This is **Jacky's Portfolio** - a minimal, dark-themed personal portfolio website for a Full-Stack Developer specializing in blockchain and quantitative trading. The site showcases a modern web development approach with clean design and excellent performance.

**Live deployment:** Static site hosted on Cloudflare Pages

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, React 19.2.3)
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS 4 with PostCSS
- **UI Components:** shadcn/ui (New York style)
- **Icons:** Lucide React
- **Testing:** Jest 30 + React Testing Library
- **Package Manager:** pnpm

## Project Structure

```
app/                          # Next.js App Router
├── layout.tsx               # Root layout, metadata, fonts, providers
├── page.tsx                 # Main landing page composition
└── globals.css              # Global styles, CSS variables, animations

components/                   # Feature and UI components
├── hero.tsx                 # Hero section with bio and greeting
├── github-contributions.tsx # GitHub activity grid and stats
├── footer.tsx               # Footer with social links and language switcher
├── ui/                      # Shadcn UI primitives
│   └── button.tsx           # Button component with CVA variants
└── __tests__/               # Component tests
    └── github-contributions.test.tsx

lib/                          # Utilities and context
├── i18n-context.tsx         # Internationalization (EN/JA)
└── utils.ts                 # cn() class merging utility
```

## Common Commands

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Create static export in /out directory
pnpm test         # Run Jest test suite
pnpm lint         # Run ESLint checks
```

## Architecture Decisions

### Client vs Server Components
- **Server Components** are the default (no directive needed)
- **Client Components** require `"use client"` directive at the top:
  - `hero.tsx` - Uses i18n context
  - `github-contributions.tsx` - Uses useState, useEffect, fetches API
  - `footer.tsx` - Language switcher interactivity

### Static Export
The site uses `output: 'export'` in `next.config.ts` for static generation. This means:
- No server-side APIs or dynamic routes
- All pages are pre-rendered at build time
- Image optimization is disabled (`images: { unoptimized: true }`)
- Deployable to any static host (Cloudflare Pages, GitHub Pages, Vercel)

### Styling Approach
- **Tailwind CSS utilities** for all styling (no custom CSS classes except globals)
- **OKLCH color space** for theme variables in globals.css
- **Dark mode enforced** at root level (`<html className="dark">`)
- **CVA (Class Variance Authority)** for component variants

### Internationalization
- Custom React Context in `lib/i18n-context.tsx`
- Supports English (EN) and Japanese (JA)
- Language stored in localStorage with browser detection fallback
- Access via `useLanguage()` hook

## Code Conventions

### Naming
- **Components:** PascalCase (`Hero`, `GithubContributions`)
- **Files:** kebab-case (`hero.tsx`, `github-contributions.tsx`)
- **Types:** Contextual names (`Language`, `Translations`, `Activity`)

### Imports
Path alias `@/*` maps to the project root:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Component Pattern
```typescript
"use client"  // Only if needed

import { ... } from "react"
import { cn } from "@/lib/utils"

export function ComponentName() {
  // Hooks first
  // Logic second
  // Return JSX
}
```

### Testing Pattern
Tests are co-located in `components/__tests__/`:
```typescript
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"

// Mock external modules as needed
jest.mock("react-github-calendar", () => ({ ... }))

describe("ComponentName", () => {
  it("should render correctly", () => { ... })
})
```

## External APIs

### GitHub Contributions
- **Endpoint:** `https://github-contributions-api.jogruber.de/v4/{username}`
- **Usage:** Fetches contribution data for the activity calendar
- **Error handling:** Try-catch with console.error logging

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, Google Inter font, LanguageProvider |
| `app/page.tsx` | Main page composing Hero, GithubContributions, Footer |
| `app/globals.css` | Theme variables (OKLCH), animations (wave), dark mode |
| `components/hero.tsx` | Bio, greeting with wave animation, i18n text |
| `components/github-contributions.tsx` | GitHub stats, ActivityCalendar, AWS badges |
| `lib/i18n-context.tsx` | Language context, translations, useLanguage hook |
| `lib/utils.ts` | `cn()` function (clsx + tailwind-merge) |
| `next.config.ts` | Static export config, image optimization disabled |
| `jest.config.ts` | Jest setup with jsdom, path alias mapping |

## Development Tips

1. **Run dev server** before making changes to see live updates
2. **Test changes** with `pnpm test` after modifying components
3. **Build locally** with `pnpm build` to verify static export works
4. **Check lint** with `pnpm lint` before committing

## Common Tasks

### Adding a new component
1. Create file in `components/` (kebab-case)
2. Export as named function (PascalCase)
3. Add `"use client"` only if using hooks, events, or context
4. Import using `@/components/` alias

### Updating translations
Edit `translations` object in `lib/i18n-context.tsx`:
```typescript
const translations: Translations = {
  en: { keyName: "English text" },
  ja: { keyName: "Japanese text" },
}
```

### Adding shadcn/ui component
```bash
npx shadcn@latest add [component-name]
```
Components are installed to `components/ui/`.

## Performance Considerations

- **Static generation:** All pages pre-rendered for fast TTFB
- **No localStorage caching for GitHub data:** Uses skeleton loading instead
- **Minimal JavaScript:** Only client components where necessary
- **Font optimization:** Inter loaded via next/font/google
