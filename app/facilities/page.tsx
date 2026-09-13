import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FacilityDetail } from "@/components/facilities/FacilityDetail";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { Facility } from "@/types/facility";
import { getPublishedFacilities } from "@/lib/data/school";

export const metadata = constructMetadata({
  title: "School Facilities | Smart Classrooms, Robotics Labs & Sports",
  description:
    "Explore the world-class facilities at Swayambhoo International School including STEM labs, maple sports arena, sensory library, and hygienic dining.",
  path: "/facilities",
});

const FACILITIES_DATA: Facility[] = [
  {
    id: "smart-classrooms",
    slug: "smart-classrooms",
    name: "Interactive Smart Classrooms",
    tagline: "Acoustically engineered daylight studios with modular learning pods",
    category: "academic",
    description:
      "Every classroom is equipped with high-definition digital smart boards, warm acoustic wood paneling, swiveling ergonomic chairs, and movable desks that facilitate instant transition between lecture and collaborative group work.",
    image: siteConfig.images.classrooms.smartClassroom,
    features: [
      "Ultra-HD 4K touch-interactive digital displays",
      "Ergonomic seating engineered for growing children",
      "Sound-absorbing acoustic wood paneling",
      "Expansive floor-to-ceiling windows with garden views",
    ],
    isConceptual: true,
  },
  {
    id: "stem-robotics",
    slug: "stem-robotics",
    name: "Advanced STEM & Robotics Laboratory",
    tagline: "Robotic arms, 3D prototyping, IoT micro-controllers and coding",
    category: "academic",
    description:
      "A flagship technology hub located in the Innovation Block. Equipped with coding terminals, electronics prototyping kits, sensor arrays, and rapid 3D printers, allowing students to design, fabricate, and test original mechanical and software projects.",
    image: siteConfig.images.labs.stemRobotics,
    features: [
      "Modular robotics assembly benches",
      "Dual rapid 3D prototyping stations",
      "Dedicated computer coding & algorithmic logic bays",
      "Faculty guidance from specialized robotics educators",
    ],
    isConceptual: true,
  },
  {
    id: "library",
    slug: "library",
    name: "Sensory Library & Reading Sanctuary",
    tagline: "Over 10,000+ curated volumes, stepped seating, and private reading pods",
    category: "academic",
    description:
      "Engineered as a tranquil sanctuary where books are celebrated. Curved natural timber shelving surrounds stepped soft-upholstered seating tiers and individual in-wall reading nooks, accompanied by a digital catalog and research repository.",
    image: siteConfig.images.library.main,
    features: [
      "Extensive literature, sciences, and reference collections",
      "Stepped amphitheater seating for literary sessions",
      "Private reading pods built into timber bookshelves",
      "Tranquil atmosphere with biophilic plant integration",
    ],
    isConceptual: true,
  },
  {
    id: "sports-complex",
    slug: "sports-complex",
    name: "Indoor Sports Complex & Athletics Arena",
    tagline: "Canadian maple hardwood court for basketball, badminton, and fitness",
    category: "sports",
    description:
      "An Olympic-standard indoor sports facility with professional maple hardwood flooring designed to absorb impact shock. Features championship basketball courts, badminton nets, table tennis arenas, and spectator galleries.",
    image: siteConfig.images.sports.complex,
    features: [
      "Certified maple hardwood cushioned flooring",
      "Full-court basketball & multi-court badminton",
      "Indoor gallery seating for student tournaments",
      "Certified physical education coaching staff",
    ],
    isConceptual: true,
  },
  {
    id: "dining-hall",
    slug: "dining-hall",
    name: "Hygienic Dining & Nutrition Hall",
    tagline: "Spacious natural ventilation, stainless steel service, and pure nutrition",
    category: "wellness",
    description:
      "A bright, naturally ventilated dining pavilion featuring stainless steel counters, automated handwashing bays, and nutritionally balanced meal options prepared under strict culinary hygiene standards.",
    image: siteConfig.images.dining.hall,
    features: [
      "Stainless steel food presentation counters",
      "Multi-station touch-free handwashing troughs",
      "Nutritious, freshly prepared balanced diets",
      "Strict food safety and water purification systems",
    ],
    isConceptual: true,
  },
  {
    id: "biophilic-courtyard",
    slug: "biophilic-courtyard",
    name: "Biophilic Courtyards & Green Campus",
    tagline: "Native trees, shaded walks, and outdoor learning circles",
    category: "campus",
    description:
      "Landscaped internal courtyards sheltered from hot seasonal winds, incorporating indigenous trees, reflexology footpaths, open-air assembly steps, and natural water retention ponds.",
    image: siteConfig.images.campus.courtyard,
    features: [
      "Over 40% green ground cover and mature trees",
      "Shaded colonnades and pedestrian walkways",
      "Outdoor amphitheatres for drama and class debates",
      "Vehicle-free interior safety zone",
    ],
    isConceptual: true,
  },
];

export default async function FacilitiesPage() {
  const dbFacilities = await getPublishedFacilities();

  const facilities: Facility[] =
    dbFacilities && dbFacilities.length > 0
      ? dbFacilities.map((f) => ({
          id: f.id,
          slug: f.slug,
          name: f.name,
          tagline: f.tagline,
          category: (f.category.toLowerCase() as Facility["category"]) || "campus",
          description: f.description,
          image: f.imageUrl,
          features: f.features,
          isConceptual: false,
        }))
      : FACILITIES_DATA;

  return (
    <div className="bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#081611] text-[#FDFBF7] py-20 lg:py-24 relative overflow-hidden border-b-2 border-[#C5A059]">
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A059]">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Facilities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              World-Class Infrastructure & Learning Studios
            </h1>

            <p className="text-base sm:text-lg text-[#E8DFC8]/90 font-sans leading-relaxed">
              Every facility at Swayambhoo is planned to stimulate curious young minds, support physical vitality, and provide an inspiring environment for K–12 excellence.
            </p>
          </div>
        </Container>
      </section>

      {/* Facilities Detailed Listing */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Institutional Amenities"
            title="Explore Our Core Campus Spaces"
            description="From digital classrooms to championship athletics, explore our purpose-built educational facilities."
          />

          <div className="space-y-8">
            {facilities.map((facility, index) => (
              <FacilityDetail
                key={facility.id}
                facility={facility}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </Container>
      </section>

      <AdmissionsCTA />
    </div>
  );
}
