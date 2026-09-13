import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "enquiry" | "message" | "publish" | "recruitment" | "interview";
}

export function StatusBadge({ status, type = "publish" }: StatusBadgeProps) {
  let colorClasses = "bg-stone-100 text-stone-700 border-stone-200";

  if (type === "recruitment") {
    switch (status) {
      case "NEW":
        colorClasses = "bg-blue-50 text-blue-800 border-blue-200 font-semibold";
        break;
      case "UNDER_REVIEW":
        colorClasses = "bg-[#FAF3E0] text-[#856627] border-[#D4B15A]/60 font-semibold";
        break;
      case "SHORTLISTED":
        colorClasses = "bg-[#FAF3E0] text-[#083526] border-[#B88A2A] font-bold";
        break;
      case "INTERVIEW_SCHEDULED":
        colorClasses = "bg-purple-50 text-purple-800 border-purple-200 font-semibold";
        break;
      case "INTERVIEW_CONFIRMED":
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8] font-semibold";
        break;
      case "RESCHEDULE_REQUESTED":
        colorClasses = "bg-orange-50 text-orange-800 border-orange-200 font-semibold animate-pulse";
        break;
      case "INTERVIEW_COMPLETED":
        colorClasses = "bg-sky-50 text-sky-800 border-sky-200 font-semibold";
        break;
      case "SELECTED":
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#B88A2A] font-bold";
        break;
      case "REJECTED":
        colorClasses = "bg-stone-100 text-stone-600 border-stone-300";
        break;
    }
  } else if (type === "interview") {
    switch (status) {
      case "SCHEDULED":
        colorClasses = "bg-purple-50 text-purple-800 border-purple-200 font-semibold";
        break;
      case "CONFIRMED":
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8] font-semibold";
        break;
      case "RESCHEDULE_REQUESTED":
        colorClasses = "bg-[#FAF3E0] text-[#856627] border-[#D4B15A]/60 font-semibold";
        break;
      case "COMPLETED":
        colorClasses = "bg-blue-50 text-blue-800 border-blue-200";
        break;
      case "CANCELLED":
        colorClasses = "bg-red-50 text-red-800 border-red-200";
        break;
    }
  } else if (type === "enquiry") {
    switch (status) {
      case "NEW":
        colorClasses = "bg-blue-50 text-blue-800 border-blue-200 font-semibold";
        break;
      case "CONTACTED":
        colorClasses = "bg-[#FAF3E0] text-[#856627] border-[#D4B15A]/60 font-semibold";
        break;
      case "FOLLOW_UP":
        colorClasses = "bg-purple-50 text-purple-800 border-purple-200 font-semibold";
        break;
      case "CONVERTED":
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8] font-semibold";
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
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8] font-semibold";
        break;
      case "CLOSED":
        colorClasses = "bg-stone-100 text-stone-600 border-stone-300";
        break;
    }
  } else {
    // Publication status
    switch (status) {
      case "PUBLISHED":
        colorClasses = "bg-[#E7EDE2] text-[#0F4735] border-[#C9D8C8] font-semibold";
        break;
      case "DRAFT":
        colorClasses = "bg-[#FAF3E0] text-[#856627] border-[#D4B15A]/60 font-medium";
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
