import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const numeric = typeof target === "number" ? target : parseFloat(target);
    if (Number.isNaN(numeric)) {
      setValue(target);
      return;
    }
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * numeric));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    }
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return value;
}

export function KpiCard({ icon: Icon, label, value, trend, trendLabel, accent = "navy" }) {
  const accents = {
    navy: "bg-violet-gradient",
    gold: "bg-coral-gradient",
    emerald: "bg-teal-gradient",
    sky: "bg-amber-gradient",
  };

  const glow = {
    navy: "bg-navy",
    gold: "bg-gold",
    emerald: "bg-teal",
    sky: "bg-amber",
  };

  const isPositive = trend >= 0;
  const displayValue = useCountUp(value);

  return (
    <div className="relative bg-white rounded-xl border border-border shadow-card p-4 sm:p-5 flex flex-col gap-3 overflow-hidden animate-rise hover-lift group min-w-0">
      <span
        className={cn(
          "absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none",
          glow[accent]
        )}
      />
      <div className="flex items-center justify-between relative z-10">
        <div className={cn("h-10 w-10 shrink-0 rounded-[10px] flex items-center justify-center text-white shadow-sm", accents[accent])}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full shrink-0",
              isPositive ? "text-teal-dark bg-teal-50" : "text-red-500 bg-red-50"
            )}
          >
            {isPositive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="relative z-10 min-w-0">
        <p className="text-2xl font-extrabold text-ink leading-none font-display">{displayValue}</p>
        <p className="text-xs text-muted mt-1.5 font-medium leading-snug break-words">{label}</p>
      </div>
      {trendLabel && <p className="text-[11px] text-muted/80 -mt-1 relative z-10">{trendLabel}</p>}
    </div>
  );
}
