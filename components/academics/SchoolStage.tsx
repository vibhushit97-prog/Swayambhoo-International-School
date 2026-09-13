"use client";

import React, { useState } from "react";
import { SchoolStageInfo } from "@/types/school";
import { AcademicCard } from "./AcademicCard";
import { StageDetailModal } from "./StageDetailModal";

interface SchoolStageProps {
  stages: SchoolStageInfo[];
}

export function SchoolStage({ stages }: SchoolStageProps) {
  const [selectedStage, setSelectedStage] = useState<SchoolStageInfo | null>(null);
  const [modalTab, setModalTab] = useState<"details" | "apply">("details");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (stage: SchoolStageInfo, tab: "details" | "apply" = "details") => {
    setSelectedStage(stage);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stages.map((stage, idx) => (
          <AcademicCard
            key={stage.id}
            stage={stage}
            index={idx}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <StageDetailModal
        stage={selectedStage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTab={modalTab}
      />
    </>
  );
}
