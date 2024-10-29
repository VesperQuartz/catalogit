import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { z } from "zod";

const root: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/files",
    schema: {
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const picture = await request.file();
      fastify.log.info({ picture, message: "picture" });
      await pipeline(picture?.file!, createWriteStream(picture?.filename!));
      reply.send({
        message: "Hello",
      });
    },
  });
};

export default root;
