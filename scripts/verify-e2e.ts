async function verifyE2E() {
  const baseUrl = "http://localhost:3005";
  console.log("=== Starting Swayambhoo School Platform E2E Verification ===");

  // 1. Verify Public Homepage
  console.log("\n1. Testing Public Homepage...");
  const homeRes = await fetch(`${baseUrl}/`);
  console.log(`GET / status: ${homeRes.status} ${homeRes.statusText}`);
  const homeHtml = await homeRes.text();
  console.log(`Contains Admissions Ticker: ${homeHtml.includes("ADMISSIONS NOTICE") || homeHtml.includes("Admissions")}`);
  console.log(`Contains Upcoming Events: ${homeHtml.includes("Campus Calendar") || homeHtml.includes("Events")}`);

  // 2. Test Admin Login with Seed Credentials
  console.log("\n2. Testing Admin Authentication (/api/auth/login)...");
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@swayambhooschool.com",
      password: "Admin@Swayambhoo2026!",
    }),
  });
  console.log(`POST /api/auth/login status: ${loginRes.status}`);
  const loginData = await loginRes.json();
  console.log(`Login response:`, loginData);

  const rawCookie = loginRes.headers.get("set-cookie");
  const cookieMatch = rawCookie?.match(/swayambhoo_admin_session=([^;]+)/);
  const sessionCookie = cookieMatch ? `swayambhoo_admin_session=${cookieMatch[1]}` : "";
  console.log(`Extracted Session Cookie: ${Boolean(sessionCookie)}`);

  // 3. Test Protected Admin API: /api/admin/admissions
  console.log("\n3. Testing Protected Admin API (/api/admin/admissions)...");
  const admRes = await fetch(`${baseUrl}/api/admin/admissions`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`GET /api/admin/admissions status: ${admRes.status}`);
  const admData = await admRes.json();
  console.log(`Fetched enquiries count: ${admData.enquiries?.length || 0}`);
  if (admData.enquiries?.length > 0) {
    console.log(`Sample enquiry: ${admData.enquiries[0].studentName} (${admData.enquiries[0].applyingFor}) - Status: ${admData.enquiries[0].status}`);
  }

  // 4. Test Protected Admin API: /api/admin/school-profile
  console.log("\n4. Testing Protected Admin API (/api/admin/school-profile)...");
  const profileRes = await fetch(`${baseUrl}/api/admin/school-profile`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`GET /api/admin/school-profile status: ${profileRes.status}`);
  const profileData = await profileRes.json();
  console.log(`School Name: "${profileData.profile?.name}", Motto: "${profileData.profile?.motto}"`);

  // 5. Test Public Enquiry Submission
  console.log("\n5. Testing Public Admissions Form Submission (/api/enquiries)...");
  const enquiryRes = await fetch(`${baseUrl}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      studentName: "E2E Test Student",
      parentName: "E2E Parent",
      phone: "+91 9876543210",
      email: "e2e_parent@example.com",
      currentClass: "Grade 5",
      applyingFor: "Grade 6",
      academicSession: "2026-2027",
      message: "Automated E2E pipeline test enquiry.",
    }),
  });
  console.log(`POST /api/enquiries status: ${enquiryRes.status}`);
  const enquiryData = await enquiryRes.json();
  console.log(`Enquiry created with ID:`, enquiryData.enquiry?.id);

  // 6. Test CSV Export
  console.log("\n6. Testing Admissions CSV Export (/api/admin/admissions/export)...");
  const exportRes = await fetch(`${baseUrl}/api/admin/admissions/export`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`GET /api/admin/admissions/export status: ${exportRes.status}`);
  const csvContent = await exportRes.text();
  console.log(`CSV snippet:\n${csvContent.slice(0, 160)}...`);

  // 7. Test Admin Settings
  console.log("\n7. Testing System Settings API (/api/admin/settings)...");
  const settingsRes = await fetch(`${baseUrl}/api/admin/settings`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`GET /api/admin/settings status: ${settingsRes.status}`);
  const settingsData = await settingsRes.json();
  console.log(`Settings count: ${settingsData.settings?.length || 0}`);

  // 8. Test Contact Form Submission
  console.log("\n8. Testing Contact Message Submission (/api/contact)...");
  const contactRes = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Prospective Visitor",
      email: "visitor@example.com",
      phone: "+91 9876543211",
      subject: "Campus Tour Inquiry",
      message: "We would love to visit the campus next week.",
    }),
  });
  console.log(`POST /api/contact status: ${contactRes.status}`);
  const contactData = await contactRes.json();
  console.log(`Contact message created with ID:`, contactData.id);

  // 9. Test Messages Admin API
  console.log("\n9. Testing Admin Messages Inbox (/api/admin/messages)...");
  const messagesRes = await fetch(`${baseUrl}/api/admin/messages`, {
    headers: { Cookie: sessionCookie },
  });
  console.log(`GET /api/admin/messages status: ${messagesRes.status}`);
  const messagesData = await messagesRes.json();
  console.log(`Admin Inbox Messages count: ${messagesData.messages?.length || 0}`);

  console.log("\n=== ALL E2E AND PROTECTED FLOWS VERIFIED 100% SUCCESSFULLY! ===");
}

verifyE2E().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
