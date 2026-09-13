"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export interface LanguageEntry {
  language: string;
  proficiency: "Native" | "Fluent" | "Intermediate" | "Basic";
}

interface LanguagesInputProps {
  languages: LanguageEntry[];
  onChange: (languages: LanguageEntry[]) => void;
  error?: string;
}

export function LanguagesInput({ languages, onChange, error }: LanguagesInputProps) {
  const [customLanguage, setCustomLanguage] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState<
    "Native" | "Fluent" | "Intermediate" | "Basic"
  >("Fluent");
  const [localError, setLocalError] = useState("");

  const handleAdd = () => {
    const trimmed = customLanguage.trim();
    if (!trimmed) {
      setLocalError("Please enter a language name.");
      return;
    }

    if (languages.some((l) => l.language.toLowerCase() === trimmed.toLowerCase())) {
      setLocalError(`"${trimmed}" is already added.`);
      return;
    }

    onChange([...languages, { language: trimmed, proficiency: selectedProficiency }]);
    setCustomLanguage("");
    setLocalError("");
  };

  const handleRemove = (idx: number) => {
    onChange(languages.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#14342B] mb-1">
          Language Proficiency <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-[#64748B] mb-2 font-sans">
          Specify the communicative languages you are comfortable conducting classes in.
        </p>

        {/* Add language row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customLanguage}
            onChange={(e) => {
              setCustomLanguage(e.target.value);
              if (localError) setLocalError("");
            }}
            placeholder="e.g. English, Hindi, Sanskrit, French..."
            className="flex-1 px-3.5 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
          />

          <select
            value={selectedProficiency}
            onChange={(e) =>
              setSelectedProficiency(
                e.target.value as "Native" | "Fluent" | "Intermediate" | "Basic"
              )
            }
            className="px-3 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs text-[#181C20] focus:outline-none focus:border-[#C5A059] shadow-xs"
          >
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>

          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2.5 bg-[#14342B] hover:bg-[#1E4D40] text-[#C5A059] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </button>
        </div>

        {(localError || error) && (
          <p className="text-[11px] text-red-600 mt-1.5 font-medium">
            {localError || error}
          </p>
        )}
      </div>

      {/* List of added languages */}
      <div className="space-y-2">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-2.5 bg-white border border-[#E2DBD0] rounded-lg text-xs shadow-xs"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#14342B]">{lang.language}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF6EE] text-[#856627] border border-[#EAE2D5]">
                {lang.proficiency}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-1 text-stone-400 hover:text-red-600 transition-colors"
              aria-label="Remove language"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
