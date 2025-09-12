// lib/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/drizzle/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Did you set it in .env.local?");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
