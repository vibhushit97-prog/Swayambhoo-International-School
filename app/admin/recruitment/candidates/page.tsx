"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserCheck, Search, Award, Eye, GraduationCap, Loader2, Download } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function TalentPoolCandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTalentPool = async () => {
    try {
      const res = await fetch("/api/admin/recruitment/applications?limit=100");
      const data = await res.json();
      if (data.success) {
        // Filter candidates in Shortlisted, Interviewed, or Selected status
        const filtered = (data.applications || []).filter((app: any) =>
          ["SHORTLISTED", "INTERVIEW_SCHEDULED", "INTERVIEW_CONFIRMED", "INTERVIEW_COMPLETED", "SELECTED"].includes(
            app.status
          )
        );
        setCandidates(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalentPool();
  }, []);

  const displayed = candidates.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.applicationNumber.toLowerCase().includes(q) ||
      c.skills?.some((s: any) => s.skillName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-stone-900">
            Candidate Talent Pool & Shortlist
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Profiles in active pipeline: Shortlisted, Interview Stage, or Selected for Appointment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates..."
            className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-7 h-7 animate-spin text-[#C5A059] mx-auto" />
          <span className="text-xs text-stone-500 mt-2 block">Loading talent pool...</span>
        </div>
      ) : displayed.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-stone-200 text-xs text-stone-500">
          No candidates in shortlisted or selected stage currently.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-stone-400 font-bold block">
                      {candidate.applicationNumber}
                    </span>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      {candidate.fullName}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {candidate.position?.title || candidate.otherPosition || "Faculty"}
                    </p>
                  </div>
                  <StatusBadge status={candidate.status} type="recruitment" />
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {candidate.skills?.slice(0, 3).map((s: any) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px]"
                    >
                      {s.skillName}
                    </span>
                  ))}
                  {candidate.skills?.length > 3 && (
                    <span className="text-[10px] text-stone-400">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="text-xs text-stone-600 space-y-1 pt-1 border-t border-stone-100">
                  <p>
                    Experience:{" "}
                    <strong>
                      {candidate.totalExperienceYears === 0
                        ? "Fresher"
                        : `${candidate.totalExperienceYears} Years`}
                    </strong>
                  </p>
                  <p className="truncate">Email: {candidate.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400">
                  {new Date(candidate.createdAt).toLocaleDateString("en-IN")}
                </span>
                <Link
                  href={`/admin/recruitment/applications/${candidate.id}`}
                  className="px-3 py-1 bg-[#14342B] text-[#C5A059] hover:bg-[#1E4D40] text-xs font-bold rounded transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
