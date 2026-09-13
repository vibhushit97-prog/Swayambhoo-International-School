export const CLASS_OPTIONS = [
  "Nursery",
  "LKG (Lower Kindergarten)",
  "UKG (Upper Kindergarten)",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11 - Science Stream (Proposed)",
  "Grade 11 - Commerce Stream (Proposed)",
  "Grade 11 - Humanities Stream (Proposed)",
  "Grade 12",
] as const;

export const ACADEMIC_SESSIONS = [
  "Academic Session 2025–2026",
  "Academic Session 2026–2027",
] as const;

export const CAMPUS_PILLARS = [
  {
    title: "Architectural Grandeur",
    description: "Built on biophilic design principles with classical symmetry, natural daylighting, open landscaped courtyards, and expansive learning spaces.",
    icon: "Building2",
  },
  {
    title: "Experiential STEM & AI",
    description: "Hands-on robotics laboratories, coding stations, and applied science spaces designed to nurture original inquiry from early years.",
    icon: "Cpu",
  },
  {
    title: "Holistic Physical Culture",
    description: "Olympic-grade indoor sports arena, maple wood basketball court, badminton, athletics, and traditional wellness disciplines.",
    icon: "Trophy",
  },
  {
    title: "Sensory & Quiet Sanctuaries",
    description: "Curved wood bookshelves, stepped reading nooks, and tranquil study pods fostering deep reading and reflective contemplation.",
    icon: "BookOpen",
  },
  {
    title: "Safety & Biophilic Well-being",
    description: "24/7 security perimeter, monitored bus transport, purified dining facilities, and dedicated infirmary care.",
    icon: "ShieldCheck",
  },
  {
    title: "Values & Character First",
    description: "Rooted in Indian ethos with a contemporary outlook: 'Discipline Today, Leadership Tomorrow'.",
    icon: "Award",
  },
] as const;

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "architecture", label: "Campus & Architecture" },
  { id: "classrooms", label: "Smart Classrooms" },
  { id: "labs", label: "STEM & Robotics" },
  { id: "library", label: "Library & Sanctuary" },
  { id: "sports", label: "Sports Complex" },
  { id: "dining", label: "Dining & Nutrition" },
  { id: "uniforms", label: "Uniform Identity" },
] as const;
