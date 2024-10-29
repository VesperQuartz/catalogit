import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { userSchema, usersTable } from "../../../models/schema.js";
import { eq } from "drizzle-orm";

const users: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async () => {},
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      params: z.object({
        id: z.string(),
      }),
      response: {
        200: userSchema,
      },
    },
    handler: async (request) => {
      const { id } = request.params;
      const [error, user] = await fastify.to(
        fastify.db.query.usersTable.findFirst({
          where: eq(usersTable.id, id),
        }),
      );
      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.internalServerError();
      }
      return user;
    },
  });
};

export default users;
