import { neon } from "@neondatabase/serverless";
import path from "path";

process.loadEnvFile(path.join(process.cwd(), "/.env"));
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

export const serverNeonDB = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);