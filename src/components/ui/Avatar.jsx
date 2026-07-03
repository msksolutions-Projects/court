import React from "react";
import { cn } from "../../lib/utils";

const colors = [
  "bg-violet-gradient",
  "bg-coral-gradient",
  "bg-teal-gradient",
  "bg-amber-gradient",
  "bg-gradient-to-br from-rose-500 to-fuchsia-500",
  "bg-gradient-to-br from-indigo-500 to-violet-500",
];

function hashName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

export function Avatar({ name = "?", size = "md", className }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-base",
  };

  const color = colors[hashName(name) % colors.length];

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-sm font-display",
        color,
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
