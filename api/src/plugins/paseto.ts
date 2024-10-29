import fp from "fastify-plugin";
import paseto from "paseto";
const { V4: { sign, verify, generateKey }} = paseto; 
export default fp(async (fastify) => {
  fastify.decorate("pasetoSign", sign);
  fastify.decorate("pasetoVerify", verify);
  fastify.decorate("pasetoGenerateKey", generateKey);
});
