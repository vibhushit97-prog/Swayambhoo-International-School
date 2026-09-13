// scripts/seed.ts
// Foundation seed script for Swayambhoo International School

import { siteConfig } from "../config/site";

async function main() {
  console.log("Seeding Swayambhoo International School foundation data...");
  console.log(`School: ${siteConfig.name} (${siteConfig.tagline})`);
  console.log(`Campus Location: ${siteConfig.contact.address.full}`);

  if (process.env.DATABASE_URL) {
    try {
      const PrismaModule = await import("@prisma/client");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ClientClass = (PrismaModule as any).PrismaClient;
      if (ClientClass) {
        const prisma = new ClientClass();
        console.log("Connected to database. Seeding school profile and core facilities...");

        // Upsert School Profile
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).schoolProfile.upsert({
          where: { id: "school-profile-main" },
          update: {},
          create: {
            id: "school-profile-main",
            name: siteConfig.name,
            tagline: siteConfig.tagline,
            motto: siteConfig.motto,
            description: siteConfig.description,
            addressStreet: siteConfig.contact.address.street,
            addressLocality: siteConfig.contact.address.locality,
            addressCity: siteConfig.contact.address.city,
            addressState: siteConfig.contact.address.state,
            addressPincode: siteConfig.contact.address.pincode,
            phone: siteConfig.contact.phone,
            whatsapp: siteConfig.contact.whatsapp,
            email: siteConfig.contact.email,
            logoUrl: siteConfig.images.logo,
            heroImageUrl: siteConfig.images.heroImage,
          },
        });

        console.log("School profile seeded successfully in PostgreSQL.");
        await prisma.$disconnect();
      }
    } catch (err) {
      console.warn("Prisma client not yet generated or DB unreachable. Seed template prepared.", err);
    }
  } else {
    console.log("DATABASE_URL not set. In-memory and configuration assets active for Phase 1.");
  }
}

main().catch((e) => {
  console.error("Seed error:", e);
});
