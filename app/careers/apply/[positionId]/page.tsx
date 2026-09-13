import React from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { TeacherApplicationWizard } from "@/components/recruitment/TeacherApplicationWizard";

export const metadata: Metadata = {
  title: "Apply for Vacancy | Swayambhoo International School",
  description: "Apply directly for faculty vacancy at Swayambhoo International School.",
};

async function getPositions() {
  try {
    return await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, title: true, department: true, subjects: true },
    });
  } catch {
    return [];
  }
}

export default async function ApplyPositionPage({
  params,
}: {
  params: Promise<{ positionId: string }>;
}) {
  const { positionId } = await params;
  const positions = await getPositions();
  const selectedPosition = positions.find((p) => p.id === positionId);

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-12 md:py-16">
      <Container>
        <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#856627]">
            APPLICATION FOR SPECIFIC ROLE
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14342B]">
            Applying for: {selectedPosition?.title || "Teaching Role"}
          </h1>
          {selectedPosition && (
            <p className="text-xs text-[#8FA38F] font-bold uppercase tracking-wider">
              Department: {selectedPosition.department}
            </p>
          )}
        </div>

        <TeacherApplicationWizard
          initialPositionId={positionId}
          positions={positions}
        />
      </Container>
    </div>
  );
}
