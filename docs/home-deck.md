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

**That clean axe run says nothing about the hero.** Over video and gradients axe cannot resolve a
background, so the headline and lead land in its *incomplete* bucket — flagged for a human, neither
passed nor failed. Their contrast is measured separately and by hand: bare, navy on the supplied
footage is 2.56:1, and what carries it past AA is the ivory halo on the glyphs. The method and the
per-width figures are in "Measuring haloed text" below. Treat axe as covering the other ten pages
and every non-hero surface, not this one.

Removing the chrome took the page's only decorative text with it. While it existed it had to meet
contrast like anything else, which is why the numerals were raised to `navy/70` on light slides and
`ivory/70` on the navy one; the tick rail also carried the slide anchors as a real
`<nav aria-label="Slides">`. Those anchors were navigational duplicates of the nav and the scroll
cue, so nothing reachable was lost — every slide still has its `id`.

Under `lg` the tile selector is not a tablist at all: the three services render as stacked
`<article>` elements, so there is nothing to operate by keyboard or pointer that a tap cannot reach.
From `lg` up it is a tablist with arrow, Home and End keys.

## The hero glow, rescaled to the text

The video was invisible below about 1200px. Two full-bleed layers were responsible: a legibility
scrim at 0.82–0.95 ivory across the whole hero, and a centred radial glow on top of it. At 768px the
left two thirds were cream; at 375px only a strip down the right-hand edge of the footage survived.

The wash is now `.hero-glow`, rendered inside the hero's text column and sized to it, so it stays a
pool behind the headline rather than a full-width wash. The full-bleed layer that remains only takes
the glare off the footage (0.14–0.34 ivory, down from 0.82–0.95).

### Making it read as haze, not as an object

The first attempt fixed visibility but produced a distinctly bounded ellipse — you could see where it
started and stopped, so it read as a spotlight sitting on the footage.

The cause was not strength but falloff. A five-stop ramp ending at a fixed ellipse still has a large
slope where it stops, and a discontinuity in the *rate* of change is what the eye picks up as an
edge. To measure that rather than guess at it, `glowedge.mjs` replaces the footage with flat grey and
hides the copy, so the only thing varying across the frame is the wash, then reads the brightness
profile along the horizontal and vertical centrelines and differentiates it. The second difference is
the number that matters: a haze varies smoothly, a bounded shape spikes where it terminates.

The old ramp fell from 20% of peak to 2% inside a single pixel:

```
768px vertical profile %:  0 0 0 0 0 0 56 94 98 ... 96 73 0 0 0      maxKink 1.06
```

The curve now runs through 26 stops on an eased profile: a plateau near 0.97 over the copy, half
strength by 70% of the radius, 4.6% by 95%, and a slope already near zero before it ends.

```
768px vertical profile %:  0 0 0 5 22 45 72 87 94 96 ... 90 78 53 31 10   maxKink 0.40
1440px horizontal      %:  69 83 92 96 98 99 100 ... 90 80 61 44 23 10 3 2 1 1
```

| | before | after |
|---|---|---|
| worst second difference (the edge signal) | 1.06 | **0.44** |
| worst max slope | 2.64 | **1.16** |
| 1440px horizontal tail, 20% → 2% of peak | 196px | **166px** |

The curve is derived, not hand-tuned. It is the composite of three concentric layers, each carrying
the same eased tail, flattened into one gradient:

```
radius scale   peak alpha
0.70           0.88   core, over the copy
0.88           0.60   mid
1.00           0.34   halo, the long faint tail

tail (fraction of each layer's own radius → fraction of its peak)
0.00→1.00  0.32→0.98  0.50→0.92  0.62→0.83  0.72→0.70  0.80→0.55
0.86→0.40  0.91→0.26  0.945→0.15 0.97→0.075 0.987→0.03 1.00→0
composite(r) = 1 − Π (1 − peak × tail(r / scale))
```

Those numbers are the whole specification; the stop list in `globals.css` is the arithmetic done
once. Re-deriving it by hand is a few lines in any language, so the throwaway generator is not kept
in the repo.

Flattening matters for more than tidiness. Left as three stacked radials the visual result was
identical, but the hero's playing video forced all three to repaint together and mobile TBT went from
92ms to ~890ms. One gradient paints the same picture. Verified by interleaving the one-gradient and
eased builds in a single machine state: TBT 501/757ms against 522/409ms — indistinguishable, so the
26 stops cost nothing measurable.

Measured per width after the change — worst case over four video frames:

| width | video visible | headline | lead |
|---|---|---|---|
| 375px | 72% | 7.83:1 | 9.31:1 |
| 390px | 73% | 9.39:1 | 9.12:1 |
| 768px | 72% | 8.03:1 | 11.82:1 |
| 1024px | 72% | 8.49:1 | 11.27:1 |
| 1440px | 81% | 10.10:1 | 10.38:1 |
| 1920px | 87% | 8.26:1 | 10.09:1 |

Both goals held while the edge was removed: visibility rose from 59–83% to 72–87%, and the headline
contrast floor from 7.35:1 to 7.83:1. Every figure clears AA with room to spare — 3:1 for the
headline at that size, 4.5:1 for the lead.

### Halving the wash, and moving legibility onto the glyphs

On a real phone the wash was still veiling the picture: a ~0.97 peak over the
centre of the frame left the footage reading as a pale blur, even with the edge
gone. The contrast numbers were never the constraint — 7.8–9.4:1 against a
4.5:1 requirement is a lot of headroom to be spending on a veil.

So the wash peak was cut to **0.46**, less than half, and the full-bleed layer
with it (0.34–0.14 down to 0.20–0.06). The falloff shape is untouched.

What replaces the lost legibility is `.hero-ink`: an ivory halo on the glyphs
themselves, which is how broadcast titling keeps text readable over picture. A
wash has to dim the whole frame to guarantee contrast at the one place it is
needed — behind the letterforms — so it trades the footage away. A halo puts the
ivory exactly there and nowhere else, and costs nothing visually where the
background is already light, because ivory on ivory is invisible.

Radii are in em so one declaration serves every size. Body copy gets a second,
proportionally wider class: strokes at 17px are thin enough that an em-scaled
halo disappears into them, and the lead sits over the busiest part of the
footage — a tower facade of horizontal mullions at roughly its own stroke
weight.

The hero's secondary button needed the same thinking. `secondary` is transparent,
which was fine under a heavy wash; with the wash cut back its navy label sat
straight on moving video. It now uses a `secondaryOnMedia` variant that brings
its own ivory ground. Passing `bg-ivory/90` through `className` does not work —
it and the variant's `bg-transparent` are the same property, and Tailwind
resolves that by stylesheet order, not by the order in the attribute.

#### Measuring haloed text

The old measurement — hide the text, sample what is behind it — describes a
large-area wash but not a halo: it reports the footage, which is no longer what
sits against the letterforms. Note also that axe is no help here; over video and
gradients it cannot resolve a background at all, so the hero headline lands in
its *incomplete* bucket rather than its pass bucket, and a clean axe run says
nothing about this.

`inkcheck.mjs` measures the halo directly: shoot the region twice with the text
shown and hidden, take the glyph mask from the pixels that darken, take the halo
ring from nearby pixels that *lighten*, and report the 5th-percentile luminance
of that ring so a few bright outliers cannot flatter the result.

| width | video visible | headline effective | lead effective | bare background |
|---|---|---|---|---|
| 375px | 98% | 6.79:1 | 6.64:1 | 3.9–4.4:1 |
| 768px | 97% | 8.40:1 | 7.54:1 | 3.1–3.7:1 |
| 1440px | 97% | 7.26:1 | 6.05:1 | 1.6–3.6:1 |

The bare-background column is the honest caveat: without the halo this copy
would not meet AA. The halo is load-bearing, not decoration, which is why it
lives in a documented class rather than an inline flourish.

Video visibility went from 72–87% to **96–98%** — the skyline, the glass facade
and the water are all identifiable at every width. The edge measurement still
holds: worst second difference 0.52, worst max slope 1.00, against 1.06 and 2.64
for the original ramp.

Cost, measured by interleaving both builds in one machine state: performance 90
against 89–90, TBT 54/73ms against 92/140ms. The halo costs roughly 40–70ms of
paint on a throttled phone and no score.

Screenshots: `review-shots/hero-before` (original full-bleed scrim),
`review-shots/hero-after` (rescaled wash), and `review-shots/hero-wash-before`
/ `review-shots/hero-wash-after` for this change at 375 and 1440.

## The gate now takes focus as it appears

Enter and Space did nothing until the page had been clicked. The cause was not the key handler, which
was already on `window`: the panel **did not exist yet**. Whether to show it depends on
`sessionStorage` and the motion preference, so it cannot render on the server and only appears once
hydration has run — measured at t+300ms after load the gate was absent, focus was on `<body>`, and
Enter had nothing to dismiss.

`TearGate` now claims focus the instant the panel exists: `autoFocus` on mount, then again from an
effect on the next frame, since during hydration the element can be in the document a beat before the
browser will accept focus on it. Verified at t+300ms, t+900ms and t+2000ms after load —
`document.activeElement` is the dialog and Enter dismisses it with no prior click in all three.
