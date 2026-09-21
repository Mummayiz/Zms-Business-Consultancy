# Home — deck rebuild

Home only. About, Services, the three service pages, Approach, Contact, Privacy, Terms and 404 are
untouched, and so is the shared nav.

## What is on the page

Seven full-height slides:

| | Slide | Content |
|---|---|---|
| 01 | Hero | Video background, poster-first, headline first with no eyebrow, two buttons, scroll cue |
| 02 | The firm | Who ZMS is, plus the facts row |
| 03 | Services | Tile selector across the three services |
| 04 | Signature | Navy slide: the mark, the orbit, three pillars |
| 05 | Approach | The four stages |
| 06 | Standing | Licence panel and the confirmed Why ZMS points |
| 07 | Get in touch | Three routes into the enquiry form |

The slides carry no chrome. The counter, the tick rail and the corner Roman numerals were all
removed, along with the hero's "Abu Dhabi" eyebrow and the two gold rules that flanked it — on the
hero the headline is now the first thing on the slide. The eyebrow labels on slides 02–07 stay.

Each slide still has an `id`, so `#firm`, `#services` and the rest remain valid anchors; the hero's
scroll cue still points at `#firm`. What went with the chrome was its data: the per-slide `label` and
`roman` fields and `TOTAL` in `data/deck.ts`, `heroSlide.eyebrow`, the `data-tone` attribute the rail
used to read the slide's tone, the `.deck-chrome` and `[data-gate="open"]` rules, and the `.hero-rule`
class with its `hero-draw-x` keyframe. `rule-taper` stays — the other pages use it.

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

Two layout faults the screenshots caught that the build and the audits did not:

- **Slides were taller than the screen.** The nav is `sticky`, so it holds 72px (84px from `lg`) of
  the viewport on every slide, but each slide measured `min-h-svh`. Now
  `min-h-[calc(100svh-72px)]`, so a slide fills exactly the space it has.
- **The hero's scroll cue sat on top of its own buttons** at 390px. It was `absolute bottom-12`
  inside the padded content column, where `bottom` resolves against the height of the text rather
  than the slide. `Slide` grew an `overlay` slot — full-bleed, in front, after the content in tab
  order — and the cue moved into it.

Two further faults were found in the chrome — the counter showing through the gate's torn edge, and
navy-on-navy chrome being unreadable over slide 04 — and both were fixed at the time. The chrome has
since been removed outright, so those fixes went with it.

### The doubled Roman numerals

Reported at slide 3: `II / VII` and `III / VII` on screen together. The cause was not state but
duplication — `Slide` rendered its numeral **twice per section**, once at `top-8 right-8` and once at
`right-8 bottom-8`:

```tsx
<span className="absolute top-8 right-8 …">{slide.roman} / {romanTotal}</span>
<span className="absolute right-8 bottom-8 …">{slide.roman} / {romanTotal}</span>
```

Static decoration anchored to each slide's own top and bottom edges, on the assumption that only one
slide is ever in view. It isn't: at any boundary, slide N's bottom numeral and slide N+1's top
numeral are both visible, which is exactly what was seen.

**Nothing else shares that cause.** The numerals were the only element rendered twice per slide. The
other edge-anchored decoration on Home was checked and is all single-instance and slide-scoped:
`HeroDivider` and the scroll cue exist on the hero alone, `HeroVideo`'s bottom fade sits inside the
hero's own background layer, `TearGate`'s gold line lives inside the fixed gate overlay, and
`PathsForward`'s gold edge is anchored to a card rather than a slide. `DeckChrome` made the same
"one slide in view" assumption but resolved it correctly, with an IntersectionObserver and a
`-45% 0px -45% 0px` root margin that picked a single active slide. Both are now gone regardless.

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
clear, where no text sits.

Removing the chrome took the page's only decorative text with it. While it existed it had to meet
contrast like anything else, which is why the numerals were raised to `navy/70` on light slides and
`ivory/70` on the navy one; the tick rail also carried the slide anchors as a real
`<nav aria-label="Slides">`. Those anchors were navigational duplicates of the nav and the scroll
cue, so nothing reachable was lost — every slide still has its `id`.

Under `lg` the tile selector is not a tablist at all: the three services render as stacked
`<article>` elements, so there is nothing to operate by keyboard or pointer that a tap cannot reach.
From `lg` up it is a tablist with arrow, Home and End keys.
