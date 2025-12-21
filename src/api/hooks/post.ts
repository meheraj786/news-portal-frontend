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
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },

    onSuccess: () => {
      // Post list refresh korbe
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });

      // Dashboard stats refresh korbe (Reload chara update hobe)
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

// export const useUpdatePost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ _id, ...data }: Post) => {
//       console.log(data, "printing data");
//       const res = await api.put(`post/${_id}`, data);
//       return res.data.data;
//     },

//     onSuccess: (_data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ["posts", "all"] });

//       queryClient.invalidateQueries({
//         queryKey: ["posts", variables._id],
//       });
//     },
//   });
// };
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      _id,
      formData,
    }: {
      _id: string;
      formData: FormData;
    }) => {
      const res = await api.put(`post/${_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables._id] });

      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`post/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useFetchTrendingPosts = () => {
  return useQuery({
    queryKey: ["posts", "trending"],
    queryFn: async (): Promise<Post[]> => {
      const res = await api.get("post/trending");
      return res.data.data;
    },
  });
};

interface SearchParams {
  query?: string;
  categoryName?: string;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  success: boolean;
  data: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export const useSearchPosts = (params: SearchParams) => {
  return useQuery({
    queryKey: ["posts", "search", params],
    queryFn: async (): Promise<SearchResponse> => {
      const res = await api.get("post/search", {
        params: {
          query: params.query,
          categoryName: params.categoryName,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      });
      return res.data;
    },
    enabled: true,
  });
};
// export const useFetchPostsByCategory = (slug: string, limit: number = 6) => {
//   return useQuery({
//     queryKey: ["posts", "category", slug, limit],
//     queryFn: async () => {
//       const res = await api.get(`post/category/${slug}?limit=${limit}`);
//       return res.data; // data.data te posts thakbe r data.categoryName e nam
//     },
//     enabled: !!slug,
//   });
// };
interface CategoryPostResponse {
  success: boolean;
  data: Post[];
  categoryName: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
export const useFetchPostsByCategory = (
  slugOrId: string,
  page: number = 1,
  limit: number = 6
) => {
  return useQuery({
    queryKey: ["posts", "category", slugOrId, { page, limit }],
    queryFn: async (): Promise<CategoryPostResponse> => {
      const res = await api.get(`post/category/${slugOrId}`, {
        params: { page, limit },
      });
      return res.data.data;
    },
    enabled: !!slugOrId, 
    staleTime: 1000 * 60 * 5, 
  });
};
