"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Loader2,
  ChevronRight,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface StatusTimelineItem {
  newStatus: string;
  createdAt: string;
}

interface ApplicationData {
  applicationNumber: string;
  fullName: string;
  positionTitle: string;
  status: string;
  submittedAt: string;
  timeline: StatusTimelineItem[];
  interview: {
    interviewDate: string;
    interviewTime: string;
    interviewMode: string;
    venue: string | null;
    meetingLink: string | null;
    status: string;
    confirmationToken: string;
  } | null;
}

const PIPELINE_STAGES = [
  { key: "NEW", label: "Application Received" },
  { key: "UNDER_REVIEW", label: "Under Review" },
  { key: "SHORTLISTED", label: "Shortlisted" },
  { key: "INTERVIEW_SCHEDULED", label: "Interview Scheduled" },
  { key: "INTERVIEW_CONFIRMED", label: "Interview Confirmed" },
  { key: "INTERVIEW_COMPLETED", label: "Interview Completed" },
  { key: "DECISION", label: "Final Decision" },
];

function getStageIndex(status: string): number {
  switch (status) {
    case "NEW":
      return 0;
    case "UNDER_REVIEW":
      return 1;
    case "SHORTLISTED":
      return 2;
    case "INTERVIEW_SCHEDULED":
    case "RESCHEDULE_REQUESTED":
      return 3;
    case "INTERVIEW_CONFIRMED":
      return 4;
    case "INTERVIEW_COMPLETED":
      return 5;
    case "SELECTED":
    case "REJECTED":
      return 6;
    default:
      return 0;
  }
}

function StatusTrackerInner() {
  const searchParams = useSearchParams();
  const [appId, setAppId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appData, setAppData] = useState<ApplicationData | null>(null);

  useEffect(() => {
    const qId = searchParams.get("id");
    const qEmail = searchParams.get("email");
    if (qId) setAppId(qId);
    if (qEmail) setEmail(qEmail);

    if (qId && qEmail) {
      handleSearch(qId, qEmail);
    }
  }, [searchParams]);

  const handleSearch = async (targetId?: string, targetEmail?: string) => {
    const queryId = (targetId || appId).trim();
    const queryEmail = (targetEmail || email).trim();

    if (!queryId || !queryEmail) {
      setError("Please enter both your Application ID and registered Email.");
      return;
    }

    setLoading(true);
    setError("");
    setAppData(null);

    try {
      const res = await fetch("/api/recruitment/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationNumber: queryId,
          email: queryEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Application not found.");
      }

      setAppData(data.application);
    } catch (err: any) {
      setError(err.message || "Unable to retrieve status.");
    } finally {
      setLoading(false);
    }
  };

  const currentStageIdx = appData ? getStageIndex(appData.status) : -1;

  return (
    <div className="bg-[#F7F3E8] min-h-screen py-16">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B88A2A]">
              CANDIDATE TRACKING PORTAL
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#083526]">
              Track Application Status
            </h1>
            <p className="text-xs sm:text-sm text-[#66716A] font-sans max-w-md mx-auto">
              Enter your Application ID (e.g. SWIS-2026-000001) and registered email to check your recruitment progress.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,71,53,0.06)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#083526] mb-1">
                  Application ID
                </label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="e.g. SWIS-2026-000001"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DEDCCF] rounded-lg text-xs text-[#26332E] focus:outline-none focus:border-[#B88A2A] shadow-xs uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#083526] mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DEDCCF] rounded-lg text-xs text-[#26332E] focus:outline-none focus:border-[#B88A2A] shadow-xs"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <Button
                  type="submit"
                  variant="gold"
                  disabled={loading}
                  className="w-full font-bold text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 bg-[#B88A2A] hover:bg-[#A37820] text-white border border-[#D4B15A]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Application...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Check Application Status</span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Results Display */}
          {appData && (
            <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(15,71,53,0.06)] space-y-8 animate-in fade-in duration-300">
              {/* Profile Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#DEDCCF] gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B88A2A]">
                    Applicant Profile
                  </span>
                  <h2 className="font-serif font-bold text-xl text-[#083526]">
                    {appData.fullName}
                  </h2>
                  <p className="text-xs text-[#66716A] mt-0.5">
                    Position: <strong className="text-[#083526]">{appData.positionTitle}</strong> • ID:{" "}
                    <span className="font-mono text-[#083526] font-bold">
                      {appData.applicationNumber}
                    </span>
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-[#083526] text-[#D4B15A] border border-[#B88A2A]/40 text-xs font-bold uppercase tracking-wider self-start sm:self-auto shadow-xs">
                  {appData.status.replace(/_/g, " ")}
                </div>
              </div>

              {/* Recruitment Pipeline Timeline */}
              <div>
                <h3 className="font-serif font-bold text-base text-[#083526] mb-4">
                  Recruitment Pipeline Progress
                </h3>

                <div className="space-y-4">
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isPassed = currentStageIdx >= idx;
                    const isCurrent = currentStageIdx === idx;
                    const isRejected = appData.status === "REJECTED" && stage.key === "DECISION";
                    const isSelected = appData.status === "SELECTED" && stage.key === "DECISION";

                    return (
                      <div
                        key={stage.key}
                        className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${
                          isCurrent
                            ? "bg-[#E7EDE2] border-[#B88A2A] shadow-xs"
                            : isPassed
                            ? "bg-[#F7F3E8] border-[#DEDCCF]"
                            : "bg-white border-[#DEDCCF] opacity-60"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isRejected
                              ? "bg-red-600 text-white"
                              : isSelected
                              ? "bg-[#0F4735] text-white"
                              : isPassed
                              ? "bg-[#083526] text-[#D4B15A]"
                              : "bg-[#F7F3E8] text-[#66716A]"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>

                        <div className="flex-1">
                          <span
                            className={`text-xs font-bold block ${
                              isCurrent ? "text-[#083526]" : isPassed ? "text-[#26332E]" : "text-[#66716A]"
                            }`}
                          >
                            {stage.label}
                          </span>
                          {isCurrent && (
                            <span className="text-[11px] text-[#B88A2A] font-semibold block">
                              Active Round in Progress
                            </span>
                          )}
                        </div>

                        {isCurrent && (
                          <div className="w-2 h-2 rounded-full bg-[#B88A2A] animate-ping" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scheduled Interview Card (if any) */}
              {appData.interview && (
                <div className="p-6 bg-[#083526] text-white rounded-xl border border-[#B88A2A]/40 shadow-[0_8px_30px_rgba(15,71,53,0.12)] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
                      INTERVIEW SCHEDULE
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0F4735] border border-[#B88A2A]/40 text-[#D4B15A] font-bold">
                      {appData.interview.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#F7F3E8]">
                    <div>
                      <span className="text-[#C9D8C8] block text-[10px] uppercase">Date & Time</span>
                      <span className="font-bold text-white">
                        {new Date(appData.interview.interviewDate).toLocaleDateString("en-IN")} at {appData.interview.interviewTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#C9D8C8] block text-[10px] uppercase">Mode</span>
                      <span className="font-bold text-white">{appData.interview.interviewMode}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[#C9D8C8] block text-[10px] uppercase">Venue / Link</span>
                      <span className="font-bold text-white">
                        {appData.interview.venue || appData.interview.meetingLink || "Main Campus, Wazirganj"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#0F4735] flex flex-wrap gap-2">
                    <Button
                      variant="gold"
                      size="sm"
                      href={`/careers/interview/${appData.interview.confirmationToken}?action=confirm`}
                      className="font-bold text-xs uppercase tracking-wider bg-[#B88A2A] hover:bg-[#A37820] text-white"
                    >
                      Confirm Attendance
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      href={`/careers/interview/${appData.interview.confirmationToken}?action=reschedule`}
                      className="text-xs uppercase tracking-wider border-[#DEDCCF]/40 text-white hover:bg-white/10"
                    >
                      Request Reschedule
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default function StatusTrackerPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center bg-[#F7F3E8]">
          <Loader2 className="w-8 h-8 text-[#B88A2A] animate-spin mx-auto" />
        </div>
      }
    >
      <StatusTrackerInner />
    </Suspense>
  );
}
