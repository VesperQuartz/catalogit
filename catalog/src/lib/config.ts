import { z } from "zod";

const envSchema = z.object({
  apiUrl: z.string(),
});

const env = {
  apiUrl: import.meta.env.VITE_PUBLIC_API_URL,
};

export const config = envSchema.parse(env);
