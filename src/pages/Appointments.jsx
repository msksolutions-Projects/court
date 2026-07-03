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
      </Card>
    </div>
  );
}
