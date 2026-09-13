import React from "react";
import { Facility } from "@/types/facility";
import { FacilityCard } from "./FacilityCard";

interface FacilityGridProps {
  facilities: Facility[];
}

export function FacilityGrid({ facilities }: FacilityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilities.map((facility) => (
        <FacilityCard key={facility.id} facility={facility} />
      ))}
    </div>
  );
}
