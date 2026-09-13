import prisma from "@/lib/prisma";

/**
 * Generate a guaranteed unique, sequential, human-readable Application ID
 * Format: SWIS-2026-000001, SWIS-2026-000002, etc.
 */
export async function generateApplicationNumber(): Promise<string> {
  const currentYear = new Date().getFullYear();

  // Atomically increment the sequence counter in PostgreSQL
  const sequence = await prisma.recruitmentSequence.upsert({
    where: { id: "recruitment_app_seq" },
    update: {
      currentNumber: { increment: 1 },
      year: currentYear,
    },
    create: {
      id: "recruitment_app_seq",
      year: currentYear,
      currentNumber: 1,
    },
  });

  const paddedNumber = String(sequence.currentNumber).padStart(6, "0");
  return `SWIS-${sequence.year}-${paddedNumber}`;
}
