import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

export type ControlProps = {
  id: string;
  className: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  /** Render the control, spreading the provided props onto it. */
  children: (control: ControlProps) => ReactNode;
};

const control =
  "w-full rounded-ui bg-white text-base text-charcoal transition-[border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

/**
 * Label + control + hint + error. Errors stay inside the palette:
 * a 2px navy border and a navy message with a line icon — never red.
 */
export function Field({ id, label, optional, error, hint, className = "", children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const border = error
    ? "border-2 border-navy px-[15px] py-[11px]"
    : "border border-navy/28 px-4 py-3 hover:border-navy/40";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-navy">
        {label}
        {optional && <span className="ml-2 font-medium text-charcoal">(optional)</span>}
      </label>
      {children({
        id,
        className: `${control} ${border}`,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {hint && (
        <p id={hintId} className="text-[0.8125rem] text-charcoal">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-[0.8125rem] leading-snug font-semibold text-navy">
          <CircleAlert aria-hidden strokeWidth={1.75} className="mt-px h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
