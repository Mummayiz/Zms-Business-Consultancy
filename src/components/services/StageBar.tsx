/**
 * A single architectural bar marking a stage. Heights rise with each stage
 * and the final stage is gold, matching the process graphic.
 */
export function StageBar({ index, total }: { index: number; total: number }) {
  const height = 34 + (index / Math.max(total - 1, 1)) * 66;
  const last = index === total - 1;

  return (
    <div aria-hidden className="flex h-28 w-3 shrink-0 items-end lg:h-36">
      <span
        className={`block w-full ${last ? "bg-gold" : "bg-navy"}`}
        style={{ height: `${height}%`, clipPath: "polygon(0 0, 100% 5px, 100% 100%, 0 100%)" }}
      />
    </div>
  );
}
