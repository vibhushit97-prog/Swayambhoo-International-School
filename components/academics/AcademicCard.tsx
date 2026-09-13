import React from "react";
import Link from "next/link";
import { SchoolStageInfo } from "@/types/school";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface AcademicCardProps {
  stage: SchoolStageInfo;
  index: number;
}

export function AcademicCard({ stage, index }: AcademicCardProps) {
  return (
    <div
      id={stage.id}
      className="bg-white border border-[#EAE3D7] hover:border-[#C5A059] p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F5EFEB]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Stage 0{index + 1}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAF6EE] border border-[#E2DBD0] text-[#14342B]">
            Age: {stage.ageGroup}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#14342B] mb-1">
          {stage.title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#856627] mb-4">
          {stage.classes}
        </p>

        <p className="text-sm text-[#181C20]/80 leading-relaxed font-sans mb-6">
          {stage.description}
        </p>

        {stage.highlights && stage.highlights.length > 0 && (
          <div className="space-y-2 mb-6 pt-4 border-t border-[#F5EFEB]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#14342B]">
              Key Highlights:
            </p>
            {stage.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2 text-xs text-[#181C20]/75">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-[#F5EFEB]">
        <Button
          variant="secondary"
          size="sm"
          href="/admissions"
          className="w-full justify-center text-xs"
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
        >
          Enquire for {stage.classes}
        </Button>
      </div>
    </div>
  );
}
