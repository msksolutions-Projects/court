import React from "react";
import { CalendarCheck } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card } from "../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Button } from "../components/ui/Button";
import { appointments } from "../data/operations";
import { format, parseISO } from "date-fns";

export function Appointments() {
  const sorted = [...appointments].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader
        title="Appointments"
        action={<Button variant="gold"><CalendarCheck size={16} /> New Appointment</Button>}
      />

      <Card>
        {/* Mobile card list */}
        <div className="sm:hidden flex flex-col divide-y divide-border">
          {sorted.map((a) => (
            <div key={a.id} className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-ink">{a.clientName}</p>
                <StatusBadge status={a.status} />
              </div>
              <div className="text-xs text-muted flex flex-col gap-1">
                <p><span className="text-ink/70 font-medium">Purpose:</span> {a.purpose}</p>
                <p>
                  <span className="text-ink/70 font-medium">When:</span>{" "}
                  {format(parseISO(a.date), "d MMM yyyy")} &middot; {a.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <Table>
            <THead>
              <TR>
                <TH>Client</TH>
                <TH>Purpose</TH>
                <TH>Date</TH>
                <TH>Time</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {sorted.map((a) => (
                <TR key={a.id}>
                  <TD className="font-medium text-ink">{a.clientName}</TD>
                  <TD className="text-muted">{a.purpose}</TD>
                  <TD className="text-muted">{format(parseISO(a.date), "d MMM yyyy")}</TD>
                  <TD className="text-muted">{a.time}</TD>
                  <TD><StatusBadge status={a.status} /></TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
