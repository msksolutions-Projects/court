# Rao & Associates — Law Firm Management System (Client Demo)

A front-end-only demo of a full legal practice management SaaS, built for client presentation. No backend, no authentication — all data is static mock JSON representing a Hyderabad-based law firm.

## Tech Stack
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Recharts (dashboard & report charts)
- Lucide React (icons)
- date-fns (date formatting)

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production / static hosting:

```bash
npm run build
npm run preview
```

## What's Included
- **Dashboard** — KPIs, monthly case volume, case status split, lead conversion trend, recent activity widgets
- **Client Management** — list, search, add client form, full client profile (info / cases / documents / notes tabs)
- **Case Management** — list with filters, add case form, full case detail (case info, client info, opposite party, opposite advocate, case timeline, hearing history, documents, notes)
- **Document Management** — categorized document repository with search
- **Hearings** — upcoming hearings table with reminder status
- **Calendar** — interactive monthly calendar with hearings/appointments overlay
- **Website Leads** — inquiry pipeline with Convert to Client / Assign Follow-Up actions
- **Appointments** — appointment schedule table
- **Tasks** — drag-and-drop Kanban board (Pending / In Progress / Completed)
- **Reports** — cases by type/status, monthly hearings, lead conversion charts
- **Settings** — profile, notifications, reminders, role management

## Project Structure
```
src/
  components/
    ui/         shadcn-style primitives (Button, Card, Table, Modal, Tabs, etc.)
    layout/      Sidebar, Topbar
    shared/      PageHeader, KpiCard, StatusBadge, CaseTimeline, EmptyState
  pages/         one file per route
  layouts/       AppLayout (sidebar + topbar shell)
  data/          static mock JSON/JS — edit here to change demo content
  lib/           utility helpers
```

## Notes for Demo Use
- All data lives in `src/data/*.js` — edit these files to change names, case numbers, dates, etc.
- Forms (Add Client, Add Case, Lead conversion) simulate a save and redirect; nothing persists after a page refresh since there is no backend.
- Color palette: Navy (`#0B1F3A`), Gold accent (`#C9A227`), white, and slate gray — matching the brief's enterprise legal theme.
