import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pkg from "pg";
import fp from "fastify-plugin";
import * as schema from "../models/schema.js";

export default fp(
  async (fastify) => {
    const pool = new pkg.Pool({
      connectionString: fastify.config.DATABASE_URL,
    });
    const db = drizzle(pool, { schema });
    fastify.decorate("db", db);
  },
  {
    dependencies: ["env"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    db: NodePgDatabase<typeof schema> & {
      $client: pkg.Pool;
    };
  }
}
