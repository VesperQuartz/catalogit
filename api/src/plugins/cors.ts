import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async (fastify) => {
  await fastify.register(cors, {
    credentials: true,
    origin: [
      /http(s)?:\/\/localhost:([0-9]+)?/,
      /http(s)?:\/\/127.0.0.1:([0-9]+)?/,
      "https://mrlectus.local",
    ],
    exposedHeaders: ["Authorization", "Set-Cookie"],
  });
});
