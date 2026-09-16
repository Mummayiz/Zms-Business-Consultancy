import type { ReactNode } from "react";

type SectionTitleProps = {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "navy";
  align?: "left" | "center";
  className?: string;
};

/** Small uppercase label with a tapered gold rule, a serif heading and optional intro. */
export function SectionTitle({
  label,
  title,
  intro,
  id,
  tone = "light",
  align = "left",
  className = "",
}: SectionTitleProps) {
  const onNavy = tone === "navy";
  const centred = align === "center";

  return (
    <div className={`${centred ? "mx-auto text-center" : ""} ${className}`}>
      {label && (
        <p
          className={`type-label flex items-center gap-4 ${centred ? "justify-center" : ""} ${
            onNavy ? "text-gold" : "text-navy"
          }`}
        >
          {centred && <span className="rule-taper" aria-hidden />}
          {label}
          <span className="rule-taper" aria-hidden />
        </p>
      )}
      <h2 id={id} className={`type-section mt-5 ${onNavy ? "text-ivory" : "text-navy"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`type-lead measure mt-5 ${centred ? "mx-auto" : ""} ${onNavy ? "text-ivory" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
