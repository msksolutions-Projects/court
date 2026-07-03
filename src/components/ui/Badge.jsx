import React from "react";
import { cn } from "../../lib/utils";

const variants = {
  default: "bg-navy-50 text-navy-700",
  success: "bg-teal-50 text-teal-dark",
  warning: "bg-amber-50 text-amber-dark",
  danger: "bg-red-50 text-red-600",
  gold: "bg-gold-50 text-gold-dark",
  gray: "bg-slate-100 text-slate-600",
  info: "bg-navy-50 text-navy-600",
};

export function Badge({ className, variant = "default", children, dot = false, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", {
        default: "bg-navy-700",
        success: "bg-teal-dark",
        warning: "bg-amber-dark",
        danger: "bg-red-600",
        gold: "bg-gold-dark",
        gray: "bg-slate-500",
        info: "bg-navy-600",
      }[variant])} />}
      {children}
    </span>
  );
}
