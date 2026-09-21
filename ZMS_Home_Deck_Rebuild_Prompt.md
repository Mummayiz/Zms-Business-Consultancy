# ZMS HOME PAGE — DECK REBUILD

Rebuild the **Home page only** in the visual and structural language of a reference site the client has chosen. Every other page stays exactly as it is for now.

The master brief (`ZMS_Master_Website_Prompt_FINAL.md`) still governs: palette, typography, content rules, the construction restriction, accessibility, and the placeholder/`isPlaceholder` behaviour. This document overrides it only where it says so explicitly.

---

## 0. HOW TO WORK

You are in **PLAN mode**.

1. Study the reference site: **https://the-avenues-deck1.vercel.app/** — open it, scroll the whole page, and note its structure, type treatment, deck chrome, spacing and interactions. Use "Skip intro" to get past the gate, then go back and study the gate itself.
2. Review the current Home page and everything built in the motion/depth upgrade (`docs/motion-depth.md`, `src/config/features.ts`, `src/lib/motion.ts`, `src/lib/scroll.ts`, the brand and motion components).
3. Check the video and poster assets are present (section 3 below).
4. Return a plan: section-by-section approach, new components, what you'll reuse versus replace from the motion work, the video/performance strategy, and any conflicts.

**Stop and wait for approval.** Then build, then stop for review.

Commit locally. **Do not push to origin** unless explicitly asked.

---

## 1. WHAT WE ARE TAKING FROM THE REFERENCE

The client likes the reference's *template* — its structure and treatment, not its colours or content. Take these:

1. **Deck structure.** Every section is a full-height numbered "slide" rather than a passage of a scrolling page.
2. **Deck chrome.** A slide counter bottom-left (`SLIDE 01 / 07`), a section marker on the right edge (`02 — SERVICES`), and a vertical tick rail down the right side that marks progress.
3. **Eyebrow labels.** A ◆ diamond glyph followed by wide letterspaced caps above every section: `◆ SERVICES · WHAT WE DO`.
4. **Display headlines.** Two or three lines of large Cormorant, mixing roman and italic, with one accented word. Tight leading, generous space around them.
5. **Big-fact treatment.** Large display-serif values with a tiny letterspaced caption beneath, laid out in a row separated by hairlines.
6. **Sticky nav** whose current section gets a gold underline as you scroll, with a boxed CTA button carrying an arrow.
7. **Asymmetric two-column layouts** that alternate side to side down the page.
8. **Bordered panels with corner ticks** for credential-style content.
9. **An interactive tile selector** — a grid of tiles where choosing one swaps the content of an adjacent detail panel.
10. **Italic captions** prefixed with ◆ beneath imagery.

Take the *structure and treatment*. Do not copy the reference's copy, colours, or any of its assets.

---

## 2. WHAT WE ARE NOT TAKING

- **Its colours.** ZMS stays navy `#081F2D`, gold `#C89A3D`, ivory `#FBF6EA`, charcoal `#172B36`. Nothing else.
- **Its ivory/navy ratio stays as ZMS has it** — ivory-dominant, roughly 60% ivory / 30% navy / gold as accent only. The client has explicitly chosen to keep this rather than invert to the reference's dark-dominant scheme. Do not darken the site to chase the reference's mood.
- **Its invented-sounding metrics.** ZMS has no statistics and will not have any. See section 6.

---

## 3. VIDEO ASSETS

The client supplies the hero video. Expect:

```
public/media/hero-desktop.mp4     landscape, upscaled by the client
public/media/hero-mobile.mp4      portrait original (478×850, ~15s, silent)
public/media/hero-poster.jpg      first frame, full quality
```

If any are missing, **stop and say which** — do not substitute, re-encode or generate them.

**Rules:**

- The video is **atmosphere only**. It carries **no caption and no alt text identifying a location**. Alt/aria text is simply "Background video". Nothing on the page states or implies where the footage was shot.
- `muted`, `loop`, `playsInline`, `autoPlay`. No audio, no controls, no sound toggle.
- The **poster paints first** and is the LCP element. The video loads after first paint and fades in when it can play. The hero must look finished and intentional if the video never loads.
- `<source>` switching by viewport: portrait file below 768px, landscape above.
- If `prefers-reduced-motion` is set, the poster shows and the video never loads.
- Fallback if the video errors: the existing `zms-hero-background.jpg`.
- Over the video: the ivory radial glow and bottom fade to ivory, as now, so the headline stays legible.

---

## 4. THE TEAR INTRO

Reproduce the reference's tear-to-enter gate, with the accessibility holes closed.

**Appearance:** a full-screen ivory panel over the hero, carrying the ZMS logo, a short line of copy, and the instruction `◆ TEAR TO ENTER ◆`. Beneath it, `BEGIN THE TOUR`. A `SKIP INTRO` control sits bottom-right at all times.

**Interaction:** dragging anywhere horizontally tears the panel open along a jagged edge, revealing the hero beneath. The torn edge carries a thin gold line. The tear follows the drag, and past a threshold it completes on its own.

**Required escape hatches:**

- `SKIP INTRO` is always visible and keyboard-focusable.
- Enter or Space opens the gate without any drag. A drag with no keyboard equivalent fails WCAG 2.5.7.
- The gate appears **once per session** (`sessionStorage`), never on a return from another page.
- Under `prefers-reduced-motion`, the gate does not appear at all.
- The gate must never block a visitor who cannot or will not drag.

---

## 5. HOME PAGE — SEVEN SLIDES

Keep the existing content and its objectives. Restructure the presentation.

**Slide 01 — Hero**
Video background, deck chrome, `◆ ABU DHABI` eyebrow between gold rules, the three-line headline, supporting line, and two buttons. `BEGIN ↓` bottom-centre.

**Slide 02 — The firm**
Intro copy in the reference's two-column arrangement, with the hero-facts row beneath (section 6).

**Slide 03 — Services**
The reference's tile-selector pattern: three tiles (01 Administrative Consultancy, 02 Marketing Consultancy, 03 Project Management) beside a detail panel that swaps on hover, tap and keyboard focus. The panel shows the service's headline, a short description, three bullet points, and "Explore the service →".

Must work on keyboard (arrow keys move between tiles) and on touch. Mobile falls back to stacked panels.

**Slide 04 — Signature (navy)**
The concept artwork shown once, with `Structure. Strategy. Growth.` in large Cormorant, the orbit drawn between image and text, and the three supporting lines. This is a navy slide — gold text is allowed here.

**Slide 05 — Approach**
The four rising architectural bars with the gold curve, presented as a slide with the stage detail alongside.

**Slide 06 — Standing**
The credential treatment from the reference: bordered panels with corner ticks holding the licensing block and the Why ZMS points, plus the hero-facts row if it reads better here than on slide 02.

**Slide 07 — Get in touch**
The reference's "three paths forward" structure, adapted: three routes (Administrative, Marketing, Project Management) each linking through to Contact with the service preselected, plus the CTA band.

Then the footer, unchanged.

---

## 6. THE FACTS ROW

The reference's big-number rows are central to its look. ZMS has no statistics and **must not invent any** — this is absolute.

Use these true values in the display-serif treatment:

| Value | Caption |
|---|---|
| 04 | Licensed activities |
| 03 | Services offered |
| 04 | Stages in every engagement |
| CN-6757442 | Abu Dhabi economic licence |
| 2026 | Established in Abu Dhabi |

No growth figures, client counts, years of experience, team size or project counts. If a row of five reads thin, use four.

---

## 7. TYPOGRAPHY

Cormorant Garamond and Montserrat only, as the master brief specifies. Within that, take the reference's treatment:

- **Headlines** run to two or three lines, mixing roman and italic within one headline.
- **The accent word**: gold is only legible on dark. So —
  - on the video hero and on navy slides, the accent word is **gold**;
  - on ivory slides, the accent word is **italic navy**, never gold.
  Gold text on ivory is 2.4:1 and is forbidden anywhere on the site.
- **Eyebrows and captions**: Montserrat 600, uppercase, wide letterspacing, 11–13px, prefixed with ◆.
- **Facts**: Cormorant, large, with lining figures. Captions beneath in the eyebrow style.
- Hero headline may go larger than the master brief's 76px ceiling if the composition needs it. Everything else keeps the existing scale.

---

## 8. MOTION

Reuse the motion work already built where it fits, and drop what the new structure makes redundant.

- **Keep**: the scroll-scene machinery, motion presets, `features.ts` flags, reduced-motion handling.
- **Replace**: the hero parallax and depth bars — the video replaces them. Remove or disable cleanly, don't leave dead code.
- **Add**: slide-to-slide transitions in the reference's manner, the deck chrome updating as sections pass, the tile-selector transition, and the tear.
- Motion must be **clearly visible** — the last round was so subtle the client saw nothing. Err towards too much; it's easier to dial back.
- Scroll scenes scrub in both directions. No play-once latch.
- Everything off under `prefers-reduced-motion`, with final states shown immediately.
- No scroll-jacking. The page scrolls at its natural speed.

---

## 9. CONSTRAINTS

**Content:** no invented clients, testimonials, case studies, awards, partnerships, certifications, statistics, years of experience, team size, offices or projects. The construction restriction is untouched: no construction content anywhere on Home.

**Accessibility:** axe at 0 violations. One H1. Full keyboard operation of the tear gate, the tile selector, the nav and the mobile menu. Visible focus states — navy on light, gold on navy. WCAG AA contrast throughout.

**Performance gates**, measured locally against the current local baseline:

| Gate | Limit |
|---|---|
| Desktop Lighthouse | ≥ 95 |
| Mobile Lighthouse | ≥ 85 |
| LCP (the poster, not the video) | ≤ 3.0s mobile |
| CLS | 0 |

If the video breaches these, report it and propose the fix rather than shipping past it.

**Scope:** Home only. Do not touch About, Services, the service pages, Approach, Contact, Privacy, Terms or 404. The nav and footer stay shared — if a change there is unavoidable, flag it first.

---

## 10. DELIVERABLES

1. The rebuilt Home page, committed locally, not pushed.
2. Before/after Lighthouse, desktop and mobile.
3. Screenshots at 390, 768, 1440 and 1920 — including the tear gate and the tile selector in both states.
4. A note on anything that didn't work as specified, and why.
