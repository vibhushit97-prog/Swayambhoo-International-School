"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface ApplicationItem {
  id: string;
  applicationNumber: string;
  fullName: string;
  email: string;
  mobile: string;
  totalExperienceYears: number;
  status: string;
  createdAt: string;
  position?: { id: string; title: string; department: string } | null;
  otherPosition?: string | null;
  skills: Array<{ id: string; skillName: string }>;
  educationRecords: Array<{ qualification: string; institution: string; percentageOrCgpa: string }>;
  interviews: Array<{
    id: string;
    interviewDate: string;
    interviewTime: string;
    interviewMode: string;
    status: string;
  }>;
}

export default function AdminApplicationsTablePage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", "15");

      const res = await fetch(`/api/admin/recruitment/applications?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setApplications(data.applications || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchApplications();
  };

  const handleQuickStatusChange = async (id: string, newStatus: string) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/recruitment/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, reason: `Quick updated from table to ${newStatus}` }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-stone-900">
            Teacher Applications Registry
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Total {totalCount} applications matching search & filters.
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
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, mobile, or skill (e.g. AI, Vedic)..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:border-[#C5A059] shadow-xs"
          />
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:border-[#C5A059]"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New (Unreviewed)</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="INTERVIEW_CONFIRMED">Interview Confirmed</option>
            <option value="RESCHEDULE_REQUESTED">Reschedule Requested</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="w-7 h-7 animate-spin text-[#C5A059] mx-auto" />
            <span className="text-xs text-stone-500 mt-2 block">Loading applications...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-16 text-center text-xs text-stone-500">
            No applications found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Application ID</th>
                  <th className="py-3 px-4">Candidate Details</th>
                  <th className="py-3 px-4">Role Applied</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Top Qualifications</th>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Interview</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {applications.map((app) => {
                  const posTitle = app.position?.title || app.otherPosition || "Faculty Role";
                  const latestInterview = app.interviews[0];

                  return (
                    <tr key={app.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                        {app.applicationNumber}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{app.fullName}</div>
                        <div className="text-[11px] text-stone-400">{app.email}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{app.mobile}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-900 block">{posTitle}</span>
                        {app.position?.department && (
                          <span className="text-[10px] text-stone-400 block">
                            {app.position.department}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-medium text-stone-800">
                          {app.totalExperienceYears === 0
                            ? "Fresher"
                            : `${app.totalExperienceYears} Yrs`}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 max-w-[180px]">
                          {app.educationRecords.map((edu, eIdx) => (
                            <div key={eIdx} className="text-[11px] text-stone-700 truncate">
                              <strong>{edu.qualification}</strong> ({edu.percentageOrCgpa})
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {app.skills.slice(0, 3).map((s) => (
                            <span
                              key={s.id}
                              className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]"
                            >
                              {s.skillName}
                            </span>
                          ))}
                          {app.skills.length > 3 && (
                            <span className="text-[10px] text-stone-400">
                              +{app.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={app.status} type="recruitment" />
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {latestInterview ? (
                          <div>
                            <span className="text-[11px] font-bold text-stone-800 block">
                              {new Date(latestInterview.interviewDate).toLocaleDateString("en-IN")}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              {latestInterview.interviewTime} ({latestInterview.interviewMode})
                            </span>
                          </div>
                        ) : (
                          <span className="text-stone-400 text-[11px] italic">None</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/recruitment/applications/${app.id}`}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                            title="View Full Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {app.status === "NEW" && (
                            <button
                              type="button"
                              disabled={actionLoadingId === app.id}
                              onClick={() => handleQuickStatusChange(app.id, "SHORTLISTED")}
                              className="px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] font-bold uppercase hover:bg-amber-100 transition-colors"
                              title="Shortlist candidate"
                            >
                              Shortlist
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong> ({totalCount} total entries)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded border border-stone-200 hover:bg-stone-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded border border-stone-200 hover:bg-stone-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
