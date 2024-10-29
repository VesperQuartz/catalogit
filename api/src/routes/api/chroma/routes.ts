import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

const root: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: z.object({
        name: z.string(),
      }),
      response: {
        200: z.object({
          message: z.string(),
          name: z.string(),
          id: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { name } = request.body;
      const [error, collections] = await fastify.to(
        fastify.chroma.createCollection({
          name,
          embeddingFunction: fastify.embeddingFunction,
        }),
      );
      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.internalServerError(
          "cannot create collections",
        );
      }
      return {
        message: "collection created",
        id: collections.id,
        name: collections.name,
      };
    },
  });
};

export default root;
