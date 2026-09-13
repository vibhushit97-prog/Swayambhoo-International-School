"use client";

import React, { useState, KeyboardEvent } from "react";
import { Plus, X, Sparkles } from "lucide-react";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

const POPULAR_SUGGESTIONS = [
  "Classroom Management",
  "AI Tools & Technology",
  "Coding & Python",
  "Robotics & STEM",
  "Public Speaking",
  "Smart Board Pedagogies",
  "Google Workspace for Education",
  "Vedic Mathematics",
  "Debate & Elocution",
  "Drama & Theatre",
  "Student Psychological Counseling",
  "Sports Coaching & Fitness",
  "Abacus & Mental Math",
  "Music & Cultural Activities",
];

export function SkillsInput({ skills, onChange, error }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [localError, setLocalError] = useState("");

  const handleAddSkill = (skillToAdd?: string) => {
    const trimmed = (skillToAdd || inputValue).trim();
    if (!trimmed) return;

    // Check for duplicate (case-insensitive)
    const isDuplicate = skills.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      setLocalError(`"${trimmed}" is already added.`);
      return;
    }

    onChange([...skills, trimmed]);
    setInputValue("");
    setLocalError("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    onChange(skills.filter((_, idx) => idx !== indexToRemove));
    setLocalError("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#0F4735] mb-1">
          Your Professional Skills <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-[#66716A] mb-2 font-sans">
          Type your skills freely. Press <strong>Enter</strong> or click <strong>+ Add Skill</strong>. You are not restricted to predefined options.
        </p>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (localError) setLocalError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. AI Tools, Robotics, Vedic Math, Classroom Management..."
            className={`flex-1 px-3.5 py-2.5 bg-white border rounded-lg text-xs text-[#26332E] focus:outline-none shadow-xs font-sans ${
              error || localError
                ? "border-red-400 focus:border-red-500"
                : "border-[#DEDCCF] focus:border-[#0F4735]"
            }`}
          />
          <button
            type="button"
            onClick={() => handleAddSkill()}
            className="px-4 py-2.5 bg-[#0F4735] hover:bg-[#083526] text-[#D4B15A] border border-[#B88A2A]/40 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
          >
            <Plus className="w-4 h-4 text-[#D4B15A]" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Error message */}
        {(localError || error) && (
          <p className="text-[11px] text-red-600 mt-1.5 font-medium">
            {localError || error}
          </p>
        )}
      </div>

      {/* Selected Skills Chips */}
      <div>
        <div className="text-[11px] font-semibold text-[#0F4735] uppercase tracking-wider mb-2">
          Added Skills ({skills.length}):
        </div>

        {skills.length === 0 ? (
          <div className="p-3 bg-[#F7F3E8] border border-dashed border-[#DEDCCF] rounded-lg text-xs text-[#66716A] italic text-center">
            No skills added yet. Type a skill above to add it.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E7EDE2] text-[#0F4735] text-xs font-medium border border-[#C9D8C8] shadow-xs group"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(idx)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[#B88A2A] hover:bg-[#C9D8C8] hover:text-[#083526] transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Quick Add Chips */}
      <div className="pt-2 border-t border-[#DEDCCF]">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#B88A2A] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B88A2A]" />
          <span>Click to quickly add common skills:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SUGGESTIONS.filter(
            (s) => !skills.some((added) => added.toLowerCase() === s.toLowerCase())
          ).slice(0, 8).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleAddSkill(suggestion)}
              className="px-2.5 py-1 rounded-md bg-white hover:bg-[#F7F3E8] border border-[#DEDCCF] hover:border-[#B88A2A] text-[11px] text-[#26332E] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3 text-[#B88A2A]" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
