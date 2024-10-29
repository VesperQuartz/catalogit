import fp from "fastify-plugin";
import fastifyCsrf from "@fastify/csrf-protection";

export default fp(async (fastify) => {
  await fastify.register(fastifyCsrf, { cookieOpts: { signed: true } });
});
