import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import { ClientList } from "./pages/ClientList";
import { AddClient } from "./pages/AddClient";
import { ClientProfile } from "./pages/ClientProfile";
import { CaseList } from "./pages/CaseList";
import { AddCase } from "./pages/AddCase";
import { CaseDetail } from "./pages/CaseDetail";
import { DocumentManagement } from "./pages/DocumentManagement";
import { Hearings } from "./pages/Hearings";
import { CalendarPage } from "./pages/CalendarPage";
import { WebsiteLeads } from "./pages/WebsiteLeads";
import { Appointments } from "./pages/Appointments";
import { Tasks } from "./pages/Tasks";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<AddClient />} />
          <Route path="/clients/:id" element={<ClientProfile />} />

          <Route path="/cases" element={<CaseList />} />
          <Route path="/cases/new" element={<AddCase />} />
          <Route path="/cases/:id" element={<CaseDetail />} />

          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/hearings" element={<Hearings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/leads" element={<WebsiteLeads />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
