import { api } from ".";
import { UserPayload } from "./schema";

export const whoami = async ({ id, token }: { id: string; token: string }) => {
  const response = await api
    .get(`api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<UserPayload & { id: string }>();
  return response;
};

export const generateTag = async ({
  form,
  token,
}: {
  form: FormData;
  token: string;
}) => {
  const response = await api
    .post("api/users/images/tags", {
      body: form,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{
      message: string;
      output: Array<{ score: number; label: string }>;
    }>();
  return response;
};

export const getUserTags = async ({ token }: { token: string }) => {
  const response = await api
    .get("api/users/images/tags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<
      Record<
        string,
        Array<{
          id: string;
          key: string;
          tags: string;
          userId: string;
          createdAt: string;
        }>
      >
    >();
  return Object.keys(response);
};

export const getImageByTags = async ({
  token,
  tag,
}: {
  token: string;
  tag: string;
}) => {
  const response = await api
    .get(`api/users/images/tags/${tag}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<
      Array<{
        id: string;
        key: string;
        tags: string;
        userId: string;
        createdAt: string;
      }>
    >();
  return response;
};
