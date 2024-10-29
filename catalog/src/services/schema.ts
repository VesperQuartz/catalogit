import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message:
  //       "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
  //   },
  // ),
});

export type UserPayload = z.infer<typeof authSchema>;
