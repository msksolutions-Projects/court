import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Label, Input, Textarea, Select } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export function AddClient() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/clients"), 1100);
  }

  return (
    <div>
      <PageHeader
        title="Add Client"
        breadcrumb={[{ label: "Client Management", path: "/clients" }, { label: "Add Client" }]}
      />

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <CheckCircle2 size={40} className="text-emerald-600 mb-3" />
              <p className="font-semibold text-ink">Client added successfully</p>
              <p className="text-sm text-muted mt-1">Redirecting to the client list...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="e.g. Ramesh Kumar" required />
              </div>
              <div>
                <Label>Client Type</Label>
                <Select defaultValue="Individual">
                  <option>Individual</option>
                  <option>Business</option>
                </Select>
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input placeholder="+91 90000 00000" required />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="name@example.com" required />
              </div>
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <Textarea rows={2} placeholder="Street, City, State, PIN" />
              </div>
              <div>
                <Label>Status</Label>
                <Select defaultValue="Active">
                  <option>Active</option>
                  <option>Inactive</option>
                </Select>
              </div>
              <div>
                <Label>Referred By</Label>
                <Input placeholder="Optional" />
              </div>
              <div className="sm:col-span-2">
                <Label>Initial Notes</Label>
                <Textarea rows={3} placeholder="Add background, context, or matter details..." />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/clients")}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold">Save Client</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
