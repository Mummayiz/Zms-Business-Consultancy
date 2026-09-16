# ZMS BUSINESS MANAGEMENT CONSULTANCY — MASTER WEBSITE BUILD PROMPT
# FINAL VERSION — LOGO-FIRST / PREMIUM UAE CORPORATE

You are acting as the SENIOR CREATIVE DIRECTOR, BRAND STRATEGIST, UI/UX DESIGNER, MOTION DESIGNER, WEBSITE ARCHITECT, CONTENT STRATEGIST and SENIOR FRONTEND ENGINEER.

You are responsible for designing and eventually developing the official website for:

**ZMS BUSINESS MANAGEMENT CONSULTANCY L.L.C – S.P.C**
Abu Dhabi, United Arab Emirates

---

## 0. HOW TO WORK — READ THIS FIRST

This is a phased project. The phases are defined in **Section 64** — that is the only phase list.

You are currently in **PHASE 1 — PLAN**.

**Do not:**
- start coding
- create components
- install packages
- initialise the application
- modify, delete, move or rename any existing files or brand assets
- generate the website yet

**First:**
1. Read this entire brief.
2. Inspect the project folder.
3. Inspect `./brand-assets/`.
4. Inspect `zms-logo-concept-original.png` — the master reference (Section 12A).
5. Inspect all logo assets.
6. Inspect `ZMS_Website_Design_System.pdf`.
7. Inspect `zms-brand-system.html`.
8. Understand the brand direction.
9. Identify any conflicts or missing information.

**Then** provide only the build plan described in **Section 66**, **stop, and wait for my explicit approval.**

I am using **Windows (PowerShell)**. All terminal commands must be Windows PowerShell-compatible.

---

## 1. BUSINESS INFORMATION

**Company:** ZMS Business Management Consultancy L.L.C – S.P.C
**Location:** Abu Dhabi, United Arab Emirates

**Official licensed activities:**
1. Construction Projects Management Consultancy
2. Project Management Services
3. Marketing Consultancy and Studies
4. Administrative Consultancy and Studies

---

## 2. LEGAL / MARKETING RULE — CONSTRUCTION

Construction Projects Management Consultancy is within the company's licence scope, but it must **not** be actively marketed until the required classification is complete.

**Therefore, none of the following:**
- construction service page
- construction service card
- construction navigation item
- construction FAQ
- construction CTA
- construction imagery
- construction-specific marketing copy

Never present construction consultancy as currently available.

The **only** permitted mention is on the Project Management page:

> "Construction project management consultancy will be offered once the required classification is complete."

Use this sentence exactly. Do not alter its meaning or add other construction content.

**Also:**
- Do not position ZMS as an engineering consultancy.
- Do not offer or imply investment, banking, insurance, engineering consultancy, or any other service outside the stated scope.

---

## 3. BRAND OBJECTIVE

ZMS should look like a premium Abu Dhabi professional consultancy.

**The website should communicate:**
- professionalism and precision
- strategy, structure and direction
- trust and business clarity
- management and growth
- long-term thinking

**Brand feel:** premium · corporate · strategic · intelligent · modern · elegant · sophisticated · trustworthy · professional · UAE-focused · international · forward-thinking

**The website should feel:** established · structured · strategic · confident · professional.

- Expensive without being flashy.
- Modern without looking trend-driven.
- Corporate without being boring.

---

## 4. CRITICAL DESIGN PRINCIPLE

**THE ZMS LOGO IS THE PRIMARY VISUAL SOURCE OF TRUTH.**

This is one of the most important requirements in this brief.

Do **not** treat the logo as "an image that goes in the navbar".

The website must feel like **"THE ZMS LOGO BECAME A WEBSITE"**, as though the logo's visual language has been transformed into an entire digital design system.

---

## 5. FINAL LOGO — SOURCE OF TRUTH

The final ZMS logo is provided in `./brand-assets/`. Inspect the logo assets, and the master concept image (Section 12A), before making design decisions.

**The logo contains:**
- architectural vertical structures
- strong geometric forms
- deep navy forms
- a metallic champagne-gold orbit/path
- direction, movement and structure
- vertical growth
- a premium 3D presentation
- a strong ZMS wordmark

> **Colour note:** the navy forms can look teal in the logo's 3D highlights. That tint belongs to the rendered logo only. On the website, use **only** Navy `#081F2D`. **Never introduce teal.**

The 3D-rendered original logo is intentional, and is an explicit exception to the site's general "no excessive 3D / no gradients" rule. The 3D finish belongs to the logo file only: translate the logo's **geometry** into flat, clean UI, with no bevels, metallic gradients or 3D effects in the interface.

### Logo rules

Use the supplied official logo assets. Do **not**:
- redraw it, recreate it in CSS, or rebuild it from SVG shapes
- recolour, distort, stretch or re-proportion it
- restyle it or add effects that alter its identity
- animate it excessively, spin it or morph it
- deconstruct the actual mark into an inaccurate recreation

The official logo remains unchanged.

**However**, the logo's design language should drive the website. Translate its principles into:
- layout, grid and spacing
- geometry and section composition
- typography hierarchy
- service presentation and process graphics
- dividers, motion and transitions
- decorative elements

---

## 6. LOGO → WEBSITE DESIGN SYSTEM

Think of the relationship as:

**LOGO → VISUAL LANGUAGE → DESIGN SYSTEM → LAYOUT → COMPONENTS → MOTION**

### Architectural structures → STRUCTURE
- strong vertical layouts and architectural grids
- vertical lines and structured cards
- rising elements and geometric section compositions
- clear hierarchy and balanced negative space
- editorial layouts

### Gold orbit → STRATEGY, DIRECTION, MOVEMENT, CONTINUITY, PROGRESS
- gold path systems
- section dividers
- process connections
- directional transitions
- strategic visual guides

### Vertical growth → BUILDING, GROWTH, PROGRESS, DEVELOPMENT
- rising bars and vertical reveals
- progressive section movement
- growth-oriented diagrams
- increasing visual scale

### Navy → corporate foundation, stability, trust, professionalism
Use for navigation, headings, dark sections, CTA bands, the footer and primary buttons.

### Metallic gold (flat `#C89A3D` in the UI) → premium quality, direction, strategy, emphasis
Use sparingly. Gold must remain an accent and never dominate the interface.

---

## 7. CORE BRAND CONCEPT

**STRUCTURE → STRATEGY → DIRECTION → GROWTH**

- Architecture = structure
- Gold orbit = strategy + direction
- Vertical growth = growth

Do not force these words into every section; communicate them visually.

---

## 8. DESIGN PERSONALITY

A premium UAE professional-services firm:

**Luxury corporate + executive UAE + architectural sophistication + modern editorial design**

**Do not** make it feel like:
- a generic consultancy template or startup landing page
- a SaaS site, AI startup or digital agency portfolio
- a gaming, experimental art, cryptocurrency or futuristic cyberpunk site

The design must be timeless enough to stay relevant for years.

---

## 9. TECH STACK

- Next.js (latest stable), App Router, TypeScript
- Tailwind CSS
- Motion — `import { motion } from "motion/react"`
- `next/font/google`, `next/image`
- `zod`, `resend`
- Deployment: Vercel
- English only, LTR

**Rules:**
- Do not add libraries without explaining why first.
- A lightweight line-icon library such as `lucide-react` is acceptable if proposed in Phase 1.
- Use server components by default, and client components only where animation or interactivity requires them.

---

## 10. SCAFFOLDING

The project folder already contains `./brand-assets/` and this prompt file, so `create-next-app` cannot simply scaffold into it.

In Phase 1, explain exactly how you will handle scaffolding, for example:
- scaffold into a temporary folder
- migrate the files in a controlled way
- leave `brand-assets/` untouched

Do not modify anything before approval.

---

## 11. BRAND CONFIGURATION

All editable business information lives in `src/config/site.ts`:

```ts
export const site = {
  name: "ZMS Business Management Consultancy",
  legalName: "ZMS Business Management Consultancy L.L.C – S.P.C",
  tagline: "Building Ideas. Driving Progress.",
  location: "Abu Dhabi, United Arab Emirates",
  licence: "CN-6757442",
  licenceAuthority: "Abu Dhabi Registration Authority (ADRA)",
  email: "info@example.com",
  phone: "+971 00 000 0000",
  whatsapp: "971000000000",
  url: "https://example.com",
  isPlaceholder: true,
};
```

- Email, phone, WhatsApp and domain are placeholders. **Do not invent replacements.**
- When real details are supplied, set `isPlaceholder: false`.

---

## 12. BRAND ASSETS

Expected in `./brand-assets/`:

```
zms-logo-concept-original.png
zms-logo-original.png
zms-logo-original-reversed.png
zms-logo-original-horizontal.png
zms-logo-original-horizontal-reversed.png
zms-nav-original.png
zms-nav-original-reversed.png
zms-mark-original.png
zms-mark-original-reversed.png
zms-logo/zms-logo-mark.svg
zms-hero-background.jpg
ZMS_Website_Design_System.pdf
zms-brand-system.html
```

Copy production assets into `public/brand/`. Do not modify the originals.

### Asset usage

| File | Use |
|---|---|
| `zms-logo-concept-original.png` | Master reference + one brand showcase (Section 12A) |
| `zms-logo-original.png` | Full logo on light backgrounds |
| `zms-logo-original-reversed.png` | Full logo on navy backgrounds |
| `zms-logo-original-horizontal.png` | Wide lockup where appropriate |
| `zms-logo-original-horizontal-reversed.png` | Wide lockup on navy |
| `zms-nav-original.png` | Desktop navbar and mobile top bar |
| `zms-nav-original-reversed.png` | Mobile navy menu panel |
| `zms-mark-original.png` | Mark only, where appropriate |
| `zms-mark-original-reversed.png` | Mark only, on navy |
| `zms-logo/zms-logo-mark.svg` | Favicon / app icons **only** |
| `zms-hero-background.jpg` | Home hero **only** |

---

## 12A. ORIGINAL LOGO CONCEPT — MASTER REFERENCE

**File:** `./brand-assets/zms-logo-concept-original.png`

This is the original approved logo artwork: the 3D ZMS logo placed in the Abu Dhabi architectural scene, with skyline, water, a lattice structure and warm sunlight.

**The entire website must be based on this image:**

| From the image | Becomes |
|---|---|
| Its colours | The approved palette |
| Its logo geometry | The architectural design language |
| Its gold orbit | The orbit system |
| Its Abu Dhabi scene | The hero environment |
| Its light, warmth and composition | The overall mood |

Study this image before any design decision.

### Usage
1. It is the primary visual reference for the whole site.
2. The Home hero uses the same scene: `zms-hero-background.jpg` is this image with the logo removed.
3. The complete original image (logo + scene) may be shown **once** as a brand showcase.
   - Recommended placement: the Signature Brand section on Home, or the About page.
   - Show it at its original proportions, never cropped through the logo, never distorted.

**Do not:**
- use it as a repeated background
- place other text over the logo in this image

---

## 13. REFERENCE MATERIALS

Before implementation, inspect:
1. `zms-logo-concept-original.png`
2. all logo assets
3. `ZMS_Website_Design_System.pdf`
4. `zms-brand-system.html`

Use the PDF and HTML as visual references. The final logo assets and the concept image are the brand source of truth.

**If sources conflict:**
- If the PDF, the HTML and this prompt conflict, **this prompt takes precedence**.
- If a conflict concerns the official logo assets, do not alter the logo. **Ask** before any decision that materially changes the identity.

---

## 14. DESIGN SYSTEM — COLOURS

Use only these primary colours:

| Name | Hex |
|---|---|
| Navy | `#081F2D` |
| Gold | `#C89A3D` |
| Ivory | `#FBF6EA` |
| Charcoal | `#172B36` |

**Allowed derived values:**
- navy at 12% opacity for borders
- navy at 28–40% for input and secondary-button borders
- ivory at 16% for borders on navy
- white only inside forms and cards where necessary

**No teal, and no other colours.**

---

## 15. CONTRAST

Gold on ivory is **2.4:1**.

- **Never** use gold as body or heading text on ivory.
- On ivory, gold may be used only for lines, borders, icons and decorative elements.
- Gold text is allowed on navy.

**Focus rings:** navy on light backgrounds, gold on navy backgrounds.

Follow WCAG AA.

---

## 16. FORBIDDEN VISUAL STYLES

Do **not** use:
- unapproved colours (including teal), neon, or purple/blue AI palettes
- heavy gradients, glassmorphism, excessive blur or excessive glow
- heavy shadows, pill-shaped UI, or excessively rounded cards
- random blobs, floating abstract shapes, or particle backgrounds
- gaming or cyberpunk aesthetics
- excessive 3D
- generic SaaS layouts

**Explicit exceptions:**
1. The official 3D logo and the concept image
2. The Home hero's soft radial ivory glow
3. The Home hero's bottom fade to ivory
4. Short tapered gold rules

No visual element should exist merely because it is trendy.

---

## 17. TYPOGRAPHY

Use **only** these two fonts.

**Cormorant Garamond** (500 / 600) — hero headline, section headings, card titles.

**Montserrat** (400 / 500 / 600 / 700) — body, navigation, buttons, labels, supporting text.

**Fallbacks:** Georgia, Arial. No third font.

| Element | Desktop size |
|---|---|
| Hero headline | 56–76px |
| Section headings | 38–48px |
| Body | 16–18px |
| Navigation | 14–15px |
| Buttons | 14–15px |
| Small labels | 11–13px |

Body line length: about 70 characters maximum.

### Casing
- **Sentence case** for headings, body copy, buttons and navigation.
- **Title Case** only for the three service names: Administrative Consultancy, Marketing Consultancy, Project Management.
- **Uppercase with letter-spacing** only for small labels such as ABU DHABI.
- **Exception:** the tagline is always written "Building Ideas. Driving Progress."

---

## 18. LAYOUT SYSTEM

- **Container:** max width 1240px.
- **Grid:** 12 columns on desktop; 1–2 columns on mobile, depending on content.
- **Spacing scale:** 8, 16, 24, 32, 48, 64, 80, 96.
- **Section padding:** 80–120px desktop, 56–72px mobile.
- **Radius:** 4–6px for buttons and inputs; 8–12px for cards.
- **Whitespace:** generous; avoid crowded layouts.
- **Alignment:** left by default; hero and CTA sections may be centred.

---

## 19. COMPONENT SYSTEM

Reusable components:

`Button` · `SectionTitle` · `Card` · `ServiceCard` · `ProcessSteps` · `CtaBand` · `PageHeader` · `FAQ` · `Field` · `Nav` · `Footer` · `Orbit` · `ArchitecturalBars` · `ImageSlot` · `BrandShowcase`

No duplicated UI logic. Keep components understandable, and don't over-engineer.

---

## 20. BUTTON SYSTEM

| Variant | Default | Hover |
|---|---|---|
| **Primary** | Navy fill, ivory text, 1px gold border | Gold fill, navy text |
| **Secondary on light** | Transparent, navy text, 1px navy at 40% | Gold border |
| **On navy** | Transparent, ivory text, 1px gold border | Gold fill, navy text |
| **Secondary on navy** | Transparent, ivory text, 1px ivory at 40% | Gold border |
| **Disabled** | Primary style at 45% opacity | — |

No pill shapes. Hover transitions ≈200ms.

---

## 21. NAVIGATION

### Desktop
- Sticky, ivory background, 84px tall, bottom border navy at 12%.
- Uses `zms-nav-original.png`.
- Links are navy. **Hover:** thin gold underline. **Active:** 2px gold underline.
- Gold is never used as navigation text on ivory.
- After scrolling 40px, add a very subtle bottom shadow.

### Mobile
- Top bar is 72px tall and uses `zms-nav-original.png`.
- The menu opens as a full-height navy panel using `zms-nav-original-reversed.png`.

### Links
- **Navigation:** Home · About · Services · Approach · Contact
- **Services dropdown:** Administrative Consultancy · Marketing Consultancy · Project Management
- **Primary CTA:** "Book a consultation" → `/contact`

---

## 22. SITE MAP

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services overview |
| `/services/administrative-consultancy` | Administrative Consultancy |
| `/services/marketing-consultancy` | Marketing Consultancy |
| `/services/project-management` | Project Management |
| `/approach` | How we work |
| `/contact` | Contact |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

The 404 page lives at `src/app/not-found.tsx`.

**There is no construction service page.**

---

## 23. HOME PAGE

The Home page must be the strongest expression of the ZMS identity.

**Suggested order:**
1. Navigation
2. Hero
3. Intro / About
4. Services
5. Signature brand statement (may include the one-time brand showcase, Section 12A)
6. How we work
7. Why ZMS
8. CTA
9. Footer

You may reorder if UX analysis strongly justifies it, but preserve the underlying objectives.

---

## 24. HERO

### Background
- `zms-hero-background.jpg`, used on the Home hero **only**; do not reuse it elsewhere.
- `cover`; position `center 40%` on desktop, about `74% 40%` on mobile, so the architectural skyline stays visible.
- A soft radial ivory glow behind the text for legibility, and a short fade to ivory at the bottom.
- Height: about the full viewport below the navigation.

### Content
- **Small label:** "ABU DHABI", between two short gold rules (navy text).
- **H1 direction:** "Clear plans for growing businesses"
- **Supporting text:** "Management, marketing and project consultancy that turns ambition into a practical, measurable plan."
- **Buttons:** "Book a consultation" · "Our services"

**Important:** during Phase 1, evaluate whether this headline is the strongest choice. If you believe a stronger one exists, propose it in the plan. **Do not silently replace it** — wait for approval.

---

## 25. HERO — LOGO-FIRST EXPERIENCE

The hero must feel visually connected to the final logo and the concept image.

- Do **not** simply place a giant static logo over the hero image.
- Do **not** recreate the logo.
- Instead, use the logo's visual language: **architecture + gold direction + growth + Abu Dhabi**.

The composition should feel like a premium UAE consultancy emerging from an architectural environment.

---

## 26. HERO ANIMATION

Quick and restrained. Suggested sequence:

1. Background subtly scales from about 1.05 to 1.
2. Subtle architectural structure establishes (e.g. thin vertical lines rising).
3. Gold rules beside "ABU DHABI" draw outward.
4. The label reveals.
5. The H1 reveals.
6. The supporting text reveals.
7. The CTA buttons reveal.

Use a subtle stagger. The visitor must be able to interact almost immediately — no long cinematic intro.

Architectural decorative elements may rise into position. Do not animate the actual logo excessively, and do not spin it.

---

## 27. LOGO-FIRST MOTION SYSTEM

The motion language comes from the logo.

- **Think:** BUILD · RISE · TRAVEL · CONNECT · PROGRESS
- **Not:** BOUNCE · SPIN · FLOAT · GLOW · DISTORT

| Principle | Motion |
|---|---|
| Architecture | Elements may rise vertically |
| Gold orbit | Lines may travel or draw |
| Direction | Transitions may move along a deliberate path |
| Growth | Architectural elements may progressively increase in height |
| Structure | Content reveals feel controlled and organised |

---

## 28. GOLD ORBIT SYSTEM

The gold orbit/path is one of the most distinctive elements of the identity. Use it as a visual language.

Do **not** reproduce the exact logo orbit everywhere; use simplified orbit- or path-inspired elements.

**Limited to three major locations:**
1. The hero (reveal and/or the divider directly under it)
2. The Signature Brand section
3. The Approach / process section

**It may:**
- draw itself
- connect content
- guide the eye
- create a transition
- represent direction

It represents strategy, direction, progress and continuity.

Do not use gold orbit elements anywhere else unless explicitly approved.

---

## 29. ARCHITECTURAL DESIGN LANGUAGE

The logo's vertical structures should influence:
- process bars
- service layouts
- section dividers
- decorative geometry
- page headers
- grid compositions
- visual transitions

**Architectural elements use:**
- vertical lines
- slim rectangular forms
- slanted tops where appropriate
- strong proportions
- controlled spacing

Do not scatter shapes randomly. Every architectural element must feel intentional.

---

## 30. ANIMATION RULES

**Allowed:**
- fades
- small vertical movement (≤16px)
- line drawing
- scale from about 1.02–1.05 to 1
- architectural growth
- controlled reveal masks
- button, card-border and navigation-underline transitions
- the mobile menu transition

Animations should generally run once.

**Reduced motion:** respect `prefers-reduced-motion`. When it is on, disable reveals, background scaling, orbit drawing and process animation, and use instant state changes.

**Not allowed:**
- constant spinning, bouncing or floating shapes
- cursor effects
- excessive parallax or scroll-jacking
- counters or statistics animations
- long intro animations
- heavy WebGL or excessive 3D effects

---

## 31. INTRO / ABOUT SECTION

**Suggested direction:** "More than consulting. A stronger tomorrow."

**Communicate:**
- professional management
- strategic thinking
- practical recommendations
- client focus
- sustainable progress

Keep it concise. Do not invent history.

---

## 32. SERVICES

Display **only** the three currently marketable services:

- **01** Administrative Consultancy
- **02** Marketing Consultancy
- **03** Project Management

**Each service card contains:**
- number
- icon
- title
- short description
- "Explore the service" link

**Do not** use generic rounded SaaS cards. Use an editorial, architectural composition.

**Possible interactions, kept restrained:**
- gold border
- number movement
- arrow movement
- architectural reveal
- subtle content expansion

---

## 33. SERVICE CONTENT

### Administrative Consultancy
- Organisational structure
- Process mapping and improvement
- Policies and procedures
- Operational studies
- Efficiency reviews

### Marketing Consultancy
- Market research
- Feasibility studies
- Customer analysis
- Competitor analysis
- Positioning and messaging
- Go-to-market planning
- Marketing performance reviews

### Project Management
- Project planning and scheduling
- Scope control
- Budget control
- Risk control
- Progress reporting
- Stakeholder coordination
- Project recovery

**Project Management page only:**

> "Construction project management consultancy will be offered once the required classification is complete."

Use exactly this wording.

---

## 34. SIGNATURE BRAND SECTION

Create a major brand moment.

**Possible headlines:**
- "Building Ideas. Driving Progress."
- "Structure. Strategy. Growth."

Choose the stronger option during Phase 1. Do not create a generic text block.

**Use:**
- large Cormorant typography
- strong negative space
- architectural geometry
- the gold orbit
- subtle movement

This is also the recommended place for the one-time brand showcase of `zms-logo-concept-original.png` (Section 12A). It should be one of the most memorable sections.

---

## 35. APPROACH — HOME

**Four stages:**
1. Discover
2. Analyse
3. Plan
4. Deliver

**Visual:**
- four rising architectural bars, each taller than the previous
- gold used selectively, e.g. bars 1–3 navy and the final bar gold
- the graphic should echo the architecture of the ZMS logo

**On scroll:** the bars rise in sequence, then the text reveals.

Do not make this look like a generic horizontal timeline.

---

## 36. WHY ZMS

About 3–4 concise points.

**Possible themes:**
- practical recommendations
- clear scope and pricing
- direct senior involvement
- Abu Dhabi licensed consultancy
- client-focused approach
- professional standards

**Important:** "Clear scope and pricing" and "Direct senior involvement" need client confirmation.
- Mark them in the content with `// TODO: confirm with client`.
- Do not present unconfirmed commitments as facts.

---

## 37. CTA

- **Band:** navy
- **Headline:** "Ready to talk about your business?"
- **Supporting line:** "Book a first consultation."
- **Button:** "Book a consultation", in the gold-border style

---

## 38. ABOUT PAGE

**Sections:**
1. Page header (plain navy, no photo)
2. Who ZMS is
3. Mission
4. Vision
5. Values
6. Licensing
7. CTA

**Licensing block:**
- ZMS Business Management Consultancy L.L.C – S.P.C
- Abu Dhabi, United Arab Emirates
- Abu Dhabi Economic Licence: CN-6757442

**Do not include:**
- invented credentials
- a founder or team section
- office or team photography

If the brand showcase is not used on Home, it may appear here instead — once only across the site.

---

## 39. SERVICES OVERVIEW

**Include:**
- an introduction
- the three service cards, each linking to its page
- a short explanation
- a CTA

---

## 40. SERVICE PAGE TEMPLATE

**Reusable template, in this order:**
1. Page header
2. Overview
3. What we deliver — 4–6 items with line icons
4. Who it's for
5. How the engagement works
6. FAQ — 4–5 genuinely useful, non-repetitive questions
7. CTA

---

## 41. APPROACH PAGE

Expand the four stages (Discover, Analyse, Plan, Deliver). **For each, explain:**
- what happens
- what the client receives
- what a typical engagement includes

**Visuals:** use the architectural process graphic, and the gold path carefully.

End with a CTA.

---

## 42. CONTACT PAGE

**Two columns.**

**Left:**
- heading
- short introduction
- email
- phone
- WhatsApp button linking to `https://wa.me/{site.whatsapp}`
- "Abu Dhabi, United Arab Emirates"

No street address, no map.

**Right — enquiry form:**
- Full name (required)
- Company (optional)
- Email (required)
- Phone (optional)
- Service of interest: Administrative Consultancy / Marketing Consultancy / Project Management / Not sure yet
- Message (required, minimum 20 characters)
- Hidden honeypot field

---

## 43. CONTACT FORM STATES

- **Default:** "Send enquiry"
- **Loading:** "Sending…"
- **Success:** "Thanks — your enquiry has been sent. We'll get back to you shortly."
  - If the client later confirms a response-time commitment, this wording may change. Mark it `// TODO: confirm with client`.
- **Errors:**
  - 2px navy border
  - navy error message with a small line icon
  - no red
  - use `aria-invalid` and `aria-describedby`

---

## 44. CONTACT BACKEND

- **Route:** `src/app/api/contact/route.ts`
- **Validation:** zod. Silently reject honeypot submissions.
- **Sending:** Resend, using these environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- **If any variable is missing:**
  - return HTTP 503
  - show "The form isn't connected yet — please email us directly."
  - never fake success
- **Secrets:** provide `.env.example`; never commit secrets.

---

## 45. FOOTER

**Navy background.**

**Contents:**
- `zms-logo-original-reversed.png`
- the tagline "Building Ideas. Driving Progress."
- company links
- services links
- contact information: location, email, phone, WhatsApp

**Bottom bar:**
- © {year} ZMS Business Management Consultancy L.L.C – S.P.C
- Abu Dhabi Economic Licence CN-6757442

Minimal and premium.

---

## 46. IMAGERY

The **only** photographic images on the website are:
- `zms-hero-background.jpg` (Home hero)
- `zms-logo-concept-original.png` (one-time brand showcase)

Do not hotlink or download stock photography.

**Elsewhere, prefer:**
- typography
- architectural geometry
- logo-derived graphics
- process visuals
- abstract structured layouts

If an image would genuinely help, use a styled `<ImageSlot label="..." />` placeholder that can later be replaced by a licensed image.

**Do not use:**
- handshakes
- fake team, office or meeting photography
- construction photography

---

## 47. ABU DHABI / UAE IDENTITY

**Communicate Abu Dhabi through:**
- architecture
- spatial composition
- premium corporate design
- an executive visual language
- the hero's modern skyline environment

**Avoid:**
- excessive UAE flags
- desert clichés
- tourism imagery
- Burj Khalifa clichés
- generic UAE stock

The UAE identity should be subtle.

---

## 48. RESPONSIVE DESIGN

Design specifically for **360, 390, 768, 1024, 1440 and 1920px**. No horizontal scrolling.

Mobile must not be a shrunk desktop layout. It needs:
- proper hierarchy
- comfortable spacing
- touch-friendly interactions
- optimised typography
- carefully adapted architectural visuals
- simplified motion where appropriate

---

## 49. ACCESSIBILITY

**Structure:**
- semantic HTML
- one H1 per page, with a correct heading hierarchy

**Navigation:**
- full keyboard navigation
- accessible dropdown
- accessible mobile menu with a focus trap and Escape to close
- visible focus states

**Forms:**
- accessible forms using `aria-invalid` and `aria-describedby`

**General:**
- meaningful alt text
- WCAG AA contrast
- respect reduced motion

---

## 50. PERFORMANCE

- `next/image` and `next/font`
- lazy loading and optimised assets (compress the concept image for web)
- minimal client-side JavaScript: server components by default, client components only when required
- Motion viewport triggers where appropriate; avoid unnecessary animation work

**Target:** Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO.

Never sacrifice performance for visual effects.

---

## 51. SEO

**Every page needs:**
- a title
- a meta description
- a canonical URL
- Open Graph metadata

**Site-wide:**
- `metadataBase` comes from `site.url`
- create `sitemap.ts` and `robots.ts`

**Indexing rule:**
- While `site.isPlaceholder === true`, robots must disallow indexing and pages must use `noindex`.
- When `site.isPlaceholder === false`, allow normal indexing.

**Assets:**
- **Favicon:** the flat SVG mark.
- **Open Graph image:** ivory background with the original ZMS logo.

**JSON-LD** (`ProfessionalService`):
- name "ZMS Business Management Consultancy"
- areaServed "Abu Dhabi, UAE"
- contact details from `site.ts`
- no street address

---

## 52. SEO KEYWORDS

Use these naturally where appropriate, without keyword stuffing:

- Business Management Consultancy Abu Dhabi
- Business Management Consultancy UAE
- Project Management Services Abu Dhabi
- Marketing Consultancy Abu Dhabi
- Marketing Consultancy UAE
- Administrative Consultancy Abu Dhabi
- Administrative Consultancy UAE
- Business Consultancy UAE
- Management Consultancy Abu Dhabi
- Project Management Consultant UAE

---

## 53. CONTENT RULES

**Tone:** clear, professional, intelligent, concise, human, strategic English. Avoid exaggerated claims.

**Do not use** these words unless verified and approved:
- "world-class"
- "best"
- "#1"
- "unmatched"
- "revolutionary"
- "disruptive"
- "game-changing"
- "guaranteed"

**Never invent:**
- clients, testimonials or case studies
- awards, partnerships or certifications
- statistics, years of experience or team size
- offices, revenue or projects completed

The company is new. Sell **the method, the services, the approach and the professional standard.**

---

## 54. CONTENT LOCATION

- Page and service copy go in `src/data/`.
- Business configuration goes in `src/config/site.ts`.

Do not hardcode editable business information in components.

---

## 55. USER JOURNEY

1. Discover ZMS
2. Understand ZMS
3. Understand the services
4. Build trust
5. Understand the approach
6. Identify relevance
7. Request a consultation

Every section needs a purpose. Don't add sections just because competitor websites have them.

---

## 56. CONVERSION

- **Primary:** Book a consultation.
- **Secondary:** Explore services.

Use CTAs naturally; do not turn every section into a sales pitch.

---

## 57. TECHNICAL ARCHITECTURE

```
src/app         routes, layout, not-found, api
src/components  UI components
src/config      site.ts
src/data        page content, service content
src/lib         validation, email, motion presets
public/brand    production brand assets
```

Keep the architecture understandable, and avoid unnecessary abstraction.

---

## 58. MOTION ARCHITECTURE

Create reusable motion presets, for example:

`fadeUp` · `reveal` · `lineDraw` · `architecturalRise` · `scaleIn` · `staggerChildren`

- Do not duplicate animation configuration.
- Use Motion consistently.
- Drive motion from reusable variants rather than one-off animations wherever practical.

---

## 59. DESIGN QUALITY TEST

Before considering any section complete, ask:

1. Does this feel like ZMS?
2. Is the logo's visual language present?
3. Is the layout architectural?
4. Is the gold being used intentionally?
5. Is the animation purposeful?
6. Does it feel premium?
7. Does it feel corporate?
8. Does it feel appropriate for Abu Dhabi?
9. Is the content clear?
10. Is anything visually unnecessary?

If something exists only because it looks trendy, **remove it.**

---

## 60. FINAL BRAND TEST

> "If the ZMS logo were removed from the page, would the website still feel like it belongs to ZMS?"

**The answer must be YES.**

All of these must feel like extensions of the ZMS identity:
- architecture and geometry
- the gold orbit language
- typography and spacing
- motion and section transitions
- process graphics
- visual rhythm and layout

---

## 61. TARGET EXPERIENCE

**Should feel like:** "A premium Abu Dhabi business management consultancy with a distinctive architectural identity."

**Not:** "A generic consultancy template with a ZMS logo."

---

## 62. QUALITY CONTROL

Before completion, verify each area below.

### Layout
- responsive
- no horizontal scroll
- correct spacing and typography
- no broken layouts

### Assets
- no missing images
- no broken fonts
- correct logo variants
- no modified logo
- concept image shown once only

### Interaction
- navigation, dropdown and mobile menu
- keyboard interaction
- CTA buttons
- forms, with loading, success, error and not-configured states

### Motion
- hero
- gold arc
- architectural bars
- section reveals
- hover states
- mobile motion
- reduced-motion mode

### SEO
- metadata
- sitemap
- robots, with noindex while placeholders exist
- favicon
- Open Graph
- JSON-LD

### Accessibility
- WCAG AA
- focus states
- keyboard navigation
- form labels
- ARIA
- reduced motion

### Performance
- optimised images and fonts
- minimal client JavaScript
- no unnecessary effects
- Lighthouse ≥ 90

### Build
`npm run lint` and `npm run build` must both pass with no errors.

---

## 63. README

**Contents:**
- project overview and brand overview
- tech stack
- installation, development commands and production build
- environment variables and contact form configuration
- business information configuration: `site.ts` and the `isPlaceholder` flag
- Vercel deployment
- Resend configuration
- SEO setup
- the before-launch checklist below

**Before-launch checklist:**
- [ ] Replace the email, phone, WhatsApp and domain
- [ ] Set `isPlaceholder` to `false`
- [ ] Configure Resend and verify the sending domain
- [ ] Confirm the Why ZMS commitments
- [ ] Confirm the response-time wording
- [ ] Legal review of the Privacy Policy and Terms
- [ ] Final copy review
- [ ] Final client approval

---

## 64. DEVELOPMENT PHASES — THE ONLY PHASE LIST

### PHASE 1 — PLAN (currently active)
Inspect the project, the brand assets (including the concept image), the PDF, the HTML and this prompt. Do not modify anything.

Return the build plan defined in Section 66. **Stop and wait for explicit approval.**

### PHASE 2 — HOME PAGE
After approval, build **only** the Home page (`/`). Run `npm run dev`, then **stop for review.**

### PHASE 3 — REMAINING PAGES
After the Home page is approved, build:
- About
- Services
- Administrative Consultancy
- Marketing Consultancy
- Project Management
- Approach
- Contact (UI only)
- Privacy
- Terms
- 404

Then **stop for review.**

### PHASE 4 — CONTACT BACKEND
`src/app/api/contact/route.ts`, with:
- Resend and zod
- honeypot
- validation
- error, loading and success states

### PHASE 5 — SEO
- metadata and Open Graph
- canonical URLs
- sitemap and robots
- JSON-LD
- favicon

### PHASE 6 — ACCESSIBILITY
A complete accessibility audit.

### PHASE 7 — PERFORMANCE
Optimise:
- images and fonts
- client JavaScript
- motion and loading
- layout shift

### PHASE 8 — FINAL QA
Check:
- desktop, tablet and mobile
- accessibility, SEO and performance
- forms, navigation and animations
- build, lint, console and hydration

---

## 65. IMPORTANT DECISION RULE

If you discover any of the following, **do not silently decide. Stop and explain the issue:**
- a missing asset
- a conflicting requirement
- an unsupported claim
- unclear business information
- a major technical or design conflict
- anything that would materially change the approved visual direction

Also:
- Do not invent information.
- Do not substitute assets without approval.
- Do not introduce a new visual style without approval.

---

## 66. FINAL INSTRUCTION — PHASE 1 ONLY

**You are currently in Phase 1.**

Do not code, install packages, modify files, create components, initialise the application or build the website.

**Inspect:**
- `./brand-assets/`
- `zms-logo-concept-original.png`
- all logo assets
- `ZMS_Website_Design_System.pdf`
- `zms-brand-system.html`

**Then provide:**

# ZMS WEBSITE BUILD PLAN

1. Folder structure (including how you'll scaffold around the existing files)
2. Page architecture
3. Component architecture
4. Libraries
5. Data/config architecture
6. Logo-first design-system integration (including use of the concept image)
7. Animation architecture
8. Home page implementation strategy (including your headline and signature-section recommendations)
9. Remaining page strategy
10. Development phases
11. Risks/conflicts
12. Recommendations

Keep the first response focused and practical.

**Then stop. Wait for my explicit approval. Do not proceed automatically.**

---

END OF PROMPT
