import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  user:
    | {
        username: string;
        id: string;
        token: string;
        email: string;
      }
    | undefined;
  setUser: ({
    username,
    id,
    token,
    email,
  }: {
    username: string;
    id: string;
    token: string;
    email: string;
  }) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: ({
          username,
          id,
          token,
          email,
        }: {
          username: string;
          id: string;
          token: string;
          email: string;
        }) =>
          set(() => ({
            user: { username, email, token, id },
          })),
      }),
      { name: "user" },
    ),
  ),
);
