import { signature } from "@/data/home";
import { BrandShowcase } from "@/components/brand/BrandShowcase";
import { Orbit } from "@/components/brand/Orbit";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Glyph = (typeof signature.pillars)[number]["glyph"];

/** Small logo-derived marks: slanted bars, an orbit arc, rising bars. */
function PillarGlyph({ glyph }: { glyph: Glyph }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden className="h-7 w-7 shrink-0 text-gold" fill="currentColor">
      {glyph === "structure" && (
        <>
          <path d="M8 6l5 2v18H8z" />
          <path d="M15 2l5 2v22h-5z" />
        </>
      )}
      {glyph === "strategy" && (
        <ellipse cx="14" cy="15" rx="12" ry="5" transform="rotate(-20 14 15)" fill="none" stroke="currentColor" strokeWidth="1.5" />
      )}
      {glyph === "growth" && (
        <>
          <path d="M4 18l4 1.5V26H4z" />
          <path d="M12 12l4 1.5V26h-4z" />
          <path d="M20 5l4 1.5V26h-4z" />
        </>
      )}
    </svg>
  );
}

export function Signature() {
  return (
    <section aria-labelledby="signature-title" className="surface-navy section-y overflow-hidden bg-navy text-ivory">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <BrandShowcase alt={signature.showcaseAlt} className="lg:col-span-6" />

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="type-label flex items-center gap-4 text-gold">
              {signature.label}
              <span className="rule-taper" aria-hidden />
            </p>
            <h2
              id="signature-title"
              className="mt-6 font-serif text-[clamp(3rem,2.2rem+3vw,4.5rem)] leading-[1.02] font-semibold text-ivory"
            >
              {signature.title.map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))}
            </h2>
          </Reveal>

          <Orbit variant="signature" delay={0.3} className="mt-4 h-[72px] w-full lg:-ml-16 lg:h-[110px] lg:w-[calc(100%+4rem)]" />

          <Reveal delay={0.2}>
            <p className="type-lead measure mt-4 text-ivory">{signature.intro}</p>
          </Reveal>

          <RevealGroup as="ul" delay={0.3} className="mt-10 border-t border-ivory/16">
            {signature.pillars.map((pillar) => (
              <RevealItem as="li" key={pillar.title} className="flex gap-5 border-b border-ivory/16 py-6">
                <PillarGlyph glyph={pillar.glyph} />
                <div>
                  <h3 className="font-serif text-2xl leading-tight font-semibold text-ivory">{pillar.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory">{pillar.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
