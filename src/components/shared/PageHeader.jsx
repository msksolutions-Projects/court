import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PageHeader({ title, breadcrumb, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
      <div>
        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-xs text-muted mb-1.5">
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {b.path ? (
                  <Link to={b.path} className="hover:text-navy">{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight size={12} />}
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="text-xl font-bold text-ink font-display">{title}</h1>
      </div>
      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
}
