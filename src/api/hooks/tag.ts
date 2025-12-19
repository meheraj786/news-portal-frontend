import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

export type Tag = {
  _id: string;
  name: string;
  slug: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
};


type FetchTagsParams = {
  page?: number;
  limit?: number;
};

export const useFetchAllTags = (params?: FetchTagsParams) => {
  return useQuery({
    queryKey: ["tags", "all", params],
    queryFn: async (): Promise<Tag[]> => {
      const res = await api.get("tag", { params });
      return res.data.data;
    },
  });
};


export const useSearchTags = (name: string) => {
  return useQuery({
    queryKey: ["tags", "search", name],
    queryFn: async (): Promise<Tag[]> => {
      const res = await api.get("tag/search", {
        params: { name },
      });
      return res.data.data;
    },
    enabled: !!name,
  });
};


export const useFetchPopularTags = (limit = 5) => {
  return useQuery({
    queryKey: ["tags", "popular", limit],
    queryFn: async (): Promise<Tag[]> => {
      const res = await api.get("tag/popular", {
        params: { limit },
      });
      return res.data.data;
    },
  });
};


export type PostByTag = {
  _id: string;
  title: string;
  slug: string;
  image?: {
    url: string;
  };
  createdAt: string;
};

export const useFetchPostsByTag = (tagName: string) => {
  return useQuery({
    queryKey: ["tags", "posts", tagName],
    queryFn: async (): Promise<PostByTag[]> => {
      const res = await api.get("tag/posts", {
        params: { tagName },
      });
      return res.data.data;
    },
    enabled: !!tagName,
  });
};


export const useFetchTagById = (tagId: string) => {
  return useQuery({
    queryKey: ["tags", tagId],
    queryFn: async (): Promise<Tag> => {
      const res = await api.get(`tag/${tagId}`);
      return res.data.data;
    },
    enabled: !!tagId,
  });
};
