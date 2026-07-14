import * as React from "react";

/**
 * Minimal `asChild` slot: merges the parent's props onto its single child
 * element. Avoids pulling in @radix-ui/react-slot for one small use-case.
 */
export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, unknown>>(
  ({ children, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;
    const child = children as React.ReactElement<Record<string, unknown>>;

    return React.cloneElement(child, {
      ...props,
      ...child.props,
      className: [
        (props as Record<string, unknown>).className,
        (child.props as Record<string, unknown>).className,
      ]
        .filter(Boolean)
        .join(" "),
      ref,
    });
  }
);
Slot.displayName = "Slot";
