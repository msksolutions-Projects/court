import React, { useState } from "react";
import { Search, FileText, Upload, Eye } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { EmptyState } from "../components/shared/EmptyState";
import { cn } from "../lib/utils";
import { documents, documentCategories } from "../data/documents";
import { format, parseISO } from "date-fns";

const categoryColors = {
  Petitions: "bg-sky-50 text-sky-700",
  Evidence: "bg-amber-50 text-amber-700",
  "Court Orders": "bg-navy-50 text-navy-700",
  Judgments: "bg-emerald-50 text-emerald-700",
  Notices: "bg-rose-50 text-rose-700",
  Affidavits: "bg-violet-50 text-violet-700",
  Agreements: "bg-gold-50 text-gold-dark",
};

export function DocumentManagement() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = documents.filter((d) => {
    const matchesQuery = [d.name, d.caseNumber].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        title="Document Management"
        action={<Button variant="gold"><Upload size={16} /> Upload Document</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search documents by name or case..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
            activeCategory === "All"
              ? "bg-navy text-white border-navy"
              : "bg-white text-muted border-border hover:border-navy-200"
          )}
        >
          All Documents
        </button>
        {documentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors",
              activeCategory === cat
                ? "bg-navy text-white border-navy"
                : "bg-white text-muted border-border hover:border-navy-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={FileText} title="No documents found" description="Try a different search term or category filter." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <Card key={d.id} className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-md bg-navy-50 flex items-center justify-center text-navy">
                  <FileText size={18} />
                </div>
                <span className={cn("text-[11px] font-medium px-2 py-1 rounded-full", categoryColors[d.category])}>
                  {d.category}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-ink leading-snug line-clamp-2">{d.name}</p>
                <p className="text-xs text-muted mt-1">{d.caseNumber}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border">
                <span>{format(parseISO(d.uploadDate), "d MMM yyyy")}</span>
                <span>{d.size}</span>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Eye size={14} /> View Document
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
