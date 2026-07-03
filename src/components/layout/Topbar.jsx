import React from "react";
import { Search, Bell, Menu, ChevronDown, LogOut, UserCircle, Settings as SettingsIcon } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { Dropdown, DropdownItem } from "../ui/Dropdown";
import { Badge } from "../ui/Badge";
import { notifications } from "../../data/dashboardData";
import { useNavigate } from "react-router-dom";

export function Topbar({ onMenuClick, pageTitle }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/70 backdrop-blur-md border-b border-border flex items-center gap-4 px-4 lg:px-6 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-navy-700 hover:bg-navy-50 rounded-md p-2"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold text-ink">{pageTitle}</p>
      </div>

      <div className="flex-1 max-w-md ml-0 lg:ml-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search clients, cases, documents..."
            className="w-full h-9 rounded-md border border-border bg-canvas pl-9 pr-3 text-sm focus-ring placeholder:text-muted/70"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Dropdown
          align="right"
          trigger={
            <button className="relative h-9 w-9 flex items-center justify-center rounded-md hover:bg-navy-50 text-navy-700">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-coral-gradient ring-2 ring-white" />
            </button>
          }
          className="w-80"
        >
          <div className="px-3.5 py-2 border-b border-border">
            <p className="text-sm font-semibold text-ink">Notifications</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="px-3.5 py-2.5 hover:bg-navy-50 border-b border-border last:border-0">
                <p className="text-[13px] text-ink leading-snug">{n.text}</p>
                <p className="text-[11px] text-muted mt-0.5">{n.time}</p>
              </div>
            ))}
          </div>
        </Dropdown>

        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-navy-50">
              <Avatar name="Kavitha Rao" size="sm" />
              <div className="hidden sm:block text-left leading-tight">
                <p className="text-xs font-semibold text-ink">Adv. Kavitha Rao</p>
                <p className="text-[11px] text-muted">Managing Partner</p>
              </div>
              <ChevronDown size={14} className="text-muted hidden sm:block" />
            </button>
          }
        >
          <DropdownItem icon={<UserCircle size={16} />} onClick={() => navigate("/settings")}>
            My Profile
          </DropdownItem>
          <DropdownItem icon={<SettingsIcon size={16} />} onClick={() => navigate("/settings")}>
            Settings
          </DropdownItem>
          <div className="my-1 border-t border-border" />
          <DropdownItem icon={<LogOut size={16} />} className="text-red-600 hover:bg-red-50">
            Sign Out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
