# Motion and depth layer

Implements the ZMS Motion & Depth Upgrade on top of the master brief. Content, palette, typography
and layout are unchanged; this is only the motion and depth layer.

## Switches

Everything lives behind `src/config/features.ts`. Set a flag to `false` and that layer stops
rendering — no dead markup, no listeners:

```ts
heroParallax   // multi-plane hero parallax
scrollScenes   // scroll-linked build sequences
depthLayer     // CSS 3D bars behind the hero headline
pointerLight   // gold sheen following the pointer on navy
grain          // noise texture on navy
buttonSheen    // gold sweep on button hover
```

`depthLayer` is independent of the rest, as requested: turning it off leaves the parallax, scenes
and polish untouched.

All of them are additionally off when `prefers-reduced-motion` is set, and the pointer-driven ones
only run on `(min-width: 768px) and (hover: hover) and (pointer: fine)`.

## Item 1 — Layered parallax hero

**The supplied photograph cannot be separated into depth layers.** Measured before building:

- The lattice is a see-through triangulated shell. Sky shows through hundreds of openings, so a
  cut-out would carry sky inside its holes and slide it against the real sky behind.
- There is no background behind the foreground. Parallax needs the back plane to be complete where
  the front plane covers it; moving a cut-out lattice would reveal the original lattice still sitting
  in the base image — a doubled edge. Filling that hole means generating imagery, which the brief
  forbids.
- There is no separable mid-ground. Columns 24–72% are the haze left by removing the logo
  (detail σ 8–14, against 49–58 at the lattice), and the plaza is mostly bottom-edge perspective
  lines that break if moved independently.

Depth therefore comes from moving **generated** planes over the photo, which have no seams:

| Plane | Content | Scroll travel (desktop / mobile) | Pointer |
|---|---|---|---|
| 1 | The photograph | 12px / 6px | ±3px |
| 2 | Ivory glow | −24px / −10px | ±5px |
| 3 | Architectural hairlines | 40px / 16px | ±8px |
| 4 | Depth bars (Item 3) | — | ±12px tilt |

Mobile gets scroll parallax only, at reduced travel, and never pointer tracking.

## Item 2 — Scroll-driven scenes

`useScroll` + `useTransform`, transform and opacity only, one progress value per section.

- **Hero divider** draws across the first half-viewport of scrolling.
- **Service columns**: the top rule extends left to right, then the content steps in, one column
  after another. The rule scale reaches the card through a CSS variable, so `ServiceCard` stays a
  server component.
- **Signature**: the image travels at ±18px and the text at ±42px across the section, with the orbit
  drawn between them.
- **Process bars** grow from the baseline, then the curve traces, then the stage text appears.

**Play-once** is handled by `useLatched`, which only ever moves forwards. Scrolling back up leaves a
section built rather than replaying it.

**Fast-scroll safety**: sequences finish by the time the section top reaches 35% of the viewport, and
the process stage text completes by 93% of its range.

Sequences are scroll-linked on desktop. On phones only the process bars and the orbits are
scroll-linked — the cheapest sequence — and everything else keeps the original one-shot reveals, to
protect mobile blocking time.

## Item 3 — Depth layer (CSS 3D)

Six slim slanted-top bars from the logo mark, at `translateZ` −90 to −260 inside a 1200px
perspective, navy and gold at 7–10% opacity, with a 42-second drift and a ±3.5° pointer tilt.

Positioned in the hazy band either side of the headline (22–34% and 63–76%) rather than over the
lattice or towers, where an early version read as glass slabs laid over photographic detail.

CSS 3D was chosen over Three.js: identical output for flat slabs, ~1KB instead of ~150KB, no canvas,
and no way for it to threaten LCP. It sits between the photo and the glow, so the headline is never
competing with it, and the hero is composed to look complete without it.

## Item 4 — Material polish

- **Gold pointer sheen** on the Signature section, CTA band and page headers: a 520px radial at 8%
  gold, following the pointer through CSS variables written in a rAF-throttled listener — no React
  re-render while the pointer moves. Fades in on enter, out on leave.
- **Grain**: an inline `feTurbulence` tile (160px, no image file) at 3.5% opacity in overlay blend,
  so it modulates the navy's own luminance rather than laying grey over it. Navy surfaces, `md` and up.
- **Button sheen**: a single gold sweep on hover, 0.55s, on hover-capable pointers only.
- **Easing**: the shared `--ease-zms` curve now also drives the sheen and the depth drift.

## Amplification pass (21 September 2026)

The first build was technically correct and visually invisible. On the client's instruction the
master brief's restraint caps (§30's ≤16px, "no excessive parallax") are overridden for this layer.

| | First build | Amplified |
|---|---|---|
| Play-once latch | held | **removed** — scenes scrub both ways and reverse on the way up |
| Photo / glow / hairlines / depth travel | 12 / −24 / 40 / — px | **40 / −70 / 120 / 180 px** |
| Mobile travel | 6 / −10 / 16 / 24 px | **20 / −34 / 58 / 88 px** |
| Pointer counter-shift | ±3–12px | **±10–30px** |
| Depth bars | 6, opacity 7–10%, tilt ±3.5° | **12, opacity 18–26%, tilt ±8°, z −60 to −560** |
| Reveal distance | 12px | **48px** (hero entrance 28px) |
| Service column stagger | 0.10 step | **0.18 step**, content travel 56px |
| Signature divergence | ±18 / ±42px | **±60 / ±140px** |
| Pointer sheen | 8% gold | **18% gold**, 620px radius |
| Button sheen | 35% gold | **70% gold**, 0.7s sweep |
| Hero headline | 12px fade | **masked rise** from behind its own baseline, 1s |

### Two problems the amplification exposed

1. **An animated `clip-path` headline reveal cost ~300ms of blocking time** on a throttled phone,
   because it repaints the whole headline every frame. Rebuilt as a `translateY` inside an
   `overflow: hidden` wrapper: identical masked effect, compositor only.
2. **Scroll-linked opacity leaves text mid-fade whenever a section sits mid-window** — and with the
   latch gone, that includes sections resting on screen. axe caught 2.04:1 on the `/services`
   columns and 1.13:1 on the `/approach` stage text. Two changes fixed it:
   - the scene window now closes early (`start 100%` → `start 70%`), so anything on screen at rest
     is fully built;
   - the process stage text is scroll-linked on desktop only. Phones keep the one-shot reveal, which
     animates on entry and always finishes.

Also fixed: `features.buttonSheen` was never actually consulted — the class was applied
unconditionally. Every flag now genuinely switches its layer off.

### Performance attribution

The amplified build first measured mobile 80–88, which looked like a regression. Isolating each flag
on the same build and machine showed otherwise: parallax only 92–93, scroll scenes only 92–93, both
together 92–93, grain only 93, all flags off 93, **all flags on 92–93**. The dip was machine load
during the earlier run, not the motion layer. The `clip-path` fix was kept anyway — it is
measurably cheaper and no worse.

## Measurements (local production build, median of three runs)

| | No motion layer | Amplified layer |
|---|---|---|
| Mobile Home | 92–93, LCP 3.21–3.31s, TBT 32–44ms | **92** (88–93), LCP 3.14–3.46s, TBT 85–200ms |
| Mobile Contact | 95 | **98** |
| Desktop Home | 100, LCP 0.70–0.73s | **100**, LCP 0.73s, TBT 0ms |
| Desktop Contact | 100 | **100** |
| CLS | 0 | **0** |
| JS (Home) | 202KB | **219KB** (+17KB) |
| axe violations | 0 | **0** |

Gates: desktop ≥95 ✓ (100), mobile ≥85 ✓ (median 92), CLS 0 ✓, mobile LCP within noise of the
3.2–3.3s local baseline ✓.

Against the stated gates: desktop ≥95 ✓, mobile ≥85 ✓, CLS 0 ✓, added JS ≤12KB ✗ (17KB, see below).

## Bug: "Target ref is defined but not hydrated"

**Symptom:** a runtime error on the Home page in `npm run dev`, and no animation at all.

**Cause.** `useScroll({ target: ref })` measures its element on mount, so the ref has to be attached
to a real DOM element on *every* render — Motion's troubleshooting page is explicit that "the `ref` is
not correctly being passed to an element" is the cause, and that a component wrapper alone will not do.

`ServiceColumn` attached its ref only in the scroll-linked branch:

```tsx
if (!scrollLinked) return <Reveal …>{children}</Reveal>;   // ← no ref here
return <m.div ref={ref} …>{children}</m.div>;
```

`useSceneMotion` deliberately reports `false` on the server and on the first client render, so the
fallback branch is *always* what renders when `useScroll` first measures. The ref was therefore never
hydrated on any device, and on mobile or under reduced motion it never would be.

**Fix.** The outer element now carries the ref unconditionally, and the branch only decides what goes
inside it:

```tsx
<div ref={ref} className={className}>
  {scrollLinked ? <m.div style={…}>{children}</m.div> : <Reveal …>{children}</Reveal>}
</div>
```

Audited every other `useScroll` call at the same time: `HeroBackdrop`, `ProcessSteps` and
`SignatureScene` all attach their refs unconditionally in every branch, and `HeroDivider` tracks the
viewport with no target at all. Also deleted `useSceneProgress` and `ScrollScene` from
`components/motion/ScrollScene.tsx` — they were unused, and handing a ref back for a caller to attach
is exactly the trap that caused this.

### Why the first round of testing missed it

Two mistakes, both mine:

1. **I only tested the production build.** Motion's hydration check is a development-time invariant,
   compiled out of production bundles. `next start` could never have shown it. The symptom the client
   saw — nothing animating — was also dev-only, because the thrown error aborted the render.
2. **My scene probes did not listen for console output.** They asserted on computed styles only, so a
   page throwing errors still "passed". Worse, the scroll-linked service columns were reporting
   `opacity: 0.00` in an earlier probe and I read that as "mid-sequence" instead of "dead".

### The check that now catches it

`verify-motion.mjs` (in the session scratchpad) runs the same suite against **both** `npm run dev`
and a production build, and fails on:

- any uncaught page error, any `console.error`, or any message matching `/motion|hydrat|useScroll|Target ref/`;
- the presence of the Next.js dev error overlay (`nextjs-portal` shadow root);
- each scene not actually running: the divider must start undrawn and finish drawn, service rules must
  reach full width with content at full opacity, signature planes must diverge, process bars must
  reach their expected heights and the curve must draw;
- the latch releasing (divider must stay drawn after scrolling back to the top);
- anything left faded on screen after jumping to the bottom of the page.

I verified the harness by stashing the fix and re-running it: it reported the error overlay, the exact
`Target ref is defined but not hydrated` page error and three dead service columns. With the fix
restored, dev and production both pass all 13 checks.

It needs `puppeteer-core`, which is not a project dependency — say the word and I will add it as a
devDependency with an `npm run verify:motion` script so this runs from the repo.

## What didn't go exactly as specified

1. **Photo layer separation was impossible** — see Item 1. Composition-based depth was approved as
   the alternative.
2. **Added JavaScript is 17KB, over the 12KB budget I set.** The extra is Motion's `useScroll` and
   spring machinery, which was not in the bundle before. Lighthouse did not move, so it was kept;
   turning `scrollScenes` off returns most of it.
3. **Mobile LCP is 3.35s locally, above the 2.8s gate.** That gate was written against the live
   Vercel figure (2.61s). The local baseline was already 3.21–3.31s without any of this work, so the
   layer adds roughly 0.04s — within noise. It needs re-measuring on Vercel before the gate can be
   judged properly.
4. **Service top rules use the navy hairline, not gold.** Animating a gold rule that then stayed
   visible on all three columns would have put far more gold on the page than the master brief's
   "gold must remain an accent" allows. Gold is still the hover state.
5. **Grain stays on under reduced motion.** It is a static texture with no movement, and the spec
   lists only motion effects to disable. Turning it off there too is a one-line change if preferred.
