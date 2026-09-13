"use client";

import React from "react";
import { Plus, Trash2, Briefcase, Calculator } from "lucide-react";

export interface ExperienceEntry {
  institution: string;
  designation: string;
  subject?: string;
  classesTaught?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  responsibilities?: string;
}

interface ExperienceStepProps {
  isExperienced: boolean;
  onExperienceToggle: (isExperienced: boolean) => void;
  records: ExperienceEntry[];
  onChange: (records: ExperienceEntry[]) => void;
  error?: string;
}

export function calculateTotalExperience(records: ExperienceEntry[]): string {
  let totalMonths = 0;

  for (const rec of records) {
    if (!rec.startDate) continue;
    const start = new Date(rec.startDate);
    const end = rec.currentlyWorking || !rec.endDate ? new Date() : new Date(rec.endDate);

    if (end > start) {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += Math.max(0, months);
    }
  }

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (years === 0 && remainingMonths === 0) return "0 Months";
  if (years === 0) return `${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`;
  if (remainingMonths === 0) return `${years} Year${years > 1 ? "s" : ""}`;
  return `${years} Year${years > 1 ? "s" : ""}, ${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`;
}

export function ExperienceStep({
  isExperienced,
  onExperienceToggle,
  records,
  onChange,
  error,
}: ExperienceStepProps) {
  const handleAdd = () => {
    const newEntry: ExperienceEntry = {
      institution: "",
      designation: "",
      subject: "",
      classesTaught: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: "",
    };
    onChange([...records, newEntry]);
  };

  const handleUpdate = (index: number, field: keyof ExperienceEntry, value: unknown) => {
    const updated = [...records];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    onChange(records.filter((_, idx) => idx !== index));
  };

  const totalExpFormatted = calculateTotalExperience(records);

  return (
    <div className="space-y-6">
      {/* Experience Toggle */}
      <div className="p-5 bg-white border border-[#E2DBD0] rounded-xl shadow-xs space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B]">
          Do you have prior teaching / academic experience? <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="isExperienced"
              checked={!isExperienced}
              onChange={() => {
                onExperienceToggle(false);
                onChange([]);
              }}
              className="text-[#14342B] focus:ring-[#C5A059]"
            />
            <span>No, I am a Fresher / Trainee</span>
          </label>

          <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="isExperienced"
              checked={isExperienced}
              onChange={() => {
                onExperienceToggle(true);
                if (records.length === 0) handleAdd();
              }}
              className="text-[#14342B] focus:ring-[#C5A059]"
            />
            <span>Yes, I have teaching experience</span>
          </label>
        </div>
      </div>

      {/* Experience Records If Yes */}
      {isExperienced && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE2D5] pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#14342B] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#C5A059]" />
                <span>Teaching Experience History</span>
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Include schools, institutions, coaching centers, or universities you have taught in.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#EAE2D5] text-xs text-[#14342B]">
                <Calculator className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-medium">Total Calculated:</span>
                <span className="font-bold text-[#856627]">{totalExpFormatted}</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Experience</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {records.map((rec, index) => (
              <div
                key={index}
                className="p-5 bg-white border border-[#E2DBD0] rounded-xl shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#856627]">
                    Experience Record #{index + 1}
                  </span>
                  {records.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Institution */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      School / Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec.institution}
                      onChange={(e) => handleUpdate(index, "institution", e.target.value)}
                      placeholder="e.g. Delhi Public School, Patna"
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Designation / Role <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec.designation}
                      onChange={(e) => handleUpdate(index, "designation", e.target.value)}
                      placeholder="e.g. PGT Mathematics, TGT English, PRT Coordinator"
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Subject Taught */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Subject(s) Taught
                    </label>
                    <input
                      type="text"
                      value={rec.subject || ""}
                      onChange={(e) => handleUpdate(index, "subject", e.target.value)}
                      placeholder="e.g. Physics & Astronomy Club"
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Classes Taught */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Classes / Grades Taught
                    </label>
                    <input
                      type="text"
                      value={rec.classesTaught || ""}
                      onChange={(e) => handleUpdate(index, "classesTaught", e.target.value)}
                      placeholder="e.g. Grades 9 to 12, Pre-Primary"
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={rec.startDate}
                      onChange={(e) => handleUpdate(index, "startDate", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* End Date & Currently Working */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-[#14342B]">
                        End Date
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-[11px] text-[#856627] font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rec.currentlyWorking}
                          onChange={(e) => {
                            handleUpdate(index, "currentlyWorking", e.target.checked);
                            if (e.target.checked) handleUpdate(index, "endDate", "");
                          }}
                          className="rounded text-[#14342B] focus:ring-[#C5A059]"
                        />
                        <span>Currently Working Here</span>
                      </label>
                    </div>
                    <input
                      type="date"
                      disabled={rec.currentlyWorking}
                      value={rec.endDate || ""}
                      onChange={(e) => handleUpdate(index, "endDate", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] disabled:bg-stone-100 disabled:text-stone-400"
                    />
                  </div>

                  {/* Responsibilities */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Key Pedagogical Responsibilities & Accomplishments
                    </label>
                    <textarea
                      rows={2}
                      value={rec.responsibilities || ""}
                      onChange={(e) =>
                        handleUpdate(index, "responsibilities", e.target.value)
                      }
                      placeholder="Describe curriculum coverage, board examination results achieved, co-curricular duties, Olympiad mentorship..."
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
