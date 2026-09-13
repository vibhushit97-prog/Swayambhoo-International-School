"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  ArrowRight,
  Send,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface InterviewRecord {
  id: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  venue: string | null;
  meetingLink: string | null;
  interviewer: string | null;
  status: string;
  rescheduleReason: string | null;
  application: {
    id: string;
    applicationNumber: string;
    fullName: string;
    email: string;
    mobile: string;
    position?: { title: string } | null;
    otherPosition: string | null;
  };
}

export default function AdminInterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForReschedule, setSelectedForReschedule] = useState<InterviewRecord | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    interviewDate: "",
    interviewTime: "11:00 AM",
    interviewMode: "School Campus" as any,
    venue: "Main Campus, Swayambhoo International School",
    interviewer: "Recruitment Panel",
    additionalInstructions: "Rescheduled as per discussion.",
  });
  const [saving, setSaving] = useState(false);

  const fetchInterviews = async () => {
    try {
      const res = await fetch("/api/admin/recruitment/applications?limit=100");
      const data = await res.json();
      if (data.success) {
        const allInterviews: InterviewRecord[] = [];
        for (const app of data.applications || []) {
          for (const intv of app.interviews || []) {
            allInterviews.push({
              ...intv,
              application: {
                id: app.id,
                applicationNumber: app.applicationNumber,
                fullName: app.fullName,
                email: app.email,
                mobile: app.mobile,
                position: app.position,
                otherPosition: app.otherPosition,
              },
            });
          }
        }
        allInterviews.sort(
          (a, b) => new Date(b.interviewDate).getTime() - new Date(a.interviewDate).getTime()
        );
        setInterviews(allInterviews);
      }
    } catch (err) {
      console.error("Failed to load interviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForReschedule) return;

    setSaving(true);
    try {
      const res = await fetch(
        `/api/admin/recruitment/applications/${selectedForReschedule.application.id}/interview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rescheduleForm),
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("New interview schedule dispatched to candidate!");
        setSelectedForReschedule(null);
        fetchInterviews();
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-stone-900">
            Interview Rounds & Schedules
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor candidate confirmations, reschedule requests, and active panel assignments.
          </p>
        </div>

        <Link
          href="/admin/recruitment/applications"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold rounded-lg transition-colors shadow-xs"
        >
          <span>View All Candidates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Interviews */}
      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-7 h-7 animate-spin text-[#C5A059] mx-auto" />
          <span className="text-xs text-stone-500 mt-2 block">Loading interviews...</span>
        </div>
      ) : interviews.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-stone-200 text-xs text-stone-500">
          No interview rounds have been scheduled yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviews.map((intv) => {
            const pos =
              intv.application.position?.title ||
              intv.application.otherPosition ||
              "Faculty Position";

            return (
              <div
                key={intv.id}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-400 block">
                        {intv.application.applicationNumber}
                      </span>
                      <h3 className="font-serif font-bold text-base text-stone-900">
                        {intv.application.fullName}
                      </h3>
                      <p className="text-xs text-stone-500">{pos}</p>
                    </div>

                    <StatusBadge status={intv.status} type="interview" />
                  </div>

                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold uppercase">Date & Time</span>
                      <span className="font-bold text-stone-800">
                        {new Date(intv.interviewDate).toLocaleDateString("en-IN")} at {intv.interviewTime}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold uppercase">Mode</span>
                      <span className="font-semibold text-stone-800">{intv.interviewMode}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="text-[10px] text-stone-400 block font-bold uppercase">Venue / Link</span>
                      <span className="text-stone-700 font-medium truncate block">
                        {intv.venue || intv.meetingLink || "Main Campus"}
                      </span>
                    </div>
                  </div>

                  {intv.rescheduleReason && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                      <strong className="block mb-0.5">Reschedule Request Received:</strong>
                      <span>&ldquo;{intv.rescheduleReason}&rdquo;</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/admin/recruitment/applications/${intv.application.id}`}
                    className="text-xs font-bold text-[#14342B] hover:text-[#C5A059]"
                  >
                    View Full Profile →
                  </Link>

                  {intv.status === "RESCHEDULE_REQUESTED" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedForReschedule(intv);
                        setRescheduleForm((prev) => ({
                          ...prev,
                          interviewer: intv.interviewer || prev.interviewer,
                        }));
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-bold shadow-xs transition-colors"
                    >
                      Reschedule Interview
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {selectedForReschedule && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200">
            <h3 className="font-serif font-bold text-lg text-[#14342B]">
              Reschedule Interview for {selectedForReschedule.application.fullName}
            </h3>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleForm.interviewDate}
                  onChange={(e) =>
                    setRescheduleForm({ ...rescheduleForm, interviewDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">New Time</label>
                <input
                  type="text"
                  required
                  value={rescheduleForm.interviewTime}
                  onChange={(e) =>
                    setRescheduleForm({ ...rescheduleForm, interviewTime: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedForReschedule(null)}
                  className="px-4 py-2 text-stone-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#C5A059] text-[#0E241B] font-bold rounded-lg"
                >
                  {saving ? "Updating..." : "Send New Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
