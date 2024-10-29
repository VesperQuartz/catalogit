import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

export default fp(
  async (fastify) => {
    await fastify.register(fastifyJwt, {
      secret: fastify.config.JWT_SECRET,
    });
  },
  {
    dependencies: ["env"],
  },
);
