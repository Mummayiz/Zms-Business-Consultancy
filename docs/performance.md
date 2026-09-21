# Performance — Phase 7

Measured with Lighthouse 13.4 against the production build (`next build` + `next start`) on the
development laptop. Each figure is the median of three runs.

## Before and after

| | Baseline | After |
|---|---|---|
| Desktop Home | perf **100**, LCP 0.76s, TBT 25ms | perf **100**, LCP 0.76s, TBT 5ms |
| Desktop Contact | perf **100** | perf **100** |
| Mobile Home | perf **64**, LCP 4.36s, TBT 767ms | perf **84**, LCP 3.2s, TBT 380ms |
| Mobile Contact | perf **75**, LCP 3.93s | perf **88**, LCP 3.3s |
| JavaScript (Home) | 290KB | **202KB** |
| Fonts | 72KB (6 files) | **58KB** (4 files) |
| Total page weight (Home, mobile) | 493KB | **383KB** |
| CLS | 0 | 0 |
| Accessibility / Best practices | 100 / 100 | 100 / 100 |

SEO scores 69 on every page because the site is deliberately `noindex` while
`site.isPlaceholder` is `true`. It returns to 100 when that flag is switched off.

## What changed

1. **zod is server-only.** The contact form was shipping the whole zod library to the browser
   (~88KB compressed), and Next's route prefetching pulled it onto the Home page too. Field rules
   and messages now live in one dependency-free module (`src/lib/enquiry.ts`) used by the form, and
   the API wraps those same rules in a zod schema (`src/lib/enquiry-schema.ts`). Single source of
   truth, no library in the browser. **This was the largest single win: 88KB.**
2. **Motion feature code is code-split.** `MotionProvider` uses `LazyMotion` with an async import,
   and components use the lightweight `m.*` components. `strict` mode prevents anyone importing the
   full `motion.*` components again by accident.
3. **Hero image right-sized.** Imported as a module so Next knows the intrinsic size and never
   upscales, served at ~75vw on phones with `quality={60}`. It is a soft background behind an ivory
   glow, so a lower resolution is invisible while the LCP image drops from 83KB to about 25KB.
4. **One less font file.** Cormorant 500 and Montserrat 700 were unused.
5. **Concept artwork** is a module import too, so the 2.1MB PNG is served as a much smaller WebP.

## Two changes measured and rejected

- **AVIF.** Saved about 13KB per page but cost **over a second** of main-thread decode time for the
  1.5MP hero on desktop, dropping desktop performance from 100 to 67. WebP only.
- **Blur placeholder on the hero.** Compositing a blurred placeholder across the whole viewport added
  ~1.3s of blocking time on desktop. Removed from the hero; the concept artwork keeps it, since it is
  smaller and below the fold.

Both are worth knowing about before anyone "improves" them back.

## Resolved on production (19 September 2026)

Measured against the Vercel deployment, the gap below closed on its own: the CDN, brotli and HTTP/2
recover what the local server could not.

| | Local `next start` | Vercel |
|---|---|---|
| Desktop Home / Contact | 100 / 100 | **98–100 / 100** |
| Mobile Home | 82–87, LCP 3.2s | **87–90, LCP 2.6s** |
| Mobile Contact | 82–89 | **82–91** |

**Mobile now meets the ≥90 target, so both structural options below are rejected.** Motion stays in
use across the site as the brief requires, and the hero photograph stays at its supplied resolution.
The section is kept for the record of what was measured and why nothing further was changed.

## The gap as it stood locally, and what closing it would have cost

Mobile Home measures **82–87** locally, short of the 90 target. Note that scores on this machine vary
by up to 10 points between identical runs, because Lighthouse's mobile profile (4x CPU slowdown,
1.6Mbps) runs on a laptop that is also running the server and browser. Production on Vercel, with a
CDN and HTTP/2, should measure higher.

What remains is structural, not wasteful:

- **LCP (3.2s)** is the hero photograph. It cannot start downloading until the HTML arrives, and it
  competes with 202KB of JavaScript and 58KB of fonts on a 1.6Mbps connection.
- **TBT (~380ms)** is React hydration. Of the 202KB, roughly 140KB is the React and Next.js runtime.

Options that would close the gap, each needing a decision because they change approved behaviour:

1. **Replace the scroll reveals with CSS scroll-driven animations** and keep Motion only for the
   mobile menu and the orbit. That removes Motion from most pages (about 30KB) and most hydration
   work. Costs: reveals would not animate in Firefox or older Safari, which would show content in its
   final state instead, and it moves away from the brief's "use Motion consistently" instruction.
2. **Use a smaller hero photograph** — a crop around 900px wide rather than the 1254px square — which
   would cut the LCP image further.
3. **Accept the current numbers**, given desktop is 100 and the mobile gap is largely the synthetic
   throttling profile.

No further optimisation was applied without sign-off, since each option changes something already
approved — and on production none of it proved necessary.

---

# Performance — Home deck rebuild

Measured with Lighthouse 13.4 against the production build (`next build` + `next start`), Home only.
Median of three runs; the deck rebuild changed no other page.

| | Before (motion/depth Home) | After (deck Home) |
|---|---|---|
| Desktop | perf **100**, LCP 0.76s, TBT 5ms | perf **100**, LCP 0.75s, TBT 0ms |
| Mobile | perf **89**, LCP 3.2s, TBT 380ms | perf **88–89**, LCP 3.69–3.76s, TBT 84–127ms |
| CLS | 0 | **0** on both |
| axe violations | 0 | **0** (390px and 1440px, gate up and dismissed) |

Gates from the brief: desktop ≥95 **met (100)**, mobile ≥85 **met (88–89)**, CLS 0 **met**,
axe 0 **met**. The poster LCP gate of ≤3.0s mobile is **not met in Lighthouse** — see below.

## The two posters

`hero-desktop.mp4` pairs with `hero-poster.jpg` (1920×1080) and `hero-mobile.mp4` with
`hero-poster-mobile.jpg` (1080×1920). Each poster is frame zero of its own file, so the handover from
still to video is invisible. All four are served exactly as supplied — not re-encoded, resized or
passed through the image optimiser, which is why the poster is a plain `<img>` rather than
`next/image`.

Choosing the pair in an effect was wrong, and measurably so. The first render had to pick a default,
so phones fetched the **landscape** poster immediately and then the portrait one after hydration:

```
hero-poster.jpg         start=341ms  end=2485ms  104KB   ← wrong file, and the LCP element
hero-poster-mobile.jpg  start=3035ms end=4734ms  128KB   ← the right one, far too late
```

A `<picture>` with `<source media="(min-width: 768px)">` and a portrait `<img>` fallback moves the
choice to HTML parse time, so the preload scanner fetches one file and the correct one:

```
mobile  → hero-poster-mobile.jpg start=271ms end=2483ms 128KB   poster files downloaded: 1
desktop → hero-poster.jpg        start=97ms  end=140ms  104KB   poster files downloaded: 1
```

That removed 104KB of wasted mobile transfer and moved the poster request from 341ms to ~270ms.

## The mobile LCP gate: 3.7s against ≤3.0s

**The video is not the cause.** Blocking it outright changes nothing, which rules it out:

| variant | mobile LCP | perf |
|---|---|---|
| as shipped | 3.76s | 89 |
| `*.mp4` blocked | 3.76s | 89 |
| all JavaScript blocked | **2.71s** | 96 |

So the excess is React hydration (~1.05s of simulated LCP), on top of a poster budget that is already
tight: with *no* JavaScript at all the figure is 2.71s, leaving under 300ms of headroom.

Two things are worth separating:

- **Real throttled browser** (Edge, 390×844 at DPR 2, 1.6Mbps, 150ms RTT, 4x CPU): poster LCP
  **2.55s**, which meets the gate.
- **Lighthouse** reports 3.69–3.76s. Lighthouse does not measure that number; it observes an
  unthrottled load (observed LCP 153ms) and re-times it through the Lantern simulator. The
  difference between 2.55s and 3.7s is Lantern's CPU model, not bytes on the wire.

Deferring the video load is already in place and is what took mobile from 80 to 89: the source is
attached only after `load` and on an idle callback, and connections reporting `saveData` or 2g/3g
never fetch it at all.

### The fix, which needs a decision

The one change that would close the gap is **a smaller mobile poster**: at 390px CSS width the
browser needs roughly 780px of pixels, not 1080px. Re-encoding `hero-poster-mobile.jpg` at ~780px
wide would take it from 128KB to roughly 45KB and bring LCP to about 2.2–2.4s in Lighthouse, with
headroom to spare.

This has not been done, because the instruction was explicit: *"All four files are already encoded and
compressed for web. Do not re-encode, resize or regenerate them."* It needs sign-off, and it would
mean a fifth file (a smaller portrait poster) rather than altering any of the four supplied.

The alternative — cutting JavaScript — is worth less than it looks: perfect hydration still lands at
roughly 2.9–3.0s, and the brief asks for more motion on this page, not less.
