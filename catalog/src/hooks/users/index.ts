import {
  generateTag,
  getImageByTags,
  getUserTags,
  whoami,
} from "@/services/user";
import { useUserStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: ["whoami", user?.token],
    queryFn: () => whoami({ id: user!.id, token: user!.token }),
  });
};

export const useGenerateTags = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["whoami", user?.token],
    mutationFn: ({ form }: { form: FormData }) =>
      generateTag({ form, token: user!.token }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags", user?.token],
      });
    },
  });
};

export const useGetUserTags = ({
  filterTag,
}: {
  filterTag: Array<string> | undefined;
}) => {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: ["tags", user?.token],
    queryFn: () => getUserTags({ token: user!.token }),
    select: (tags) =>
      !filterTag ? tags : tags?.filter((tag) => filterTag?.includes(tag)),
  });
};

export const useGetImageByTags = ({ tag }: { tag: string }) => {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: ["tag", user?.token, tag],
    queryFn: () => getImageByTags({ token: user!.token, tag }),
    enabled: !!tag,
  });
};
