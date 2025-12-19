import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import type { Post } from "@/validators/post";



export const useFetchAllPosts = () => {
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: async (): Promise<Post[]> => {
      const res = await api.get("post");
      return res.data.data;
    },
  });
};

export const useFetchPostById = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async (): Promise<Post> => {
      const res = await api.get(`post/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};



export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "all"],
      });
    },
  });
};



export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ _id, ...data }: Post) => {
      const res = await api.put(`post/${_id}`, data);
      return res.data.data;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });

      queryClient.invalidateQueries({
        queryKey: ["posts", variables._id],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`post/${id}`);
      queryClient.invalidateQueries({
        queryKey: ["posts", id],
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "all"],
      });
    },
  });
};
