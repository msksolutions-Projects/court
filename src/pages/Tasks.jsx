import React, { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { Button } from "../components/ui/Button";
import { StatusBadge } from "../components/shared/StatusBadge";
import { cn } from "../lib/utils";
import { tasks as initialTasks } from "../data/operations";
import { format, parseISO } from "date-fns";

const columns = [
  { id: "pending", label: "Pending", accent: "bg-slate-400" },
  { id: "in-progress", label: "In Progress", accent: "bg-gold" },
  { id: "completed", label: "Completed", accent: "bg-emerald-500" },
];

function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white rounded-md border border-border shadow-card p-3.5 cursor-grab active:cursor-grabbing mb-3"
    >
      <div className="flex items-center justify-between mb-2">
        <StatusBadge status={task.priority} dot={false} />
        <span className="text-[11px] text-muted">{format(parseISO(task.dueDate), "d MMM")}</span>
      </div>
      <p className="text-sm font-medium text-ink leading-snug mb-1.5">{task.title}</p>
      <p className="text-xs text-muted">{task.caseRef}</p>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <span className="text-[11px] text-muted truncate">{task.assignee}</span>
      </div>
    </div>
  );
}

export function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  function onDragStart(e, taskId) {
    e.dataTransfer.setData("taskId", taskId);
  }

  function onDrop(e, columnId) {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, column: columnId } : t)));
  }

  return (
    <div>
      <PageHeader title="Tasks" action={<Button variant="gold"><Plus size={16} /> Add Task</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, col.id)}
              className="bg-navy-50/50 rounded-lg p-3 min-h-[300px]"
            >
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className={cn("h-2 w-2 rounded-full", col.accent)} />
                <p className="text-sm font-semibold text-ink">{col.label}</p>
                <span className="text-xs text-muted bg-white rounded-full px-2 py-0.5 ml-auto">
                  {colTasks.length}
                </span>
              </div>
              {colTasks.map((task) => (
                <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
              ))}
              {colTasks.length === 0 && (
                <p className="text-xs text-muted text-center py-8">Drag tasks here</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
