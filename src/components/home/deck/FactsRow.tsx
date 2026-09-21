import { facts } from "@/data/deck";

/**
 * Display-serif values with a small letterspaced caption beneath, in a row
 * separated by hairlines. Every value is true and verifiable — the deck carries
 * no statistics.
 */
export function FactsRow({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const rule = tone === "dark" ? "border-ivory/16" : "border-navy/12";
  const value = tone === "dark" ? "text-ivory" : "text-navy";
  const caption = tone === "dark" ? "text-gold" : "text-charcoal";

  return (
    <dl className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {facts.map((fact) => (
        <div key={fact.caption} className={`border-t pt-5 ${rule}`}>
          <dt className="sr-only">{fact.caption}</dt>
          <dd>
            {/* A long value (the licence number) gets its own smaller size so it
                stays on one line instead of running into its caption. */}
            <span
              className={`block font-serif leading-none font-semibold lining-nums ${
                fact.value.length > 6
                  ? "text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)]"
                  : "text-[clamp(2.5rem,1.8rem+2.4vw,3.75rem)]"
              } ${value}`}
            >
              {fact.value}
            </span>
            <span className={`type-label mt-4 block ${caption}`}>{fact.caption}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
