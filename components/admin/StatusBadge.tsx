import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "enquiry" | "message" | "publish";
}

export function StatusBadge({ status, type = "publish" }: StatusBadgeProps) {
  let colorClasses = "bg-stone-100 text-stone-700 border-stone-200";

  if (type === "enquiry") {
    switch (status) {
      case "NEW":
        colorClasses = "bg-blue-50 text-blue-800 border-blue-200 font-semibold";
        break;
      case "CONTACTED":
        colorClasses = "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
        break;
      case "FOLLOW_UP":
        colorClasses = "bg-purple-50 text-purple-800 border-purple-200 font-semibold";
        break;
      case "CONVERTED":
        colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold";
        break;
      case "CLOSED":
        colorClasses = "bg-stone-100 text-stone-600 border-stone-300";
        break;
    }
  } else if (type === "message") {
    switch (status) {
      case "UNREAD":
        colorClasses = "bg-red-50 text-red-800 border-red-200 font-semibold animate-pulse";
        break;
      case "READ":
        colorClasses = "bg-blue-50 text-blue-800 border-blue-200";
        break;
      case "REPLIED":
        colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold";
        break;
      case "CLOSED":
        colorClasses = "bg-stone-100 text-stone-600 border-stone-300";
        break;
    }
  } else {
    // Publication status
    switch (status) {
      case "PUBLISHED":
        colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium";
        break;
      case "DRAFT":
        colorClasses = "bg-amber-50 text-amber-800 border-amber-200 font-medium";
        break;
      case "ARCHIVED":
        colorClasses = "bg-stone-100 text-stone-600 border-stone-300";
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${colorClasses}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
