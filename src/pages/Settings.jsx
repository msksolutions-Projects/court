import React, { useState } from "react";
import { User, Bell, AlarmClock, ShieldCheck, Save } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Label, Input, Select } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Tabs } from "../components/ui/Tabs";

function Toggle({ defaultChecked = false, label, description }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {description && <p className="text-xs text-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => setChecked((c) => !c)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${checked ? "bg-gold" : "bg-navy-100"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

const team = [
  { name: "Adv. Kavitha Rao", role: "Managing Partner", access: "Full Access", status: "Active" },
  { name: "Adv. Mahesh Iyer", role: "Senior Associate", access: "Cases & Clients", status: "Active" },
  { name: "Divya Menon", role: "Paralegal", access: "Documents Only", status: "Active" },
  { name: "Office Admin", role: "Administrative Staff", access: "Scheduling Only", status: "Active" },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <PageHeader title="Settings" />

      <Tabs
        tabs={[
          { value: "profile", label: "Profile Settings" },
          { value: "notifications", label: "Notification Settings" },
          { value: "reminders", label: "Reminder Settings" },
          { value: "roles", label: "Role Management" },
        ]}
        onChange={setActiveTab}
        className="mb-5"
      />

      {activeTab === "profile" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar name="Kavitha Rao" size="xl" />
              <div>
                <Button size="sm" variant="outline">Change Photo</Button>
                <p className="text-xs text-muted mt-1.5">JPG or PNG, max 2MB</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="Kavitha Rao" />
              </div>
              <div>
                <Label>Designation</Label>
                <Input defaultValue="Managing Partner" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="kavitha.rao@raoassociates.in" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+91 98480 10010" />
              </div>
              <div className="sm:col-span-2">
                <Label>Firm Name</Label>
                <Input defaultValue="Rao & Associates" />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button variant="gold"><Save size={15} /> Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "notifications" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
          <CardContent className="pt-1">
            <Toggle defaultChecked label="New website lead alerts" description="Get notified when a new inquiry is submitted" />
            <Toggle defaultChecked label="Hearing reminders" description="Receive alerts before scheduled hearings" />
            <Toggle label="Document upload notifications" description="Notify when documents are added to a case" />
            <Toggle defaultChecked label="Task assignment alerts" description="Notify when a task is assigned to you" />
            <Toggle label="Weekly summary email" description="Receive a weekly digest of firm activity" />
            <div className="flex justify-end mt-5">
              <Button variant="gold"><Save size={15} /> Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "reminders" && (
        <Card className="max-w-2xl">
          <CardHeader><CardTitle>Reminder Settings</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <Label>Hearing Reminder Lead Time</Label>
                <Select defaultValue="2">
                  <option value="1">1 day before</option>
                  <option value="2">2 days before</option>
                  <option value="3">3 days before</option>
                  <option value="7">1 week before</option>
                </Select>
              </div>
              <div>
                <Label>Appointment Reminder Lead Time</Label>
                <Select defaultValue="1">
                  <option value="1">1 hour before</option>
                  <option value="2">2 hours before</option>
                  <option value="24">1 day before</option>
                </Select>
              </div>
            </div>
            <Toggle defaultChecked label="SMS reminders" description="Send reminders via SMS to client and advocate" />
            <Toggle defaultChecked label="Email reminders" description="Send reminders via email" />
            <Toggle label="WhatsApp reminders" description="Send reminders via WhatsApp Business" />
            <div className="flex justify-end mt-5">
              <Button variant="gold"><Save size={15} /> Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "roles" && (
        <Card>
          <CardHeader><CardTitle>Role Management</CardTitle></CardHeader>
          <CardContent className="p-0">
            {team.map((member, i) => (
              <div key={i} className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 border-b border-border last:border-0">
                <Avatar name={member.name} size="md" />
                <div className="flex-1 min-w-[120px]">
                  <p className="text-sm font-medium text-ink">{member.name}</p>
                  <p className="text-xs text-muted">{member.role}</p>
                </div>
                <span className="text-xs text-muted hidden lg:block shrink-0">{member.access}</span>
                <StatusBadge status={member.status} />
                <Button size="sm" variant="outline" className="shrink-0">Manage</Button>
              </div>
            ))}
            <div className="px-5 py-4">
              <Button variant="subtle" size="sm"><ShieldCheck size={14} /> Invite Team Member</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
