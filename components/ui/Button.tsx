import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-button font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "relative z-0 overflow-hidden bg-button-primary-surface text-button-primary-text before:absolute before:inset-0 before:-z-10 before:bg-button-primary-surface-hover before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top active:before:bg-button-primary-surface-active",
        secondary:
          "relative z-0 overflow-hidden bg-button-secondary-surface text-button-secondary-text before:absolute before:inset-0 before:-z-10 before:bg-button-secondary-surface-hover before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top active:before:bg-button-secondary-surface-active",
        neutral:
          "relative z-0 overflow-hidden bg-button-neutral-surface text-button-neutral-text before:absolute before:inset-0 before:-z-10 before:bg-button-neutral-surface-hover before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top active:before:bg-button-neutral-surface-active",
        outline:
          "relative z-0 overflow-hidden bg-button-outline-surface border-2 border-button-outline-border text-button-outline-text hover:text-button-outline-text-hover hover:border-button-outline-border-hover before:absolute before:inset-0 before:-z-10 before:bg-button-outline-surface-hover before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top active:before:bg-button-outline-surface-active",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-bg-subtle active:bg-bg-inset",
        link: "text-text-secondary hover:text-text-primary underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "relative z-0 overflow-hidden bg-button-destructive-surface text-button-destructive-text focus-visible:ring-focus-ring-error before:absolute before:inset-0 before:-z-10 before:bg-button-destructive-surface-hover before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-y-100 hover:before:origin-top active:before:bg-button-destructive-surface-active",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
