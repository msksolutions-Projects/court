import React from "react";
import { cn } from "../../lib/utils";

export function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function THead({ className, children, ...props }) {
  return (
    <thead className={cn("bg-navy-50/60", className)} {...props}>
      {children}
    </thead>
  );
}

export function TR({ className, children, ...props }) {
  return (
    <tr className={cn("border-b border-border last:border-0 hover:bg-navy-50/40 transition-colors", className)} {...props}>
      {children}
    </tr>
  );
}

export function TH({ className, children, ...props }) {
  return (
    <th
      className={cn(
        "text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TD({ className, children, ...props }) {
  return (
    <td className={cn("px-4 py-3.5 text-ink whitespace-nowrap", className)} {...props}>
      {children}
    </td>
  );
}

export function TBody({ className, children, ...props }) {
  return <tbody className={className} {...props}>{children}</tbody>;
}
