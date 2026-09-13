"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  code: string | null;
  department: string;
  subjects: string[];
  minQualification: string;
  minExperience: number;
  vacancies: number;
  employmentType: string;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  deadline: string | null;
}

export default function PositionsPage() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");

  useEffect(() => {
    async function loadPositions() {
      try {
        const res = await fetch("/api/recruitment/positions");
        const data = await res.json();
        if (data.success) {
          setPositions(data.positions || []);
        }
      } catch (err) {
        console.error("Failed to load positions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPositions();
  }, []);

  const departments = [
    "ALL",
    ...Array.from(new Set(positions.map((p) => p.department).filter(Boolean))),
  ];

  const filtered = positions.filter((pos) => {
    const matchesDept = selectedDept === "ALL" || pos.department === selectedDept;
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      pos.title.toLowerCase().includes(query) ||
      pos.department.toLowerCase().includes(query) ||
      pos.minQualification.toLowerCase().includes(query) ||
      pos.subjects.some((s) => s.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-[#F7F3E8] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-[#083526] text-[#F7F3E8] pt-20 pb-16 border-b-2 border-[#B88A2A]">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4B15A]">
              CAREERS & RECRUITMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#FFFFFF] mt-2">
              Open Teaching & Staff Vacancies
            </h1>
            <p className="text-sm text-[#F7F3E8] font-sans mt-2 leading-relaxed">
              Explore open positions for the 2026–2027 academic session at Swayambhoo International School. Click Apply on any position to start your application.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-[#E7EDE2] border-b border-[#C9D8C8]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#66716A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by subject, title, qualification..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DEDCCF] rounded-lg text-xs text-[#26332E] focus:outline-none focus:border-[#0F4735] shadow-xs"
              />
            </div>

            {/* Department tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedDept === dept
                      ? "bg-[#0F4735] text-[#D4B15A] border border-[#B88A2A]/50 font-bold shadow-xs"
                      : "bg-white text-[#26332E] border border-[#DEDCCF] hover:border-[#B88A2A]"
                  }`}
                >
                  {dept === "ALL" ? "All Departments" : dept}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Positions Grid */}
      <Container className="pt-12">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-[#B88A2A] animate-spin mx-auto" />
            <p className="text-xs text-[#66716A] mt-2">Loading current vacancies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#DEDCCF] p-8 max-w-lg mx-auto">
            <Briefcase className="w-10 h-10 text-[#66716A] mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#0F4735]">
              No Vacancies Found
            </h3>
            <p className="text-xs text-[#66716A] mt-1.5 leading-relaxed font-sans">
              No open positions match your search criteria. You can submit an open application and specify your desired position manually.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedDept("ALL");
                }}
              >
                Clear Filters
              </Button>
              <Button variant="gold" size="sm" href="/careers/apply">
                Submit Open Application
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map((pos) => (
              <div
                key={pos.id}
                className="bg-white border border-[#DEDCCF] p-7 flex flex-col justify-between hover:border-[#B88A2A] transition-all hover:shadow-md group"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8]">
                      {pos.department}
                    </span>
                    <span className="text-xs font-bold text-[#B88A2A]">
                      {pos.vacancies} {pos.vacancies === 1 ? "Vacancy" : "Vacancies"} • {pos.employmentType}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#0F4735] group-hover:text-[#B88A2A] transition-colors">
                      {pos.title}
                    </h2>
                    {pos.code && (
                      <span className="text-[10px] text-[#66716A] font-mono">
                        Code: {pos.code}
                      </span>
                    )}
                  </div>

                  {pos.description && (
                    <p className="text-xs text-[#26332E]/80 leading-relaxed font-sans">
                      {pos.description}
                    </p>
                  )}

                  {pos.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pos.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-[#E7EDE2] border border-[#C9D8C8] text-[11px] text-[#0F4735] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#DEDCCF] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#66716A]">
                    <div className="flex items-start gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#66716A] block">
                          Qualification
                        </span>
                        <span className="text-[#26332E] font-medium">{pos.minQualification}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-4 h-4 text-[#B88A2A] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#66716A] block">
                          Experience
                        </span>
                        <span className="text-[#26332E] font-medium">
                          {pos.minExperience === 0
                            ? "Freshers welcome"
                            : `${pos.minExperience} Year${pos.minExperience > 1 ? "s" : ""} minimum`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DEDCCF] flex items-center justify-between gap-4">
                  <div className="text-[11px] text-[#26332E]/70">
                    Campus: Wazirganj, Gaya
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`/careers/apply/${pos.id}`}
                    className="font-bold text-xs"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* General Application Footer Card */}
        <div className="mt-16 bg-[#083526] text-white p-8 border border-[#B88A2A] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#D4B15A] font-bold">
              OPEN SUBMISSION
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Do Not See Your Subject Listed?
            </h3>
            <p className="text-xs text-[#F7F3E8]/85 max-w-xl leading-relaxed">
              We continuously accept applications for upcoming academic terms across all disciplines, laboratory assistants, librarians, counselors, and administrative staff.
            </p>
          </div>
          <Button variant="gold" size="lg" href="/careers/apply" className="font-bold text-xs uppercase tracking-wider shrink-0">
            Submit Open Application
          </Button>
        </div>
      </Container>
    </div>
  );
}
