# Final QA — Phase 8

Run against the production build (`next build` + `next start`) with headless Edge.

## Layout and responsiveness

All 10 routes checked at **360, 390, 768, 1024, 1440 and 1920px**:

- No horizontal scrolling at any width.
- Exactly one H1 per page, correct heading order.
- Every link has an accessible name; every image has an `alt` attribute.
- No console errors, no page errors, no React hydration warnings.

Full-page screenshots are in `review-shots/`: every page at 1440 and 390px, plus Home, Project
Management and Contact at 768 and 1920px.

## Links and routing

- 11 unique internal links crawled from every page; all return 200.
- `/services/construction`, `/services/construction-project-management` and
  `/services/construction-consultancy` all return 404, as intended.
- An unknown URL returns 404 and renders the styled 404 page.

## Brand and content rules

| Rule | Result |
|---|---|
| Concept artwork used once across the whole site | Once, on Home |
| Hero background used on Home only | Home only |
| The word "construction" | Only on `/services/project-management` |
| The construction sentence, verbatim | Present, exact wording |
| Colours in the compiled CSS | Navy, gold, ivory, charcoal, white and transparent only — including every alpha variant (hero glow, fades, subtle navy shadows) |
| Fonts | Cormorant Garamond and Montserrat only |

## Interaction

- **Services dropdown:** opens on hover (mouse), on Enter (keyboard) and on tap (touch), closes on
  Escape with focus returned to the toggle, and closes on an outside click.
- **Mobile menu:** opens, traps focus, locks page scrolling, closes on Escape and restores scrolling.
- **FAQ:** native disclosures, toggle with Enter, visible focus ring.
- **Skip link:** first focus stop, visible on focus, jumps to `#main`.
- **Contact form:** loading, field errors, error summary, "not connected" and success states all
  verified in the browser.

## Contact API

| Case | Response |
|---|---|
| Valid enquiry, no Resend keys | 503 `not_configured` with the "form isn't connected yet" message |
| Invalid fields | 400 with per-field messages |
| Honeypot filled | 200, silently discarded, no email attempted |
| Malformed JSON | 400 `invalid_json` |
| Oversized body | 413 |
| `GET` | 405 |

Success is never faked.

## Accessibility

axe-core (WCAG 2.1 A/AA + best practice): **0 violations** across all pages, both widths, five
interactive states and both motion modes. Under `prefers-reduced-motion: reduce`, no revealed content
stays hidden. Details in `docs/accessibility-audit.md`.

## Performance (Lighthouse, production build)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop Home | **100** | 100 | 100 | 69* |
| Desktop Contact | **100** | 100 | 100 | 69* |
| Mobile Home | 72–95 (median ~84) | 100 | 100 | 69* |
| Mobile Contact | 82–89 | 100 | 100 | 69* |

CLS is 0 everywhere. \*SEO is 69 only because the site is deliberately `noindex` while
`site.isPlaceholder` is `true`; it returns to 100 when that flag is switched off.

Mobile scores vary by up to 20 points between identical runs on this laptop, because Lighthouse's
mobile profile (4x CPU slowdown, 1.6Mbps) runs alongside the server and browser. See
`docs/performance.md` for the remaining structural gap and the three options for closing it.

## Build

`npm run lint` and `npm run build` both pass with no errors or warnings.

## Issues found and fixed in this phase

1. **The services dropdown could not be opened by tapping on a tablet.** A tap fires `mouseenter`
   and `click` together, so the menu opened and closed immediately. Hover-to-open is now limited to
   devices that report `(hover: hover) and (pointer: fine)`; touch devices get click-to-open.

No other defects were found.

## Post-review changes (18 September 2026)

Applied after the client's screenshot review, then re-verified (lint, build, axe, QA sweep, all
screenshots regenerated):

| # | Change |
|---|---|
| 1 | Service columns on Home and `/services` share one top edge; the diagonal stagger is gone |
| 2 | Privacy and Terms gained a sticky "On this page" index in the right column at `lg` and above |
| 3 | The 404's fourth bar is a solid gold bar at 40% opacity, with the same slanted top as the others |
| 4 | PageHeader bars sit fully inside the navy band (height 58%, 40px clear of the bottom edge) |
| 5 | The process curve runs from the top of bar 01 to bar 04 and renders behind the bars (orbit first in the DOM, bars at `z-10`) |
| 6 | The hero divider is a shallow symmetric arc, inset 300px each side, fading to transparent at both ends |
| 7 | Mobile hero padding tightened — see the note below on its height |
| 8 | WhatsApp placeholder button: unchanged navy primary at 45% opacity — see the note below |
| 9 | The contact details column is sticky on desktop, so it tracks the tall form instead of leaving dead space |
| 10 | About "Who we are": removed the right column's top offset so both columns start level |
| 11 | Home "Why ZMS": bordered cards on small screens, gold rules from `lg` up |

**Two notes on the review list:**

- **Item 7 (mobile hero height).** The hero already fills the viewport below the nav: measured at
  390×844 it is **772px tall with a 73px nav**, so 845px total. It cannot grow without pushing the
  page into a scroll on first paint. The composition felt short because the content sat high inside
  it, so the bottom padding came down from 128px to 96px to centre it better.
- **Item 8 (WhatsApp button).** No grey exists in the codebase. The button is
  `background #081F2D`, `border #C89A3D`, `text #FBF6EA` at `opacity: 0.45`, exactly the brief's
  disabled style. The grey appearance is what navy at 45% opacity looks like blended with the ivory
  page. To remove that appearance entirely the fill would have to stay at full strength, which is a
  different treatment — flagged for the client rather than changed unilaterally.

## Open items carried to launch

These need client or legal decisions and are listed in the README's before-launch checklist:

1. Mission, vision and values wording (`src/data/pages.ts`) — proposed by me, not supplied.
2. "Clear scope and pricing" and "Direct senior involvement" — held back until confirmed.
3. Response-time wording in the form's success message.
4. Privacy and Terms legal review, plus their "last updated" dates.
5. ~~Form and secondary-button border contrast~~ — resolved: raised to navy 55%, measuring 4.76:1
   and 4.67:1. Recorded as an approved deviation in `docs/accessibility-audit.md`.
6. Mobile performance: accept ~84, or take one of the two structural options in `docs/performance.md`.
7. Real email, phone, WhatsApp number and domain, then `isPlaceholder: false`.
