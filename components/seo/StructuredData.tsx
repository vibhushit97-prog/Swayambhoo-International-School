import React from "react";
import { siteConfig } from "@/config/site";

export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteConfig.name,
    alternateName: "Swayambhoo School Gaya",
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    foundingDate: siteConfig.established,
    slogan: siteConfig.tagline,
    logo: `${siteConfig.url}/logo/swayambhoo-emblem.svg`,
    image: `${siteConfig.url}/images/campus/swayambhoo-main-campus.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.locality,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.8105",
      longitude: "85.2346",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "15:30",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "admissions",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
