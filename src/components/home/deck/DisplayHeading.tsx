import type { HeadlinePart } from "@/data/deck";

/*
 * Deck headline: two or three lines of large Cormorant mixing roman and
 * italic, with one accented word.
 *
 * The accent colour follows the surface, because gold on ivory is 2.4:1 and is
 * forbidden site-wide: gold on navy and on the video, italic navy on ivory.
 */
export function DisplayHeading({
  parts,
  as: Tag = "h2",
  tone = "light",
  size = "lg",
  id,
  focusable = false,
  className = "",
}: {
  parts: HeadlinePart[];
  as?: "h1" | "h2";
  tone?: "light" | "dark";
  /** "md" for headlines that run long, so they stay within the slide. */
  size?: "lg" | "md";
  id?: string;
  /** Allows focus to be moved here programmatically, e.g. after the gate opens. */
  focusable?: boolean;
  className?: string;
}) {
  const base = tone === "dark" ? "text-ivory" : "text-navy";
  const accent = tone === "dark" ? "text-gold" : "text-navy";
  const scale =
    size === "md"
      ? "text-[clamp(2.25rem,1.4rem+2.9vw,4rem)]"
      : "text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)]";

  return (
    <Tag
      id={id}
      tabIndex={focusable ? -1 : undefined}
      className={`font-serif font-semibold tracking-[-0.01em] ${scale} leading-[0.98] outline-none ${base} ${className}`}
    >
      {parts.map((part, i) => (
        <span key={i}>
          {part.break && <br />}
          <span className={`${part.italic ? "italic" : ""} ${part.accent ? accent : ""}`}>{part.text}</span>
        </span>
      ))}
    </Tag>
  );
}
