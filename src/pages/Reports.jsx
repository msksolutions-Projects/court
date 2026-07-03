import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { casesByType, casesByStatus, monthlyHearings, leadConversionData } from "../data/dashboardData";

const TYPE_COLORS = ["#0B1F3A", "#C9A227", "#1B3358", "#9C7D1A", "#475569"];

export function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports"
        action={<Button variant="outline"><Download size={15} /> Export Report</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Cases By Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={casesByType} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid horizontal={false} stroke="#E3E8EF" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="type" type="category" tick={{ fontSize: 12, fill: "#1A2233" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} cursor={{ fill: "#EEF1F6" }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                  {casesByType.map((_, i) => (
                    <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Cases By Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={casesByStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {casesByStatus.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-xs text-muted">{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Monthly Hearings</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyHearings}>
                <CartesianGrid vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} cursor={{ fill: "#EEF1F6" }} />
                <Bar dataKey="hearings" fill="#13294B" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Lead Conversion</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={leadConversionData}>
                <CartesianGrid vertical={false} stroke="#E3E8EF" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={24} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E3E8EF" }} />
                <Legend formatter={(v) => <span className="text-xs text-muted">{v}</span>} />
                <Line type="monotone" dataKey="leads" name="Leads" stroke="#13294B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="converted" name="Converted" stroke="#C9A227" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
