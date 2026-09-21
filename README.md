# ZMS Business Management Consultancy — Website

The official website for **ZMS Business Management Consultancy L.L.C – S.P.C**, Abu Dhabi, United
Arab Emirates.

## Brand overview

The site is built from the ZMS logo outwards: the logo is the source of the visual language, not just
an image in the navigation bar.

- **Architectural structures → structure.** Vertical hairlines, slim bars with slanted tops, editorial
  columns and a 12-column grid.
- **Gold orbit → strategy and direction.** A simplified drawn arc used in exactly three places: under
  the Home hero, in the Signature section, and in the process graphic on Home and `/approach`.
- **Vertical growth → progress.** Bars that rise in sequence, reveals that move upward, service
  columns that step up from left to right.

**Palette** (the only colours used): Navy `#081F2D`, Gold `#C89A3D`, Ivory `#FBF6EA`,
Charcoal `#172B36`, plus white inside form fields and cards. Gold is an accent and is never used as
text on ivory. **Typography:** Cormorant Garamond for headings, Montserrat for body and interface.

The design system is enforced in `src/app/globals.css`: the Tailwind palette is cleared and only the
brand colours are redefined, so an off-brand colour cannot be written by accident.

## Tech stack

- Next.js 16 (App Router) with TypeScript, Turbopack
- Tailwind CSS v4 (tokens in `globals.css`, no config file)
- Motion (`motion/react`) for animation, code-split via `LazyMotion`
- `next/font/google`, `next/image`
- zod (server-side validation) and Resend (email)
- lucide-react for line icons
- Deployed on Vercel. English only, LTR.

## Getting started

Requires Node.js 20.9 or newer.

```powershell
npm install
npm run dev     # http://localhost:3000
```

Other commands:

```powershell
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin of this deployment, with no trailing slash, e.g. `https://zms-business-consultancy-38nn.vercel.app` or the production domain. Drives canonical URLs, Open Graph, the sitemap and JSON-LD. Falls back to the `https://example.com` placeholder when unset. |
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |

**If any variable is missing**, `POST /api/contact` returns HTTP 503 and the form shows
"The form isn't connected yet — please email us directly." It never reports a false success.

## Contact form

- **Route:** `src/app/api/contact/route.ts`
- **Validation:** field rules live once in `src/lib/enquiry.ts` (used by the form in the browser) and
  are wrapped in a zod schema in `src/lib/enquiry-schema.ts` (used by the API).
  Keep `enquiry-schema.ts` out of client components: it would add about 88KB to the bundle.
- **Honeypot:** a hidden `website` field. Submissions that fill it get a silent 200 and are discarded.
- **Responses:** 200 sent · 400 validation errors · 413 body too large · 503 not configured ·
  502 delivery failed.

## Business information

All editable business details live in **`src/config/site.ts`**. Nothing is hardcoded in components.

```ts
export const site = {
  name: "ZMS Business Management Consultancy",
  legalName: "ZMS Business Management Consultancy L.L.C – S.P.C",
  tagline: "Building Ideas. Driving Progress.",
  location: "Abu Dhabi, United Arab Emirates",
  licence: "CN-6757442",
  licenceAuthority: "Abu Dhabi Registration Authority (ADRA)",
  email: "info@example.com",     // placeholder
  phone: "+971 00 000 0000",     // placeholder
  whatsapp: "971000000000",      // placeholder
  url: "https://example.com",    // placeholder
  isPlaceholder: true,
};
```

### The `isPlaceholder` flag

While `isPlaceholder` is `true`:

- every page sends `noindex, nofollow`, and `robots.txt` disallows all crawling except Anthropic's
  crawlers (`ClaudeBot`, `Claude-User`, `anthropic-ai`), which are allowed so a reviewer can open the
  staged site. The pages stay `noindex` for everyone;
- the phone number and WhatsApp button are shown but not clickable;
- the Privacy and Terms pages display "Draft pending legal review".

Replace the email, phone, WhatsApp number and domain with the real values, then set
`isPlaceholder: false`. Indexing, the contact links and the legal notices all update from that one
change.

Page and service copy lives in `src/data/`.

## Project structure

```
src/app         routes, layout, not-found, api, sitemap, robots, icons
src/components  brand/ contact/ home/ layout/ legal/ motion/ services/ seo/ ui/
src/config      site.ts
src/data        home, pages, services, approach, legal, navigation
src/lib         enquiry, enquiry-schema, email, motion, seo
public/brand    production brand assets
brand-assets    original supplied assets — reference only, never modified
docs            accessibility audit and performance records
```

## SEO

- Per-page title, description, canonical URL, Open Graph and Twitter tags via `pageMetadata()` in
  `src/lib/seo.ts`.
- `sitemap.xml` and `robots.txt` are generated from `site.url`; both respect `isPlaceholder`.
- `ProfessionalService` JSON-LD from `site.ts`, with no street address.
- Favicon: the flat SVG mark. Open Graph image: the original logo on ivory, 1200×630.

## Deploying to Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. Import the project in Vercel. The framework, build command and output are detected automatically.
3. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` under
   Settings → Environment Variables.
4. Add the production domain, then set `site.url` to it and `isPlaceholder` to `false`.
5. Redeploy.

## Resend setup

1. Create a Resend account and verify the sending domain (DNS records for SPF and DKIM).
2. Create an API key and set `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on the verified domain, for example
   `ZMS Website <website@yourdomain.ae>`, and `CONTACT_TO_EMAIL` to the receiving inbox.
4. Send a test enquiry from `/contact` and confirm it arrives. Replies go to the enquirer, because the
   email sets `replyTo`.

## Accessibility and performance

Audit records: `docs/accessibility-audit.md` and `docs/performance.md`. In short: no axe violations
across all pages and interactive states, desktop Lighthouse 100, mobile 84–89, CLS 0. Both documents
list the open items and the changes that were measured and deliberately rejected.

`docs/home-deck.md` covers the Home deck: what is on each slide, the accessibility work on the tear
gate and the video hero, and the three points where the build departs from its brief. Its mobile
poster LCP is the one open performance item, with the measurements in `docs/performance.md`.

## Before launch

- [ ] Replace the email, phone, WhatsApp number and domain in `src/config/site.ts`
- [ ] Set `isPlaceholder` to `false`
- [ ] Configure Resend and verify the sending domain
- [ ] Confirm the Why ZMS commitments ("Clear scope and pricing", "Direct senior involvement") and
      enable them in `src/data/home.ts`
- [ ] Confirm the response-time wording in the form's success message
- [ ] Approve the mission, vision and values wording in `src/data/pages.ts`
- [x] Form and secondary-button border contrast — resolved at navy 55%, see `docs/accessibility-audit.md`
- [ ] Legal review of the Privacy Policy and Terms of Use, then set their "last updated" dates
- [ ] Final copy review
- [ ] Final client approval
