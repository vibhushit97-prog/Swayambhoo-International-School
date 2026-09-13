"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Languages,
  FileText,
  Clock,
  Calendar,
  MessageSquare,
  Mail,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Download,
  Plus,
  Send,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface ApplicationDetail {
  id: string;
  applicationNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender: string | null;
  email: string;
  mobile: string;
  whatsapp: string | null;
  address: string;
  city: string | null;
  state: string | null;
  pincode: string | null;
  profilePhoto: string | null;
  position?: { id: string; title: string; department: string } | null;
  otherPosition: string | null;
  subject: string | null;
  preferredClasses: string | null;
  employmentType: string;
  expectedSalary: string | null;
  currentSalary: string | null;
  noticePeriod: string | null;
  willingToRelocate: boolean;
  totalExperienceYears: number;
  personalStatement: string | null;
  teachingPhilosophy: string | null;
  status: string;
  createdAt: string;
  educationRecords: Array<{
    id: string;
    qualification: string;
    otherQualification: string | null;
    institution: string;
    boardOrUniversity: string;
    year: number;
    percentageOrCgpa: string;
    specialization: string | null;
  }>;
  experienceRecords: Array<{
    id: string;
    institution: string;
    designation: string;
    subject: string | null;
    classesTaught: string | null;
    startDate: string;
    endDate: string | null;
    currentlyWorking: boolean;
    responsibilities: string | null;
  }>;
  skills: Array<{ id: string; skillName: string }>;
  languages: Array<{ id: string; language: string; proficiency: string }>;
  documents: Array<{
    id: string;
    documentType: string;
    filename: string;
    storageKey: string;
    mimeType: string;
    fileSize: number;
  }>;
  statusHistory: Array<{
    id: string;
    previousStatus: string | null;
    newStatus: string;
    changedBy: string | null;
    reason: string | null;
    createdAt: string;
  }>;
  interviews: Array<{
    id: string;
    interviewDate: string;
    interviewTime: string;
    interviewMode: string;
    venue: string | null;
    meetingLink: string | null;
    interviewer: string | null;
    status: string;
    rescheduleReason: string | null;
    createdAt: string;
    statusHistory: Array<{
      newStatus: string;
      changedBy: string | null;
      notes: string | null;
      createdAt: string;
    }>;
  }>;
  adminNotes: Array<{
    id: string;
    adminName: string;
    content: string;
    createdAt: string;
  }>;
  emailNotifications: Array<{
    id: string;
    subject: string;
    recipient: string;
    emailType: string;
    status: string;
    attemptCount: number;
    errorMessage: string | null;
    createdAt: string;
  }>;
}

export default function CandidateProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State for Schedule Interview
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewForm, setInterviewForm] = useState({
    interviewDate: "",
    interviewTime: "11:00 AM",
    interviewMode: "School Campus" as "School Campus" | "Google Meet" | "Zoom" | "Phone",
    venue: "Main Campus, Swayambhoo International School, Wazirganj, Gaya",
    meetingLink: "",
    interviewer: "Recruitment Panel & Principal",
    additionalInstructions: "Please arrive 10 minutes before the scheduled time with original certificates.",
  });

  // Note State
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const fetchCandidate = async () => {
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}`);
      const data = await res.json();
      if (data.success) {
        setApplication(data.application);
      } else {
        setMessage({ type: "error", text: data.message || "Failed to load candidate" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error loading profile." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  // Shortlist Candidate
  const handleShortlist = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}/shortlist`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        fetchCandidate();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // Status Change
  const handleStatusChange = async (newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        fetchCandidate();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // Schedule Interview
  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewForm),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setShowInterviewModal(false);
        fetchCandidate();
      } else {
        setMessage({ type: "error", text: data.message || "Failed to schedule interview" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // Add Internal HR Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    setAddingNote(true);
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent }),
      });
      const data = await res.json();
      if (data.success) {
        setNoteContent("");
        fetchCandidate();
      }
    } catch (err: any) {
      alert("Failed to add note: " + err.message);
    } finally {
      setAddingNote(false);
    }
  };

  // Retry Email
  const handleRetryEmail = async (emailId: string) => {
    try {
      const res = await fetch(`/api/admin/recruitment/emails/${emailId}/retry`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        alert("Email retried successfully!");
        fetchCandidate();
      } else {
        alert("Retry error: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C5A059] mx-auto" />
        <p className="text-xs text-stone-500 mt-2">Loading candidate profile...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-stone-200">
        <p className="text-sm text-stone-700">Application not found.</p>
        <Link
          href="/admin/recruitment/applications"
          className="text-xs text-[#C5A059] underline font-bold mt-2 inline-block"
        >
          Return to applications list
        </Link>
      </div>
    );
  }

  const posTitle = application.position?.title || application.otherPosition || "Faculty Role";

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/recruitment/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </Link>

        <span className="font-mono text-xs font-bold text-stone-500">
          ID: {application.applicationNumber}
        </span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif font-bold text-2xl text-stone-900">
                {application.fullName}
              </h1>
              <StatusBadge status={application.status} type="recruitment" />
            </div>

            <p className="text-xs text-stone-500 mt-1">
              Position: <strong className="text-stone-800">{posTitle}</strong> • Applied:{" "}
              {new Date(application.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {application.status !== "SHORTLISTED" && (
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleShortlist}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Shortlist Candidate
              </button>
            )}

            <button
              type="button"
              disabled={actionLoading}
              onClick={() => setShowInterviewModal(true)}
              className="px-4 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>

            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-800 focus:outline-none focus:border-[#C5A059]"
            >
              <option value="NEW">Status: New</option>
              <option value="UNDER_REVIEW">Status: Under Review</option>
              <option value="SHORTLISTED">Status: Shortlisted</option>
              <option value="INTERVIEW_SCHEDULED">Status: Interview Scheduled</option>
              <option value="INTERVIEW_CONFIRMED">Status: Interview Confirmed</option>
              <option value="INTERVIEW_COMPLETED">Status: Interview Completed</option>
              <option value="SELECTED">Status: Selected</option>
              <option value="REJECTED">Status: Rejected</option>
            </select>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg text-xs font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Mobile</span>
            <span className="font-semibold text-stone-900">{application.mobile}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Email</span>
            <span className="font-semibold text-stone-900">{application.email}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Experience</span>
            <span className="font-semibold text-stone-900">
              {application.totalExperienceYears === 0
                ? "Fresher"
                : `${application.totalExperienceYears} Years`}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Location</span>
            <span className="font-semibold text-stone-900">
              {application.city || "Gaya"}, {application.state || "Bihar"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Credentials & Submissions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Skills & Languages */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Candidate Skills & Languages</span>
            </h2>

            {/* Skills Chips */}
            <div>
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                Specialized Skills:
              </span>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-[#14342B] text-[#FDFBF7] text-xs font-semibold rounded-full border border-[#C5A059]/40 shadow-xs"
                  >
                    {skill.skillName}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
                Languages:
              </span>
              <div className="flex flex-wrap gap-3">
                {application.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="px-3 py-1 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-stone-800"
                  >
                    <strong>{lang.language}</strong> — {lang.proficiency}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Education */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#C5A059]" />
              <span>Educational Qualifications ({application.educationRecords.length})</span>
            </h2>

            <div className="space-y-3">
              {application.educationRecords.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">
                      {edu.qualification}
                      {edu.otherQualification && ` (${edu.otherQualification})`}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {edu.institution} • {edu.boardOrUniversity}
                    </p>
                    {edu.specialization && (
                      <p className="text-[11px] text-stone-500">Specialization: {edu.specialization}</p>
                    )}
                  </div>
                  <div className="text-right sm:self-center">
                    <span className="font-bold text-xs text-[#856627] block">
                      {edu.percentageOrCgpa}
                    </span>
                    <span className="text-[11px] text-stone-400">Class of {edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Teaching Experience */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#C5A059]" />
              <span>Teaching Experience ({application.experienceRecords.length} records)</span>
            </h2>

            {application.experienceRecords.length === 0 ? (
              <p className="text-xs text-stone-500 italic">Candidate registered as Fresher.</p>
            ) : (
              <div className="space-y-3">
                {application.experienceRecords.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-stone-900">{exp.designation}</h3>
                        <p className="text-xs text-stone-600 font-medium">{exp.institution}</p>
                      </div>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {new Date(exp.startDate).toLocaleDateString("en-IN")} —{" "}
                        {exp.currentlyWorking
                          ? "Present"
                          : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </span>
                    </div>

                    {(exp.subject || exp.classesTaught) && (
                      <p className="text-xs text-stone-600">
                        {exp.subject && <span>Subject: <strong>{exp.subject}</strong></span>}{" "}
                        {exp.classesTaught && <span>• Classes: <strong>{exp.classesTaught}</strong></span>}
                      </p>
                    )}

                    {exp.responsibilities && (
                      <p className="text-xs text-stone-500 font-sans leading-relaxed border-t border-stone-200/60 pt-2">
                        {exp.responsibilities}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Statements & Philosophy */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <h2 className="font-serif font-bold text-base text-stone-900">
              Personal Statements & Philosophy
            </h2>

            {application.personalStatement && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Why join Swayambhoo International School?
                </span>
                <p className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 leading-relaxed font-sans whitespace-pre-line">
                  {application.personalStatement}
                </p>
              </div>
            )}

            {application.teachingPhilosophy && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Teaching Philosophy:
                </span>
                <p className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 leading-relaxed font-sans whitespace-pre-line">
                  {application.teachingPhilosophy}
                </p>
              </div>
            )}

            {/* Position Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Notice Period</span>
                <span className="font-semibold text-stone-900">{application.noticePeriod || "Immediate"}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Current CTC</span>
                <span className="font-semibold text-stone-900">{application.currentSalary || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-bold">Expected CTC</span>
                <span className="font-semibold text-stone-900">{application.expectedSalary || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Section 5: Documents Attached */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C5A059]" />
              <span>Attached Documents ({application.documents.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {application.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="truncate max-w-[200px]">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block truncate">
                      {doc.documentType}
                    </span>
                    <span className="font-semibold text-stone-900 block truncate">
                      {doc.filename}
                    </span>
                  </div>

                  <a
                    href={`/api/admin/recruitment/applications/${application.id}/documents/${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#14342B] hover:text-[#C5A059] hover:bg-stone-100 rounded-md transition-colors shrink-0"
                    title="View Secure Document"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Admin Workflows, Interviews, Notes & Audit */}
        <div className="space-y-8">
          {/* Interview History & Schedule */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <span>Interviews ({application.interviews.length})</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowInterviewModal(true)}
                className="text-xs font-bold text-[#14342B] hover:text-[#C5A059]"
              >
                + Schedule
              </button>
            </div>

            {application.interviews.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No interview scheduled yet.</p>
            ) : (
              <div className="space-y-3">
                {application.interviews.map((intv) => (
                  <div
                    key={intv.id}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">
                        {new Date(intv.interviewDate).toLocaleDateString("en-IN")} at {intv.interviewTime}
                      </span>
                      <StatusBadge status={intv.status} type="interview" />
                    </div>

                    <p className="text-stone-600 text-[11px]">
                      Mode: <strong>{intv.interviewMode}</strong> • Interviewer: {intv.interviewer}
                    </p>

                    {intv.rescheduleReason && (
                      <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900">
                        <strong>Candidate Reschedule Note:</strong> {intv.rescheduleReason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Internal HR Notes (NEVER VISIBLE TO CANDIDATES) */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#C5A059]" />
              <span>Private HR Notes</span>
            </h2>
            <p className="text-[11px] text-stone-400">
              Confidential to HR administrators. Never visible to applicants.
            </p>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Add confidential evaluation, salary notes, interview feedback..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                disabled={addingNote}
                className="px-3.5 py-1.5 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs disabled:opacity-50"
              >
                {addingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                <span>Add Note</span>
              </button>
            </form>

            <div className="space-y-2.5 pt-2 max-h-60 overflow-y-auto">
              {application.adminNotes.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No notes added yet.</p>
              ) : (
                application.adminNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs">
                    <p className="text-stone-800 leading-relaxed font-sans">{note.content}</p>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5">
                      <span>{note.adminName}</span>
                      <span>{new Date(note.createdAt).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Outbound Email History with Retry */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#C5A059]" />
              <span>Email Dispatch History</span>
            </h2>

            <div className="space-y-2.5">
              {application.emailNotifications.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No email logs found.</p>
              ) : (
                application.emailNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-800 truncate max-w-[170px]">
                        {notif.emailType.replace(/_/g, " ")}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          notif.status === "SENT"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {notif.status === "SENT" ? "✓ Sent" : "✕ Failed"}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-500 truncate">{notif.subject}</p>

                    {notif.status === "FAILED" && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-red-600 truncate max-w-[140px]">
                          {notif.errorMessage}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRetryEmail(notif.id)}
                          className="px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-[10px] font-semibold text-stone-800 flex items-center gap-1 transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry Email</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Audit Trail History */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C5A059]" />
              <span>Status Audit Log</span>
            </h2>

            <div className="space-y-3">
              {application.statusHistory.map((hist) => (
                <div key={hist.id} className="text-xs border-l-2 border-[#C5A059] pl-3 py-0.5 space-y-0.5">
                  <div className="font-bold text-stone-900">{hist.newStatus.replace(/_/g, " ")}</div>
                  {hist.reason && <div className="text-stone-500 text-[11px]">{hist.reason}</div>}
                  <div className="text-[10px] text-stone-400">
                    By {hist.changedBy || "System"} • {new Date(hist.createdAt).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#14342B]">
                Schedule Interview & Send Invitation
              </h3>
              <button
                type="button"
                onClick={() => setShowInterviewModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Interview Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={interviewForm.interviewDate}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, interviewDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Interview Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={interviewForm.interviewTime}
                    onChange={(e) =>
                      setInterviewForm({ ...interviewForm, interviewTime: e.target.value })
                    }
                    placeholder="e.g. 11:00 AM"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Interview Mode <span className="text-red-500">*</span>
                </label>
                <select
                  value={interviewForm.interviewMode}
                  onChange={(e) =>
                    setInterviewForm({
                      ...interviewForm,
                      interviewMode: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                >
                  <option value="School Campus">School Campus</option>
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Venue / Meeting Link
                </label>
                <input
                  type="text"
                  value={interviewForm.venue || interviewForm.meetingLink}
                  onChange={(e) =>
                    setInterviewForm({
                      ...interviewForm,
                      venue: e.target.value,
                      meetingLink: e.target.value,
                    })
                  }
                  placeholder="e.g. Principal Office / https://meet.google.com/xyz"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Interviewer / Panel Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={interviewForm.interviewer}
                  onChange={(e) =>
                    setInterviewForm({ ...interviewForm, interviewer: e.target.value })
                  }
                  placeholder="e.g. Academic Committee & Principal"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Additional Instructions
                </label>
                <textarea
                  rows={2}
                  value={interviewForm.additionalInstructions}
                  onChange={(e) =>
                    setInterviewForm({ ...interviewForm, additionalInstructions: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2.5 bg-[#C5A059] hover:bg-[#A27F35] text-[#0E241B] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                >
                  {actionLoading ? "Scheduling & Dispatching..." : "Schedule & Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
