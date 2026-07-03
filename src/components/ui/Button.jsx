import React from "react";
import { cn } from "../../lib/utils";

const variants = {
  primary: "bg-brand-gradient text-white hover:brightness-105 shadow-glow hover:-translate-y-0.5",
  gold: "bg-amber-gradient text-navy-900 hover:brightness-105 shadow-glow hover:-translate-y-0.5",
  outline: "bg-white text-navy border border-border hover:bg-navy-50",
  ghost: "bg-transparent text-navy hover:bg-navy-50",
  danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  subtle: "bg-navy-50 text-navy hover:bg-navy-100",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
