import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";

/** Native disclosure list: keyboard accessible with no client JavaScript. */
export function FAQ({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-navy/12">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-navy/12">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-[1.375rem] leading-snug font-semibold text-navy lg:text-2xl">
              {item.question}
            </span>
            <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-ui border border-navy/28 text-navy transition-colors duration-200 group-open:border-gold">
              <Plus
                aria-hidden
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-200 ease-zms group-open:rotate-45"
              />
            </span>
          </summary>
          <p className="measure pb-7 text-[0.9375rem] leading-relaxed lg:text-base">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
