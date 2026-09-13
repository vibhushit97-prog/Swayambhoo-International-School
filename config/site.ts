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
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  academicStages: [
    {
      id: "foundational",
      title: "Foundational & Early Years",
      classes: "Nursery to Grade 2",
      ageGroup: "3 – 7 Years",
      description: "Play-based discovery, sensory exploration, phonics, and emotional resilience in child-centric nurturing spaces.",
    },
    {
      id: "preparatory",
      title: "Preparatory Stage",
      classes: "Grades 3 to 5",
      ageGroup: "8 – 10 Years",
      description: "Building strong foundations in mathematics, communicative languages, environmental science, arts, and physical fitness.",
    },
    {
      id: "middle",
      title: "Middle School",
      classes: "Grades 6 to 8",
      ageGroup: "11 – 13 Years",
      description: "Experiential inquiry, introduction to coding, scientific laboratories, structured sports, and critical thinking.",
    },
    {
      id: "secondary",
      title: "Secondary School",
      classes: "Grades 9 & 10",
      ageGroup: "14 – 15 Years",
      description: "Rigorous academic mastery, STEM & robotics challenges, career guidance, and leadership development.",
    },
    {
      id: "senior-secondary",
      title: "Senior Secondary / +2",
      classes: "Grades 11 & 12",
      ageGroup: "16 – 17 Years",
      description: "Configurable streams (Science, Commerce, Humanities) with advanced test-prep mentoring, state-of-the-art labs, and university counseling.",
    },
  ],
};
