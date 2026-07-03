import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Gavel,
  Calendar,
  CalendarCheck,
  Globe,
  KanbanSquare,
  BarChart3,
  Settings,
  ChevronDown,
  Scale,
  UserPlus,
  FilePlus2,
} from "lucide-react";
import { cn } from "../../lib/utils";

const navGroups = [
  {
    type: "single",
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    type: "group",
    label: "Client Management",
    icon: Users,
    matchPrefix: "/clients",
    children: [
      { label: "All Clients", path: "/clients", icon: Users },
      { label: "Add Client", path: "/clients/new", icon: UserPlus },
    ],
  },
  {
    type: "group",
    label: "Case Management",
    icon: Briefcase,
    matchPrefix: "/cases",
    children: [
      { label: "All Cases", path: "/cases", icon: Briefcase },
      { label: "Add Case", path: "/cases/new", icon: FilePlus2 },
    ],
  },
  {
    type: "single",
    label: "Document Management",
    path: "/documents",
    icon: FileText,
  },
  {
    type: "single",
    label: "Hearings",
    path: "/hearings",
    icon: Gavel,
  },
  {
    type: "single",
    label: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    type: "single",
    label: "Appointments",
    path: "/appointments",
    icon: CalendarCheck,
  },
  {
    type: "single",
    label: "Website Leads",
    path: "/leads",
    icon: Globe,
  },
  {
    type: "single",
    label: "Tasks",
    path: "/tasks",
    icon: KanbanSquare,
  },
  {
    type: "single",
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    type: "single",
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function GroupItem({ group }) {
  const location = useLocation();
  const isActiveGroup = location.pathname.startsWith(group.matchPrefix);
  const [open, setOpen] = useState(isActiveGroup);
  const Icon = group.icon;

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200 group",
          isActiveGroup
            ? "text-white bg-gradient-to-r from-gold/25 to-navy/15 shadow-[inset_3px_0_0_theme(colors.gold.DEFAULT)]"
            : "text-navy-200 hover:text-white hover:bg-white/5"
        )}
      >
        <Icon size={18} className={cn(isActiveGroup ? "text-amber" : "text-navy-200/80 group-hover:text-amber/80")} />
        <span className="flex-1 text-left">{group.label}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "", isActiveGroup ? "text-white" : "text-navy-200/60")}
        />
      </button>
      {open && (
        <div className="ml-[1.85rem] mt-0.5 mb-1 border-l border-white/10 pl-3 flex flex-col gap-0.5">
          {group.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-2.5 py-2 rounded-md text-[13px] transition-colors",
                  isActive
                    ? "bg-gold/15 text-amber font-medium"
                    : "text-navy-200/90 hover:text-white hover:bg-white/5"
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function SingleItem({ item }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-sm font-medium transition-all duration-200 mb-0.5 group",
          isActive
            ? "text-white bg-gradient-to-r from-gold/25 to-navy/15 shadow-[inset_3px_0_0_theme(colors.gold.DEFAULT)]"
            : "text-navy-200 hover:text-white hover:bg-white/5"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={18} className={cn(isActive ? "text-amber" : "text-navy-200/80 group-hover:text-amber/80")} />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-[268px] bg-sidebar-gradient flex flex-col z-40 transition-transform duration-200 shrink-0 overflow-hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="pointer-events-none absolute -top-16 -right-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10 shrink-0 relative z-10">
          <div className="h-9 w-9 rounded-[11px] bg-amber-gradient flex items-center justify-center shrink-0 shadow-glow">
            <Scale size={20} className="text-navy-900" />
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-white text-[15px] tracking-wide">Rao &amp; Associates</p>
            <p className="text-[11px] text-navy-200/70 -mt-0.5">Legal Practice Management</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin-dark px-3 py-4 relative z-10">
          {navGroups.map((item) =>
            item.type === "group" ? (
              <GroupItem key={item.label} group={item} />
            ) : (
              <SingleItem key={item.label} item={item} />
            )
          )}
        </nav>

        <div className="px-4 py-4 border-t border-white/10 shrink-0 relative z-10">
          <div className="rounded-[12px] bg-white/5 border border-white/10 px-3 py-3">
            <p className="text-[11px] text-navy-200/70 mb-1">Demo Workspace</p>
            <p className="text-xs text-navy-200">Plan: Enterprise Trial</p>
          </div>
        </div>
      </aside>
    </>
  );
}
