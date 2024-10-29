import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

const authHooks: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.decorateRequest("userPayload", null);
  fastify.addHook("preHandler", async (request, _reply) => {
    let authToken, verifyToken;
    authToken = request.headers["authorization"];
    if (!authToken) {
      throw fastify.httpErrors.unauthorized();
    }
    authToken = authToken.split(" ")[1];
    try {
      verifyToken = fastify.jwt.verify<
        { email: string; password: string; id: string } & {
          iat: number;
          sub: string;
        }
      >(authToken);
      request.userPayload = verifyToken;
      return request;
    } catch (error) {
      fastify.log.error(error);
      throw fastify.httpErrors.unauthorized();
    }
  });
};

declare module "fastify" {
  export interface FastifyRequest {
    userPayload:
      | ({ email: string; password: string; id: string } & {
          iat: number;
          sub: string;
        })
      | null;
  }
}
export default authHooks;
