import fp from "fastify-plugin";
import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const s3 = new AWS.S3();
export default fp(async (fastify) => {
  fastify.decorate("s3", s3);
});

declare module "fastify" {
  export interface FastifyInstance {
    s3: AWS.S3;
  }
}
