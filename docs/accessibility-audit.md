# Accessibility audit — Phase 6

Audited against WCAG 2.1 level AA on the production build (`next build` + `next start`).

**Tooling:** axe-core 4.13 (tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `best-practice`) driven through
headless Edge, plus manual keyboard, contrast and reflow checks.

## Coverage

- **Pages:** Home, About, Services, all three service pages, Approach, Contact, Privacy, Terms, 404.
- **Widths:** 1440px and 390px (plus 320px for reflow).
- **Interactive states:** services dropdown open, mobile menu open, all FAQ items open, contact form
  error state, contact form "not connected" state.
- **Motion:** `prefers-reduced-motion: no-preference` and `reduce`.

## Result

**No axe violations** on any page, width or state, in either motion mode.

## Issues found and fixed

| Issue | Rule | Fix |
|---|---|---|
| Contact details list nested `dt`/`dd` inside an extra `div`, so they were not direct children of the list row | `definition-list`, `dlitem` (WCAG 1.3.1) | Restructured each row so `dt` and `dd` are direct children of the wrapping `div`; the icon moved inside the `dt` |
| Form field, mobile menu button and FAQ toggle borders sat at navy 28% (1.99:1) | WCAG 1.4.11 non-text contrast | Raised to navy 40%, the strongest value the brand rules allow (2.85:1) |
| The disabled WhatsApp button gave no reason for being unavailable | WCAG 1.3.1 | Added screen-reader-only text: "(not available yet)" |

## Verified manually

- **Hero text over the photograph.** axe reports "incomplete" because it cannot resolve a background
  behind a gradient and image. Measured from rendered pixels, against the darkest pixel actually
  behind each text block:

  | Element | 1440px | 390px |
  |---|---|---|
  | H1 | 15.19:1 | 5.95:1 |
  | Supporting text | 10.12:1 | 6.53:1 |
  | "ABU DHABI" label | 16.05:1 | 15.39:1 |

  All pass AA (4.5:1 for body text, 3:1 for large text).
- **Keyboard.** 27 focus stops each on Home and Contact; every stop is visible and has a focus
  outline. Services dropdown opens with Enter, closes on Escape and returns focus to its toggle.
  The mobile menu traps focus, closes on Escape, returns focus to the open button and locks page
  scrolling. FAQ items open and close with Enter and show a 3px focus outline.
- **Skip link.** First focus stop, becomes visible on focus, moves to `#main`.
- **Focus indicator contrast.** Navy on light surfaces (15.7:1) and gold on navy (6.6:1), both well
  above the 3:1 required.
- **Reflow (1.4.10).** No horizontal scrolling at 320px on any page. The only element extending past
  the viewport is the decorative orbit SVG, which is `aria-hidden` and cannot be scrolled to.
- **Text spacing (1.4.12).** With line height 1.5, letter spacing 0.12em, word spacing 0.16em and
  paragraph spacing 2em applied, no text is clipped and no horizontal scrolling appears.
- **Structure.** One H1 per page, correct heading order, semantic landmarks (`header`, `main`,
  `footer`, labelled `nav`), `lang="en"` and `dir="ltr"`.
- **Forms.** Every field has a persistent visible label, errors use `aria-invalid` and
  `aria-describedby`, the error summary is announced through a live region, and the success panel is
  a focused `role="status"`. Errors use a 2px navy border and a navy message with a line icon, never
  colour alone and never red.
- **Reduced motion.** Hero keyframes, scroll reveals, orbit drawing and bar growth are all disabled;
  content renders in its final state.

## Open item for the client

Field and secondary-button boundaries are at navy 40%, measuring **2.85:1** and **2.82:1** against
their adjacent colours. WCAG 1.4.11 asks for 3:1. The brand rules cap these borders at navy 40%, so
closing the gap needs a decision:

1. Darken these borders to about navy 55% (≈3.2:1), which goes outside the approved 28–40% range, or
2. Keep 40% and accept a marginal shortfall on this one criterion.

Marked in the code as `// TODO: review` in `src/components/ui/Field.tsx`.
