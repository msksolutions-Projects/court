import React from "react";
import {
  Users,
  Briefcase,
  CheckCircle2,
  Archive,
  Gavel,
  CalendarClock,
  Globe,
  ListTodo,
  ArrowRight,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/shared/PageHeader";
import { KpiCard } from "../components/shared/KpiCard";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Button } from "../components/ui/Button";
import { clients } from "../data/clients";
import { cases } from "../data/cases";
import { hearings, todaysDate } from "../data/hearings";
import { documents } from "../data/documents";
import { leads } from "../data/operations";
import { tasks } from "../data/operations";
import { monthlyCases, caseStatusData, leadConversionData, notifications } from "../data/dashboardData";
import { format, parseISO } from "date-fns";

export function Dashboard() {
  const totalClients = clients.length;
  const totalCases = cases.length;
  const activeCases = cases.filter((c) => c.status === "Active").length;
  const closedCases = cases.filter((c) => c.status === "Closed").length;
  const todaysHearings = hearings.filter((h) => h.date === todaysDate).length;
  const upcomingHearings = hearings.filter((h) => h.date > todaysDate).length;
  const websiteLeads = leads.length;
  const pendingTasks = tasks.filter((t) => t.column !== "completed").length;

  const recentClients = [...clients].slice(-4).reverse();
  const upcomingHearingsList = [...hearings].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const recentDocuments = [...documents].sort((a, b) => b.uploadDate.localeCompare(a.uploadDate)).slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        action={
          <Link to="/cases/new">
            <Button variant="gold">Add New Case</Button>
          </Link>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <KpiCard icon={Users} label="Total Clients" value={totalClients} trend={8} accent="navy" />
        <KpiCard icon={Briefcase} label="Total Cases" value={totalCases} trend={12} accent="gold" />
        <KpiCard icon={CheckCircle2} label="Active Cases" value={activeCases} trend={5} accent="emerald" />
        <KpiCard icon={Archive} label="Closed Cases" value={closedCases} trend={-2} accent="sky" />
        <KpiCard icon={Gavel} label="Today's Hearings" value={todaysHearings} accent="gold" />
        <KpiCard icon={CalendarClock} label="Upcoming Hearings" value={upcomingHearings} accent="navy" />
        <KpiCard icon={Globe} label="Website Leads" value={websiteLeads} trend={22} accent="sky" />
        <KpiCard icon={ListTodo} label="Pending Tasks" value={pendingTasks} accent="emerald" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Cases</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyCases}>
                <CartesianGrid vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }}
                  cursor={{ fill: "#EEF1F6" }}
                />
                <Bar dataKey="cases" fill="#0B1F3A" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Case Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={caseStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {caseStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-muted">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Lead Conversion</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={leadConversionData}>
                <CartesianGrid vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} />
                <Line type="monotone" dataKey="leads" stroke="#13294B" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="converted" stroke="#C9A227" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <Link to="/clients" className="text-xs font-medium text-navy hover:text-gold-dark flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentClients.map((c) => (
              <Link
                to={`/clients/${c.id}`}
                key={c.id}
                className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-navy-50/40"
              >
                <Avatar name={c.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{c.name}</p>
                  <p className="text-xs text-muted truncate">{c.email}</p>
                </div>
                <StatusBadge status={c.status} />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Hearings</CardTitle>
            <Link to="/hearings" className="text-xs font-medium text-navy hover:text-gold-dark flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {upcomingHearingsList.map((h) => (
              <Link
                to={`/cases/${h.caseId}`}
                key={h.id}
                className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-navy-50/40"
              >
                <div className="h-9 w-9 rounded-md bg-gold-50 flex flex-col items-center justify-center text-gold-dark shrink-0">
                  <span className="text-[10px] font-bold leading-none">{format(parseISO(h.date), "MMM")}</span>
                  <span className="text-xs font-bold leading-none">{format(parseISO(h.date), "d")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{h.caseNumber} &middot; {h.clientName}</p>
                  <p className="text-xs text-muted truncate">{h.court} &middot; {h.time}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <Link to="/documents" className="text-xs font-medium text-navy hover:text-gold-dark flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {recentDocuments.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-navy-50/40"
              >
                <div className="h-9 w-9 rounded-md bg-navy-50 flex items-center justify-center text-navy shrink-0">
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{d.name}</p>
                  <p className="text-xs text-muted truncate">{d.caseNumber} &middot; {format(parseISO(d.uploadDate), "d MMM yyyy")}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 px-5 py-3 border-b border-border last:border-0">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-ink leading-snug">{n.text}</p>
                  <p className="text-xs text-muted mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
