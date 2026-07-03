import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Gavel, CalendarCheck, Users } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { hearings } from "../data/hearings";
import { appointments } from "../data/operations";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1)); // June 2026
  const [selectedDay, setSelectedDay] = useState(new Date(2026, 5, 26));

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const arr = [];
    let day = start;
    while (day <= end) {
      arr.push(day);
      day = addDays(day, 1);
    }
    return arr;
  }, [currentMonth]);

  function eventsForDay(day) {
    const dateStr = format(day, "yyyy-MM-dd");
    const h = hearings.filter((x) => x.date === dateStr).map((x) => ({ ...x, kind: "hearing" }));
    const a = appointments.filter((x) => x.date === dateStr).map((x) => ({ ...x, kind: "appointment" }));
    return [...h, ...a];
  }

  const selectedDayEvents = eventsForDay(selectedDay);

  return (
    <div>
      <PageHeader title="Calendar" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-semibold text-ink font-serif">{format(currentMonth, "MMMM yyyy")}</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-navy-50 text-navy-700"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-navy-50 text-navy-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center mb-1">
            {weekDays.map((d) => (
              <div key={d} className="text-[11px] font-semibold text-muted py-2 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => {
              const dayEvents = eventsForDay(day);
              const inMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDay);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "min-h-[70px] sm:min-h-[84px] rounded-md border p-1.5 text-left flex flex-col gap-1 transition-colors",
                    isSelected ? "border-gold bg-gold-50" : "border-border hover:border-navy-200",
                    !inMonth && "opacity-40"
                  )}
                >
                  <span className={cn("text-xs font-medium", isSelected ? "text-gold-dark" : "text-ink")}>
                    {format(day, "d")}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((ev, i) => (
                      <span
                        key={i}
                        className={cn(
                          "text-[10px] px-1 py-0.5 rounded truncate",
                          ev.kind === "hearing" ? "bg-navy-700 text-white" : "bg-gold-light text-navy-900"
                        )}
                      >
                        {ev.kind === "hearing" ? ev.caseNumber : ev.clientName}
                      </span>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-muted">+{dayEvents.length - 2} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-sm font-semibold text-ink mb-1">{format(selectedDay, "EEEE, d MMMM yyyy")}</p>
          <p className="text-xs text-muted mb-4">{selectedDayEvents.length} scheduled item(s)</p>

          <div className="flex flex-col gap-3">
            {selectedDayEvents.length === 0 && (
              <p className="text-sm text-muted py-6 text-center">No hearings, meetings, or appointments on this day.</p>
            )}
            {selectedDayEvents.map((ev, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md border border-border">
                <div
                  className={cn(
                    "h-8 w-8 rounded-md flex items-center justify-center shrink-0",
                    ev.kind === "hearing" ? "bg-navy-50 text-navy" : "bg-gold-50 text-gold-dark"
                  )}
                >
                  {ev.kind === "hearing" ? <Gavel size={15} /> : <CalendarCheck size={15} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {ev.kind === "hearing" ? ev.purpose : ev.purpose}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {ev.time} &middot; {ev.kind === "hearing" ? `${ev.clientName} (${ev.caseNumber})` : ev.clientName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
