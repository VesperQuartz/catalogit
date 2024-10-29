import fp from "fastify-plugin";
import { fastifyBcrypt } from "fastify-bcrypt";

export default fp(async (fastify) => {
  await fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12,
  });
});
