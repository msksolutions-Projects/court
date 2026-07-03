import React from "react";
import { Link } from "react-router-dom";
import { Gavel, Bell } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card } from "../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Button } from "../components/ui/Button";
import { hearings } from "../data/hearings";
import { format, parseISO } from "date-fns";

export function Hearings() {
  const sorted = [...hearings].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <PageHeader title="Hearings" action={<Button variant="gold"><Gavel size={16} /> Schedule Hearing</Button>} />

      <Card>
        {/* Mobile card list */}
        <div className="sm:hidden flex flex-col divide-y divide-border">
          {sorted.map((h) => (
            <div key={h.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{format(parseISO(h.date), "d MMM yyyy")}</p>
                  <p className="text-xs text-muted">{h.time}</p>
                </div>
                <StatusBadge status={h.reminderStatus} />
              </div>
              <div className="text-xs text-muted flex flex-col gap-1">
                <p><span className="text-ink/70 font-medium">Court:</span> {h.court}</p>
                <p>
                  <span className="text-ink/70 font-medium">Case:</span>{" "}
                  <Link to={`/cases/${h.caseId}`} className="text-navy font-medium hover:text-gold-dark">
                    {h.caseNumber}
                  </Link>
                  {" "}&middot; {h.purpose}
                </p>
                <p><span className="text-ink/70 font-medium">Client:</span> {h.clientName}</p>
              </div>
              <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:bg-navy-50 text-navy-700 text-xs font-medium">
                <Bell size={14} /> Send Reminder
              </button>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <Table>
            <THead>
              <TR>
                <TH>Date</TH>
                <TH>Time</TH>
                <TH>Court</TH>
                <TH>Case</TH>
                <TH>Client</TH>
                <TH>Reminder Status</TH>
                <TH className="text-right">Action</TH>
              </TR>
            </THead>
            <TBody>
              {sorted.map((h) => (
                <TR key={h.id}>
                  <TD className="font-medium text-ink">{format(parseISO(h.date), "d MMM yyyy")}</TD>
                  <TD className="text-muted">{h.time}</TD>
                  <TD className="text-muted">{h.court}</TD>
                  <TD>
                    <Link to={`/cases/${h.caseId}`} className="text-navy font-medium hover:text-gold-dark">
                      {h.caseNumber}
                    </Link>
                    <p className="text-xs text-muted">{h.purpose}</p>
                  </TD>
                  <TD className="text-muted">{h.clientName}</TD>
                  <TD><StatusBadge status={h.reminderStatus} /></TD>
                  <TD className="text-right">
                    <button className="p-1.5 rounded-md hover:bg-navy-50 text-navy-700" title="Send Reminder">
                      <Bell size={15} />
                    </button>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
