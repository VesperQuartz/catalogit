import { login, register } from "@/services/auth";
import { UserPayload } from "@/services/schema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: Omit<UserPayload, "username">) =>
      login({ email, password }),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: ({ email, password, username }: UserPayload) =>
      register({ email, password, username }),
  });
};
