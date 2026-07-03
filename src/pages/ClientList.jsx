import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, UserPlus, Search } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { StatusBadge } from "../components/shared/StatusBadge";
import { EmptyState } from "../components/shared/EmptyState";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import { Avatar } from "../components/ui/Avatar";
import { Modal } from "../components/ui/Modal";
import { clients as initialClients } from "../data/clients";

export function ClientList() {
  const navigate = useNavigate();
  const [clients, setClients] = useState(initialClients);
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = clients.filter((c) =>
    [c.name, c.email, c.phone].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  function confirmDelete() {
    setClients((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="All Clients"
        breadcrumb={[{ label: "Client Management" }, { label: "All Clients" }]}
        action={
          <Link to="/clients/new">
            <Button variant="gold">
              <UserPlus size={16} /> Add Client
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={UserPlus}
            title="No clients found"
            description="Try adjusting your search, or add a new client to get started."
            action={
              <Link to="/clients/new">
                <Button variant="primary" size="sm">Add Client</Button>
              </Link>
            }
          />
        ) : (
          <Table>
            <THead>
              <TR>
                <TH>Client Name</TH>
                <TH>Phone</TH>
                <TH>Email</TH>
                <TH>Address</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {filtered.map((c) => (
                <TR key={c.id}>
                  <TD>
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size="sm" />
                      <div>
                        <p className="font-medium text-ink">{c.name}</p>
                        <p className="text-xs text-muted">{c.id}</p>
                      </div>
                    </div>
                  </TD>
                  <TD className="text-muted">{c.phone}</TD>
                  <TD className="text-muted">{c.email}</TD>
                  <TD className="text-muted max-w-[220px] truncate">{c.address}</TD>
                  <TD><StatusBadge status={c.status} /></TD>
                  <TD>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/clients/${c.id}`)}
                        className="p-1.5 rounded-md hover:bg-navy-50 text-navy-700"
                        title="View"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => navigate(`/clients/${c.id}?edit=true`)}
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
        )}
      </Card>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Client"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete Client</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Are you sure you want to delete <span className="font-semibold">{deleteTarget?.name}</span>? This will remove their profile from this demo workspace.
        </p>
      </Modal>
    </div>
  );
}
