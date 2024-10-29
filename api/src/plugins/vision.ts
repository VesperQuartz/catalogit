import fp from "fastify-plugin";
import {
  AutoProcessor,
  CLIPVisionModelWithProjection,
  RawImage,
} from "@xenova/transformers";

const processorPromise = AutoProcessor.from_pretrained(
  "Xenova/clip-vit-base-patch16",
);
const visionModelPromise = CLIPVisionModelWithProjection.from_pretrained(
  "Xenova/clip-vit-base-patch16",
);

export default fp(
  async (fastify) => {
    fastify.decorate(
      "visionEmbeddingGenerator",
      async ({ image_url }: { image_url: string }) => {
        let processor, error, visionModel, image, imageInputs;
        [error, processor] = await fastify.to(processorPromise);
        if (error) {
          fastify.log.error(error);
          throw new Error(error.message);
        }
        [error, visionModel] = await fastify.to(visionModelPromise);
        if (error) {
          fastify.log.error(error);
          throw new Error(error.message);
        }
        [error, image] = await fastify.to(RawImage.read(image_url));
        if (error) {
          fastify.log.error(error);
          throw new Error(error.message);
        }
        [error, imageInputs] = await fastify.to(processor(image));
        if (error) {
          fastify.log.error(error);
          throw new Error(error.message);
        }
        try {
          const { image_embeds } = await visionModel(imageInputs);
          return image_embeds?.data;
        } catch (error) {
          fastify.log.error(error);
        }
      },
    );
  },
  {
    name: "vision",
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    visionEmbeddingGenerator({ image_url }: { image_url: string }): any;
  }
}
