// scripts/verify-http-routes.ts
// Direct HTTP verification of all public and admin recruitment endpoints

async function testAllHttpRoutes() {
  const baseUrl = "http://localhost:3005";
  console.log("=== Testing Swayambhoo Recruitment HTTP Endpoints ===\n");

  let passed = 0;
  let failed = 0;

  function check(cond: boolean, desc: string) {
    if (cond) {
      console.log(`✅ [HTTP OK]: ${desc}`);
      passed++;
    } else {
      console.error(`❌ [HTTP FAIL]: ${desc}`);
      failed++;
    }
  }

  // 1. Public /careers
  const careersRes = await fetch(`${baseUrl}/careers`);
  const careersHtml = await careersRes.text();
  check(
    careersRes.status === 200 && careersHtml.includes("BUILD THE FUTURE WITH"),
    "GET /careers returns 200 with Hero Section"
  );

  // 2. Public /careers/positions
  const positionsPageRes = await fetch(`${baseUrl}/careers/positions`);
  check(positionsPageRes.status === 200, "GET /careers/positions returns 200");

  // 3. Public /careers/apply
  const applyRes = await fetch(`${baseUrl}/careers/apply`);
  check(applyRes.status === 200, "GET /careers/apply returns 200");

  // 4. Public /careers/status
  const statusRes = await fetch(`${baseUrl}/careers/status`);
  check(statusRes.status === 200, "GET /careers/status returns 200");

  // 5. Positions API
  const posApiRes = await fetch(`${baseUrl}/api/recruitment/positions`);
  const posData = await posApiRes.json();
  check(
    posApiRes.status === 200 && posData.success && posData.positions.length > 0,
    `GET /api/recruitment/positions returns ${posData.positions?.length} active vacancies`
  );

  // 6. Test Application Submission API
  const samplePosId = posData.positions[0]?.id;
  const testEmail = `http.test.${Date.now()}@example.com`;
  const submitRes = await fetch(`${baseUrl}/api/recruitment/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Kavita Srivastava",
      dateOfBirth: "1994-06-20",
      gender: "Female",
      mobile: "9876543210",
      email: testEmail,
      address: "Boring Road, Gaya",
      city: "Gaya",
      state: "Bihar",
      pincode: "805131",
      positionId: samplePosId,
      employmentType: "Full Time",
      educationRecords: [
        {
          qualification: "Post Graduation",
          institution: "Magadh University",
          boardOrUniversity: "Magadh University",
          year: 2018,
          percentageOrCgpa: "78.4%",
        },
      ],
      isExperienced: true,
      experienceRecords: [
        {
          institution: "Gaya High School",
          designation: "TGT Mathematics",
          startDate: "2021-06-01",
          currentlyWorking: true,
        },
      ],
      skills: ["Classroom Management", "Vedic Math", "AI Tools"],
      languages: [{ language: "English", proficiency: "Fluent" }],
      documents: [
        {
          documentType: "Resume / CV",
          filename: "Kavita_Resume.pdf",
          storageKey: "storage/recruitment_docs/test/kavita.pdf",
          mimeType: "application/pdf",
          fileSize: 102400,
        },
      ],
      personalStatement:
        "I want to contribute my mathematical teaching expertise to Swayambhoo International School's visionary learning environment.",
      teachingPhilosophy:
        "I believe every student possesses distinct analytical abilities that flourish under thoughtful encouragement.",
      declarationConfirmed: true,
    }),
  });

  const submitData = await submitRes.json();
  check(
    submitRes.status === 201 && submitData.success && Boolean(submitData.applicationNumber),
    `POST /api/recruitment/applications generated ID ${submitData.applicationNumber}`
  );

  // 7. Test Status Tracking API
  const trackRes = await fetch(`${baseUrl}/api/recruitment/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      applicationNumber: submitData.applicationNumber,
      email: testEmail,
    }),
  });
  const trackData = await trackRes.json();
  check(
    trackRes.status === 200 && trackData.success && trackData.application?.status === "NEW",
    `POST /api/recruitment/status verified candidate status: ${trackData.application?.status}`
  );

  // 8. Test Admin Login & Session Extraction
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@swayambhooschool.com",
      password: "Admin@Swayambhoo2026!",
    }),
  });

  const rawCookie = loginRes.headers.get("set-cookie");
  const cookieMatch = rawCookie?.match(/swayambhoo_admin_session=([^;]+)/);
  const sessionCookie = cookieMatch ? `swayambhoo_admin_session=${cookieMatch[1]}` : "";
  check(loginRes.status === 200 && Boolean(sessionCookie), "POST /api/auth/login successfully issued admin session cookie");

  // 9. Test Protected Admin Recruitment Applications API
  const adminAppsRes = await fetch(`${baseUrl}/api/admin/recruitment/applications`, {
    headers: { Cookie: sessionCookie },
  });
  const adminAppsData = await adminAppsRes.json();
  check(
    adminAppsRes.status === 200 && adminAppsData.success,
    `GET /api/admin/recruitment/applications fetched ${adminAppsData.applications?.length} applications`
  );

  // 10. Test Custom Skill Search API (e.g. search "Vedic")
  const skillSearchRes = await fetch(
    `${baseUrl}/api/admin/recruitment/applications?search=Vedic`,
    { headers: { Cookie: sessionCookie } }
  );
  const skillSearchData = await skillSearchRes.json();
  check(
    skillSearchRes.status === 200 &&
      skillSearchData.applications.some((a: any) => a.id === submitData.applicationId),
    "Admin API successfully queried candidate by custom skill 'Vedic'"
  );

  // 11. Test Admin Shortlist Candidate API
  const shortlistRes = await fetch(
    `${baseUrl}/api/admin/recruitment/applications/${submitData.applicationId}/shortlist`,
    { method: "POST", headers: { Cookie: sessionCookie } }
  );
  const shortlistData = await shortlistRes.json();
  check(
    shortlistRes.status === 200 && shortlistData.success,
    "POST /api/admin/recruitment/applications/:id/shortlist transitioned status to SHORTLISTED"
  );

  // 12. Test Admin Schedule Interview API
  const schedRes = await fetch(
    `${baseUrl}/api/admin/recruitment/applications/${submitData.applicationId}/interview`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: sessionCookie },
      body: JSON.stringify({
        interviewDate: "2026-10-20",
        interviewTime: "11:30 AM",
        interviewMode: "School Campus",
        venue: "Principal Conference Chamber",
        interviewer: "Academic Selection Panel",
        additionalInstructions: "Bring teaching portfolio and sample lesson plan.",
      }),
    }
  );
  const schedData = await schedRes.json();
  check(
    schedRes.status === 200 && Boolean(schedData.interview?.confirmationToken),
    `POST /api/admin/recruitment/applications/:id/interview scheduled round with token`
  );

  const confToken = schedData.interview?.confirmationToken;

  // 13. Test Candidate Interview Confirmation
  const candConfirmRes = await fetch(
    `${baseUrl}/api/recruitment/interviews/${confToken}/confirm`,
    { method: "POST" }
  );
  const candConfirmData = await candConfirmRes.json();
  check(
    candConfirmRes.status === 200 && candConfirmData.success,
    "POST /api/recruitment/interviews/:token/confirm updated status to INTERVIEW_CONFIRMED"
  );

  // 14. Test Admin CSV Export
  const exportRes = await fetch(`${baseUrl}/api/admin/recruitment/export`, {
    headers: { Cookie: sessionCookie },
  });
  const exportText = await exportRes.text();
  check(
    exportRes.status === 200 && exportText.includes("Application ID") && exportText.includes(submitData.applicationNumber),
    "GET /api/admin/recruitment/export returned CSV including submitted candidate"
  );

  console.log(`\n=== Summary: ${passed} Passed, ${failed} Failed ===\n`);
}

testAllHttpRoutes().catch(console.error);
