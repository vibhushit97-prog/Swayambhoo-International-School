"use client";

import React from "react";
import { Plus, Trash2, GraduationCap } from "lucide-react";

export interface EducationEntry {
  qualification: string;
  otherQualification?: string;
  institution: string;
  boardOrUniversity: string;
  year: number;
  percentageOrCgpa: string;
  specialization?: string;
}

interface EducationStepProps {
  records: EducationEntry[];
  onChange: (records: EducationEntry[]) => void;
  error?: string;
}

const QUALIFICATION_OPTIONS = [
  "10th / Secondary",
  "12th / Senior Secondary",
  "Diploma",
  "Graduation (B.A. / B.Sc / B.Com / B.Tech / BCA / Other)",
  "Post Graduation (M.A. / M.Sc / M.Com / MCA / M.Tech / Other)",
  "B.Ed (Bachelor of Education)",
  "M.Ed (Master of Education)",
  "CTET (Central Teacher Eligibility Test)",
  "STET (State Teacher Eligibility Test)",
  "NET / SLET / SET",
  "PhD / Doctorate",
  "Other",
];

export function EducationStep({ records, onChange, error }: EducationStepProps) {
  const handleAdd = () => {
    const newRecord: EducationEntry = {
      qualification: "Graduation (B.A. / B.Sc / B.Com / B.Tech / BCA / Other)",
      otherQualification: "",
      institution: "",
      boardOrUniversity: "",
      year: new Date().getFullYear(),
      percentageOrCgpa: "",
      specialization: "",
    };
    onChange([...records, newRecord]);
  };

  const handleUpdate = (index: number, field: keyof EducationEntry, value: unknown) => {
    const updated = [...records];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    if (records.length <= 1) {
      alert("At least one educational qualification is required.");
      return;
    }
    onChange(records.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE2D5] pb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#14342B] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#C5A059]" />
            <span>Educational Qualifications</span>
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            List your academic degrees, certifications, and teacher training qualifications.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Qualification</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {records.map((rec, index) => {
          const isOther = rec.qualification === "Other";

          return (
            <div
              key={index}
              className="p-5 bg-white border border-[#E2DBD0] rounded-xl shadow-xs relative space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#856627]">
                  Qualification #{index + 1}
                </span>
                {records.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-stone-400 hover:text-red-600 transition-colors p-1"
                    title="Remove qualification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Qualification select */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    Degree / Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={rec.qualification}
                    onChange={(e) => handleUpdate(index, "qualification", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  >
                    {QUALIFICATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Other Qualification typing if 'Other' */}
                {isOther && (
                  <div>
                    <label className="block text-xs font-semibold text-[#14342B] mb-1">
                      Specify Custom Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={rec.otherQualification || ""}
                      onChange={(e) =>
                        handleUpdate(index, "otherQualification", e.target.value)
                      }
                      placeholder="e.g. NTT, Prabhakar, Diploma in Fine Arts"
                      className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                )}

                {/* Institution */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    School / College / Institution <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={rec.institution}
                    onChange={(e) => handleUpdate(index, "institution", e.target.value)}
                    placeholder="e.g. St. Xavier's College / Delhi University"
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Board / University */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    Board / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={rec.boardOrUniversity}
                    onChange={(e) =>
                      handleUpdate(index, "boardOrUniversity", e.target.value)
                    }
                    placeholder="e.g. CBSE, ICSE, Magadh University, IGNOU"
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Year of Passing */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    Passing Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1975"
                    max={new Date().getFullYear() + 1}
                    value={rec.year}
                    onChange={(e) =>
                      handleUpdate(index, "year", parseInt(e.target.value, 10) || 2020)
                    }
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Percentage / CGPA */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    Percentage / CGPA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={rec.percentageOrCgpa}
                    onChange={(e) =>
                      handleUpdate(index, "percentageOrCgpa", e.target.value)
                    }
                    placeholder="e.g. 84.5% or 8.8 CGPA"
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Specialization / Subject */}
                <div>
                  <label className="block text-xs font-semibold text-[#14342B] mb-1">
                    Major / Specialization (Optional)
                  </label>
                  <input
                    type="text"
                    value={rec.specialization || ""}
                    onChange={(e) =>
                      handleUpdate(index, "specialization", e.target.value)
                    }
                    placeholder="e.g. Pure Mathematics, English Literature"
                    className="w-full px-3 py-2 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
