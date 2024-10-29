import dotenvExpand from "dotenv-expand";
import * as env from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenvExpand.expand(env.config());
export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
