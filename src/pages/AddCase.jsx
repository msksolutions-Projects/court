import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Label, Input, Textarea, Select } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { clients } from "../data/clients";

export function AddCase() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/cases"), 1100);
  }

  return (
    <div>
      <PageHeader
        title="Add Case"
        breadcrumb={[{ label: "Case Management", path: "/cases" }, { label: "Add Case" }]}
      />

      {submitted ? (
        <Card className="max-w-3xl">
          <CardContent>
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={40} className="text-emerald-600 mb-3" />
              <p className="font-semibold text-ink">Case created successfully</p>
              <p className="text-sm text-muted mt-1">Redirecting to the case list...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-3xl">
          <Card>
            <CardHeader><CardTitle>Case Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Case Number</Label>
                <Input placeholder="e.g. OS/142/2024" required />
              </div>
              <div>
                <Label>Case Type</Label>
                <Select defaultValue="Civil">
                  <option>Civil</option>
                  <option>Criminal</option>
                  <option>Property</option>
                  <option>Family</option>
                  <option>Corporate</option>
                </Select>
              </div>
              <div>
                <Label>Client</Label>
                <Select defaultValue="">
                  <option value="" disabled>Select a client</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Court</Label>
                <Select defaultValue="District Court Hyderabad">
                  <option>High Court of Telangana</option>
                  <option>District Court Hyderabad</option>
                  <option>Family Court Hyderabad</option>
                </Select>
              </div>
              <div>
                <Label>Filed On</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Next Hearing Date</Label>
                <Input type="date" />
              </div>
              <div className="sm:col-span-2">
                <Label>Case Description</Label>
                <Textarea rows={3} placeholder="Brief description of the matter..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Opposite Party</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Opposite Party Name</Label>
                <Input placeholder="Full name or entity" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+91 90000 00000" />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Input placeholder="Address" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Opposite Advocate</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Advocate Name</Label>
                <Input placeholder="Adv. Full Name" />
              </div>
              <div>
                <Label>Law Firm</Label>
                <Input placeholder="Firm name" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+91 90000 00000" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="name@firm.com" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pb-4">
            <Button type="button" variant="outline" onClick={() => navigate("/cases")}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">Save Case</Button>
          </div>
        </form>
      )}
    </div>
  );
}
