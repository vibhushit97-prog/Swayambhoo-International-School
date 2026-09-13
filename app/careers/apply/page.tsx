import React from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { TeacherApplicationWizard } from "@/components/recruitment/TeacherApplicationWizard";

export const metadata: Metadata = {
  title: "Online Teacher Application | Swayambhoo International School",
  description:
    "Complete your professional teacher application online for Swayambhoo International School, Wazirganj, Gaya.",
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

export default async function ApplyPage() {
  const positions = await getPositions();

  return (
    <div className="bg-[#F7F3E8] min-h-screen py-12 md:py-16">
      <Container>
        <div className="max-w-4xl mx-auto mb-8 text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B88A2A]">
            FACULTY RECRUITMENT PORTAL
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#0F4735]">
            Teacher & Faculty Application Form
          </h1>
          <p className="text-xs sm:text-sm text-[#66716A] font-sans max-w-xl mx-auto leading-relaxed">
            Please complete all 8 steps accurately. Your progress is saved automatically in your browser so you won&apos;t lose entered data.
          </p>
        </div>

        <TeacherApplicationWizard positions={positions} />
      </Container>
    </div>
  );
}
