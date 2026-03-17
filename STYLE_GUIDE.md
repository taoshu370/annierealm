# AnnieRealm Style Guide — v2 (Futuristic Dark)

This document defines the design system for AnnieRealm's redesigned portfolio. The aesthetic direction is: **dark, futuristic, game-engine-inspired** — deep space backgrounds, glassmorphism panels, neon glow accents, and monospace technical typography.

---

## Table of Contents
1. [Design Principles](#design-principles)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [Animation System](#animation-system)
7. [Responsive Design](#responsive-design)
8. [Page Structure](#page-structure)
9. [Code Organization](#code-organization)

---

## Design Principles

- **Dark-first** — every page defaults to near-black backgrounds; no alternating white/cream sections
- **Glassmorphism panels** — cards and overlays use `backdrop-blur` + semi-transparent dark backgrounds + subtle borders
- **Glow accents** — purple and cyan glows applied on hover states and featured elements
- **Monospace callouts** — section labels, overlines, and technical tags use `font-mono`
- **Entrance animation** — sections and cards use `animate-fade-up` with staggered delays
- **No decorative alternation** — sections are visually separated by `border-t border-border`, not color changes

---

## Color Palette

### CSS Variables (`:root` in `globals.css`)

```css
--space: #030712        /* page background — deepest layer */
--void: #0D1117         /* card/panel background */
--surface: #161B22      /* elevated surfaces, inputs */
--surface-2: #21262D    /* hover surfaces */
--border: #30363D       /* default borders */
--text: #E6EDF3         /* primary text */
--text-muted: #7D8590   /* secondary/muted text */
--accent-purple: #A855F7 /* primary accent — CTAs, glows */
--accent-cyan: #22D3EE  /* secondary accent — links, highlights */
--accent-green: #3FB950 /* "Shipped" status */
--accent-amber: #D29922 /* "Prototype" status */
```

### Tailwind Color Tokens

All CSS variables are registered as Tailwind tokens via `@theme` in `globals.css`. Usage:

```tsx
className="bg-space"           // page background
className="bg-void"            // card background
className="bg-surface"         // input/elevated surface
className="text-text"          // primary text
className="text-text-muted"    // muted text
className="text-accent-purple" // purple accent text
className="text-accent-cyan"   // cyan accent text
className="text-accent-green"  // shipped status
className="text-accent-amber"  // prototype status
className="border-border"      // standard border
```

### Rules
- Never use hardcoded hex values in components
- Use opacity modifiers for hover/glow states: `border-accent-purple/40`, `bg-accent-purple/10`
- Use `text-text-muted` for secondary text, never raw `opacity-60`

---

## Typography

### Fonts

| Role | Font | Variable | Tailwind Class |
|---|---|---|---|
| Display/Headings | Oxanium | `--font-oxanium` | `font-display` |
| Body | Inter | `--font-inter` | `font-sans` |
| Technical/Mono | JetBrains Mono | `--font-jetbrains` | `font-mono` |

### Type Scale

**Page titles / Hero headings (H1):**
```tsx
<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text">
  Title
</h1>
```

**Section headings (H2):**
```tsx
<h2 className="font-display text-3xl md:text-4xl font-bold text-text">
  Section
</h2>
```

**Card titles (H3):**
```tsx
<h3 className="font-display text-xl md:text-2xl font-bold text-text">
  Card Title
</h3>
```

**Overline labels (section labels above headings):**
```tsx
<p className="font-mono text-xs text-accent-purple tracking-widest uppercase mb-3">
  Section Label
</p>
```

**Body text:**
```tsx
<p className="text-base md:text-lg text-text-muted leading-relaxed">
  Paragraph content.
</p>
```

**Breadcrumbs / metadata:**
```tsx
<span className="font-mono text-xs text-text-muted">
  Games / Big Brother
</span>
```

### Typography Rules
- Always use `font-display` (Oxanium) for headings
- Use `font-mono` (JetBrains Mono) for overline labels, tags, and breadcrumbs
- Use `font-sans` (Inter) for body text
- Use `text-text` for primary, `text-text-muted` for secondary
- Gradient text for hero/featured headings: `gradient-text` CSS class

---

## Spacing & Layout

### Section Component

`Section` provides consistent padding and max-width:

```tsx
<Section>            {/* py-16 md:py-24, max-w-7xl */}
<Section narrow>     {/* py-16 md:py-24, max-w-4xl — for text-heavy sections */}
<Section className="border-t border-border">  {/* with separator */}
<Section className="border-t border-border bg-void">  {/* with dark tint */}
```

**Section separators:** Use `border-t border-border` rather than alternating backgrounds.

### Max Widths

- `max-w-7xl mx-auto` — standard page content (handled by Section)
- `max-w-4xl mx-auto` — text-heavy sections (use `narrow` prop on Section)
- `max-w-2xl mx-auto` — centered CTA sections
- Full-bleed hero sections use no max-width container

### Grid Layouts

**2-column game grid:**
```tsx
<div className="grid gap-5 grid-cols-1 md:grid-cols-2">
```

**3-column game grid:**
```tsx
<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**4-column highlights grid:**
```tsx
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

---

## Component Patterns

### Button

```tsx
import Button from "@/components/Button";

<Button href="/games" variant="primary">Explore Games</Button>
<Button href="/about" variant="ghost">About Me →</Button>
<Button href="/trailer" variant="cyan">Watch Trailer</Button>
<Button type="submit" variant="primary" disabled={isSubmitting}>
  {isSubmitting ? "Sending..." : "Send Message →"}
</Button>
```

**Variants:**
- `primary` — `bg-accent-purple` with glow on hover. Use for primary CTAs.
- `ghost` — transparent with `border-border`, turns purple on hover. Secondary actions.
- `cyan` — cyan border/text with glow. Use for video/trailer links.
- `secondary` — dark surface. Tertiary actions.

**Sizes:** `sm` | `md` (default) | `lg`

### Badge

```tsx
import Badge from "@/components/Badge";

<Badge variant="shipped">Shipped</Badge>
<Badge variant="prototype">Prototype</Badge>
<Badge variant="jam">Jam</Badge>
<Badge variant="mono">Game Design</Badge>
<Badge variant="purple">Featured</Badge>
<Badge variant="cyan">Link</Badge>
```

**Status badges map to game status values:**
- `shipped` → green tint (`text-accent-green`)
- `prototype` → amber tint (`text-accent-amber`)
- `jam` → purple tint
- `mono` → dark chip with monospace font, for role/tech labels

### Card

```tsx
import Card from "@/components/Card";

<Card hover>           {/* glass card with hover lift + glow */}
<Card glow>            {/* always-on glow border */}
<Card>                 {/* plain glass card */}
```

Cards use the `.glass` CSS utility: `backdrop-blur(12px)` + semi-transparent `bg-void` + `border-border`.

### Section Overline Pattern

Every section should start with a monospace overline label:

```tsx
<Section className="border-t border-border">
  <p className="font-mono text-xs text-accent-purple tracking-widest uppercase mb-4">
    Section Label
  </p>
  <h2 className="font-display text-3xl font-bold text-text mb-6">
    Section Heading
  </h2>
  {/* content */}
</Section>
```

---

## Animation System

### CSS Animation Classes

Defined via `@keyframes` in `globals.css` and registered as `--animate-*` tokens:

| Class | Effect | Use when |
|---|---|---|
| `animate-fade-up` | Fades in + slides up 28px | Section entry, card reveal |
| `animate-fade-in` | Fades in only | Logo, overlays |
| `animate-glow-pulse` | Pulsing box-shadow | Primary CTA button |

### Staggered Entrance

```tsx
{items.map((item, i) => (
  <div
    key={item.slug}
    className="animate-fade-up"
    style={{ animationDelay: `${i * 0.1}s` }}
  >
    <GameCard {...item} />
  </div>
))}
```

### Hover Glows

Use Tailwind shadow utilities defined in `@theme`:

```tsx
className="hover:shadow-glow"        // purple glow
className="hover:shadow-glow-cyan"   // cyan glow
className="hover:shadow-glow-sm"     // subtle purple glow
```

### Glassmorphism

```tsx
className="glass rounded-xl border border-border"
```

The `.glass` class: `background: rgba(13,17,23,0.75); backdrop-filter: blur(12px);`

### Gradient Text

```tsx
<span className="gradient-text">
  highlighted text
</span>
```

The `.gradient-text` class applies a `linear-gradient(135deg, #A855F7, #22D3EE)` via `background-clip: text`.

---

## Responsive Design

### Breakpoint Strategy

Mobile-first with Tailwind breakpoints:

- **base**: single column, compact typography
- **sm (640px)**: 2-column form grids, wider hero copy
- **md (768px)**: 2-column game grid, `text-4xl` → `text-5xl` headings
- **lg (1024px)**: 3-column game grid, side-by-side about layout, desktop nav
- **xl (1280px)**: capped at `max-w-7xl`

### Common Responsive Patterns

```tsx
// Typography
className="text-4xl md:text-5xl lg:text-6xl"    // page title
className="text-3xl md:text-4xl"                 // section heading
className="text-base md:text-lg"                 // body text

// Grids
className="grid-cols-1 md:grid-cols-2"            // 2-col
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // 3-col

// Layout direction
className="flex-col sm:flex-row"                  // stack → horizontal
className="lg:grid-cols-5"                        // asymmetric grid for bio
```

---

## Page Structure

### Standard Page Template

```tsx
export default function MyPage() {
  return (
    <>
      {/* Page header — full-width, no max-width container */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-border relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs text-accent-purple tracking-widest uppercase mb-3">
            Section Label
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-text">
            Page Title
          </h1>
        </div>
      </section>

      {/* Content sections */}
      <Section>
        {/* content */}
      </Section>

      <Section className="border-t border-border bg-void">
        {/* content with subtle tint */}
      </Section>
    </>
  );
}
```

### Page Header Gradient

Every non-home page header uses a subtle color gradient:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-cyan/5 pointer-events-none" />
<div className="absolute inset-0 bg-gradient-to-t from-space via-transparent to-transparent pointer-events-none" />
```

---

## Code Organization

### Import Order

```tsx
import type { Metadata } from "next";    // 1. Next.js / type imports
import Image from "next/image";
import Link from "next/link";

import Section from "@/components/Section";  // 2. Components
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Card from "@/components/Card";

import { getAllGames } from "@/lib/content";  // 3. Data / lib
```

### File Conventions

- Pages export `metadata` (server components only) and a default function named `PageName`
- Client components have `"use client"` as the first line
- TypeScript interfaces defined at the top of the file, before the component
- Use `ReactNode` for `children` props

### Color Usage Rules

1. Never use raw hex values in className
2. Use semantic token names (`text-text-muted` not `text-gray-500`)
3. Use opacity modifiers for soft glows (`border-accent-purple/40`, `bg-accent-purple/10`)
4. For inline styles (e.g., animation delays), use `style={{ animationDelay: "0.2s" }}`

---

## Quick Reference Checklist

When creating or modifying a page/component:

- [ ] Dark-first — no `bg-white` or light backgrounds
- [ ] Page header uses overline + H1 + optional subtitle pattern
- [ ] Sections separated by `border-t border-border`, not background color
- [ ] Section content starts with monospace overline label
- [ ] Headings use `font-display` (Oxanium)
- [ ] Technical labels / breadcrumbs use `font-mono`
- [ ] Buttons use new variants: `primary`, `ghost`, `cyan`, `secondary`
- [ ] Cards use `.glass` + `border-border` + `hover:border-accent-purple/40 hover:shadow-glow`
- [ ] Status badges use correct variant: `shipped` → green, `prototype` → amber
- [ ] Responsive breakpoints: base → sm → md → lg → xl
- [ ] No alternating white/cream sections

---

**Last Updated:** March 2026 — v2 Redesign
