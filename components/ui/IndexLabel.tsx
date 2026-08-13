import type { ElementType, ReactNode } from "react";
import { RegistrationMark } from "./RegistrationMark";

/** "0X / Title" eyebrow — label, gold rule, registration mark. Section/step header motif. */
export function IndexLabel({
  children,
  className = "",
  as: Comp = "span",
  id,
  ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      aria-hidden={ariaHidden}
    >
      <Comp
        id={id}
        className="font-mono text-xs uppercase tracking-widest text-text-accent shrink-0"
      >
        {children}
      </Comp>
      <span aria-hidden="true" className="flex-1 h-px bg-gold/30" />
      <RegistrationMark className="w-4 h-4 text-text-accent shrink-0" />
    </div>
  );
}
