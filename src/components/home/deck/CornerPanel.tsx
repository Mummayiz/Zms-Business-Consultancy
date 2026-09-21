import type { ReactNode } from "react";

/**
 * Bordered panel with L-shaped corner ticks, for credential-style content.
 * The ticks are drawn with borders on four small absolute spans — no images.
 */
export function CornerPanel({
  eyebrow,
  title,
  children,
  className = "",
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <div className={`relative border border-navy/12 bg-white p-8 lg:p-10 ${className}`}>
      {corners.map((position) => (
        <span key={position} aria-hidden className={`pointer-events-none absolute h-4 w-4 border-gold ${position}`} />
      ))}

      {eyebrow && <p className="type-label text-charcoal">{eyebrow}</p>}
      <h3 className="mt-5 font-serif text-[1.75rem] leading-tight font-semibold text-navy">{title}</h3>
      <div className="mt-4 text-[0.9375rem] leading-relaxed">{children}</div>

      {divider && (
        <span aria-hidden className="mt-8 flex items-center gap-3 text-gold">
          <span className="h-px flex-1 bg-gold/40" />
          <span className="text-[0.625rem]">◆</span>
          <span className="h-px flex-1 bg-gold/40" />
        </span>
      )}
    </div>
  );
}

const corners = [
  "top-3 left-3 border-t border-l",
  "top-3 right-3 border-t border-r",
  "bottom-3 left-3 border-b border-l",
  "bottom-3 right-3 border-b border-r",
];
