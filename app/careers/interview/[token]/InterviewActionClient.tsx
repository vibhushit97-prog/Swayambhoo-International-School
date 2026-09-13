"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Loader2,
  Send,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InterviewData {
  id: string;
  candidateName: string;
  applicationNumber: string;
  positionTitle: string;
  interviewDate: string;
  interviewTime: string;
  interviewMode: string;
  venue: string | null;
  meetingLink: string | null;
  interviewer: string | null;
  status: string;
}

interface Props {
  token: string;
  interview: InterviewData;
}

export function InterviewActionClient({ token, interview }: Props) {
  const [currentStatus, setCurrentStatus] = useState(interview.status);
  const [confirming, setConfirming] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [rescheduling, setRescheduling] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
  }).format(new Date(interview.interviewDate));

  const handleConfirm = async () => {
    setConfirming(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/recruitment/interviews/${token}/confirm`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to confirm interview.");
      }

      setCurrentStatus("CONFIRMED");
      setFeedbackMsg({
        type: "success",
        text: "Thank you! Your interview attendance has been successfully confirmed.",
      });
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message });
    } finally {
      setConfirming(false);
    }
  };

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleReason.trim() || rescheduleReason.length < 10) {
      setFeedbackMsg({
        type: "error",
        text: "Please provide a detailed reason for rescheduling (at least 10 characters).",
      });
      return;
    }

    setRescheduling(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/recruitment/interviews/${token}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rescheduleReason }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit request.");
      }

      setCurrentStatus("RESCHEDULE_REQUESTED");
      setShowRescheduleForm(false);
      setFeedbackMsg({
        type: "success",
        text: "Your request has been submitted to school administration. An updated schedule will be issued shortly.",
      });
    } catch (err: any) {
      setFeedbackMsg({ type: "error", text: err.message });
    } finally {
      setRescheduling(false);
    }
  };

  return (
    <div className="bg-[#FBF9F2] border border-[#DEDCCF] rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(15,71,53,0.06)] space-y-6">
      {/* Status Pill */}
      <div className="flex items-center justify-between pb-4 border-b border-[#DEDCCF]">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#66716A] block tracking-wider">
            Applicant
          </span>
          <span className="font-serif font-bold text-lg text-[#083526]">
            {interview.candidateName}
          </span>
        </div>

        <div
          className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            currentStatus === "CONFIRMED"
              ? "bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8]"
              : currentStatus === "RESCHEDULE_REQUESTED"
              ? "bg-[#EFE2BC] text-[#856627] border border-[#D4B15A]"
              : "bg-[#083526] text-[#D4B15A] border border-[#B88A2A]/40"
          }`}
        >
          {currentStatus.replace(/_/g, " ")}
        </div>
      </div>

      {/* Schedule Box */}
      <div className="bg-[#083526] text-white p-6 rounded-xl border border-[#B88A2A]/30 shadow-[0_8px_30px_rgba(15,71,53,0.1)] space-y-4">
        <h3 className="font-serif font-bold text-base text-[#D4B15A] border-b border-[#0F4735] pb-2">
          Interview Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#F7F3E8]">
          <div>
            <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
              Position
            </span>
            <span className="font-bold text-white text-sm">{interview.positionTitle}</span>
          </div>

          <div>
            <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
              Application ID
            </span>
            <span className="font-mono font-bold text-white">{interview.applicationNumber}</span>
          </div>

          <div>
            <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
              Date & Time
            </span>
            <span className="font-bold text-[#D4B15A]">
              {formattedDate} at {interview.interviewTime}
            </span>
          </div>

          <div>
            <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
              Interview Mode
            </span>
            <span className="font-bold text-white">{interview.interviewMode}</span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
              Venue / Meeting Link
            </span>
            <span className="font-medium text-white">
              {interview.venue || interview.meetingLink || "Main Campus, Swayambhoo International School"}
            </span>
          </div>

          {interview.interviewer && (
            <div className="sm:col-span-2">
              <span className="text-[#C9D8C8] block text-[10px] uppercase font-bold">
                Interviewer Panel
              </span>
              <span className="font-medium text-white">{interview.interviewer}</span>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Alert */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2.5 ${
            feedbackMsg.type === "success"
              ? "bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8]"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {feedbackMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-[#0F4735] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Interactive Actions if not already resolved */}
      {currentStatus === "SCHEDULED" && !showRescheduleForm && (
        <div className="space-y-4 pt-2">
          <p className="text-xs text-[#66716A] leading-relaxed">
            Please confirm your availability so the interview panel can prepare your diagnostic materials.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={confirming}
              onClick={handleConfirm}
              className="flex-1 py-3 px-6 bg-[#B88A2A] hover:bg-[#A37820] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {confirming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Interview</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowRescheduleForm(true)}
              className="py-3 px-6 bg-white hover:bg-[#E7EDE2]/40 text-[#26332E] border border-[#DEDCCF] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
            >
              Request Reschedule
            </button>
          </div>
        </div>
      )}

      {/* Reschedule Request Form */}
      {showRescheduleForm && (
        <form onSubmit={handleRescheduleSubmit} className="space-y-4 pt-4 border-t border-[#DEDCCF]">
          <h4 className="font-serif font-bold text-sm text-[#083526]">
            Request Alternate Interview Schedule
          </h4>
          <p className="text-xs text-[#66716A]">
            Please describe why you are unable to attend on this date/time and mention your alternate preferred availability.
          </p>

          <textarea
            rows={3}
            value={rescheduleReason}
            onChange={(e) => setRescheduleReason(e.target.value)}
            placeholder="e.g. Due to prior examination duty, I request to reschedule to Friday afternoon or Saturday..."
            className="w-full px-3.5 py-2.5 bg-white border border-[#DEDCCF] rounded-lg text-xs text-[#26332E] focus:outline-none focus:border-[#B88A2A]"
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={rescheduling}
              className="px-6 py-2.5 bg-[#083526] hover:bg-[#0F4735] text-[#D4B15A] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {rescheduling ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reschedule Request</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowRescheduleForm(false)}
              className="px-4 py-2.5 text-xs text-[#66716A] hover:text-[#26332E]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Already Confirmed Banner */}
      {currentStatus === "CONFIRMED" && (
        <div className="p-4 rounded-xl bg-[#E7EDE2] border border-[#C9D8C8] text-xs text-[#0F4735] space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#0F4735]" />
            <span>Attendance Officially Confirmed</span>
          </p>
          <p className="text-[11px] text-[#2D654E]">
            Our recruitment coordinator and panel have been notified. Please be available 10 minutes prior to scheduled time.
          </p>
        </div>
      )}

      {/* Reschedule Requested Banner */}
      {currentStatus === "RESCHEDULE_REQUESTED" && (
        <div className="p-4 rounded-xl bg-[#EFE2BC]/50 border border-[#D4B15A] text-xs text-[#856627] space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B88A2A]" />
            <span>Reschedule Request Under Review</span>
          </p>
          <p className="text-[11px] text-[#856627]">
            Administration has received your request. An updated invitation with revised timings will be dispatched shortly.
          </p>
        </div>
      )}
    </div>
  );
}
