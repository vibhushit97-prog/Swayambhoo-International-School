import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Mail,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Application Submitted Successfully | Swayambhoo International School",
};

export default async function ApplicationSuccessPage({
  params,
}: {
  params: Promise<{ applicationId: string }>;
}) {
  const { applicationId } = await params;

  const application = await prisma.teacherApplication.findFirst({
    where: {
      OR: [
        { applicationNumber: applicationId },
        { id: applicationId },
      ],
    },
    include: {
      position: { select: { title: true } },
    },
  });

  const appNumber = application?.applicationNumber || applicationId;
  const candidateName = application?.fullName || "Applicant";
  const positionTitle =
    application?.position?.title || application?.otherPosition || "Faculty Position";
  const candidateEmail = application?.email || "your registered email";

  return (
    <div className="bg-[#FAF6EE] min-h-screen py-16">
      <Container>
        <div className="max-w-2xl mx-auto bg-white border border-[#E2DBD0] rounded-2xl p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#856627]">
              SUBMISSION CONFIRMED
            </span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#14342B] mt-1">
              APPLICATION SUBMITTED SUCCESSFULLY
            </h1>
            <p className="text-sm text-[#64748B] mt-2 font-sans">
              Thank you, <strong>{candidateName}</strong>. Your teacher application has been safely recorded in the Swayambhoo International School recruitment registry.
            </p>
          </div>

          {/* Details Box */}
          <div className="bg-[#F8F3E8] border border-[#C5A059]/40 rounded-xl p-6 text-left space-y-3 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE2D5] pb-3 gap-1">
              <span className="text-xs text-[#64748B]">Official Application ID:</span>
              <span className="font-mono font-bold text-base text-[#14342B] tracking-wider">
                {appNumber}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE2D5] pb-3 gap-1">
              <span className="text-xs text-[#64748B]">Position Applied:</span>
              <span className="text-xs font-bold text-[#14342B]">{positionTitle}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE2D5] pb-3 gap-1">
              <span className="text-xs text-[#64748B]">Current Pipeline Status:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#14342B] text-[#C5A059]">
                <Clock className="w-3 h-3" />
                <span>Application Received</span>
              </span>
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs text-[#3E4652]">
              <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <span>
                A confirmation email has been dispatched to <strong>{candidateEmail}</strong>.
              </span>
            </div>
          </div>

          {/* Next Steps Information */}
          <div className="text-xs text-[#64748B] text-left space-y-2 bg-[#FAF6EE] p-4 rounded-lg border border-[#EAE2D5]">
            <p className="font-bold text-[#14342B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>What Happens Next?</span>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] leading-relaxed">
              <li>Our academic panel reviews your educational profile, experience, and uploaded credentials.</li>
              <li>If shortlisted, you will receive an interview invitation with date and venue/link.</li>
              <li>Keep your Application ID handy to track status updates at any time.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="gold"
              href={`/careers/status?id=${encodeURIComponent(appNumber)}&email=${encodeURIComponent(application?.email || "")}`}
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-wider"
            >
              Check Application Status
            </Button>
            <Button
              variant="outline"
              href="/"
              className="w-full sm:w-auto font-semibold text-xs uppercase tracking-wider"
            >
              Back to Swayambhoo Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
