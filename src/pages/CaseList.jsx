import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, FilePlus2, Search } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { StatusBadge } from "../components/shared/StatusBadge";
import { EmptyState } from "../components/shared/EmptyState";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Input";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { Modal } from "../components/ui/Modal";
import { cases as initialCases } from "../data/cases";
import { format, parseISO } from "date-fns";

export function CaseList() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(initialCases);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = cases.filter((c) => {
    const matchesQuery = [c.caseNumber, c.clientName, c.court, c.caseType]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function confirmDelete() {
    setCases((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="All Cases"
        breadcrumb={[{ label: "Case Management" }, { label: "All Cases" }]}
        action={
          <Link to="/cases/new">
            <Button variant="gold">
              <FilePlus2 size={16} /> Add Case
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative max-w-sm flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search by case number, client, or court..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="sm:w-40">
            <option>All</option>
            <option>Active</option>
            <option>Closed</option>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={FilePlus2}
            title="No cases found"
            description="Try adjusting your filters, or add a new case to get started."
            action={
              <Link to="/cases/new">
                <Button variant="primary" size="sm">Add Case</Button>
              </Link>
            }
          />
        ) : (
          <>
            {/* Mobile card list */}
            <div className="sm:hidden flex flex-col divide-y divide-border">
              {filtered.map((c) => (
                <div key={c.id} className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-ink">{c.caseNumber}</p>
                      <p className="text-xs text-muted truncate">{c.title}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <div className="text-xs text-muted flex flex-col gap-1">
                    <p><span className="text-ink/70 font-medium">Client:</span> {c.clientName}</p>
                    <p><span className="text-ink/70 font-medium">Court:</span> {c.court}</p>
                    <p><span className="text-ink/70 font-medium">Type:</span> {c.caseType}</p>
                    <p>
                      <span className="text-ink/70 font-medium">Next Hearing:</span>{" "}
                      {c.nextHearing ? format(parseISO(c.nextHearing), "d MMM yyyy") : "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => navigate(`/cases/${c.id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-md border border-border hover:bg-navy-50 text-navy-700 text-xs font-medium"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => navigate(`/cases/${c.id}?edit=true`)}
                      className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-md border border-border hover:bg-navy-50 text-navy-700 text-xs font-medium"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(c)}
                      className="p-2 rounded-md border border-border hover:bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block">
              <Table>
                <THead>
                  <TR>
                    <TH>Case Number</TH>
                    <TH>Client</TH>
                    <TH>Court</TH>
                    <TH>Case Type</TH>
                    <TH>Status</TH>
                    <TH>Next Hearing</TH>
                    <TH className="text-right">Actions</TH>
                  </TR>
                </THead>
                <TBody>
                  {filtered.map((c) => (
                    <TR key={c.id}>
                      <TD>
                        <p className="font-medium text-ink">{c.caseNumber}</p>
                        <p className="text-xs text-muted truncate max-w-[200px]">{c.title}</p>
                      </TD>
                      <TD className="text-muted">{c.clientName}</TD>
                      <TD className="text-muted">{c.court}</TD>
                      <TD className="text-muted">{c.caseType}</TD>
                      <TD><StatusBadge status={c.status} /></TD>
                      <TD className="text-muted">
                        {c.nextHearing ? format(parseISO(c.nextHearing), "d MMM yyyy") : "—"}
                      </TD>
                      <TD>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/cases/${c.id}`)}
                            className="p-1.5 rounded-md hover:bg-navy-50 text-navy-700"
                            title="View"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => navigate(`/cases/${c.id}?edit=true`)}
                            className="p-1.5 rounded-md hover:bg-navy-50 text-navy-700"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(c)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-500"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
          </>
        )}
      </Card>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Case"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete Case</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Are you sure you want to delete <span className="font-semibold">{deleteTarget?.caseNumber}</span>? This will remove the case record from this demo workspace.
        </p>
      </Modal>
    </div>
  );
}
