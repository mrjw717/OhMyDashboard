# Scroll Blur Overlay

**DO NOT MODIFY without understanding these constraints.**

- Purpose: add a top/bottom blur over scrolling content while keeping shell backgrounds/animated surfaces crisp.
- Placement: `ScrollBlur` must be absolutely inset over the scroll container (`#main-scroll`) and clipped to its radius. Z-index set by parent; currently `z-60`.
- Visibility: component toggles blur based on overflow; stays active when content can scroll.
- Falloff: blur uses backdrop-filter with transparent mask gradients (no visible fills) to feather edges.
- Tuned values (current): `topBlurHeight=5.5rem`, `bottomBlurHeight=5.5rem`, `strength=4.0`, masks up to 0.5/0.45 opacity.
- Do not introduce `contain`/`isolation` on the scroll container; it blocks backdrop-filter.
- If adjusting: prefer tweaking `strength` and mask stops; keep overlay inset + rounded to match container.
