import React from "react";
import { constructMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { SchoolIntroduction } from "@/components/home/SchoolIntroduction";
import { WhySwayambhoo } from "@/components/home/WhySwayambhoo";
import { AcademicOverview } from "@/components/home/AcademicOverview";
import { SmartClassrooms } from "@/components/home/SmartClassrooms";
import { STEMSection } from "@/components/home/STEMSection";
import { CampusArchitecture } from "@/components/home/CampusArchitecture";
import { SportsSection } from "@/components/home/SportsSection";
import { LibrarySection } from "@/components/home/LibrarySection";
import { StudentLifeSection } from "@/components/home/StudentLifeSection";
import { SafetySection } from "@/components/home/SafetySection";
import { SustainabilitySection } from "@/components/home/SustainabilitySection";
import { AdmissionsCTA } from "@/components/home/AdmissionsCTA";
import { LocationSection } from "@/components/home/LocationSection";

export const metadata = constructMetadata({
  title: "Swayambhoo International School | Gaya, Bihar",
  description:
    "Swayambhoo International School — nurturing confident, curious and responsible learners through academic excellence, technology, sports and holistic education in Wazirganj, Gaya, Bihar.",
  path: "",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SchoolIntroduction />
      <WhySwayambhoo />
      <AcademicOverview />
      <SmartClassrooms />
      <STEMSection />
      <CampusArchitecture />
      <SportsSection />
      <LibrarySection />
      <StudentLifeSection />
      <SafetySection />
      <SustainabilitySection />
      <AdmissionsCTA />
      <LocationSection />
    </>
  );
}
