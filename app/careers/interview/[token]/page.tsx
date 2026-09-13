import React from "react";
import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { InterviewActionClient } from "./InterviewActionClient";
import { Calendar, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Interview Schedule Response | Swayambhoo International School",
};

export default async function InterviewResponsePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const interview = await prisma.interview.findUnique({
    where: { confirmationToken: token },
    include: {
      application: {
        include: {
          position: { select: { title: true } },
        },
      },
    },
  });

  if (!interview) {
    return (
      <div className="bg-[#F7F3E8] min-h-screen py-20">
        <Container>
          <div className="max-w-md mx-auto bg-[#FBF9F2] border border-red-200 rounded-2xl p-8 text-center space-y-4 shadow-[0_8px_30px_rgba(15,71,53,0.06)]">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
            <h1 className="font-serif font-bold text-xl text-[#083526]">
              Invalid or Expired Link
            </h1>
            <p className="text-xs text-[#66716A] leading-relaxed">
              This interview confirmation link is invalid, expired, or has already been completed. Please contact school recruitment administration.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  const candidateName = interview.application.fullName;
  const applicationNumber = interview.application.applicationNumber;
  const positionTitle =
    interview.application.position?.title ||
    interview.application.otherPosition ||
    "Faculty Position";

  return (
    <div className="bg-[#F7F3E8] min-h-screen py-16">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#B88A2A]">
              FACULTY RECRUITMENT ROUND
            </span>
            <h1 className="font-serif font-bold text-3xl text-[#083526]">
              Interview Schedule Response
            </h1>
            <p className="text-xs text-[#66716A] font-sans">
              Please confirm your availability or submit a request for an alternate schedule.
            </p>
          </div>

          <InterviewActionClient
            token={token}
            interview={{
              id: interview.id,
              candidateName,
              applicationNumber,
              positionTitle,
              interviewDate: interview.interviewDate.toISOString(),
              interviewTime: interview.interviewTime,
              interviewMode: interview.interviewMode,
              venue: interview.venue,
              meetingLink: interview.meetingLink,
              interviewer: interview.interviewer,
              status: interview.status,
            }}
          />
        </div>
      </Container>
    </div>
  );
}
