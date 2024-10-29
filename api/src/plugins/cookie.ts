import fp from "fastify-plugin";
import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie";

export default fp(
  async (fastify) => {
    await fastify.register(fastifyCookie, {
      secret: fastify.config.COOKIE_SECRET,
      parseOptions: {
        secure: true,
        httpOnly: true,
        path: "/",
        sameSite: "none",
        partitioned: true,
      },
    } as FastifyCookieOptions);
  },
  {
    dependencies: ["env"],
  },
);
