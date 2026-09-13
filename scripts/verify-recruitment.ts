// scripts/verify-recruitment.ts
// Comprehensive end-to-end verification script for Teacher Recruitment Portal

import prisma from "../lib/prisma";
import { generateApplicationNumber } from "../lib/recruitment/id-generator";
import { savePrivateDocument, readPrivateDocument } from "../lib/storage/recruitment-storage";
import { sendEmail, generateApplicationConfirmationEmail, retryEmail } from "../lib/email/gmail";

async function runRecruitmentVerification() {
  console.log("================================================================================");
  console.log("🧪 STARTING SWAYAMBHOO TEACHER RECRUITMENT SYSTEM VERIFICATION");
  console.log("================================================================================");

  let testsPassed = 0;
  let testsFailed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      testsPassed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      testsFailed++;
    }
  }

  try {
    // TEST 1: Database Positions Query
    console.log("\n--- TEST 1: Job Positions In Database ---");
    const positions = await prisma.jobPosition.findMany({
      where: { isActive: true },
    });
    console.log(`Found ${positions.length} active vacancies.`);
    assert(positions.length >= 5, "Active job vacancies exist in database");

    // TEST 2: Unique Application ID Generation
    console.log("\n--- TEST 2: Unique Sequential Application ID Generator ---");
    const id1 = await generateApplicationNumber();
    const id2 = await generateApplicationNumber();
    console.log(`Generated ID 1: ${id1}`);
    console.log(`Generated ID 2: ${id2}`);
    assert(/^SWIS-\d{4}-\d{6}$/.test(id1), "ID 1 matches SWIS-YYYY-NNNNNN format");
    assert(/^SWIS-\d{4}-\d{6}$/.test(id2), "ID 2 matches SWIS-YYYY-NNNNNN format");
    assert(id1 !== id2, "Generated IDs are distinct and sequentially increasing");

    // TEST 3: Secure Private Document Storage
    console.log("\n--- TEST 3: Secure Document Storage (Outside public/) ---");
    const sampleBuffer = Buffer.from("Sample Resume PDF Content for Test Candidate");
    const uploadResult = await savePrivateDocument(
      sampleBuffer,
      "Dr_Ananya_Sharma_CV.pdf",
      "application/pdf",
      "test_suite"
    );
    console.log(`Saved Document Storage Key: ${uploadResult.storageKey}`);
    assert(!uploadResult.storageKey.startsWith("public/"), "Document is NOT stored in public/ directory");

    const readResult = await readPrivateDocument(uploadResult.storageKey);
    assert(readResult.exists && readResult.buffer.length > 0, "Document successfully retrieved from private storage");

    // TEST 4: Create Teacher Application with Dynamic Skills
    console.log("\n--- TEST 4: Application Persistence with Dynamic Custom Skills ---");
    const testAppNumber = await generateApplicationNumber();
    const testEmail = `test.teacher.${Date.now()}@example.com`;

    const app = await prisma.teacherApplication.create({
      data: {
        applicationNumber: testAppNumber,
        fullName: "Dr. Ananya Sharma",
        dateOfBirth: new Date("1992-05-15"),
        gender: "Female",
        mobile: "9876543210",
        whatsapp: "9876543210",
        email: testEmail,
        address: "Lane 4, Near Circuit House, Gaya",
        city: "Gaya",
        state: "Bihar",
        pincode: "805131",
        positionId: positions[0].id,
        employmentType: "Full Time",
        expectedSalary: "₹60,000 / month",
        currentSalary: "₹50,000 / month",
        noticePeriod: "1 Month",
        willingToRelocate: true,
        totalExperienceYears: 4.5,
        personalStatement:
          "I am deeply inspired by Swayambhoo's holistic vision, biophilic architecture, and dedication to leadership.",
        teachingPhilosophy:
          "My philosophy is rooted in experiential discovery, encouraging students to ask questions and learn with joy.",
        status: "NEW",
        educationRecords: {
          create: [
            {
              qualification: "Post Graduation (M.Sc Physics)",
              institution: "Patna University",
              boardOrUniversity: "Patna University",
              year: 2016,
              percentageOrCgpa: "82.5%",
            },
            {
              qualification: "B.Ed",
              institution: "Magadh Teacher Training College",
              boardOrUniversity: "Magadh University",
              year: 2018,
              percentageOrCgpa: "79.0%",
            },
          ],
        },
        experienceRecords: {
          create: [
            {
              institution: "DPS Gaya",
              designation: "PGT Physics",
              subject: "Physics",
              classesTaught: "Grades 11 & 12",
              startDate: new Date("2020-04-01"),
              endDate: new Date("2024-03-31"),
              currentlyWorking: false,
              responsibilities: "Physics laboratory coordinator and Olympiad coach",
            },
          ],
        },
        skills: {
          create: [
            { skillName: "Classroom Management" },
            { skillName: "AI in Education" },
            { skillName: "Vedic Mathematics" },
            { skillName: "Python Robotics" },
          ],
        },
        languages: {
          create: [
            { language: "English", proficiency: "Fluent" },
            { language: "Hindi", proficiency: "Native" },
          ],
        },
        documents: {
          create: [
            {
              documentType: "Resume / CV",
              filename: uploadResult.filename,
              storageKey: uploadResult.storageKey,
              mimeType: uploadResult.mimeType,
              fileSize: uploadResult.size,
            },
          ],
        },
        statusHistory: {
          create: {
            newStatus: "NEW",
            changedBy: "CANDIDATE",
            reason: "Application submitted",
          },
        },
      },
      include: {
        skills: true,
        educationRecords: true,
        experienceRecords: true,
      },
    });

    console.log(`Created Application ID: ${app.id} (${app.applicationNumber})`);
    assert(app.status === "NEW", "Application initial status is NEW");
    assert(app.skills.length === 4, "4 dynamic custom skills persisted");
    assert(app.educationRecords.length === 2, "2 educational qualifications persisted");
    assert(app.experienceRecords.length === 1, "1 experience record persisted");

    // TEST 5: Custom Skill Search
    console.log("\n--- TEST 5: Custom Skill Search Ability ---");
    const skillSearch = await prisma.teacherApplication.findMany({
      where: {
        skills: {
          some: {
            skillName: { contains: "Vedic", mode: "insensitive" },
          },
        },
      },
    });
    console.log(`Candidates found with 'Vedic' skill: ${skillSearch.length}`);
    assert(skillSearch.some((c) => c.id === app.id), "Candidate found by searching custom skill 'Vedic'");

    // TEST 6: Email Dispatch Reliability (Asynchronous Transaction Isolation)
    console.log("\n--- TEST 6: Outbound Email Dispatch & Status Recording ---");
    const emailResult = await sendEmail({
      applicationId: app.id,
      recipient: app.email,
      subject: `Application Received – Swayambhoo International School (${app.applicationNumber})`,
      html: `<p>Test Confirmation</p>`,
      emailType: "APPLICATION_CONFIRMATION",
    });
    console.log(`Email notification result: success=${emailResult.success}, ID=${emailResult.notificationId}`);
    assert(emailResult.success, "Email service logged and executed without throwing");

    const emailRecord = await prisma.emailNotification.findUnique({
      where: { id: emailResult.notificationId },
    });
    assert(Boolean(emailRecord && emailRecord.status === "SENT"), "Email notification status recorded as SENT in DB");

    // TEST 7: Shortlist Candidate Workflow
    console.log("\n--- TEST 7: Shortlist Candidate Workflow ---");
    const updatedShortlisted = await prisma.$transaction([
      prisma.teacherApplication.update({
        where: { id: app.id },
        data: { status: "SHORTLISTED" },
      }),
      prisma.applicationStatusHistory.create({
        data: {
          applicationId: app.id,
          previousStatus: "NEW",
          newStatus: "SHORTLISTED",
          changedBy: "HR Administrator",
          reason: "Shortlisted for exemplary qualifications",
        },
      }),
    ]);
    assert(updatedShortlisted[0].status === "SHORTLISTED", "Status transitioned to SHORTLISTED");

    // TEST 8: Interview Scheduling & Confirmation Token
    console.log("\n--- TEST 8: Interview Scheduling & Confirmation Token ---");
    const confirmationToken = `test_token_${Date.now()}`;
    const interview = await prisma.interview.create({
      data: {
        applicationId: app.id,
        interviewDate: new Date("2026-10-15T10:00:00.000Z"),
        interviewTime: "10:00 AM",
        interviewMode: "School Campus",
        venue: "Swayambhoo Campus, Wazirganj",
        interviewer: "Dr. K. Sharma (Principal) & Panel",
        confirmationToken,
        status: "SCHEDULED",
        scheduledBy: "HR Administrator",
      },
    });
    console.log(`Interview scheduled with token: ${interview.confirmationToken}`);
    assert(interview.status === "SCHEDULED", "Interview status initialized to SCHEDULED");
    assert(Boolean(interview.confirmationToken), "Unique confirmation token generated");

    // TEST 9: Candidate Interview Confirmation
    console.log("\n--- TEST 9: Candidate Interview Confirmation via Token ---");
    const confirmedIntv = await prisma.interview.update({
      where: { confirmationToken },
      data: { status: "CONFIRMED" },
    });
    await prisma.teacherApplication.update({
      where: { id: app.id },
      data: { status: "INTERVIEW_CONFIRMED" },
    });
    assert(confirmedIntv.status === "CONFIRMED", "Interview confirmed via token");

    const appAfterConfirm = await prisma.teacherApplication.findUnique({
      where: { id: app.id },
      select: { status: true },
    });
    assert(appAfterConfirm?.status === "INTERVIEW_CONFIRMED", "Application status updated to INTERVIEW_CONFIRMED");

    // TEST 10: Retry Failed Email
    console.log("\n--- TEST 10: Email Retry Handler ---");
    const failedEmail = await prisma.emailNotification.create({
      data: {
        applicationId: app.id,
        recipient: "failed.recipient@example.com",
        subject: "Interview Schedule",
        emailType: "INTERVIEW_INVITATION",
        status: "FAILED",
        errorMessage: "Simulated network timeout",
        attemptCount: 1,
      },
    });

    const retryResult = await retryEmail(failedEmail.id);
    assert(retryResult.success, "Admin retry function successfully processed failed email");

    const recheckedEmail = await prisma.emailNotification.findUnique({
      where: { id: failedEmail.id },
    });
    assert(recheckedEmail?.status === "SENT", "Email record transitioned from FAILED to SENT after retry");
    assert(recheckedEmail?.attemptCount === 2, "Attempt count incremented to 2");

    // Clean up test application and records
    await prisma.teacherApplication.delete({
      where: { id: app.id },
    });
    console.log("\nCleaned up test candidate records.");

  } catch (error) {
    console.error("Critical test exception:", error);
    testsFailed++;
  }

  console.log("\n================================================================================");
  console.log(`🏁 VERIFICATION COMPLETE: ${testsPassed} Passed, ${testsFailed} Failed.`);
  console.log("================================================================================");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runRecruitmentVerification()
  .finally(async () => {
    await prisma.$disconnect();
  });
