# Hardcoded Colors Report

Generated: 2026-02-16T22:05:39.302Z

## Summary

| Metric | Value |
|--------|-------|
| Files with Hardcoded Colors | 11 |
| Total Hardcoded Color Instances | 34 |

### Color Types

| Type | Count |
|------|-------|
| Named Colors | 34 |

## Files with Hardcoded Colors

### middleware.ts

**Total colors:** 12

#### Named Colors (12)

- **Line 8:** `red`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 8:** `rose`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 8:** `orange`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 8:** `green`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 8:** `blue`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 8:** `yellow`
  `'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',`
- **Line 9:** `violet`
  `'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',`
- **Line 9:** `indigo`
  `'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',`
- **Line 9:** `cyan`
  `'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',`
- **Line 9:** `lime`
  `'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',`
- **Line 10:** `fuchsia`
  `'fuchsia', 'pink'`
- **Line 10:** `pink`
  `'fuchsia', 'pink'`

### features/tools/emoji/emoji-data.ts

**Total colors:** 7

#### Named Colors (7)

- **Line 105:** `red`
  `{ emoji: "😡", name: "Pouting Face", category: "Smileys & People", keywords: ["angry", "mad", "re...`
- **Line 176:** `Red`
  `{ emoji: "❤️", name: "Red Heart", category: "Social & Popular", keywords: ["love", "heart", "popu...`
- **Line 244:** `yellow`
  `{ emoji: "🐤", name: "Baby Chick", category: "Animals & Nature", keywords: ["animal", "bird", "ye...`
- **Line 245:** `yellow`
  `{ emoji: "🐥", name: "Front-Facing Baby Chick", category: "Animals & Nature", keywords: ["animal"...`
- **Line 255:** `Red`
  `{ emoji: "🍎", name: "Red Apple", category: "Food & Drink", keywords: ["fruit", "food", "healthy"...`
- **Line 258:** `Green`
  `{ emoji: "🥗", name: "Green Salad", category: "Food & Drink", keywords: ["food", "healthy", "vege...`
- **Line 280:** `Red`
  `{ emoji: "❤️", name: "Red Heart", category: "Symbols", keywords: ["love", "like", "passion"] },`

### app/(main)/inputs/page.tsx

**Total colors:** 3

#### Named Colors (3)

- **Line 429:** `Red`
  `<p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Red * until valid</p>`
- **Line 436:** `Green`
  `<p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Green * when validated</p>`
- **Line 443:** `Green`
  `<p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Green ✓ when validated (not require...`

### features/command-menu/draggable-tool-window.tsx

**Total colors:** 2

#### Named Colors (2)

- **Line 132:** `white`
  `"flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 select-none",`
- **Line 132:** `white`
  `"flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 select-none",`

### features/tools/password-generator.tsx

**Total colors:** 2

#### Named Colors (2)

- **Line 65:** `white`
  `<div className="space-y-6 bg-white/5 rounded-xl p-4 border border-white/5">`
- **Line 65:** `white`
  `<div className="space-y-6 bg-white/5 rounded-xl p-4 border border-white/5">`

### features/tools/stopwatch.tsx

**Total colors:** 2

#### Named Colors (2)

- **Line 86:** `white`
  `<div key={i} className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:...`
- **Line 86:** `white`
  `<div key={i} className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:...`

### features/tools/unit-converter.tsx

**Total colors:** 2

#### Named Colors (2)

- **Line 253:** `white`
  `<div className="bg-white/5 rounded-2xl border border-white/5 p-6 shadow-lg space-y-6">`
- **Line 253:** `white`
  `<div className="bg-white/5 rounded-2xl border border-white/5 p-6 shadow-lg space-y-6">`

### components/ui/scroll-blur.tsx

**Total colors:** 1

#### Named Colors (1)

- **Line 51:** `black`
  `let gradient = `transparent ${p1}%, black ${p2}%``

### features/tools/calculator.tsx

**Total colors:** 1

#### Named Colors (1)

- **Line 119:** `white`
  `<div className="flex-1 w-full max-w-[320px] mx-auto bg-primary/5 rounded-xl p-4 flex flex-col gap...`

### features/tools/lorem-ipsum.tsx

**Total colors:** 1

#### Named Colors (1)

- **Line 38:** `white`
  `<div className="flex items-center gap-4 p-4 border-b border-primary/5 bg-white/5">`

### features/tools/uuid-generator.tsx

**Total colors:** 1

#### Named Colors (1)

- **Line 63:** `white`
  `<div className="w-full max-w-sm space-y-2 pt-4 border-t border-white/5">`


## Recommendations

1. **Create color variables**: Move hardcoded colors to theme configuration or CSS custom properties
2. **Use semantic names**: Replace color values with semantic names like `--color-primary`, `--color-error`
3. **Centralize color definitions**: Keep all color definitions in a single location (e.g., `src/config/theme/colors.ts`)
4. **Use design tokens**: Consider using a design token system for better maintainability
5. **Document color usage**: Add comments explaining why specific colors are used where they are
