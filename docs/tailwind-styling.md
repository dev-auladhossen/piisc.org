# Tailwind styling

Presentation styles use Tailwind utilities. Simple components put utilities in
their template `class` attributes. Shared selectors, responsive overrides, Vue
transition classes, and complex component states compose utilities with `@apply`.
These rules retain their existing selector specificity and source order to keep
the current design intact.

- Use exact arbitrary values where the design does not match Tailwind's scale.
  For example, `p-[29px]` preserves a 29px padding without rounding it to a preset.
- Preserve contextual variants on labels, such as `[.news-info_&]:tracking-[.1em]`.
  They override shared label styles with the original specificity.
- Keep shared responsive rules in `src/style.css` and TV-size overrides in
  `src/large-screen.css`. Do not move them into a different cascade layer without
  checking component and language overrides.
- `@font-face` and `@keyframes` remain CSS definitions. Runtime image URLs remain
  CSS custom-property bindings; modal scroll locking remains runtime behavior.
- Keep complete utility names in source so Tailwind can discover them. Avoid
  assembling class names from string fragments.

Run `npm run build` and `node scripts/check-translations.mjs` after changes.
Check mobile dropdown overlays, English and Bangla text, and large-screen layouts
when adjusting shared utilities.
