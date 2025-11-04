import { neon } from "@neondatabase/serverless";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile(path.join(process.cwd(), "/.env"));
}
// const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// const URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
export const serverNeonDB = neon(process.env.NEON_DB_2);