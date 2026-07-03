import React from "react";
import { format, parseISO } from "date-fns";
import { cn } from "../../lib/utils";

export function CaseTimeline({ events }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
      <div className="flex flex-col gap-6">
        {events.map((ev, idx) => (
          <div key={idx} className="relative">
            <span
              className={cn(
                "absolute -left-6 top-0.5 h-3.5 w-3.5 rounded-full border-2",
                ev.upcoming
                  ? "bg-gold border-gold ring-4 ring-gold-50"
                  : "bg-white border-navy-300"
              )}
            />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted mb-0.5">
              {format(parseISO(ev.date), "d MMM yyyy")}
            </p>
            <p className={cn("text-sm font-semibold", ev.upcoming ? "text-gold-dark" : "text-ink")}>
              {ev.event}
            </p>
            {ev.description && (
              <p className="text-xs text-muted mt-0.5 leading-relaxed">{ev.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
