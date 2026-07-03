import React from "react";

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-navy-50 flex items-center justify-center mb-4">
          <Icon size={22} className="text-navy" />
        </div>
      )}
      <p className="text-sm font-semibold text-ink mb-1">{title}</p>
      {description && <p className="text-xs text-muted max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
