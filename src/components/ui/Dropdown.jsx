import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

export function Dropdown({ trigger, children, align = "right", className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            "absolute z-40 mt-2 min-w-[180px] rounded-md bg-white border border-border shadow-dropdown py-1.5",
            align === "right" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, className, icon, ...props }) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-ink hover:bg-navy-50 text-left transition-colors",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
