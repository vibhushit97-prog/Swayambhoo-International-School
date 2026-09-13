import { defineConfig } from "prisma/config";

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Ignore
  }
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
