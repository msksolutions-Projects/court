import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  User,
  Scale,
  FileText,
  Gavel,
  Pencil,
} from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { StatusBadge } from "../components/shared/StatusBadge";
import { EmptyState } from "../components/shared/EmptyState";
import { CaseTimeline } from "../components/shared/CaseTimeline";
import { getCaseById } from "../data/cases";
import { getClientById } from "../data/clients";
import { getDocumentsByCase } from "../data/documents";
import { format, parseISO } from "date-fns";

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-medium text-ink mt-0.5">{value || "—"}</p>
    </div>
  );
}

export function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caseData = getCaseById(id);
  const [activeTab, setActiveTab] = useState("overview");

  if (!caseData) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Case not found"
        description="This case record doesn't exist in the demo dataset."
        action={<Button onClick={() => navigate("/cases")}>Back to Cases</Button>}
      />
    );
  }

  const client = getClientById(caseData.clientId);
  const caseDocuments = getDocumentsByCase(caseData.id);

  return (
    <div>
      <Link to="/cases" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-navy mb-4">
        <ArrowLeft size={13} /> Back to all cases
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-ink font-serif">{caseData.caseNumber}</h1>
            <StatusBadge status={caseData.status} />
          </div>
          <p className="text-sm text-muted mt-0.5">{caseData.title}</p>
        </div>
        <Button variant="outline">
          <Pencil size={15} /> Edit Case
        </Button>
      </div>

      <Tabs
        tabs={[
          { value: "overview", label: "Case Information" },
          { value: "client", label: "Client Information" },
          { value: "opposite-party", label: "Opposite Party" },
          { value: "opposite-advocate", label: "Opposite Advocate" },
          { value: "timeline", label: "Case Timeline" },
          { value: "hearings", label: "Hearing History" },
          { value: "documents", label: `Documents (${caseDocuments.length})` },
          { value: "notes", label: `Notes (${caseData.notes.length})` },
        ]}
        onChange={setActiveTab}
        className="mb-5 overflow-x-auto"
      />

      {activeTab === "overview" && (
        <Card>
          <CardHeader><CardTitle>Case Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <InfoRow label="Case Number" value={caseData.caseNumber} />
            <InfoRow label="Case Type" value={caseData.caseType} />
            <InfoRow label="Status" value={<StatusBadge status={caseData.status} />} />
            <InfoRow label="Court" value={caseData.court} />
            <InfoRow label="Presiding Judge" value={caseData.judge} />
            <InfoRow label="Filed On" value={format(parseISO(caseData.filedOn), "d MMM yyyy")} />
            <InfoRow
              label="Next Hearing"
              value={caseData.nextHearing ? format(parseISO(caseData.nextHearing), "d MMM yyyy") : "No upcoming hearing"}
            />
            <div className="sm:col-span-3">
              <p className="text-xs text-muted">Description</p>
              <p className="text-sm text-ink mt-0.5 leading-relaxed">{caseData.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "client" && client && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Client Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow label="Name" value={client.name} />
            <InfoRow label="Client ID" value={client.id} />
            <InfoRow label="Phone" value={client.phone} />
            <InfoRow label="Email" value={client.email} />
            <div className="sm:col-span-2">
              <InfoRow label="Address" value={client.address} />
            </div>
            <div className="sm:col-span-2">
              <Link to={`/clients/${client.id}`}>
                <Button size="sm" variant="outline"><User size={14} /> View Full Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "opposite-party" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Opposite Party</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow label="Name" value={caseData.oppositeParty.name} />
            <InfoRow label="Relation" value={caseData.oppositeParty.relation} />
            <InfoRow label="Phone" value={caseData.oppositeParty.phone} />
            <div className="sm:col-span-2">
              <InfoRow label="Address" value={caseData.oppositeParty.address} />
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "opposite-advocate" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Opposite Advocate</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow label="Advocate Name" value={caseData.oppositeAdvocate.name} />
            <InfoRow label="Law Firm" value={caseData.oppositeAdvocate.firm} />
            <InfoRow label="Phone" value={caseData.oppositeAdvocate.phone} />
            <InfoRow label="Email" value={caseData.oppositeAdvocate.email} />
          </CardContent>
        </Card>
      )}

      {activeTab === "timeline" && (
        <Card>
          <CardHeader><CardTitle>Case Timeline</CardTitle></CardHeader>
          <CardContent>
            <CaseTimeline events={caseData.timeline} />
          </CardContent>
        </Card>
      )}

      {activeTab === "hearings" && (
        <Card>
          <CardContent className="p-0">
            {caseData.hearingHistory.length === 0 ? (
              <EmptyState icon={Gavel} title="No hearing history" description="No hearings have been recorded for this case yet." />
            ) : (
              caseData.hearingHistory.map((h, idx) => (
                <div key={idx} className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0">
                  <div className="h-9 w-9 rounded-md bg-navy-50 flex items-center justify-center text-navy shrink-0">
                    <Gavel size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{format(parseISO(h.date), "d MMM yyyy")}</p>
                      <StatusBadge status={h.outcome.includes("Adjourned") ? "Pending" : "Active"} />
                    </div>
                    <p className="text-sm text-ink mt-0.5">{h.outcome}</p>
                    {h.notes && <p className="text-xs text-muted mt-0.5">{h.notes}</p>}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardContent className="p-0">
            {caseDocuments.length === 0 ? (
              <EmptyState icon={FileText} title="No documents found" description="No documents have been uploaded for this case yet." />
            ) : (
              caseDocuments.map((d) => (
                <div key={d.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-navy-50/40">
                  <div className="h-9 w-9 rounded-md bg-navy-50 flex items-center justify-center text-navy shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{d.name}</p>
                    <p className="text-xs text-muted">{d.category} &middot; {format(parseISO(d.uploadDate), "d MMM yyyy")} &middot; {d.size}</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "notes" && (
        <Card>
          <CardContent className="p-0">
            {caseData.notes.length === 0 ? (
              <EmptyState icon={Scale} title="No notes yet" description="Case notes added by the legal team will appear here." />
            ) : (
              caseData.notes.map((n) => (
                <div key={n.id} className="px-5 py-4 border-b border-border last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-ink">{n.author}</p>
                    <p className="text-xs text-muted">{format(parseISO(n.date), "d MMM yyyy")}</p>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{n.text}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
