import React from "react";
import { Badge } from "../ui/Badge";

const statusVariantMap = {
  Active: "success",
  Closed: "gray",
  Inactive: "gray",
  New: "info",
  Contacted: "warning",
  "Follow-Up": "gold",
  Converted: "success",
  Confirmed: "success",
  Pending: "warning",
  Cancelled: "danger",
  Sent: "success",
  "Not Set": "gray",
  High: "danger",
  Medium: "warning",
  Low: "gray",
};

export function StatusBadge({ status, dot = true }) {
  const variant = statusVariantMap[status] || "default";
  return (
    <Badge variant={variant} dot={dot}>
      {status}
    </Badge>
  );
}
