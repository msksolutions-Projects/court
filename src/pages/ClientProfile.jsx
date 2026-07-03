import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Briefcase, Pencil, ArrowLeft, FileText, Calendar } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Tabs } from "../components/ui/Tabs";
import { StatusBadge } from "../components/shared/StatusBadge";
import { EmptyState } from "../components/shared/EmptyState";
import { getClientById } from "../data/clients";
import { getCasesByClientId } from "../data/cases";
import { getDocumentsByCase } from "../data/documents";
import { format, parseISO } from "date-fns";

export function ClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = getClientById(id);
  const [activeTab, setActiveTab] = useState("info");

  if (!client) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Client not found"
        description="This client record doesn't exist in the demo dataset."
        action={<Button onClick={() => navigate("/clients")}>Back to Clients</Button>}
      />
    );
  }

  const clientCases = getCasesByClientId(client.id);
  const clientDocuments = clientCases.flatMap((c) => getDocumentsByCase(c.id));

  return (
    <div>
      <Link to="/clients" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-navy mb-4">
        <ArrowLeft size={13} /> Back to all clients
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={client.name} size="xl" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-ink font-serif">{client.name}</h1>
              <StatusBadge status={client.status} />
            </div>
            <p className="text-sm text-muted mt-0.5">{client.id} &middot; {client.type} Client &middot; Joined {format(parseISO(client.joinedOn), "MMM yyyy")}</p>
          </div>
        </div>
        <Button variant="outline">
          <Pencil size={15} /> Edit Profile
        </Button>
      </div>

      <Tabs
        tabs={[
          { value: "info", label: "Personal Information" },
          { value: "cases", label: `Cases (${clientCases.length})` },
          { value: "documents", label: `Documents (${clientDocuments.length})` },
          { value: "notes", label: `Notes (${client.notes.length})` },
        ]}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "info" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-gold-dark mt-0.5" />
              <div>
                <p className="text-xs text-muted">Phone</p>
                <p className="text-sm font-medium text-ink">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-gold-dark mt-0.5" />
              <div>
                <p className="text-xs text-muted">Email</p>
                <p className="text-sm font-medium text-ink">{client.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <MapPin size={16} className="text-gold-dark mt-0.5" />
              <div>
                <p className="text-xs text-muted">Address</p>
                <p className="text-sm font-medium text-ink">{client.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "cases" && (
        <Card>
          <CardContent className="p-0">
            {clientCases.length === 0 ? (
              <EmptyState icon={Briefcase} title="No cases on file" description="This client has no associated cases yet." />
            ) : (
              clientCases.map((c) => (
                <Link
                  key={c.id}
                  to={`/cases/${c.id}`}
                  className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-navy-50/40"
                >
                  <div className="h-9 w-9 rounded-md bg-navy-50 flex items-center justify-center text-navy shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink">{c.caseNumber} &middot; {c.caseType}</p>
                    <p className="text-xs text-muted truncate">{c.court}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardContent className="p-0">
            {clientDocuments.length === 0 ? (
              <EmptyState icon={FileText} title="No documents found" description="No documents are linked to this client's cases yet." />
            ) : (
              clientDocuments.map((d) => (
                <div key={d.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-navy-50/40">
                  <div className="h-9 w-9 rounded-md bg-navy-50 flex items-center justify-center text-navy shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{d.name}</p>
                    <p className="text-xs text-muted">{d.category} &middot; {format(parseISO(d.uploadDate), "d MMM yyyy")}</p>
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
            {client.notes.length === 0 ? (
              <EmptyState icon={Calendar} title="No notes yet" description="Notes added during consultations will appear here." />
            ) : (
              client.notes.map((n) => (
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
