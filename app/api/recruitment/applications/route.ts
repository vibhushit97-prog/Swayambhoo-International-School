import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { teacherApplicationSchema } from "@/lib/recruitment/validations";
import { generateApplicationNumber } from "@/lib/recruitment/id-generator";
import {
  sendEmail,
  generateApplicationConfirmationEmail,
  generateAdminRecruitmentAlertEmail,
} from "@/lib/email/gmail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Strict Server-Side Validation via Zod
    const validation = teacherApplicationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify all required fields.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 2. Generate Unique Sequential Application Number (e.g. SWIS-2026-000001)
    const applicationNumber = await generateApplicationNumber();

    // 3. Resolve Position Title
    let positionTitle = data.otherPosition || "Teaching Position";
    if (data.positionId) {
      const pos = await prisma.jobPosition.findUnique({
        where: { id: data.positionId },
        select: { title: true },
      });
      if (pos) {
        positionTitle = pos.title;
      }
    }

    // 4. Calculate total experience in years
    let totalExperienceYears = 0;
    if (data.isExperienced && data.experienceRecords.length > 0) {
      for (const exp of data.experienceRecords) {
        const start = new Date(exp.startDate).getTime();
        const end = exp.endDate ? new Date(exp.endDate).getTime() : Date.now();
        if (end > start) {
          const diffYears = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
          totalExperienceYears += Math.max(0, diffYears);
        }
      }
      totalExperienceYears = Math.round(totalExperienceYears * 10) / 10;
    }

    // 5. Atomic Database Persistence Transaction
    const application = await prisma.$transaction(async (tx) => {
      // Deduplicate skill names
      const uniqueSkills = Array.from(
        new Set(data.skills.map((s) => s.trim()).filter(Boolean))
      );

      const createdApp = await tx.teacherApplication.create({
        data: {
          applicationNumber,
          fullName: data.fullName,
          dateOfBirth: new Date(data.dateOfBirth),
          gender: data.gender || null,
          mobile: data.mobile,
          whatsapp: data.whatsapp || null,
          email: data.email.toLowerCase(),
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          profilePhoto: data.profilePhoto || null,
          positionId: data.positionId || null,
          otherPosition: data.otherPosition || null,
          subject: data.subject || null,
          preferredClasses: data.preferredClasses || null,
          employmentType: data.employmentType,
          expectedSalary: data.expectedSalary || null,
          currentSalary: data.currentSalary || null,
          noticePeriod: data.noticePeriod || null,
          willingToRelocate: data.willingToRelocate,
          totalExperienceYears,
          personalStatement: data.personalStatement,
          teachingPhilosophy: data.teachingPhilosophy,
          status: "NEW",

          // Child Records
          educationRecords: {
            create: data.educationRecords.map((edu) => ({
              qualification: edu.qualification,
              otherQualification: edu.otherQualification || null,
              institution: edu.institution,
              boardOrUniversity: edu.boardOrUniversity,
              year: edu.year,
              percentageOrCgpa: edu.percentageOrCgpa,
              specialization: edu.specialization || null,
            })),
          },
          experienceRecords: {
            create: (data.isExperienced ? data.experienceRecords : []).map((exp) => ({
              institution: exp.institution,
              designation: exp.designation,
              subject: exp.subject || null,
              classesTaught: exp.classesTaught || null,
              startDate: new Date(exp.startDate),
              endDate: exp.endDate ? new Date(exp.endDate) : null,
              currentlyWorking: exp.currentlyWorking,
              responsibilities: exp.responsibilities || null,
            })),
          },
          skills: {
            create: uniqueSkills.map((skillName) => ({
              skillName,
            })),
          },
          languages: {
            create: data.languages.map((lang) => ({
              language: lang.language,
              proficiency: lang.proficiency,
            })),
          },
          documents: {
            create: data.documents.map((doc) => ({
              documentType: doc.documentType,
              filename: doc.filename,
              storageKey: doc.storageKey,
              mimeType: doc.mimeType,
              fileSize: doc.fileSize,
            })),
          },
          statusHistory: {
            create: {
              newStatus: "NEW",
              changedBy: "CANDIDATE",
              reason: "Application initially submitted through recruitment portal",
            },
          },
        },
      });

      return createdApp;
    });

    // 6. Asynchronous Background Email Dispatch (Never blocks return or fails submission)
    const formattedDate = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "long",
    }).format(new Date());

    const confirmationHtml = generateApplicationConfirmationEmail({
      applicantName: data.fullName,
      applicationNumber,
      positionTitle,
      applicationDate: formattedDate,
    });

    // Candidate Confirmation Email
    sendEmail({
      applicationId: application.id,
      recipient: data.email,
      subject: `Application Received – Swayambhoo International School (${applicationNumber})`,
      html: confirmationHtml,
      emailType: "APPLICATION_CONFIRMATION",
      metadata: { positionTitle, applicationNumber },
    }).catch((err) => console.error("[Email Async Error]:", err));

    // Admin HR Notification Email
    const hrEmail = process.env.RECRUITMENT_HR_EMAIL || "recruitment@swayambhooschool.com";
    const alertHtml = generateAdminRecruitmentAlertEmail({
      title: "New Teacher Recruitment Application Received",
      message: `A new candidate has submitted their credentials for review.`,
      candidateName: data.fullName,
      applicationNumber,
      positionTitle,
    });

    sendEmail({
      applicationId: application.id,
      recipient: hrEmail,
      subject: `[New Application] ${data.fullName} – ${positionTitle} (${applicationNumber})`,
      html: alertHtml,
      emailType: "ADMIN_ALERT",
      metadata: { positionTitle, applicationNumber },
    }).catch((err) => console.error("[HR Alert Async Error]:", err));

    return NextResponse.json(
      {
        success: true,
        applicationId: application.id,
        applicationNumber: application.applicationNumber,
        candidateName: application.fullName,
        positionTitle,
        message: "Your application has been successfully submitted.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Application Submission API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your application.",
      },
      { status: 500 }
    );
  }
}
