export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const siteConfig = {
  name: "Swayambhoo International School",
  shortName: "Swayambhoo",
  tagline: "LEARN. EXPLORE. CREATE. LEAD.",
  motto: "LEARN • GROW • LEAD",
  campusMotto: "Discipline Today, Leadership Tomorrow",
  established: "2024",
  description:
    "Swayambhoo International School — nurturing confident, curious and responsible learners through academic excellence, technology, sports and holistic education in Wazirganj, Gaya, Bihar.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://swayambhoointernationalschool.com",

  contact: {
    address: {
      street: "Main Campus, Near NH-82",
      locality: "Wazirganj",
      city: "Gaya",
      state: "Bihar",
      pincode: "805131",
      country: "India",
      full: "Wazirganj, Gaya, Bihar – 805131, India",
    },
    phone: "+91 92412 18844",
    phoneDisplay: "+91 92412 18844",
    whatsapp: "+91 96614 48541",
    whatsappRaw: "91966148541",
    email: "info@swayambhooschool.com",
    admissionsEmail: "admissions@swayambhooschool.com",
    officeHours: "Monday – Saturday: 8:00 AM – 3:30 PM",
  },

  socialLinks: {
    facebook: "https://facebook.com/swayambhooschool",
    instagram: "https://instagram.com/swayambhooschool",
    youtube: "https://youtube.com/@swayambhooschool",
    linkedin: "https://linkedin.com/company/swayambhooschool",
  },

  images: {
    logo: "/logo/swayambhoo-logo.svg",
    emblem: "/logo/swayambhoo-emblem.svg",
    heroImage: "/images/hero/swayambhoo-hero-facade.jpg",
    campus: {
      main: "/images/campus/swayambhoo-main-campus.jpg",
      courtyard: "/images/campus/campus-courtyard.jpg",
    },
    classrooms: {
      smartClassroom: "/images/classrooms/smart-classroom.jpg",
    },
    labs: {
      stemRobotics: "/images/labs/stem-robotics.jpg",
    },
    library: {
      main: "/images/library/school-library.jpg",
    },
    sports: {
      complex: "/images/sports/sports-complex.jpg",
    },
    dining: {
      hall: "/images/dining/dining-hall.jpg",
    },
    safety: {
      security: "/images/safety/campus-security.jpg",
    },
    studentLife: {
      activities: "/images/student-life/student-activities.jpg",
    },
    uniforms: {
      boys: "/images/uniforms/boys-uniform.jpg",
      girls: "/images/uniforms/girls-uniform.jpg",
    },
  },

  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Campus", href: "/campus" },
    { label: "Facilities", href: "/facilities" },
    { label: "Student Life", href: "/student-life" },
    { label: "Admissions", href: "/admissions" },
    { label: "Careers", href: "/careers" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  academicStages: [
    {
      id: "foundational",
      title: "Foundational & Early Years",
      classes: "Nursery to Grade 2",
      ageGroup: "3 – 7 Years",
      image: "/images/academics/foundational-stage.jpg",
      nepFocus: "Early Childhood Care & Education (NEP 5+3+3+4)",
      description:
        "Play-based discovery, sensory exploration, phonics, and emotional resilience in child-centric nurturing spaces.",
      curriculumOverview:
        "Our early childhood ecosystem adopts a play-way, Montessori-integrated, and NEP 2020 aligned framework. We build foundational literacy, numeracy, emotional quotient, and social empathy in vibrant, sunny classrooms equipped with child-safe manipulatives, reading corners, and sensory stations.",
      coreSubjects: [
        "Phonics & Pre-Reading (Jolly Phonics)",
        "Early Math & Number Sense",
        "Environmental Exploration (EVS)",
        "Bilingual Hindi & English Rhymes",
        "Motor Skills & Sensory Play",
        "Expressive Arts & Music",
        "Values & Social Empathy Tales",
      ],
      keyCompetencies: [
        "Strong phonetic phonological awareness & letter blending",
        "Basic addition/subtraction through concrete manipulatives",
        "Fine motor coordination & handwriting control",
        "Emotional self-regulation and polite peer collaboration",
        "Joyful curiosity and active questioning",
      ],
      teachingMethodology: [
        "1:15 Low Teacher-to-Student Mentorship Ratio",
        "Thematic experiential learning units each month",
        "Continuous observational assessment with zero stress exams",
        "Storytelling, roleplay, and child-safe indoor play modules",
      ],
      facultyRatio: "1:15 Ratio • Dedicated Co-Teacher & Nanny Care",
      defaultApplyingFor: "Nursery",
      highlights: [
        "Montessori & Phonics integrated daily modules",
        "Child-safe wooden furniture & non-toxic learning toys",
        "Warm, emotionally secure environment with individual tracking",
      ],
    },
    {
      id: "preparatory",
      title: "Preparatory Stage",
      classes: "Grades 3 to 5",
      ageGroup: "8 – 10 Years",
      image: "/images/academics/preparatory-stage.jpg",
      nepFocus: "Discovery & Interactive Classroom Learning",
      description:
        "Building strong foundations in mathematics, communicative languages, environmental science, arts, and physical fitness.",
      curriculumOverview:
        "Transitioning smoothly from playful learning to structured inquiry. Students explore the natural world through experiments, develop mathematical mental agility through word problems and real-world models, and attain articulate bilingual command of English and Hindi.",
      coreSubjects: [
        "English Language & Classical Literature",
        "Mathematics (Conceptual & Mental Arithmetic)",
        "Environmental Studies (EVS) & Basic Science",
        "Hindi Bhasha & Vyakaran",
        "Computer Literacy & Logic Thinking",
        "Visual & Performing Arts",
        "Yoga, Structured Physical Education & Athletics",
      ],
      keyCompetencies: [
        "Critical reading comprehension and expressive writing",
        "Multi-step mathematical problem-solving",
        "Basic scientific method (observation, hypothesis, deduction)",
        "Articulate bilingual verbal communication",
        "Collaborative group project presentation skills",
      ],
      teachingMethodology: [
        "Interactive smart-screen visual classroom explanations",
        "Hands-on science kits, globe investigations, and plant observations",
        "Reading circles and library hour every week",
        "Continuous Comprehensive Evaluation (CCE) diagnostic feedback",
      ],
      facultyRatio: "1:20 Ratio • Specialized Subject Teachers",
      defaultApplyingFor: "Grade 3",
      highlights: [
        "Hands-on science discovery kits and globe studies",
        "Mental arithmetic mastery and competitive problem solving",
        "Digital literacy lab sessions and typing fundamentals",
      ],
    },
    {
      id: "middle",
      title: "Middle School",
      classes: "Grades 6 to 8",
      ageGroup: "11 – 13 Years",
      image: "/images/academics/middle-school-stage.jpg",
      nepFocus: "Experiential STEM, Robotics & Analytical Thinking",
      description:
        "Experiential inquiry, introduction to coding, scientific laboratories, structured sports, and critical thinking.",
      curriculumOverview:
        "Fostering analytical depth and multidisciplinary connections. Science branches into dedicated Physics, Chemistry, and Biology modules with weekly laboratory investigations. Mathematics embraces formal algebra and geometry, while computer labs introduce Python, web technologies, and robotics.",
      coreSubjects: [
        "Physics, Chemistry & Biology (Weekly Lab Practicals)",
        "Mathematics (Algebra, Geometry, Coordinate Systems)",
        "Social Sciences (History, Geography, Democratic Politics)",
        "English Communicative & Literary Studies",
        "Hindi / Mother Tongue Specialization",
        "Third Language (Sanskrit / French Fundamentals)",
        "Artificial Intelligence, Python & Robotics Maker-Space",
        "Competitive Sports, Martial Arts & Fitness",
      ],
      keyCompetencies: [
        "Controlled laboratory experiment execution & recordkeeping",
        "Algorithmic reasoning, algorithmic loops & computational modeling",
        "Historical contextualization and civic awareness",
        "Persuasive essay writing, parliamentary debates & oratory",
        "Independent research project synthesis",
      ],
      teachingMethodology: [
        "Subject-specialist masters-level educators for each discipline",
        "Weekly maker-space sessions with microcontrollers & robotics kits",
        "Inter-house science exhibitions and model United Nations",
        "Regular diagnostic assessments with actionable remedial guidance",
      ],
      facultyRatio: "1:25 Ratio • Dedicated Lab Technicians & Instructors",
      defaultApplyingFor: "Grade 6",
      highlights: [
        "Dedicated STEM & Robotics Maker-Space with Arduino kits",
        "Comprehensive Physics, Chemistry & Biology wet & dry labs",
        "Third language introduction (Sanskrit / Foreign languages)",
      ],
    },
    {
      id: "secondary",
      title: "Secondary School",
      classes: "Grades 9 & 10",
      ageGroup: "14 – 15 Years",
      image: "/images/academics/secondary-school-stage.jpg",
      nepFocus: "Academic Rigor, CBSE Board Mastery & Leadership",
      description:
        "Rigorous academic mastery, STEM & robotics challenges, career guidance, and leadership development.",
      curriculumOverview:
        "Targeted delivery of the national CBSE secondary curriculum paired with deep conceptual rigor. Students build a formidable academic profile while receiving personalized mentoring for Olympiads, NTSE, and high-school board examinations in a structured, inspiring atmosphere.",
      coreSubjects: [
        "CBSE Integrated Science (Physics, Chemistry & Biology with Labs)",
        "Mathematics (Standard / Basic Options with Geometry Lab)",
        "Social Science (India & Contemporary World, Economics)",
        "English Language & Literature",
        "Hindi Course-A / Sanskrit",
        "Information Technology (Vocational CBSE Skill Subject)",
        "Physical & Health Education & General Studies",
      ],
      keyCompetencies: [
        "High-performance CBSE board examination writing technique",
        "Olympiad, NTSE, and competitive aptitude readiness",
        "Mathematical proof formulation and quantitative precision",
        "Time-pressured critical reasoning and examination stamina",
        "Ethical student council leadership and community outreach",
      ],
      teachingMethodology: [
        "Rigorous syllabus completion followed by structured mock board exams",
        "Chapter-wise previous 10-year CBSE question bank dissection",
        "Remedial one-on-one doubt clarification clinics every afternoon",
        "Comprehensive career orientation and psychometric profiling",
      ],
      facultyRatio: "1:25 Ratio • Senior CBSE Board Specialists",
      defaultApplyingFor: "Grade 9",
      highlights: [
        "Extensive pre-board exam series and diagnostic answer analysis",
        "Special Olympiad (NSO, IMO, NTSE) coaching tracks",
        "Career counseling workshops and university path planning",
      ],
    },
    {
      id: "senior-secondary",
      title: "Senior Secondary Specializations / +2",
      classes: "Grades 11 & 12",
      ageGroup: "16 – 17 Years",
      image: "/images/academics/senior-secondary-stage.jpg",
      nepFocus: "Higher Scholarship, Competitive Entrance & University Transition",
      description:
        "Configurable streams (Science, Commerce, Humanities) with advanced test-prep mentoring, state-of-the-art labs, and university counseling.",
      curriculumOverview:
        "Preparing scholars in Grades 11 and 12 for premier university admissions (IIT-JEE, NEET, CUET, CA Foundation, CLAT, and global degrees). Stream choices offer rigorous disciplinary focus taught by distinguished faculty with university-level research backgrounds.",
      coreSubjects: [
        "Science: Physics, Chemistry, Math/Bio, Computer Science/Python",
        "Commerce: Accountancy, Business Studies, Economics, Applied Math",
        "Humanities: History, Political Science, Economics, Psychology, English",
      ],
      keyCompetencies: [
        "Mastery of national entrance examination syllabi (JEE/NEET/CUET)",
        "Advanced laboratory synthesis and empirical data analysis",
        "Financial model construction and economic thesis writing",
        "Analytical argumentative essays and constitutional law critique",
      ],
      teachingMethodology: [
        "Lectures in modern tiered seminar rooms and digital projection labs",
        "Integrated competitive test-series with all-India percentile metrics",
        "Expert guest seminars by scientists, civil servants & corporate leaders",
        "Dedicated study halls and late-evening academic mentor hours",
      ],
      facultyRatio: "1:20 Ratio • Senior Subject Masters & Entrance Mentors",
      defaultApplyingFor: "Grade 11 - Science Stream (Proposed)",
      highlights: [
        "Integrated test preparation for JEE, NEET, CUET & CA Foundation",
        "University counseling desk and scholarship application support",
        "Advanced digital simulation software and research library",
      ],
    },
  ],
};

