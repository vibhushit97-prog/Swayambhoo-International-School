// scripts/seed.ts
// Comprehensive Phase 2 seed script for Swayambhoo International School

import { prisma } from "../lib/prisma";
import { siteConfig } from "../config/site";
import crypto from "node:crypto";

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

async function main() {
  console.log("🌱 Starting Swayambhoo International School Phase 2 Database Seed...");

  // 1. Super Admin Initialization
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || "admin@swayambhooschool.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "Admin@Swayambhoo2026!";
  const adminName = process.env.ADMIN_INITIAL_NAME || "Head Administrator";

  const passwordHash = await hashPassword(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: passwordHash,
      role: "SUPER_ADMIN",
      name: adminName,
    },
    create: {
      email: adminEmail,
      name: adminName,
      password: passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Super Admin initialized: ${admin.email} (Role: ${admin.role})`);

  // 2. School Profile
  const profile = await prisma.schoolProfile.upsert({
    where: { id: "school-profile-main" },
    update: {
      name: siteConfig.name,
      tagline: siteConfig.tagline,
      motto: siteConfig.motto,
      campusMotto: siteConfig.campusMotto,
      description: siteConfig.description,
      addressStreet: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.locality,
      addressCity: siteConfig.contact.address.city,
      addressState: siteConfig.contact.address.state,
      addressPincode: siteConfig.contact.address.pincode,
      phone: siteConfig.contact.phone,
      whatsapp: siteConfig.contact.whatsapp,
      email: siteConfig.contact.email,
      admissionsEmail: siteConfig.contact.admissionsEmail,
      logoUrl: siteConfig.images.logo,
      heroImageUrl: siteConfig.images.heroImage,
      socialLinks: siteConfig.socialLinks,
      admissionCtaTitle: "Admissions Open for Academic Session 2026–2027",
      admissionCtaSubtitle: "Nurturing curious, confident, and character-driven leaders in Gaya, Bihar.",
      footerText: "Rooted in timeless values and modern innovation: 'Discipline Today, Leadership Tomorrow'.",
    },
    create: {
      id: "school-profile-main",
      name: siteConfig.name,
      tagline: siteConfig.tagline,
      motto: siteConfig.motto,
      campusMotto: siteConfig.campusMotto,
      description: siteConfig.description,
      addressStreet: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.locality,
      addressCity: siteConfig.contact.address.city,
      addressState: siteConfig.contact.address.state,
      addressPincode: siteConfig.contact.address.pincode,
      phone: siteConfig.contact.phone,
      whatsapp: siteConfig.contact.whatsapp,
      email: siteConfig.contact.email,
      admissionsEmail: siteConfig.contact.admissionsEmail,
      logoUrl: siteConfig.images.logo,
      heroImageUrl: siteConfig.images.heroImage,
      socialLinks: siteConfig.socialLinks,
      admissionCtaTitle: "Admissions Open for Academic Session 2026–2027",
      admissionCtaSubtitle: "Nurturing curious, confident, and character-driven leaders in Gaya, Bihar.",
      footerText: "Rooted in timeless values and modern innovation: 'Discipline Today, Leadership Tomorrow'.",
    },
  });
  console.log(`✅ School Profile seeded: ${profile.name}`);

  // 3. Academic Stages & Streams
  const stagesData = [
    {
      slug: "foundational-years",
      title: "Foundational & Early Years",
      classes: "Nursery, LKG, UKG, Grades 1 & 2",
      ageRange: "3 – 7 Years",
      description: "Play-based discovery, phonics immersion, sensory stimulation, social-emotional development, and early numeracy in sunlit, child-safe environments.",
      imageUrl: "/images/classrooms/smart-classroom.jpg",
      displayOrder: 1,
    },
    {
      slug: "preparatory-stage",
      title: "Preparatory Stage",
      classes: "Grades 3 to 5",
      ageRange: "8 – 10 Years",
      description: "Building bedrock conceptual clarity across mathematical reasoning, dual-language fluency (English & Hindi), environmental studies, and performing arts.",
      imageUrl: "/images/library/school-library.jpg",
      displayOrder: 2,
    },
    {
      slug: "middle-school",
      title: "Middle School",
      classes: "Grades 6 to 8",
      ageRange: "11 – 13 Years",
      description: "Transitioning to specialized disciplines: physics, chemistry, biology, advanced mathematics, computational coding, world history, and structured inter-house athletics.",
      imageUrl: "/images/labs/stem-robotics.jpg",
      displayOrder: 3,
    },
    {
      slug: "secondary-school",
      title: "Secondary School",
      classes: "Grades 9 & 10",
      ageRange: "14 – 15 Years",
      description: "Rigorous academic excellence, hands-on scientific experiments, analytical writing, digital literacy, and holistic preparation for national curriculum benchmarks.",
      imageUrl: "/images/campus/swayambhoo-main-campus.jpg",
      displayOrder: 4,
    },
    {
      slug: "senior-secondary",
      title: "Senior Secondary / +2",
      classes: "Grades 11 & 12",
      ageRange: "16 – 17 Years",
      description: "Comprehensive streams in Science, Commerce, and Humanities. Equipped with test-prep mentoring, specialized laboratories, and tailored higher-education counseling.",
      imageUrl: "/images/hero/swayambhoo-hero-facade.jpg",
      displayOrder: 5,
    },
  ];

  for (const s of stagesData) {
    const stage = await prisma.academicStage.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        classes: s.classes,
        ageRange: s.ageRange,
        description: s.description,
        imageUrl: s.imageUrl,
        displayOrder: s.displayOrder,
        status: "PUBLISHED",
      },
      create: {
        slug: s.slug,
        title: s.title,
        classes: s.classes,
        ageRange: s.ageRange,
        description: s.description,
        imageUrl: s.imageUrl,
        displayOrder: s.displayOrder,
        status: "PUBLISHED",
      },
    });

    // Configure Senior Secondary Streams (initially unpublished / not officially offered until admin toggles)
    if (s.slug === "senior-secondary") {
      const streams = [
        {
          slug: "science",
          name: "Science Stream",
          description: "Physics, Chemistry, Mathematics / Biology, Computer Science, and English with dedicated research lab access.",
          subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "English"],
          isOffered: false, // Per specification: configured by admin
          displayOrder: 1,
        },
        {
          slug: "commerce",
          name: "Commerce Stream",
          description: "Accountancy, Business Studies, Economics, Applied Mathematics / Informatics, and English.",
          subjects: ["Accountancy", "Business Studies", "Economics", "Applied Mathematics", "Informatics Practices", "English"],
          isOffered: false,
          displayOrder: 2,
        },
        {
          slug: "humanities",
          name: "Humanities & Liberal Arts",
          description: "History, Political Science, Psychology, Sociology, Legal Studies, and English.",
          subjects: ["History", "Political Science", "Psychology", "Sociology", "Legal Studies", "English"],
          isOffered: false,
          displayOrder: 3,
        },
      ];

      for (const st of streams) {
        await prisma.academicStream.upsert({
          where: {
            stageId_slug: {
              stageId: stage.id,
              slug: st.slug,
            },
          },
          update: {
            name: st.name,
            description: st.description,
            subjects: st.subjects,
            isOffered: st.isOffered,
            displayOrder: st.displayOrder,
          },
          create: {
            stageId: stage.id,
            name: st.name,
            slug: st.slug,
            description: st.description,
            subjects: st.subjects,
            isOffered: st.isOffered,
            displayOrder: st.displayOrder,
          },
        });
      }
    }
  }
  console.log(`✅ Academic Stages & +2 Streams seeded.`);

  // 4. Core Facilities
  const facilitiesData = [
    {
      slug: "smart-classrooms",
      name: "Interactive Smart Classrooms",
      tagline: "Digitally enabled, acoustically engineered, daylight-optimized spaces.",
      category: "Academics",
      description: "Every classroom features an interactive 4K smart interactive display, biophilic natural illumination, ergonomically designed desks, and dedicated personal reading shelves.",
      imageUrl: "/images/classrooms/smart-classroom.jpg",
      features: [
        "75-inch 4K Interactive Touch Panels",
        "Acoustic Insulation & Low-Glare Windows",
        "Ergonomic Posture-Friendly Wooden Desks",
        "Integrated Classroom Audio System",
      ],
      displayOrder: 1,
      isFeatured: true,
    },
    {
      slug: "stem-robotics-labs",
      name: "STEM, AI & Robotics Labs",
      tagline: "Where theoretical questions transform into inventive solutions.",
      category: "Innovation",
      description: "State-of-the-art laboratory benches with Arduino, Raspberry Pi, 3D modeling printers, and precision sensor kits, empowering young minds to build tomorrow's technology.",
      imageUrl: "/images/labs/stem-robotics.jpg",
      features: [
        "Dedicated Hardware Prototyping Workstations",
        "Robotics Kinematics & Drone Testing Kits",
        "3D Rapid Prototyping Stations",
        "Faculty Guided Project Incubators",
      ],
      displayOrder: 2,
      isFeatured: true,
    },
    {
      slug: "classical-library",
      name: "Classical Library & Study Pods",
      tagline: "A cathedral of thought with 12,000+ volumes and stepped reading alcoves.",
      category: "Learning",
      description: "Crafted with warm teak shelving, curved perimeter reading nooks, and a digital academic catalogue connected to global academic journals.",
      imageUrl: "/images/library/school-library.jpg",
      features: [
        "Curated Collection of 12,000+ Printed Titles",
        "Acoustic Individual Study Cubicles",
        "Digital Research Terminals with EBSCO Access",
        "Junior Storytelling & Phonics Corner",
      ],
      displayOrder: 3,
      isFeatured: true,
    },
    {
      slug: "indoor-sports-arena",
      name: "Olympic-Grade Sports Complex",
      tagline: "Nurturing character, agility, resilience, and sportsmanship.",
      category: "Athletics",
      description: "Featuring a certified maple-wood basketball arena, 4 indoor badminton bays, table tennis pavilion, yoga studio, and outdoor football turf.",
      imageUrl: "/images/sports/sports-complex.jpg",
      features: [
        "Shock-Absorbent Maple Wood Flooring",
        "National Tournament Regulation Lighting",
        "Professional Coaching Squad",
        "Outdoor Running Track & Football Turf",
      ],
      displayOrder: 4,
      isFeatured: true,
    },
    {
      slug: "biophilic-dining-hall",
      name: "Biophilic Dining & Nutrition Center",
      tagline: "Wholesome, clean, dietitian-curated vegetarian meals.",
      category: "Wellness",
      description: "Spotless commercial stainless steel kitchen with industrial RO purification. Serves freshly cooked, balanced nutritious meals in an airy dining hall.",
      imageUrl: "/images/dining/dining-hall.jpg",
      features: [
        "Multi-Stage RO Water Purification Plant",
        "Strict Hygiene & Steam Sanitization Standards",
        "Dietitian-Approved Seasonal Weekly Menus",
        "High-Ceiling Ventilated Seating for 600+",
      ],
      displayOrder: 5,
      isFeatured: false,
    },
    {
      slug: "safety-transportation",
      name: "Campus Security & GPS Fleet",
      tagline: "Uncompromising safety standards on campus and throughout transit.",
      category: "Campus",
      description: "24/7 security gate perimeter, comprehensive CCTV monitoring across corridors, dedicated female bus attendants, real-time GPS tracking, and staffed medical infirmary.",
      imageUrl: "/images/safety/campus-security.jpg",
      features: [
        "High-Definition CCTV Coverage on All Bus Routes",
        "Live GPS Tracking for Parents via Mobile App",
        "Full-Time Registered Nurse & First-Aid Infirmary",
        "Verified Security Personnel & RFID Turnstiles",
      ],
      displayOrder: 6,
      isFeatured: false,
    },
  ];

  for (const f of facilitiesData) {
    await prisma.facility.upsert({
      where: { slug: f.slug },
      update: {
        name: f.name,
        tagline: f.tagline,
        category: f.category,
        description: f.description,
        imageUrl: f.imageUrl,
        features: f.features,
        displayOrder: f.displayOrder,
        isFeatured: f.isFeatured,
        status: "PUBLISHED",
      },
      create: {
        slug: f.slug,
        name: f.name,
        tagline: f.tagline,
        category: f.category,
        description: f.description,
        imageUrl: f.imageUrl,
        features: f.features,
        displayOrder: f.displayOrder,
        isFeatured: f.isFeatured,
        status: "PUBLISHED",
      },
    });
  }
  console.log(`✅ Core Facilities seeded.`);

  // 5. Gallery Categories & Images
  const galleryCategories = [
    { name: "Campus & Architecture", slug: "architecture", sortOrder: 1 },
    { name: "Smart Classrooms", slug: "classrooms", sortOrder: 2 },
    { name: "STEM & Robotics", slug: "labs", sortOrder: 3 },
    { name: "Library Sanctuary", slug: "library", sortOrder: 4 },
    { name: "Sports Complex", slug: "sports", sortOrder: 5 },
    { name: "Dining & Nutrition", slug: "dining", sortOrder: 6 },
    { name: "Student Life & Uniform", slug: "student-life", sortOrder: 7 },
  ];

  for (const cat of galleryCategories) {
    const category = await prisma.galleryCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: { name: cat.name, slug: cat.slug, sortOrder: cat.sortOrder },
    });

    if (cat.slug === "architecture") {
      await prisma.galleryImage.upsert({
        where: { id: "gal-arch-1" },
        update: {},
        create: {
          id: "gal-arch-1",
          title: "Neoclassical Central Facade",
          description: "Symmetrical classical portico with grand architraves and biophilic central courtyard.",
          altText: "Grand neoclassical entrance of Swayambhoo International School",
          imageUrl: "/images/hero/swayambhoo-hero-facade.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 1,
          status: "PUBLISHED",
        },
      });
      await prisma.galleryImage.upsert({
        where: { id: "gal-arch-2" },
        update: {},
        create: {
          id: "gal-arch-2",
          title: "Academic Wings & Landscaped Quad",
          description: "Twin colonnaded academic wings overlooking native shade trees and manicured lawns.",
          altText: "Academic wings around central quad",
          imageUrl: "/images/campus/swayambhoo-main-campus.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 2,
          status: "PUBLISHED",
        },
      });
    } else if (cat.slug === "classrooms") {
      await prisma.galleryImage.upsert({
        where: { id: "gal-class-1" },
        update: {},
        create: {
          id: "gal-class-1",
          title: "Senior Interactive Classroom",
          description: "Ergonomic wooden tables, interactive smartboard, and biophilic natural lighting.",
          altText: "Modern smart classroom interior",
          imageUrl: "/images/classrooms/smart-classroom.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 1,
          status: "PUBLISHED",
        },
      });
    } else if (cat.slug === "labs") {
      await prisma.galleryImage.upsert({
        where: { id: "gal-labs-1" },
        update: {},
        create: {
          id: "gal-labs-1",
          title: "STEM Robotics & AI Innovation Lab",
          description: "Hardware testing benches and rapid prototyping stations.",
          altText: "Advanced STEM and robotics lab",
          imageUrl: "/images/labs/stem-robotics.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 1,
          status: "PUBLISHED",
        },
      });
    } else if (cat.slug === "library") {
      await prisma.galleryImage.upsert({
        where: { id: "gal-lib-1" },
        update: {},
        create: {
          id: "gal-lib-1",
          title: "Classical Library & Stepped Reading Sanctuary",
          description: "Curved wooden shelving with individual acoustic study nooks.",
          altText: "Library interior with reading pods",
          imageUrl: "/images/library/school-library.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 1,
          status: "PUBLISHED",
        },
      });
    } else if (cat.slug === "sports") {
      await prisma.galleryImage.upsert({
        where: { id: "gal-sport-1" },
        update: {},
        create: {
          id: "gal-sport-1",
          title: "Multi-Sport Indoor Complex",
          description: "FIBA regulation maple wood basketball court and badminton bays.",
          altText: "Indoor athletic arena",
          imageUrl: "/images/sports/sports-complex.jpg",
          categoryId: category.id,
          isConcept: true,
          sortOrder: 1,
          status: "PUBLISHED",
        },
      });
    }
  }
  console.log(`✅ Gallery Categories & Images seeded.`);

  // 6. Announcements
  await prisma.announcement.upsert({
    where: { slug: "admissions-open-2026-2027" },
    update: {},
    create: {
      title: "Admissions Open for Academic Session 2026–2027",
      slug: "admissions-open-2026-2027",
      summary: "Applications are now invited for Nursery through Grade 9 & Grade 11 (+2 Streams). Secure your child's educational foundation.",
      content: "Swayambhoo International School invites parents and guardians to submit admission enquiries for the upcoming academic session. Admissions are granted based on interaction sessions and seat availability. Campus tours and counselling sessions are available Monday through Saturday.",
      featuredImage: "/images/hero/swayambhoo-hero-facade.jpg",
      status: "PUBLISHED",
      publishDate: new Date(),
    },
  });

  await prisma.announcement.upsert({
    where: { slug: "campus-inauguration-and-walkthrough" },
    update: {},
    create: {
      title: "Architectural Showcase & Campus Walkthrough",
      slug: "campus-inauguration-and-walkthrough",
      summary: "Explore the biophilic neoclassical campus layout, smart learning labs, and Olympic sports arena.",
      content: "We are proud to present our campus master plan in Wazirganj, Gaya. Built to inspire reverence for learning and leadership.",
      featuredImage: "/images/campus/swayambhoo-main-campus.jpg",
      status: "PUBLISHED",
      publishDate: new Date(),
    },
  });

  await prisma.announcement.upsert({
    where: { slug: "national-robotics-showcase-preview" },
    update: {},
    create: {
      title: "Upcoming STEM & Robotics Curriculum Details",
      slug: "national-robotics-showcase-preview",
      summary: "Draft curriculum preview for coding and robotics modules from Grade 3 onwards.",
      content: "Full syllabus and lab schedule will be finalized in the upcoming faculty symposium.",
      status: "DRAFT",
    },
  });
  console.log(`✅ Announcements seeded.`);

  // 7. Events Calendar
  await prisma.event.upsert({
    where: { slug: "founders-orientation-2026" },
    update: {},
    create: {
      title: "Founders' Orientation & Campus Open Day",
      slug: "founders-orientation-2026",
      description: "Interactive session with school leadership, curriculum presentation, and personalized campus walkthrough for prospective families.",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      location: "Central Amphitheatre & Main Auditorium",
      imageUrl: "/images/hero/swayambhoo-hero-facade.jpg",
      status: "PUBLISHED",
    },
  });

  await prisma.event.upsert({
    where: { slug: "stem-science-symposium" },
    update: {},
    create: {
      title: "Young Innovators STEM Workshop",
      slug: "stem-science-symposium",
      description: "Hands-on robotics prototyping and computational thinking demo for students from Grades 4 to 8.",
      startDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
      location: "STEM & Robotics Innovation Lab",
      imageUrl: "/images/labs/stem-robotics.jpg",
      status: "PUBLISHED",
    },
  });
  console.log(`✅ Events seeded.`);

  // 8. Demonstration Admission Enquiries
  const demoEnquiries = [
    {
      studentName: "Aarav Kumar",
      parentName: "Rajesh Kumar",
      phone: "+91 98351 23456",
      whatsapp: "+91 98351 23456",
      email: "rajesh.kumar@example.com",
      currentClass: "UKG (Upper Kindergarten)",
      applyingFor: "Grade 1",
      academicSession: "Academic Session 2026–2027",
      message: "Interested in bus transportation from Wazirganj town center and curriculum details.",
      status: "NEW" as const,
      notes: "Received via online portal. Needs initial callback.",
    },
    {
      studentName: "Ananya Sharma",
      parentName: "Dr. Priya Sharma",
      phone: "+91 94312 87654",
      whatsapp: "+91 94312 87654",
      email: "dr.priya@example.com",
      currentClass: "Play School",
      applyingFor: "Nursery",
      academicSession: "Academic Session 2026–2027",
      message: "Looking for child-safe foundational facilities and student-teacher ratio.",
      status: "CONTACTED" as const,
      notes: "Counsellor spoke on 12-Sep. Campus visit scheduled for this Saturday.",
    },
    {
      studentName: "Rohan Verma",
      parentName: "Sunil Verma",
      phone: "+91 91234 56789",
      whatsapp: "+91 91234 56789",
      email: "sverma.gaya@example.com",
      currentClass: "Grade 5",
      applyingFor: "Grade 6",
      academicSession: "Academic Session 2026–2027",
      message: "Requesting information regarding robotics lab and sports facilities.",
      status: "FOLLOW_UP" as const,
      notes: "Parent visited campus; requested fee structure breakdown.",
    },
  ];

  for (const enq of demoEnquiries) {
    const existing = await prisma.admissionEnquiry.findFirst({
      where: { studentName: enq.studentName, parentName: enq.parentName },
    });
    if (!existing) {
      await prisma.admissionEnquiry.create({ data: enq });
    }
  }
  console.log(`✅ Demonstration CRM Enquiries seeded.`);

  // 9. Demonstration Contact Message
  const demoMsg = {
    fullName: "Manoj Kumar Sinha",
    phone: "+91 99345 67890",
    email: "mksinha@example.com",
    subject: "Transport Route Inquiry for Hisua / Nawada Border",
    message: "Greetings. We reside near the Hisua border on NH-82. Does the school transport fleet cover morning pick-up for this sector?",
    status: "UNREAD" as const,
    notes: "Route manager to verify route #4 feasibility.",
  };

  const existingMsg = await prisma.contactMessage.findFirst({
    where: { email: demoMsg.email, subject: demoMsg.subject },
  });
  if (!existingMsg) {
    await prisma.contactMessage.create({ data: demoMsg });
  }
  console.log(`✅ Demonstration Contact Message seeded.`);

  // 10. Site Settings
  const defaultSettings = [
    { key: "admissions_status", value: "OPEN", description: "Global admissions toggle" },
    { key: "academic_session_active", value: "2026–2027", description: "Current active academic session" },
    { key: "announcement_ticker_enabled", value: "true", description: "Display top notification ticker" },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    });
  }
  console.log(`✅ Site Settings seeded.`);

  console.log("🎉 All Phase 2 foundation content seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
