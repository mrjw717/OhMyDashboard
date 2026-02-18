# UX Best Practices

This document outlines recurring UX patterns and fixes applied to ensure a premium, stable, and high-performance user experience.

## Layout Stability

### Scrollbar Shift Fix (Layout Jumps)

**Issue**: When a dropdown, modal, or popover locks body scrolling (by setting `overflow: hidden` on `<body>` or `<html>`), the vertical scrollbar is removed. This changes the viewport width and causes the entire layout to shift horizontally ("modal jump").

**Solution**: Reserve scrollbar space globally in the `html` element.

```css
/* src/app/globals.css */
html {
  scrollbar-gutter: stable;
}
```

**Benefits**:
- **Clean Fix**: No need for complex JavaScript scroll-lock utilities to patch padding-right.
- **Modern Standards**: Supported by all modern browsers.
- **Consistency**: The layout remains perfectly stable even when scrollbars are toggled.

---

*Last Updated: 2025-12-23*
