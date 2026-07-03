import React, { useState } from "react";
import { cn } from "../../lib/utils";

export function Tabs({ tabs, defaultTab, onChange, className }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value);

  function handleClick(value) {
    setActive(value);
    onChange?.(value);
  }

  return (
    <div className={cn("flex items-center gap-1 border-b border-border overflow-x-auto scrollbar-thin-dark min-w-0", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleClick(tab.value)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors focus-ring rounded-t-md whitespace-nowrap shrink-0",
            active === tab.value
              ? "text-navy"
              : "text-muted hover:text-ink"
          )}
        >
          {tab.label}
          {active === tab.value && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
}

export function useTabs(tabs, defaultTab) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.value);
  return { active, setActive };
}
