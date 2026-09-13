"use client";

import React from "react";
import Image from "next/image";
import { SchoolStageInfo } from "@/types/school";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Eye, Sparkles } from "lucide-react";

interface AcademicCardProps {
  stage: SchoolStageInfo;
  index: number;
  onOpenModal: (stage: SchoolStageInfo, tab?: "details" | "apply") => void;
}

export function AcademicCard({ stage, index, onOpenModal }: AcademicCardProps) {
  return (
    <div
      id={stage.id}
      className="bg-white border border-[#DEDCCF] hover:border-[#B88A2A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
    >
      <div>
        {/* Stage Image with Hover Zoom & Badges */}
        {stage.image && (
          <div
            className="relative w-full h-60 overflow-hidden cursor-pointer bg-[#F7F3E8]"
            onClick={() => onOpenModal(stage, "details")}
            title={`Click to view full course details for ${stage.title}`}
          >
            <Image
              src={stage.image}
              alt={`${stage.title} Classroom & Learning Environment at Swayambhoo International School`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#083526]/85 via-black/20 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-[#083526]/95 text-[#D4B15A] border border-[#B88A2A]/50 shadow-md">
                Stage 0{index + 1}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#E7EDE2] text-[#0F4735] border border-[#C9D8C8] shadow-sm backdrop-blur-xs">
                Age: {stage.ageGroup}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B15A] drop-shadow-md">
                {stage.classes}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-[#0F4735]/80 px-2.5 py-0.5 border border-white/20 backdrop-blur-xs group-hover:bg-[#B88A2A] group-hover:text-[#083526] transition-colors">
                <Eye className="w-3 h-3" /> View Course & Apply
              </span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DEDCCF]">
            <span className="text-xs font-semibold text-[#B88A2A] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B88A2A]" />
              <span>{stage.nepFocus || "NEP 2020 Pedagogical Benchmark"}</span>
            </span>
          </div>

          <h3
            className="font-serif text-2xl font-bold text-[#0F4735] mb-1 group-hover:text-[#B88A2A] transition-colors cursor-pointer"
            onClick={() => onOpenModal(stage, "details")}
          >
            {stage.title}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B88A2A] mb-3">
            {stage.classes}
          </p>

          <p className="text-sm text-[#26332E] leading-relaxed font-sans mb-5 line-clamp-3">
            {stage.description}
          </p>

          {stage.coreSubjects && stage.coreSubjects.length > 0 && (
            <div className="mb-5 pt-3 border-t border-[#DEDCCF]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F4735] mb-2">
                Key Subjects & Modules:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stage.coreSubjects.slice(0, 4).map((sub, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#E7EDE2] border border-[#C9D8C8] text-[#0F4735] px-2 py-0.5 font-medium rounded-xs"
                  >
                    {sub}
                  </span>
                ))}
                {stage.coreSubjects.length > 4 && (
                  <span className="text-[11px] text-[#B88A2A] font-semibold self-center px-1">
                    +{stage.coreSubjects.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {stage.highlights && stage.highlights.length > 0 && (
            <div className="space-y-1.5 mb-2 pt-3 border-t border-[#DEDCCF]">
              {stage.highlights.slice(0, 2).map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs text-[#26332E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B88A2A] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 sm:p-8 sm:pt-0 grid grid-cols-2 gap-3 border-t border-[#DEDCCF] mt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenModal(stage, "details")}
          className="w-full justify-center text-xs font-bold text-[#0F4735] border-[#0F4735]/40 hover:bg-[#E7EDE2]"
          leftIcon={<Eye className="w-3.5 h-3.5 text-[#B88A2A]" />}
        >
          Course Details
        </Button>

        <Button
          variant="gold"
          size="sm"
          onClick={() => onOpenModal(stage, "apply")}
          className="w-full justify-center text-xs font-bold"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Enquire Now
        </Button>
      </div>
    </div>
  );
}
