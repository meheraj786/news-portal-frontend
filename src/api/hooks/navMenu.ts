import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../axios";



export type NavMenuCategory = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
};

export type NavMenu = {
  _id: string;
  categoryIds: NavMenuCategory[];
  createdAt: string;
  updatedAt: string;
};



export const useFetchNavMenu = (
  options?: UseQueryOptions<NavMenu>
) => {
  return useQuery<NavMenu>({
    queryKey: ["nav-menu"],
    queryFn: async () => {
      const res = await api.get("nav-menu");
      return res.data;
    },
    ...options,
  });
};


type UpdateNavMenuInput = {
  categoryIds: string[];
};

export const useUpdateNavMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNavMenuInput) => {
      const res = await api.put("nav-menu", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nav-menu"],
      });
    },
  });
};
