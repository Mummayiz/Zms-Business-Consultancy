/**
 * ◆ SERVICES · WHAT WE DO — the deck's section marker.
 *
 * The diamond is gold on every surface (gold is allowed for marks and rules on
 * ivory); the words follow the surface, navy on ivory and gold on navy.
 */
export function Eyebrow({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <p className={`type-label flex items-center gap-3 ${tone === "dark" ? "text-gold" : "text-navy"}`}>
      <span aria-hidden className="text-gold">
        ◆
      </span>
      {children}
    </p>
  );
}
