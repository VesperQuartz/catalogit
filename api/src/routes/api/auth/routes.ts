import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { usersTable } from "../../../models/schema.js";
import { eq } from "drizzle-orm";
import { add } from "date-fns";

const auth: FastifyPluginAsyncZod = async function (fastify, _opts) {
  fastify.route({
    method: "POST",
    url: "/register",
    schema: {
      body: z.object({
        email: z.string().email({ message: "Please enter a valid email" }),
        username: z.string().min(3),
        password: z
          .string()
          .min(6, { message: "Password must be 6 or more characters" }),
      }),
      response: {
        200: z.object({
          message: z.string(),
          payload: z.object({
            token: z.string(),
            id: z.string(),
            username: z.string(),
            email: z.string(),
          }),
        }),
      },
    },
    handler: async (request, reply) => {
      let passwordHash, error, isExist, user;
      user = request.body;
      // hash the password
      [error, passwordHash] = await fastify.to(
        fastify.bcrypt.hash(user.password),
      );
      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.internalServerError("Cannot hash password!");
      }
      const payload = {
        ...user,
        password: passwordHash,
      };
      [error, isExist] = await fastify.to(
        fastify.db.query.usersTable.findFirst({
          where: eq(usersTable.email, payload.email),
        }),
      );
      if (isExist) {
        fastify.log.error(error);
        throw fastify.httpErrors.conflict("Email already exist");
      }
      [error, user] = await fastify.to(
        fastify.db
          .insert(usersTable)
          .values({
            ...payload,
          })
          .returning({
            id: usersTable.id,
            username: usersTable.username,
            email: usersTable.email,
          }),
      );

      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.internalServerError("cannot create user");
      }
      const token = fastify.jwt.sign(
        { ...payload, id: user[0].id },
        {
          expiresIn: "3d",
        },
      );
      const refreshToken = fastify.jwt.sign(payload, {
        expiresIn: "30d",
      });
      return reply
        .setCookie("__Secure-refreshToken", refreshToken, {
          expires: add(new Date(), {
            days: 30,
          }),
        })
        .send({
          message: "registration was a success",
          payload: {
            token,
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
          },
        });
    },
  });
  fastify.route({
    method: "POST",
    url: "/login",
    schema: {
      body: z.object({
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z
          .string()
          .min(6, { message: "Password must be 6 or more characters" }),
      }),
      response: {
        200: z.object({
          message: z.string(),
          payload: z.object({
            token: z.string(),
            id: z.string(),
            username: z.string(),
            email: z.string(),
          }),
        }),
      },
    },
    handler: async (request, reply) => {
      let dbUser, user, error;
      dbUser = request.body;
      [error, user] = await fastify.to(
        fastify.db.query.usersTable.findFirst({
          where: eq(usersTable.email, dbUser.email),
        }),
      );
      if (error || !user) {
        fastify.log.error(error);
        throw fastify.httpErrors.badRequest("email or password is incorrect");
      }

      [error] = await fastify.to(
        fastify.bcrypt.compare(dbUser.password, user.password),
      );
      if (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.badRequest("email or password is incorrect");
      }
      const token = fastify.jwt.sign(user, {
        expiresIn: "3d",
      });
      const refreshToken = fastify.jwt.sign(user, {
        expiresIn: "30d",
      });
      return reply
        .setCookie("__Secure-refreshToken", refreshToken, {
          expires: add(new Date(), {
            days: 30,
          }),
        })
        .send({
          message: "login was a success",
          payload: {
            token,
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
    },
  });
  fastify.route({
    method: "POST",
    url: "/refresh-token",
    handler: (request, reply) => {
      let refreshToken, verifyToken;
      refreshToken = request.cookies["__Secure_refreshToken"];
      if (!refreshToken) {
        throw fastify.httpErrors.forbidden();
      }
      try {
        verifyToken = fastify.jwt.verify<
          { email: string; password: string; id: string } & {
            iat: number;
            sub: string;
          }
        >(refreshToken);
        const token = fastify.jwt.sign(verifyToken, {
          expiresIn: "3d",
        });
        refreshToken = fastify.jwt.sign(verifyToken, {
          expiresIn: "30d",
        });
        return reply
          .setCookie("__Secure-refreshToken", refreshToken, {
            expires: add(new Date(), {
              days: 30,
            }),
          })
          .send({
            message: "token was refreshed",
            payload: {
              token,
            },
          });
      } catch (error) {
        fastify.log.error(error);
        throw fastify.httpErrors.forbidden();
      }
    },
  });
};

export default auth;
