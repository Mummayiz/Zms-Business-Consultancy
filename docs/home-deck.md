# Home — deck rebuild

Home only. About, Services, the three service pages, Approach, Contact, Privacy, Terms and 404 are
untouched, and so is the shared nav: the deck chrome lives inside the Home slides.

## What is on the page

Seven full-height slides, numbered in the chrome and in Roman numerals in the slide corners:

| | Slide | Content |
|---|---|---|
| 01 | Hero | Video background, poster-first, headline, two buttons, scroll cue |
| 02 | The firm | Who ZMS is, plus the facts row |
| 03 | Services | Tile selector across the three services |
| 04 | Signature | Navy slide: the mark, the orbit, three pillars |
| 05 | Approach | The four stages |
| 06 | Standing | Licence panel and the confirmed Why ZMS points |
| 07 | Get in touch | Three routes into the enquiry form |

Deck chrome is the slide counter (bottom left) and the tick rail (right edge). The rail is a real
`<nav aria-label="Slides">` with anchor links and `aria-current`; the counter is decorative. Labels on
the rail appear only at `2xl`, where there is a gutter wide enough to hold them without colliding
with the content column.

## Content rules

Nothing was invented. The facts row carries only values that exist in the business record:

```
04 licensed activities · 03 services offered · 04 stages in every engagement · CN-6757442
```

"2026 · Established in Abu Dhabi" was dropped on instruction. No statistics, clients, testimonials,
awards, years of experience, team size or project counts appear anywhere, and no construction content
appears on Home. `isPlaceholder` stays true, so every page still noindexes.

The video is atmosphere only: `aria-label="Background video"`, muted, looping, `playsInline`,
autoplaying, no controls, no caption and no text saying where the footage was shot.

## Things that did not work as specified

**1. The hero's gold accent is italic navy instead.** The brief asks for a gold accent word on the
video hero, as the reference has. Over our footage behind the ivory glow, gold measures about 2.4:1 —
below AA, and the master brief forbids that outright. The accent is italic navy here. Gold is still
the accent on the navy slide (04), where it measures well past AA. Noted in `page.tsx` at the
heading.

**2. `/contact?service=` does not preselect anything yet.** The three routes on slide 07 link to
`/contact?service=<title>`, as specified. Contact does not read that parameter, and adding it would
mean changing a page that is out of scope for this rebuild. The links are correct and harmless; the
preselection needs a separate change to Contact.

**3. The mobile poster LCP gate is still not met in Lighthouse.** 3.56s against ≤3.0s, improved from
3.69s by the smaller supplied posters. Two things were ruled out as the cause by measurement: the
video (blocking it changes nothing) and, in the end, the poster itself — Lighthouse's figure is
dominated by hydration render delay, so halving the poster moved it only ~130ms. Full working in
`performance.md`, including an estimate of mine that proved wrong by roughly a second.

## Fixed during review

Four things the screenshots caught that the build and the audits did not:

- **Slides were taller than the screen.** The nav is `sticky`, so it holds 72px (84px from `lg`) of
  the viewport on every slide, but each slide measured `min-h-svh`. Now
  `min-h-[calc(100svh-72px)]`, so a slide fills exactly the space it has.
- **The hero's scroll cue sat on top of its own buttons** at 390px. It was `absolute bottom-12`
  inside the padded content column, where `bottom` resolves against the height of the text rather
  than the slide. `Slide` grew an `overlay` slot — full-bleed, in front, after the content in tab
  order — and the cue moved into it.
- **The slide counter showed through the gate.** The tear's jagged edge deliberately leaves a few
  percent of the left uncovered, which was enough to reveal the counter behind it. `TearGate` now
  sets `data-gate="open"` on the document and the chrome fades out until the gate has gone.
- **The chrome was invisible on the navy slide.** It is fixed, so it sits over whichever slide is in
  view, and navy ink on slide 04 left the counter and the inactive ticks unreadable. `Slide` exposes
  `data-tone` and the chrome follows it.

axe does not catch the last two: the chrome is `position: fixed`, so axe resolves its background
against the page, not against the slide that happens to be behind it. Both were found by reading the
screenshots.

## The tear gate

Every escape hatch the reference lacks is present:

- **SKIP INTRO** is always visible and focusable.
- **Enter or Space** opens it with no drag at all, which is what WCAG 2.5.7 requires — a drag must
  never be the only way. The listener is on `window`, not the panel: focus starts on `<body>` and
  events bubble up, so a handler on the panel alone never fired.
- It appears **once per session** (`sessionStorage`, key `zms-gate-seen`).
- It **never renders** under `prefers-reduced-motion: reduce`.
- On dismissal, focus moves to the hero heading.

Verified: gate present, Enter dismisses it and focus lands on `hero-title`, a reload suppresses it,
reduced motion suppresses it and leaves the poster with no video element at all, and a drag past a
third of the width tears it open.

## Accessibility

axe-core 4.13, WCAG 2.0/2.1 A and AA, at 390px and 1440px, with the gate up and dismissed:
**0 violations** in all four states, one `<h1>` throughout.

The hero needed an ivory scrim to get there. Against the supplied footage, navy text measured 2.56:1;
the wash takes it to 14.35:1 on desktop and 12.07:1 on mobile while leaving the right of the frame
clear, where no text sits. The decorative Roman numerals are real visible text, so they meet contrast
like anything else — `navy/70` on light slides, `ivory/70` on the navy one.

Under `lg` the tile selector is not a tablist at all: the three services render as stacked
`<article>` elements, so there is nothing to operate by keyboard or pointer that a tap cannot reach.
From `lg` up it is a tablist with arrow, Home and End keys.
