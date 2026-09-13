import React from "react";
import { SchoolStageInfo } from "@/types/school";
import { AcademicCard } from "./AcademicCard";

interface SchoolStageProps {
  stages: SchoolStageInfo[];
}

export function SchoolStage({ stages }: SchoolStageProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stages.map((stage, idx) => (
        <AcademicCard key={stage.id} stage={stage} index={idx} />
      ))}
    </div>
  );
}
