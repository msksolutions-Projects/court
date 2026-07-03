import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";

const titleMap = [
  { match: /^\/$/, title: "Dashboard" },
  { match: /^\/clients\/new/, title: "Add Client" },
  { match: /^\/clients\/[^/]+$/, title: "Client Profile" },
  { match: /^\/clients/, title: "Client Management" },
  { match: /^\/cases\/new/, title: "Add Case" },
  { match: /^\/cases\/[^/]+$/, title: "Case Details" },
  { match: /^\/cases/, title: "Case Management" },
  { match: /^\/documents/, title: "Document Management" },
  { match: /^\/hearings/, title: "Hearings" },
  { match: /^\/calendar/, title: "Calendar" },
  { match: /^\/appointments/, title: "Appointments" },
  { match: /^\/leads/, title: "Website Leads" },
  { match: /^\/tasks/, title: "Tasks" },
  { match: /^\/reports/, title: "Reports" },
  { match: /^\/settings/, title: "Settings" },
];

function getTitle(pathname) {
  const found = titleMap.find((t) => t.match.test(pathname));
  return found?.title || "Dashboard";
}

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-canvas relative">
      <div className="bg-aurora">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
      </div>
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 relative z-[1]">
        <Topbar onMenuClick={() => setMobileOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 min-w-0 w-full p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
