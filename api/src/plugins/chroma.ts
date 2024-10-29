import fp from "fastify-plugin";
import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";

const client = new ChromaClient({ path: "http://0.0.0.0:8000" });

export default fp(
  async (fastify) => {
    const embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: fastify.config.OPENAI_API_KEY,
      openai_model: "text-embedding-3-small",
    });
    fastify.decorate("chroma", client);
    fastify.decorate("embeddingFunction", embeddingFunction);
  },
  {
    name: "chroma",
    dependencies: ["env"],
  },
);

declare module "fastify" {
  export interface FastifyInstance {
    chroma: ChromaClient;
    embeddingFunction: OpenAIEmbeddingFunction;
  }
}
