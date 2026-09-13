"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  UserCheck,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface DashboardData {
  counts: Record<string, number>;
  recentApplications: Array<{
    id: string;
    applicationNumber: string;
    fullName: string;
    email: string;
    mobile: string;
    status: string;
    createdAt: string;
    position?: { title: string; department: string } | null;
    otherPosition?: string | null;
    totalExperienceYears: number;
    skills: Array<{ skillName: string }>;
  }>;
}

export default function RecruitmentDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/recruitment/applications?limit=6");
        const json = await res.json();
        if (json.success) {
          setData({
            counts: json.counts || {},
            recentApplications: json.applications || [],
          });
        }
      } catch (err) {
        console.error("Failed to load recruitment dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const counts = data?.counts || {
    TOTAL: 0,
    NEW: 0,
    UNDER_REVIEW: 0,
    SHORTLISTED: 0,
    INTERVIEW_SCHEDULED: 0,
    INTERVIEW_CONFIRMED: 0,
    RESCHEDULE_REQUESTED: 0,
    SELECTED: 0,
    REJECTED: 0,
  };

  const totalInterviews = (counts.INTERVIEW_SCHEDULED || 0) + (counts.INTERVIEW_CONFIRMED || 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">
            Recruitment & Faculty Pipeline
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-sans">
            Oversee teacher applications, screening, interview scheduling, and hiring decisions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/api/admin/recruitment/export"
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export CSV</span>
          </a>

          <Link
            href="/admin/recruitment/positions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Manage Vacancies</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: "Total Applications", count: counts.TOTAL || 0, color: "text-stone-900", bg: "bg-white", border: "border-stone-200" },
          { label: "New Unreviewed", count: counts.NEW || 0, color: "text-blue-700", bg: "bg-blue-50/40", border: "border-blue-200" },
          { label: "Under Review", count: counts.UNDER_REVIEW || 0, color: "text-indigo-700", bg: "bg-indigo-50/40", border: "border-indigo-200" },
          { label: "Shortlisted", count: counts.SHORTLISTED || 0, color: "text-amber-800", bg: "bg-amber-50/40", border: "border-amber-200" },
          { label: "Interviews Active", count: totalInterviews, color: "text-purple-700", bg: "bg-purple-50/40", border: "border-purple-200" },
          { label: "Selected", count: counts.SELECTED || 0, color: "text-emerald-700", bg: "bg-emerald-50/40", border: "border-emerald-200" },
          { label: "Rejected", count: counts.REJECTED || 0, color: "text-stone-600", bg: "bg-stone-50", border: "border-stone-200" },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border ${card.border} ${card.bg} shadow-xs flex flex-col justify-between`}
          >
            <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
              {card.label}
            </span>
            <div className={`text-2xl font-serif font-bold mt-2 ${card.color}`}>
              {loading ? "-" : card.count}
            </div>
          </div>
        ))}
      </div>

      {/* Reschedule Alert if any */}
      {(counts.RESCHEDULE_REQUESTED || 0) > 0 && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between gap-3 text-xs text-orange-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
            <span>
              <strong>{counts.RESCHEDULE_REQUESTED} Candidate(s)</strong> have requested an alternate interview schedule.
            </span>
          </div>
          <Link
            href="/admin/recruitment/interviews"
            className="font-bold underline hover:text-orange-950 whitespace-nowrap"
          >
            Review Requests →
          </Link>
        </div>
      )}

      {/* Recent Applications Table */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-stone-900">
              Recent Teacher Submissions
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Latest applications received across academic and co-curricular departments.
            </p>
          </div>

          <Link
            href="/admin/recruitment/applications"
            className="text-xs font-bold text-[#14342B] hover:text-[#C5A059] transition-colors flex items-center gap-1"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-[#C5A059] mx-auto" />
            <span className="text-xs text-stone-500 mt-2 block">Loading applications...</span>
          </div>
        ) : (data?.recentApplications || []).length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No applications submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Key Skills</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {data?.recentApplications.map((app) => {
                  const posTitle = app.position?.title || app.otherPosition || "Faculty Role";
                  return (
                    <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-stone-800">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">{app.fullName}</div>
                        <div className="text-[11px] text-stone-400">{app.email}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-800">
                        {posTitle}
                      </td>
                      <td className="py-3 px-4 text-stone-600">
                        {app.totalExperienceYears === 0
                          ? "Fresher"
                          : `${app.totalExperienceYears} Yrs`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {app.skills.slice(0, 2).map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] truncate"
                            >
                              {s.skillName}
                            </span>
                          ))}
                          {app.skills.length > 2 && (
                            <span className="text-[10px] text-stone-400">
                              +{app.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={app.status} type="recruitment" />
                      </td>
                      <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/recruitment/applications/${app.id}`}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-[#14342B] hover:text-[#C5A059] text-stone-800 font-semibold rounded text-[11px] transition-colors inline-block"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
