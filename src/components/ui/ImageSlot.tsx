/**
 * Placeholder for a future licensed image. Keeps layout honest without
 * stock photography: a hairline frame, faint architectural lines and a label.
 */
export function ImageSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={`relative flex aspect-[4/3] items-end overflow-hidden rounded-card border border-navy/12 bg-ivory p-6 ${className}`}
    >
      <div aria-hidden className="absolute inset-0 flex items-end justify-center gap-6 px-10 opacity-60">
        {[40, 62, 84].map((h) => (
          <span key={h} className="w-px bg-navy/28" style={{ height: `${h}%` }} />
        ))}
      </div>
      <span className="type-label relative text-navy">{label}</span>
    </div>
  );
}
