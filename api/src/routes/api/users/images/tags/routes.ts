import { pipeline } from "@xenova/transformers";
import * as R from "remeda";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { categories } from "../../../../../utils/data.js";
import { fileSchema, fileTable } from "../../../../../models/schema.js";
import { eq } from "drizzle-orm";

const tags: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      response: {
        200: z.any(),
      },
    },
    handler: async (request) => {
      const userPayload = request.userPayload;
      let error;
      fastify.log.info({ userPayload });
      console.log("payload", userPayload);
      const classifier = await pipeline(
        "zero-shot-image-classification",
        "Xenova/clip-vit-base-patch16",
      );
      const file = await request.file();
      const buffer = await file?.toBuffer();
      const upload = await fastify.s3
        .upload({
          Bucket: "lectus-bucket",
          Key: file?.filename!,
          Body: buffer,
          ContentType: file?.mimetype,
        })
        .promise();
      const embedding = await fastify.visionEmbeddingGenerator({
        image_url: upload.Location,
      });
      const output = await classifier(upload.Location, categories);
      const tagFile = await fastify.db
        .insert(fileTable)
        .values({
          key: upload.Location,
          tags: (output[0] as any).label,
          userId: userPayload!.id,
        })
        .returning({ id: fileTable.id });
      const [_error, collections] = await fastify.to(
        fastify.chroma.getOrCreateCollection({
          name: "catalog",
          embeddingFunction: fastify.embeddingFunction,
        }),
      );
      [error] = await fastify.to(
        collections.add({
          ids: [`${userPayload!.id}+${tagFile[0].id}`],
          embeddings: [Object.entries(embedding as any) as any],
          metadatas: [{ id: userPayload!.id, tags: (output[0] as any).label }],
        }),
      );
      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.internalServerError(
          "Cannot add to collection",
        );
      }
      return { message: "tag compete", output };
    },
  });
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.record(z.string(), z.array(fileSchema)),
      },
    },
    handler: async (request) => {
      const payload = request.userPayload;
      const [error, tags] = await fastify.to(
        fastify.db.query.fileTable.findMany({
          where: eq(fileTable.userId, payload!.id),
        }),
      );
      if (error) throw fastify.httpErrors.internalServerError();
      return R.groupBy(tags, (items) => items.tags);
    },
  });
  fastify.route({
    method: "GET",
    url: "/:tag",
    schema: {
      params: z.object({
        tag: z.string(),
      }),
      response: {
        200: z.array(fileSchema),
      },
    },
    handler: async (request) => {
      const { tag } = request.params;
      const payload = request.userPayload;
      const [error, tags] = await fastify.to(
        fastify.db.query.fileTable.findMany({
          where: eq(fileTable.userId, payload!.id) && eq(fileTable.tags, tag),
        }),
      );
      if (error) throw fastify.httpErrors.internalServerError();
      return tags;
    },
  });
};

export default tags;
