import React, { useState } from "react";
import { Globe, UserPlus, CalendarPlus, CheckCircle2 } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card } from "../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { leads as initialLeads } from "../data/operations";
import { format, parseISO } from "date-fns";

export function WebsiteLeads() {
  const [leads, setLeads] = useState(initialLeads);
  const [convertTarget, setConvertTarget] = useState(null);
  const [followUpTarget, setFollowUpTarget] = useState(null);

  function handleConvert() {
    setLeads((prev) =>
      prev.map((l) => (l.id === convertTarget.id ? { ...l, status: "Converted" } : l))
    );
    setConvertTarget(null);
  }

  function handleFollowUp() {
    setLeads((prev) =>
      prev.map((l) => (l.id === followUpTarget.id ? { ...l, status: "Follow-Up" } : l))
    );
    setFollowUpTarget(null);
  }

  return (
    <div>
      <PageHeader title="Website Leads" />

      <Card>
        {/* Mobile card list */}
        <div className="sm:hidden flex flex-col divide-y divide-border">
          {leads.map((l) => (
            <div key={l.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-ink">{l.name}</p>
                <StatusBadge status={l.status} />
              </div>
              <div className="text-xs text-muted flex flex-col gap-1">
                <p><span className="text-ink/70 font-medium">Phone:</span> {l.phone}</p>
                <p className="truncate"><span className="text-ink/70 font-medium">Email:</span> {l.email}</p>
                <p><span className="text-ink/70 font-medium">Inquiry:</span> {l.inquiry}</p>
                <p><span className="text-ink/70 font-medium">Date:</span> {format(parseISO(l.date), "d MMM yyyy")}</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button
                  size="sm"
                  variant="subtle"
                  disabled={l.status === "Converted"}
                  onClick={() => setConvertTarget(l)}
                  className="flex-1"
                >
                  <UserPlus size={13} /> Convert
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={l.status === "Converted"}
                  onClick={() => setFollowUpTarget(l)}
                  className="flex-1"
                >
                  <CalendarPlus size={13} /> Follow-Up
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block">
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Phone</TH>
                <TH>Email</TH>
                <TH>Inquiry</TH>
                <TH>Date</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {leads.map((l) => (
                <TR key={l.id}>
                  <TD className="font-medium text-ink">{l.name}</TD>
                  <TD className="text-muted">{l.phone}</TD>
                  <TD className="text-muted">{l.email}</TD>
                  <TD className="text-muted max-w-[240px] truncate">{l.inquiry}</TD>
                  <TD className="text-muted">{format(parseISO(l.date), "d MMM yyyy")}</TD>
                  <TD><StatusBadge status={l.status} /></TD>
                  <TD>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="subtle"
                        disabled={l.status === "Converted"}
                        onClick={() => setConvertTarget(l)}
                      >
                        <UserPlus size={13} /> Convert
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={l.status === "Converted"}
                        onClick={() => setFollowUpTarget(l)}
                      >
                        <CalendarPlus size={13} /> Follow-Up
                      </Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>

      <Modal
        open={!!convertTarget}
        onClose={() => setConvertTarget(null)}
        title="Convert Lead to Client"
        footer={
          <>
            <Button variant="outline" onClick={() => setConvertTarget(null)}>Cancel</Button>
            <Button variant="gold" onClick={handleConvert}>Convert to Client</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Convert <span className="font-semibold">{convertTarget?.name}</span> into a client record? A new client profile will be created using their contact details from this inquiry.
        </p>
      </Modal>

      <Modal
        open={!!followUpTarget}
        onClose={() => setFollowUpTarget(null)}
        title="Assign Follow-Up"
        footer={
          <>
            <Button variant="outline" onClick={() => setFollowUpTarget(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleFollowUp}>Assign Follow-Up</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Assign a follow-up task for <span className="font-semibold">{followUpTarget?.name}</span>? This will mark the lead for follow-up and notify the assigned team member.
        </p>
      </Modal>
    </div>
  );
}
