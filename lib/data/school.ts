import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";

export interface ResolvedSchoolProfile {
  id: string;
  name: string;
  tagline: string;
  motto: string;
  campusMotto: string;
  description: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
  };
  phone: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  admissionsEmail: string;
  logoUrl: string;
  heroImageUrl: string;
  socialLinks: Record<string, string>;
  admissionCtaTitle: string;
  admissionCtaSubtitle: string;
  footerText: string;
}

export async function getSchoolProfile(): Promise<ResolvedSchoolProfile> {
  try {
    const profile = await prisma.schoolProfile.findUnique({
      where: { id: "school-profile-main" },
    });

    if (profile) {
      return {
        id: profile.id,
        name: profile.name,
        tagline: profile.tagline,
        motto: profile.motto,
        campusMotto: profile.campusMotto,
        description: profile.description,
        address: {
          street: profile.addressStreet,
          locality: profile.addressLocality,
          city: profile.addressCity,
          state: profile.addressState,
          pincode: profile.addressPincode,
          full: `${profile.addressLocality}, ${profile.addressCity}, ${profile.addressState} – ${profile.addressPincode}, India`,
        },
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        whatsappRaw: profile.whatsapp.replace(/\D/g, ""),
        email: profile.email,
        admissionsEmail: profile.admissionsEmail,
        logoUrl: profile.logoUrl,
        heroImageUrl: profile.heroImageUrl,
        socialLinks: (profile.socialLinks as Record<string, string>) || siteConfig.socialLinks,
        admissionCtaTitle: profile.admissionCtaTitle,
        admissionCtaSubtitle: profile.admissionCtaSubtitle,
        footerText: profile.footerText,
      };
    }
  } catch (error) {
    console.warn("[CMS Fallback] Database profile unreachable, using static fallback:", error);
  }

  // Graceful fallback to static configuration
  return {
    id: "static-fallback",
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    motto: siteConfig.motto,
    campusMotto: siteConfig.campusMotto,
    description: siteConfig.description,
    address: siteConfig.contact.address,
    phone: siteConfig.contact.phone,
    whatsapp: siteConfig.contact.whatsapp,
    whatsappRaw: siteConfig.contact.whatsappRaw,
    email: siteConfig.contact.email,
    admissionsEmail: siteConfig.contact.admissionsEmail,
    logoUrl: siteConfig.images.logo,
    heroImageUrl: siteConfig.images.heroImage,
    socialLinks: siteConfig.socialLinks,
    admissionCtaTitle: "Admissions Open for Academic Session 2026–2027",
    admissionCtaSubtitle: "Secure your child's future at Gaya's premier educational campus.",
    footerText: "Rooted in timeless values and modern innovation: 'Discipline Today, Leadership Tomorrow'.",
  };
}

export async function getPublishedFacilities() {
  try {
    const facilities = await prisma.facility.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });
    if (facilities.length > 0) return facilities;
  } catch (error) {
    console.warn("[CMS Fallback] Facilities query fallback:", error);
  }
  return [];
}

export async function getPublishedAcademicStages() {
  try {
    const stages = await prisma.academicStage.findMany({
      where: { status: "PUBLISHED" },
      include: {
        streams: {
          where: { isOffered: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });
    if (stages.length > 0) return stages;
  } catch (error) {
    console.warn("[CMS Fallback] Academic stages fallback:", error);
  }
  return [];
}

export async function getPublishedGallery() {
  try {
    const categories = await prisma.galleryCategory.findMany({
      include: {
        images: {
          where: { status: "PUBLISHED" },
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
    return categories;
  } catch (error) {
    console.warn("[CMS Fallback] Gallery query fallback:", error);
    return [];
  }
}

export async function getPublishedAnnouncements() {
  try {
    return await prisma.announcement.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishDate: "desc" },
    });
  } catch (error) {
    console.warn("[CMS Fallback] Announcements query fallback:", error);
    return [];
  }
}

export async function getUpcomingEvents() {
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        startDate: { gte: cutoff },
      },
      orderBy: { startDate: "asc" },
    });
  } catch (error) {
    console.warn("[CMS Fallback] Events query fallback:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  } catch {
    return {};
  }
}
