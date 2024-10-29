import { config } from "@/lib/config";
import ky, { HTTPError } from "ky";
import to from "await-to-ts";
import { UserPayload } from "./schema";

export const register = async ({ username, password, email }: UserPayload) => {
  const payload = { username, password, email };
  const response = await ky
    .post(`${config.apiUrl}/api/auth/register`, {
      json: payload,
      credentials: "include",
    })
    .json<{
      message: string;
      payload: {
        token: string;
        id: string;
        username: string;
        email: string;
      };
    }>();
  return response;
};

export const login = async ({
  password,
  email,
}: Omit<UserPayload, "username">) => {
  const payload = { password, email };
  const [error, response] = await to(
    ky
      .post(`${config.apiUrl}/api/auth/login`, {
        json: payload,
        credentials: "include",
      })
      .json<{
        message: string;
        payload: {
          token: string;
          id: string;
          username: string;
          email: string;
        };
      }>(),
  );
  if (error instanceof HTTPError) {
    const errorJson = await error.response.json();
    return errorJson;
  }
  return response;
};
