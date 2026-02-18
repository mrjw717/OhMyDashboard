# Code Analysis Report

Generated: 2026-02-17T02:03:49.753Z

## Summary

| Metric | Value |
|--------|-------|
| Total Files | 221 |
| Total Lines | 23174 |
| Code Lines | 18603 |
| Comment Lines | 2448 |
| Blank Lines | 2123 |
| Functions | 1092 |
| JSDoc Blocks | 340 |
| Hardcoded Colors | 523 |
| Avg Comment Density | 13.11% |
| Avg Code Density | 86.89% |

## File-by-File Analysis

| File | LOC | Code | Comments | Blank | Comment % | Code % | JSDoc | Functions | Classes | Colors |
|------|-----|------|----------|-------|-----------|--------|-------|-----------|---------|--------|
| app/(main)/design/backgrounds/page.tsx | 34 | 23 | 5 | 6 | 17.86% | 82.14% | 1 | 1 | 0 | 0 |
| app/(main)/inputs/page.tsx | 477 | 420 | 19 | 38 | 4.33% | 95.67% | 5 | 15 | 0 | 3 |
| app/(main)/layout.tsx | 16 | 9 | 4 | 3 | 30.77% | 69.23% | 1 | 1 | 0 | 0 |
| app/(main)/page.tsx | 202 | 182 | 8 | 12 | 4.21% | 95.79% | 2 | 2 | 0 | 2 |
| app/api/theme/route.ts | 65 | 46 | 10 | 9 | 17.86% | 82.14% | 3 | 3 | 0 | 12 |
| app/bg-test/page.tsx | 257 | 240 | 8 | 9 | 3.23% | 96.77% | 2 | 6 | 0 | 29 |
| app/error.tsx | 44 | 35 | 5 | 4 | 12.50% | 87.50% | 1 | 5 | 0 | 0 |
| app/layout.tsx | 121 | 112 | 0 | 9 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| app/not-found.tsx | 21 | 19 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| app/opengraph-image.tsx | 87 | 76 | 1 | 10 | 1.30% | 98.70% | 0 | 2 | 0 | 0 |
| app/theme-hydrator.tsx | 264 | 198 | 37 | 29 | 15.74% | 84.26% | 8 | 18 | 0 | 0 |
| ...out/backgrounds/aurora-background.tsx | 66 | 49 | 12 | 5 | 19.67% | 80.33% | 1 | 2 | 0 | 0 |
| ...rounds/futuristic-grid-background.tsx | 336 | 246 | 27 | 63 | 9.89% | 90.11% | 2 | 15 | 1 | 0 |
| .../backgrounds/geometric-background.tsx | 453 | 332 | 52 | 69 | 13.54% | 86.46% | 6 | 16 | 2 | 0 |
| ...grounds/global-background-manager.tsx | 65 | 46 | 12 | 7 | 20.69% | 79.31% | 1 | 4 | 0 | 0 |
| components/layout/backgrounds/index.ts | 7 | 6 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...out/backgrounds/neural-background.tsx | 447 | 319 | 61 | 67 | 16.05% | 83.95% | 9 | 18 | 2 | 0 |
| .../layout/backgrounds/noise-overlay.tsx | 28 | 25 | 0 | 3 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/layout/breadcrumbs.tsx | 48 | 43 | 0 | 5 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| ...ayout/console-drawer/console-cube.tsx | 316 | 170 | 109 | 37 | 39.07% | 60.93% | 4 | 12 | 0 | 0 |
| ...yout/console-drawer/electric-line.tsx | 225 | 169 | 14 | 42 | 7.65% | 92.35% | 0 | 9 | 0 | 0 |
| ...nents/layout/console-drawer/index.tsx | 184 | 132 | 42 | 10 | 24.14% | 75.86% | 2 | 4 | 0 | 0 |
| ...sole-drawer/sidebar-control-panel.tsx | 199 | 161 | 12 | 26 | 6.94% | 93.06% | 0 | 15 | 0 | 0 |
| ...onents/layout/console-drawer/types.ts | 33 | 6 | 24 | 3 | 80.00% | 20.00% | 3 | 0 | 0 | 0 |
| ...console-drawer/views/console-view.tsx | 221 | 133 | 72 | 16 | 35.12% | 64.88% | 3 | 14 | 0 | 0 |
| .../layout/console-drawer/views/index.ts | 21 | 3 | 17 | 1 | 85.00% | 15.00% | 1 | 0 | 0 | 0 |
| ...console-drawer/views/metrics-view.tsx | 138 | 121 | 0 | 17 | 0.00% | 100.00% | 0 | 9 | 0 | 0 |
| ...console-drawer/views/network-view.tsx | 85 | 76 | 0 | 9 | 0.00% | 100.00% | 0 | 4 | 0 | 0 |
| components/layout/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| components/layout/shell/header.tsx | 86 | 72 | 4 | 10 | 5.26% | 94.74% | 1 | 4 | 0 | 1 |
| components/layout/shell/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| components/layout/shell/shell.tsx | 68 | 48 | 13 | 7 | 21.31% | 78.69% | 1 | 1 | 0 | 0 |
| components/layout/sidebar-divider.tsx | 15 | 13 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| ...nents/layout/sidebar-primary/index.ts | 5 | 3 | 0 | 2 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...debar-primary/sidebar-primary-nav.tsx | 83 | 76 | 0 | 7 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| ...primary/sidebar-primary-user-menu.tsx | 109 | 103 | 0 | 6 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| ...t/sidebar-primary/sidebar-primary.tsx | 64 | 60 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| ...nts/layout/sidebar-secondary/index.ts | 3 | 1 | 0 | 2 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...debar-secondary/sidebar-secondary.tsx | 53 | 49 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/loading/index.ts | 7 | 6 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| components/loading/skeleton-chart.tsx | 20 | 18 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/loading/skeleton-header.tsx | 20 | 18 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| ...ents/loading/skeleton-metric-card.tsx | 21 | 19 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/loading/skeleton-page.tsx | 35 | 33 | 0 | 2 | 0.00% | 100.00% | 0 | 2 | 0 | 0 |
| components/loading/skeleton-sidebar.tsx | 15 | 13 | 0 | 2 | 0.00% | 100.00% | 0 | 2 | 0 | 0 |
| components/loading/skeleton-table.tsx | 29 | 27 | 0 | 2 | 0.00% | 100.00% | 0 | 4 | 0 | 0 |
| components/ui/avatar.tsx | 54 | 47 | 0 | 7 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| components/ui/badge.tsx | 47 | 41 | 0 | 6 | 0.00% | 100.00% | 0 | 1 | 0 | 1 |
| components/ui/breadcrumb.tsx | 110 | 99 | 0 | 11 | 0.00% | 100.00% | 0 | 7 | 0 | 0 |
| components/ui/button.tsx | 62 | 55 | 0 | 7 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/card.tsx | 98 | 87 | 0 | 11 | 0.00% | 100.00% | 0 | 7 | 0 | 0 |
| components/ui/chart.tsx | 358 | 319 | 2 | 37 | 0.62% | 99.38% | 0 | 14 | 0 | 0 |
| components/ui/checkbox.tsx | 33 | 28 | 0 | 5 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/collapsible.tsx | 12 | 6 | 0 | 6 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| components/ui/copy-button.tsx | 52 | 43 | 2 | 7 | 4.44% | 95.56% | 0 | 5 | 0 | 0 |
| components/ui/dialog.tsx | 123 | 109 | 0 | 14 | 0.00% | 100.00% | 0 | 6 | 0 | 1 |
| components/ui/drawer.tsx | 136 | 122 | 0 | 14 | 0.00% | 100.00% | 0 | 10 | 0 | 1 |
| components/ui/dropdown-menu.tsx | 258 | 239 | 0 | 19 | 0.00% | 100.00% | 0 | 15 | 0 | 0 |
| components/ui/empty-state.tsx | 45 | 42 | 0 | 3 | 0.00% | 100.00% | 0 | 2 | 0 | 0 |
| components/ui/form.tsx | 253 | 223 | 0 | 30 | 0.00% | 100.00% | 0 | 9 | 0 | 0 |
| components/ui/glass-tabs.tsx | 184 | 166 | 0 | 18 | 0.00% | 100.00% | 0 | 8 | 0 | 0 |
| components/ui/input.tsx | 26 | 22 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/label.tsx | 25 | 20 | 0 | 5 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/liquid-glass.tsx | 80 | 55 | 20 | 5 | 26.67% | 73.33% | 1 | 3 | 0 | 0 |
| components/ui/radio-group.tsx | 45 | 39 | 0 | 6 | 0.00% | 100.00% | 0 | 2 | 0 | 0 |
| components/ui/right-sidebar.tsx | 871 | 686 | 129 | 56 | 15.83% | 84.17% | 9 | 37 | 0 | 0 |
| components/ui/scroll-area.tsx | 18 | 15 | 0 | 3 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/scroll-blur.tsx | 196 | 147 | 26 | 23 | 15.03% | 84.97% | 2 | 8 | 0 | 2 |
| components/ui/scroll-to-top.tsx | 74 | 62 | 1 | 11 | 1.59% | 98.41% | 0 | 5 | 0 | 0 |
| components/ui/secure-ssn-input.tsx | 185 | 163 | 1 | 21 | 0.61% | 99.39% | 0 | 7 | 0 | 0 |
| components/ui/select.tsx | 191 | 177 | 0 | 14 | 0.00% | 100.00% | 0 | 10 | 0 | 0 |
| components/ui/separator.tsx | 29 | 24 | 0 | 5 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/sheet.tsx | 140 | 126 | 0 | 14 | 0.00% | 100.00% | 0 | 10 | 0 | 1 |
| components/ui/sidebar.tsx | 877 | 676 | 146 | 55 | 17.76% | 82.24% | 9 | 37 | 0 | 0 |
| components/ui/skeleton.tsx | 14 | 11 | 0 | 3 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/slider.tsx | 64 | 58 | 0 | 6 | 0.00% | 100.00% | 0 | 3 | 0 | 1 |
| components/ui/smart-input-field.tsx | 159 | 146 | 0 | 13 | 0.00% | 100.00% | 0 | 8 | 0 | 0 |
| components/ui/smart-input.tsx | 454 | 405 | 5 | 44 | 1.22% | 98.78% | 0 | 15 | 0 | 8 |
| components/ui/sonner.tsx | 50 | 45 | 0 | 5 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/table.tsx | 117 | 105 | 0 | 12 | 0.00% | 100.00% | 0 | 8 | 0 | 0 |
| components/ui/tabs.tsx | 67 | 59 | 0 | 8 | 0.00% | 100.00% | 0 | 4 | 0 | 0 |
| components/ui/toggle-group.tsx | 84 | 76 | 0 | 8 | 0.00% | 100.00% | 0 | 2 | 0 | 0 |
| components/ui/toggle.tsx | 48 | 42 | 0 | 6 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| components/ui/tooltip.tsx | 91 | 80 | 0 | 11 | 0.00% | 100.00% | 0 | 4 | 0 | 0 |
| config/constants/cookies.ts | 10 | 2 | 6 | 2 | 75.00% | 25.00% | 2 | 0 | 0 | 0 |
| config/constants/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| config/constants/layout.ts | 46 | 30 | 12 | 4 | 28.57% | 71.43% | 4 | 0 | 0 | 0 |
| config/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| config/navigation/documents.ts | 29 | 23 | 4 | 2 | 14.81% | 85.19% | 1 | 0 | 0 | 0 |
| config/navigation/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| config/navigation/nav-primary.ts | 151 | 134 | 12 | 5 | 8.22% | 91.78% | 3 | 0 | 0 | 0 |
| config/navigation/user.ts | 11 | 6 | 3 | 2 | 33.33% | 66.67% | 1 | 0 | 0 | 0 |
| config/theme/buttons.ts | 25 | 19 | 4 | 2 | 17.39% | 82.61% | 1 | 0 | 0 | 0 |
| config/theme/colors.ts | 183 | 135 | 31 | 17 | 18.67% | 81.33% | 1 | 0 | 0 | 17 |
| config/theme/common-text-colors.ts | 64 | 49 | 12 | 3 | 19.67% | 80.33% | 1 | 0 | 0 | 0 |
| config/theme/common.ts | 42 | 38 | 3 | 1 | 7.32% | 92.68% | 1 | 0 | 0 | 0 |
| config/theme/component-styles.ts | 25 | 21 | 3 | 1 | 12.50% | 87.50% | 1 | 0 | 0 | 0 |
| config/theme/corecolors/blue.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 19 |
| config/theme/corecolors/cyan.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 17 |
| config/theme/corecolors/emerald.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 12 |
| config/theme/corecolors/fuchsia.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 22 |
| config/theme/corecolors/green.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 16 |
| config/theme/corecolors/index.ts | 37 | 22 | 9 | 6 | 29.03% | 70.97% | 1 | 0 | 0 | 12 |
| config/theme/corecolors/indigo.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 22 |
| config/theme/corecolors/lime.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 18 |
| config/theme/corecolors/neutral.ts | 139 | 127 | 9 | 3 | 6.62% | 93.38% | 1 | 0 | 0 | 13 |
| config/theme/corecolors/orange.ts | 140 | 129 | 9 | 2 | 6.52% | 93.48% | 1 | 0 | 0 | 18 |
| config/theme/corecolors/pink.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 23 |
| config/theme/corecolors/red.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 20 |
| config/theme/corecolors/rose.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 22 |
| config/theme/corecolors/slate.ts | 141 | 129 | 10 | 2 | 7.19% | 92.81% | 1 | 0 | 0 | 22 |
| config/theme/corecolors/stone.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 21 |
| config/theme/corecolors/violet.ts | 136 | 127 | 7 | 2 | 5.22% | 94.78% | 1 | 0 | 0 | 13 |
| config/theme/corecolors/yellow.ts | 138 | 127 | 9 | 2 | 6.62% | 93.38% | 1 | 0 | 0 | 19 |
| config/theme/css-generator.ts | 155 | 102 | 35 | 18 | 25.55% | 74.45% | 4 | 3 | 0 | 0 |
| config/theme/icons.ts | 12 | 7 | 2 | 3 | 22.22% | 77.78% | 0 | 0 | 0 | 0 |
| config/theme/index.ts | 53 | 45 | 4 | 4 | 8.16% | 91.84% | 1 | 0 | 0 | 0 |
| config/theme/input-formatters.ts | 392 | 294 | 48 | 50 | 14.04% | 85.96% | 6 | 29 | 0 | 0 |
| config/theme/input-styles.ts | 217 | 175 | 15 | 27 | 7.89% | 92.11% | 3 | 1 | 0 | 0 |
| config/theme/input-validators.ts | 245 | 173 | 27 | 45 | 13.50% | 86.50% | 4 | 5 | 0 | 0 |
| config/theme/radius.ts | 27 | 12 | 13 | 2 | 52.00% | 48.00% | 10 | 0 | 0 | 0 |
| config/theme/scrollbar.ts | 34 | 18 | 12 | 4 | 40.00% | 60.00% | 6 | 1 | 0 | 0 |
| config/theme/shadows.ts | 32 | 15 | 15 | 2 | 50.00% | 50.00% | 11 | 0 | 0 | 1 |
| config/theme/surfaces.ts | 30 | 13 | 15 | 2 | 53.57% | 46.43% | 10 | 0 | 0 | 3 |
| config/theme/theme-provider.tsx | 6 | 1 | 3 | 2 | 75.00% | 25.00% | 0 | 0 | 0 | 0 |
| config/theme/themes.ts | 55 | 39 | 12 | 4 | 23.53% | 76.47% | 3 | 2 | 0 | 12 |
| config/theme/types.ts | 123 | 97 | 24 | 2 | 19.83% | 80.17% | 6 | 0 | 0 | 0 |
| config/theme/typography.ts | 242 | 48 | 163 | 31 | 77.25% | 22.75% | 33 | 0 | 0 | 0 |
| config/theme/use-theme.ts | 40 | 25 | 8 | 7 | 24.24% | 75.76% | 1 | 3 | 0 | 0 |
| config/theme/z-index.ts | 43 | 20 | 15 | 8 | 42.86% | 57.14% | 5 | 0 | 0 | 0 |
| core/format/format.test.ts | 71 | 57 | 2 | 12 | 3.39% | 96.61% | 0 | 16 | 0 | 0 |
| core/format/index.ts | 65 | 26 | 34 | 5 | 56.67% | 43.33% | 5 | 5 | 0 | 0 |
| core/storage/index.ts | 93 | 43 | 37 | 13 | 46.25% | 53.75% | 6 | 5 | 0 | 0 |
| core/storage/storage.test.ts | 33 | 27 | 0 | 6 | 0.00% | 100.00% | 0 | 6 | 0 | 0 |
| core/utils/cn.test.ts | 26 | 20 | 0 | 6 | 0.00% | 100.00% | 0 | 6 | 0 | 0 |
| core/utils/cn.ts | 14 | 5 | 7 | 2 | 58.33% | 41.67% | 1 | 1 | 0 | 0 |
| core/utils/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| core/validation/index.ts | 67 | 21 | 38 | 8 | 64.41% | 35.59% | 7 | 3 | 0 | 0 |
| core/validation/validation.test.ts | 76 | 62 | 0 | 14 | 0.00% | 100.00% | 0 | 18 | 0 | 0 |
| design-system/composites/index.ts | 8 | 6 | 1 | 1 | 14.29% | 85.71% | 0 | 0 | 0 | 0 |
| ...gn-system/composites/sidebar/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...ystem/composites/smart-input/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| design-system/index.ts | 5 | 3 | 1 | 1 | 25.00% | 75.00% | 0 | 0 | 0 | 0 |
| design-system/primitives/index.ts | 27 | 23 | 2 | 2 | 8.00% | 92.00% | 0 | 0 | 0 | 0 |
| design-system/tokens/index.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| features/command-menu/command-menu.tsx | 415 | 330 | 64 | 21 | 16.24% | 83.76% | 8 | 28 | 0 | 2 |
| ...ommand-menu/draggable-tool-window.tsx | 373 | 298 | 33 | 42 | 9.97% | 90.03% | 3 | 27 | 0 | 13 |
| features/command-menu/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| .../command-menu/tool-window-manager.tsx | 28 | 22 | 0 | 6 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| features/command-menu/tools.tsx | 47 | 43 | 0 | 4 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| features/dashboard/dashboard-charts.tsx | 410 | 388 | 5 | 17 | 1.27% | 98.73% | 0 | 8 | 0 | 0 |
| ...ures/dashboard/dashboard-skeleton.tsx | 24 | 22 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| features/dashboard/index.ts | 10 | 9 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| features/dashboard/section-cards.tsx | 112 | 108 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| features/data-table/data-table.tsx | 840 | 787 | 33 | 20 | 4.02% | 95.98% | 3 | 42 | 0 | 2 |
| features/data-table/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...em/components/background-controls.tsx | 233 | 201 | 20 | 12 | 9.05% | 90.95% | 3 | 12 | 0 | 0 |
| features/design-system/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| features/keyboard-shortcuts/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...oard-shortcuts/keyboard-shortcuts.tsx | 71 | 64 | 1 | 6 | 1.54% | 98.46% | 0 | 5 | 0 | 0 |
| features/theme-customizer/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...theme-customizer/theme-customizer.tsx | 188 | 142 | 22 | 24 | 13.41% | 86.59% | 1 | 18 | 0 | 0 |
| features/tools/aspect-ratio.tsx | 110 | 81 | 20 | 9 | 19.80% | 80.20% | 2 | 6 | 0 | 4 |
| features/tools/calculator.tsx | 180 | 129 | 30 | 21 | 18.87% | 81.13% | 4 | 14 | 0 | 1 |
| features/tools/color-converter.tsx | 486 | 386 | 59 | 41 | 13.26% | 86.74% | 10 | 46 | 0 | 16 |
| features/tools/emoji/emoji-category.tsx | 58 | 37 | 16 | 5 | 30.19% | 69.81% | 2 | 4 | 0 | 0 |
| features/tools/emoji/emoji-data.ts | 306 | 277 | 18 | 11 | 6.10% | 93.90% | 3 | 0 | 0 | 7 |
| features/tools/emoji/emoji-picker.tsx | 108 | 71 | 26 | 11 | 26.80% | 73.20% | 4 | 11 | 0 | 0 |
| features/tools/index.ts | 11 | 10 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| features/tools/lorem-ipsum.tsx | 95 | 63 | 21 | 11 | 25.00% | 75.00% | 3 | 9 | 0 | 9 |
| features/tools/password-generator.tsx | 266 | 243 | 0 | 23 | 0.00% | 100.00% | 0 | 22 | 0 | 16 |
| features/tools/stopwatch.tsx | 125 | 85 | 29 | 11 | 25.44% | 74.56% | 5 | 11 | 0 | 7 |
| features/tools/text-case.tsx | 134 | 86 | 38 | 10 | 30.65% | 69.35% | 4 | 21 | 0 | 6 |
| features/tools/unit-converter.tsx | 656 | 529 | 82 | 45 | 13.42% | 86.58% | 10 | 49 | 0 | 13 |
| features/tools/uuid-generator.tsx | 104 | 73 | 22 | 9 | 23.16% | 76.84% | 3 | 10 | 0 | 5 |
| hooks/index.ts | 6 | 5 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| hooks/use-debounce.ts | 40 | 13 | 22 | 5 | 62.86% | 37.14% | 1 | 4 | 0 | 0 |
| hooks/use-local-storage.ts | 48 | 19 | 25 | 4 | 56.82% | 43.18% | 2 | 4 | 0 | 0 |
| hooks/use-media-query.ts | 50 | 18 | 24 | 8 | 57.14% | 42.86% | 2 | 4 | 0 | 0 |
| hooks/use-mobile.ts | 40 | 15 | 20 | 5 | 57.14% | 42.86% | 2 | 4 | 0 | 0 |
| hooks/use-smooth-scroll.ts | 58 | 19 | 31 | 8 | 62.00% | 38.00% | 3 | 2 | 0 | 0 |
| infrastructure/api/client.ts | 84 | 69 | 0 | 15 | 0.00% | 100.00% | 0 | 1 | 2 | 0 |
| infrastructure/api/index.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| infrastructure/index.ts | 5 | 4 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| infrastructure/query/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| infrastructure/query/query-client.ts | 29 | 22 | 3 | 4 | 12.00% | 88.00% | 0 | 2 | 0 | 0 |
| infrastructure/query/query-keys.ts | 17 | 9 | 7 | 1 | 43.75% | 56.25% | 1 | 1 | 0 | 0 |
| infrastructure/store/index.ts | 3 | 2 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| ...structure/store/sidebar-store.test.ts | 83 | 71 | 0 | 12 | 0.00% | 100.00% | 0 | 16 | 0 | 0 |
| infrastructure/store/sidebar-store.ts | 26 | 23 | 0 | 3 | 0.00% | 100.00% | 0 | 7 | 0 | 0 |
| infrastructure/store/theme-store.test.ts | 41 | 35 | 0 | 6 | 0.00% | 100.00% | 0 | 9 | 0 | 6 |
| infrastructure/store/theme-store.ts | 20 | 17 | 0 | 3 | 0.00% | 100.00% | 0 | 3 | 0 | 0 |
| infrastructure/theme/client.ts | 37 | 25 | 8 | 4 | 24.24% | 75.76% | 2 | 6 | 0 | 0 |
| infrastructure/theme/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| infrastructure/theme/init-script.ts | 95 | 77 | 0 | 18 | 0.00% | 100.00% | 0 | 6 | 0 | 0 |
| infrastructure/theme/server.ts | 48 | 32 | 4 | 12 | 11.11% | 88.89% | 1 | 6 | 0 | 0 |
| lib/client-theme.ts | 38 | 26 | 8 | 4 | 23.53% | 76.47% | 2 | 6 | 0 | 0 |
| lib/format.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| lib/index.ts | 6 | 4 | 1 | 1 | 20.00% | 80.00% | 0 | 0 | 0 | 0 |
| lib/storage.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| lib/theme-init-script.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| lib/theme-server.ts | 8 | 6 | 1 | 1 | 14.29% | 85.71% | 0 | 0 | 0 | 0 |
| lib/utils.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| lib/validation.ts | 3 | 1 | 1 | 1 | 50.00% | 50.00% | 0 | 0 | 0 | 0 |
| middleware.ts | 43 | 34 | 0 | 9 | 0.00% | 100.00% | 0 | 1 | 0 | 12 |
| providers/app-providers.tsx | 21 | 17 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| providers/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| providers/query-provider.tsx | 16 | 12 | 0 | 4 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |
| providers/smooth-scroll-provider.tsx | 216 | 174 | 0 | 42 | 0.00% | 100.00% | 0 | 15 | 0 | 0 |
| stores/background-store.ts | 66 | 43 | 18 | 5 | 29.51% | 70.49% | 6 | 6 | 0 | 0 |
| stores/index.ts | 4 | 3 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| stores/secondary-sidebar-store.ts | 29 | 14 | 12 | 3 | 46.15% | 53.85% | 4 | 5 | 0 | 0 |
| stores/tool-window.test.ts | 245 | 194 | 1 | 50 | 0.51% | 99.49% | 0 | 37 | 0 | 0 |
| stores/tool-window.ts | 326 | 266 | 42 | 18 | 13.64% | 86.36% | 13 | 17 | 0 | 0 |
| test/setup.ts | 2 | 1 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| test/utils.tsx | 34 | 28 | 1 | 5 | 3.45% | 96.55% | 0 | 3 | 0 | 0 |
| types/chart.ts | 19 | 16 | 0 | 3 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| types/index.ts | 5 | 4 | 0 | 1 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| types/navigation.ts | 23 | 19 | 0 | 4 | 0.00% | 100.00% | 0 | 0 | 0 | 0 |
| types/sidebar.ts | 25 | 22 | 0 | 3 | 0.00% | 100.00% | 0 | 6 | 0 | 0 |
| types/user.ts | 12 | 10 | 0 | 2 | 0.00% | 100.00% | 0 | 1 | 0 | 0 |

## Files with Hardcoded Colors

### app/(main)/inputs/page.tsx

Total colors: 3

- Line 448: `Red`
- Line 455: `Green`
- Line 462: `Green`

### app/(main)/page.tsx

Total colors: 2

- Line 190: `red`
- Line 190: `red`

### app/api/theme/route.ts

Total colors: 12

- Line 8: `red`
- Line 8: `rose`
- Line 8: `orange`
- Line 8: `green`
- Line 8: `blue`
- Line 8: `yellow`
- Line 9: `violet`
- Line 9: `indigo`
- Line 9: `cyan`
- Line 9: `lime`
- Line 10: `fuchsia`
- Line 10: `pink`

### app/bg-test/page.tsx

Total colors: 29

- Line 16: `rgba(139, 92, 246, 0.08)`
- Line 16: `rgba(59, 130, 246, 0.05)`
- Line 16: `rgba(139, 92, 246, 0.08)`
- Line 26: `rgba(139, 92, 246, 0.15)`
- Line 36: `rgba(139, 92, 246, 0.1)`
- Line 36: `rgba(59, 130, 246, 0.1)`
- Line 36: `rgba(139, 92, 246, 0.1)`
- Line 36: `rgba(59, 130, 246, 0.1)`
- Line 47: `rgba(139, 92, 246, 0.12)`
- Line 48: `rgba(59, 130, 246, 0.12)`
- Line 49: `rgba(139, 92, 246, 0.12)`
- Line 50: `rgba(59, 130, 246, 0.12)`
- Line 60: `rgba(139, 92, 246, 0.05)`
- Line 60: `rgba(139, 92, 246, 0.15)`
- Line 60: `rgba(139, 92, 246, 0.05)`
- Line 71: `rgba(139, 92, 246, 0.1)`
- Line 72: `rgba(59, 130, 246, 0.1)`
- Line 82: `rgba(139, 92, 246, 0.1)`
- Line 92: `rgba(139, 92, 246, 0.2)`
- Line 101: `rgba(139, 92, 246, 0.02)`
- Line 101: `rgba(139, 92, 246, 0.08)`
- Line 111: `rgba(139, 92, 246, 0.12)`
- Line 111: `rgba(59, 130, 246, 0.12)`
- Line 122: `rgba(139, 92, 246, 0.1)`
- Line 122: `rgba(139, 92, 246, 0.1)`
- Line 123: `rgba(59, 130, 246, 0.08)`
- Line 135: `rgba(139, 92, 246, 0.15)`
- Line 136: `rgba(59, 130, 246, 0.12)`
- Line 137: `rgba(139, 92, 246, 0.1)`

### components/layout/shell/header.tsx

Total colors: 1

- Line 47: `white`

### components/ui/badge.tsx

Total colors: 1

- Line 17: `white`

### components/ui/dialog.tsx

Total colors: 1

- Line 24: `black`

### components/ui/drawer.tsx

Total colors: 1

- Line 40: `black`

### components/ui/scroll-blur.tsx

Total colors: 2

- Line 51: `black`
- Line 52: `black`

### components/ui/sheet.tsx

Total colors: 1

- Line 39: `black`

### components/ui/slider.tsx

Total colors: 1

- Line 56: `white`

### components/ui/smart-input.tsx

Total colors: 8

- Line 19: `blue`
- Line 19: `blue`
- Line 20: `red`
- Line 20: `red`
- Line 21: `blue`
- Line 21: `blue`
- Line 22: `orange`
- Line 22: `orange`

### config/theme/colors.ts

Total colors: 17

- Line 40: `hsl(210, 40%, 98%)`
- Line 43: `hsl(0, 0%, 100%)`
- Line 46: `hsl(0, 0%, 100%)`
- Line 55: `hsl(38, 92%, 50%)`
- Line 57: `hsl(199, 89%, 48%)`
- Line 62: `hsl(210, 20%, 90%)`
- Line 63: `hsl(215, 20%, 70%)`
- Line 64: `hsl(215, 15%, 50%)`
- Line 65: `hsl(215, 10%, 35%)`
- Line 81: `hsl(38, 92%, 50%)`
- Line 82: `hsl(0, 72%, 51%)`
- Line 83: `hsl(199, 89%, 48%)`
- Line 91: `hsl(210,20%,90%)`
- Line 95: `hsl(210,15%,85%)`
- Line 99: `hsl(215,20%,70%)`
- Line 103: `hsl(215,15%,50%)`
- Line 107: `hsl(210,18%,80%)`

### config/theme/corecolors/blue.ts

Total colors: 19

- Line 9: `blue`
- Line 10: `Blue`
- Line 33: `Blue`
- Line 34: `Cyan`
- Line 35: `Indigo`
- Line 36: `Violet`
- Line 37: `Teal`
- Line 38: `Blue`
- Line 39: `Blue`
- Line 40: `Purple`
- Line 42: `Blue`
- Line 43: `Blue`
- Line 44: `Lavender`
- Line 57: `Blue`
- Line 58: `Cyan`
- Line 59: `Indigo`
- Line 120: `Blue`
- Line 121: `Cyan`
- Line 122: `Indigo`

### config/theme/corecolors/cyan.ts

Total colors: 17

- Line 9: `cyan`
- Line 10: `Cyan`
- Line 33: `Cyan`
- Line 35: `Teal`
- Line 36: `Blue`
- Line 37: `Blue`
- Line 39: `Cyan`
- Line 40: `Indigo`
- Line 42: `Cyan`
- Line 43: `Cyan`
- Line 44: `Teal`
- Line 57: `Cyan`
- Line 58: `Teal`
- Line 59: `Blue`
- Line 120: `Cyan`
- Line 121: `Teal`
- Line 122: `Blue`

### config/theme/corecolors/emerald.ts

Total colors: 12

- Line 34: `Teal`
- Line 35: `Cyan`
- Line 36: `Green`
- Line 37: `Lime`
- Line 40: `Blue`
- Line 41: `Green`
- Line 58: `Green`
- Line 59: `Teal`
- Line 60: `Lime`
- Line 121: `Green`
- Line 122: `Teal`
- Line 123: `Lime`

### config/theme/corecolors/fuchsia.ts

Total colors: 22

- Line 9: `fuchsia`
- Line 10: `Fuchsia`
- Line 33: `Fuchsia`
- Line 34: `Magenta`
- Line 35: `Violet`
- Line 36: `Pink`
- Line 37: `Teal`
- Line 38: `Fuchsia`
- Line 39: `Fuchsia`
- Line 40: `Blue`
- Line 41: `Green`
- Line 42: `Fuchsia`
- Line 43: `Purple`
- Line 44: `Orchid`
- Line 57: `Fuchsia`
- Line 58: `Pink`
- Line 59: `Purple`
- Line 60: `Rose`
- Line 120: `Fuchsia`
- Line 121: `Pink`
- Line 122: `Purple`
- Line 123: `Rose`

### config/theme/corecolors/green.ts

Total colors: 16

- Line 9: `green`
- Line 10: `Green`
- Line 33: `Green`
- Line 35: `Lime`
- Line 36: `Teal`
- Line 37: `Green`
- Line 39: `Green`
- Line 40: `Olive`
- Line 42: `Teal`
- Line 43: `Lime`
- Line 57: `Green`
- Line 59: `Lime`
- Line 60: `Teal`
- Line 120: `Green`
- Line 122: `Lime`
- Line 123: `Teal`

### config/theme/corecolors/index.ts

Total colors: 12

- Line 11: `red`
- Line 12: `rose`
- Line 13: `orange`
- Line 14: `green`
- Line 15: `blue`
- Line 16: `yellow`
- Line 17: `violet`
- Line 20: `indigo`
- Line 21: `cyan`
- Line 22: `lime`
- Line 24: `fuchsia`
- Line 25: `pink`

### config/theme/corecolors/indigo.ts

Total colors: 22

- Line 9: `indigo`
- Line 10: `Indigo`
- Line 33: `Indigo`
- Line 34: `Blue`
- Line 35: `Violet`
- Line 36: `Purple`
- Line 37: `Cyan`
- Line 38: `Indigo`
- Line 39: `Blue`
- Line 40: `Magenta`
- Line 41: `Violet`
- Line 42: `Indigo`
- Line 43: `Indigo`
- Line 44: `Lavender`
- Line 57: `Indigo`
- Line 58: `Blue`
- Line 59: `Violet`
- Line 60: `Purple`
- Line 120: `Indigo`
- Line 121: `Blue`
- Line 122: `Violet`
- Line 123: `Purple`

### config/theme/corecolors/lime.ts

Total colors: 18

- Line 9: `lime`
- Line 10: `Lime`
- Line 33: `Lime`
- Line 34: `Green`
- Line 35: `Yellow`
- Line 37: `Teal`
- Line 38: `Lime`
- Line 39: `Green`
- Line 40: `Orange`
- Line 42: `Lime`
- Line 43: `Lime`
- Line 44: `Olive`
- Line 57: `Lime`
- Line 58: `Green`
- Line 59: `Yellow`
- Line 120: `Lime`
- Line 121: `Green`
- Line 122: `Yellow`

### config/theme/corecolors/neutral.ts

Total colors: 13

- Line 12: `white`
- Line 13: `black`
- Line 34: `Rose`
- Line 37: `Indigo`
- Line 38: `Cyan`
- Line 39: `Violet`
- Line 40: `Orange`
- Line 41: `Lime`
- Line 42: `Teal`
- Line 43: `Pink`
- Line 44: `Brown`
- Line 54: `white`
- Line 75: `black`

### config/theme/corecolors/orange.ts

Total colors: 18

- Line 9: `orange`
- Line 10: `Orange`
- Line 33: `Orange`
- Line 35: `Yellow`
- Line 36: `Red`
- Line 36: `Orange`
- Line 37: `Red`
- Line 38: `Orange`
- Line 40: `Teal`
- Line 41: `Cyan`
- Line 42: `Orange`
- Line 43: `Orange`
- Line 57: `Orange`
- Line 59: `Red`
- Line 60: `Yellow`
- Line 121: `Orange`
- Line 123: `Red`
- Line 124: `Yellow`

### config/theme/corecolors/pink.ts

Total colors: 23

- Line 9: `pink`
- Line 10: `Pink`
- Line 33: `Pink`
- Line 34: `Rose`
- Line 35: `Fuchsia`
- Line 36: `Purple`
- Line 37: `Red`
- Line 37: `Orange`
- Line 38: `Pink`
- Line 39: `Pink`
- Line 40: `Cyan`
- Line 42: `Pink`
- Line 43: `Pink`
- Line 44: `Lavender`
- Line 44: `Pink`
- Line 57: `Pink`
- Line 58: `Rose`
- Line 59: `Fuchsia`
- Line 60: `Purple`
- Line 120: `Pink`
- Line 121: `Rose`
- Line 122: `Fuchsia`
- Line 123: `Purple`

### config/theme/corecolors/red.ts

Total colors: 20

- Line 9: `red`
- Line 10: `Red`
- Line 33: `Red`
- Line 34: `Orange`
- Line 35: `Rose`
- Line 36: `Pink`
- Line 38: `Red`
- Line 39: `Red`
- Line 40: `Magenta`
- Line 42: `Maroon`
- Line 43: `Orange`
- Line 44: `Coral`
- Line 57: `Red`
- Line 58: `Orange`
- Line 59: `Rose`
- Line 60: `Pink`
- Line 120: `Red`
- Line 121: `Orange`
- Line 122: `Rose`
- Line 123: `Pink`

### config/theme/corecolors/rose.ts

Total colors: 22

- Line 9: `rose`
- Line 10: `Rose`
- Line 33: `Rose`
- Line 34: `Pink`
- Line 35: `Red`
- Line 36: `Red`
- Line 36: `Orange`
- Line 37: `Fuchsia`
- Line 38: `Rose`
- Line 39: `Rose`
- Line 40: `Teal`
- Line 41: `Blue`
- Line 42: `Rose`
- Line 43: `Rose`
- Line 57: `Rose`
- Line 58: `Pink`
- Line 59: `Red`
- Line 60: `Fuchsia`
- Line 120: `Rose`
- Line 121: `Pink`
- Line 122: `Red`
- Line 123: `Fuchsia`

### config/theme/corecolors/slate.ts

Total colors: 22

- Line 34: `Blue`
- Line 35: `Indigo`
- Line 36: `Teal`
- Line 39: `Gray`
- Line 40: `Rose`
- Line 43: `Blue`
- Line 57: `Blue`
- Line 57: `gray`
- Line 58: `Violet`
- Line 58: `gray`
- Line 59: `Cyan`
- Line 59: `gray`
- Line 60: `Pink`
- Line 60: `gray`
- Line 122: `Blue`
- Line 122: `gray`
- Line 123: `Violet`
- Line 123: `gray`
- Line 124: `Cyan`
- Line 124: `gray`
- Line 125: `Pink`
- Line 125: `gray`

### config/theme/corecolors/stone.ts

Total colors: 21

- Line 34: `Orange`
- Line 36: `Lime`
- Line 37: `Green`
- Line 39: `Gray`
- Line 40: `Blue`
- Line 41: `Purple`
- Line 57: `Blue`
- Line 57: `gray`
- Line 58: `Violet`
- Line 58: `gray`
- Line 59: `Cyan`
- Line 59: `gray`
- Line 60: `Pink`
- Line 60: `gray`
- Line 75: `black`
- Line 77: `gray`
- Line 77: `brown`
- Line 120: `Blue`
- Line 121: `Violet`
- Line 122: `Cyan`
- Line 123: `Pink`

### config/theme/corecolors/violet.ts

Total colors: 13

- Line 9: `violet`
- Line 10: `Violet`
- Line 33: `Violet`
- Line 34: `Purple`
- Line 35: `Indigo`
- Line 36: `Magenta`
- Line 37: `Gold`
- Line 38: `Violet`
- Line 40: `Teal`
- Line 41: `Green`
- Line 42: `Violet`
- Line 43: `Violet`
- Line 44: `Lavender`

### config/theme/corecolors/yellow.ts

Total colors: 19

- Line 9: `yellow`
- Line 10: `Yellow`
- Line 33: `Yellow`
- Line 35: `Orange`
- Line 36: `Lime`
- Line 37: `Green`
- Line 38: `Gold`
- Line 39: `Yellow`
- Line 40: `Blue`
- Line 41: `Violet`
- Line 42: `Yellow`
- Line 43: `Yellow`
- Line 44: `Brown`
- Line 57: `Yellow`
- Line 59: `Lime`
- Line 60: `Orange`
- Line 120: `Yellow`
- Line 122: `Lime`
- Line 123: `Orange`

### config/theme/shadows.ts

Total colors: 1

- Line 28: `rgba(0,0,0,0.37)`

### config/theme/surfaces.ts

Total colors: 3

- Line 22: `black`
- Line 22: `white`
- Line 24: `white`

### config/theme/themes.ts

Total colors: 12

- Line 2: `red`
- Line 3: `orange`
- Line 4: `yellow`
- Line 5: `lime`
- Line 6: `green`
- Line 8: `cyan`
- Line 9: `blue`
- Line 10: `indigo`
- Line 11: `violet`
- Line 12: `fuchsia`
- Line 13: `pink`
- Line 14: `rose`

### features/command-menu/command-menu.tsx

Total colors: 2

- Line 165: `white`
- Line 166: `white`

### features/command-menu/draggable-tool-window.tsx

Total colors: 13

- Line 200: `rgba(0,0,0,0.45)`
- Line 200: `rgba(0,0,0,0.3)`
- Line 201: `rgba(15,23,42,0.18)`
- Line 201: `rgba(15,23,42,0.08)`
- Line 212: `rgba(15, 23, 42, 0.08)`
- Line 309: `white`
- Line 321: `white`
- Line 321: `white`
- Line 333: `white`
- Line 342: `red`
- Line 342: `red`
- Line 365: `white`
- Line 367: `white`

### features/data-table/data-table.tsx

Total colors: 2

- Line 228: `green`
- Line 228: `green`

### features/tools/aspect-ratio.tsx

Total colors: 4

- Line 51: `white`
- Line 51: `black`
- Line 101: `white`
- Line 101: `white`

### features/tools/calculator.tsx

Total colors: 1

- Line 148: `white`

### features/tools/color-converter.tsx

Total colors: 16

- Line 288: `#ffffff`
- Line 289: `#000000`
- Line 295: `rose`
- Line 298: `#ffffff`
- Line 298: `White`
- Line 299: `#000000`
- Line 299: `Black`
- Line 366: `white`
- Line 368: `#FFFFFF`
- Line 369: `#ffffff`
- Line 370: `#FFF`
- Line 395: `white`
- Line 415: `white`
- Line 426: `rose`
- Line 426: `rose`
- Line 478: `white`

### features/tools/emoji/emoji-data.ts

Total colors: 7

- Line 115: `red`
- Line 186: `Red`
- Line 253: `yellow`
- Line 254: `yellow`
- Line 264: `Red`
- Line 267: `Green`
- Line 289: `Red`

### features/tools/lorem-ipsum.tsx

Total colors: 9

- Line 58: `white`
- Line 59: `black`
- Line 59: `white`
- Line 60: `white`
- Line 61: `white`
- Line 72: `black`
- Line 72: `white`
- Line 80: `green`
- Line 80: `white`

### features/tools/password-generator.tsx

Total colors: 16

- Line 80: `lime`
- Line 82: `rose`
- Line 132: `white`
- Line 135: `white`
- Line 141: `white`
- Line 146: `white`
- Line 153: `white`
- Line 164: `white`
- Line 170: `white`
- Line 181: `white`
- Line 193: `white`
- Line 205: `white`
- Line 214: `white`
- Line 226: `white`
- Line 252: `white`
- Line 258: `white`

### features/tools/stopwatch.tsx

Total colors: 7

- Line 90: `red`
- Line 90: `red`
- Line 90: `red`
- Line 90: `red`
- Line 113: `white`
- Line 115: `white`
- Line 115: `white`

### features/tools/text-case.tsx

Total colors: 6

- Line 87: `white`
- Line 91: `red`
- Line 91: `white`
- Line 129: `white`
- Line 129: `white`
- Line 129: `white`

### features/tools/unit-converter.tsx

Total colors: 13

- Line 224: `white`
- Line 224: `white`
- Line 360: `white`
- Line 401: `white`
- Line 422: `white`
- Line 449: `white`
- Line 452: `white`
- Line 472: `white`
- Line 508: `white`
- Line 558: `white`
- Line 567: `white`
- Line 599: `white`
- Line 642: `white`

### features/tools/uuid-generator.tsx

Total colors: 5

- Line 58: `white`
- Line 76: `green`
- Line 76: `white`
- Line 76: `green`
- Line 85: `white`

### infrastructure/store/theme-store.test.ts

Total colors: 6

- Line 21: `red`
- Line 23: `red`
- Line 27: `blue`
- Line 29: `blue`
- Line 35: `violet`
- Line 37: `violet`

### middleware.ts

Total colors: 12

- Line 8: `red`
- Line 8: `rose`
- Line 8: `orange`
- Line 8: `green`
- Line 8: `blue`
- Line 8: `yellow`
- Line 9: `violet`
- Line 9: `indigo`
- Line 9: `cyan`
- Line 9: `lime`
- Line 10: `fuchsia`
- Line 10: `pink`


## KPI Analysis

### Top 10 Files by Lines of Code

| File | LOC |
|------|-----|
| components/ui/sidebar.tsx | 877 |
| components/ui/right-sidebar.tsx | 871 |
| features/data-table/data-table.tsx | 840 |
| features/tools/unit-converter.tsx | 656 |
| features/tools/color-converter.tsx | 486 |
| app/(main)/inputs/page.tsx | 477 |
| components/ui/smart-input.tsx | 454 |
| components/layout/backgrounds/geometric-background.tsx | 453 |
| components/layout/backgrounds/neural-background.tsx | 447 |
| features/command-menu/command-menu.tsx | 415 |

### Top 10 Files by Comment Density

| File | Comment % |
|------|-----------|
| components/layout/console-drawer/views/index.ts | 85.00% |
| components/layout/console-drawer/types.ts | 80.00% |
| config/theme/typography.ts | 77.25% |
| config/constants/cookies.ts | 75.00% |
| config/theme/theme-provider.tsx | 75.00% |
| core/validation/index.ts | 64.41% |
| hooks/use-debounce.ts | 62.86% |
| hooks/use-smooth-scroll.ts | 62.00% |
| core/utils/cn.ts | 58.33% |
| hooks/use-media-query.ts | 57.14% |

### Files with Lowest Documentation Coverage

| File | JSDoc Coverage % |
|------|------------------|
| app/layout.tsx | 0.00% |
| app/not-found.tsx | 0.00% |
| app/opengraph-image.tsx | 0.00% |
| components/layout/backgrounds/noise-overlay.tsx | 0.00% |
| components/layout/breadcrumbs.tsx | 0.00% |
| components/layout/console-drawer/electric-line.tsx | 0.00% |
| components/layout/console-drawer/sidebar-control-panel.tsx | 0.00% |
| components/layout/console-drawer/views/metrics-view.tsx | 0.00% |
| components/layout/console-drawer/views/network-view.tsx | 0.00% |
| components/layout/sidebar-divider.tsx | 0.00% |
