import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",       // points to your schema file
  out: "./drizzle/migrations",         // drizzle will generate .sql migrations here
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,    // Neon connection string in .env
  },
});
