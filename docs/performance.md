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
