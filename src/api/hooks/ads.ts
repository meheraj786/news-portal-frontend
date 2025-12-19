import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";

export type Ad = {
  _id: string;
  title: string;
  image?: {
    url: string;
  };
  link?: string;
  isActive: boolean;
  createdAt: string;
};


export const useFetchAllAds = () => {
  return useQuery({
    queryKey: ["ads", "all"],
    queryFn: async (): Promise<Ad[]> => {
      const res = await api.get("ad");
      return res.data.data;
    },
  });
};


export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("ad", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads", "all"] });
    },
  });
};

type UpdateAdInput = {
  id: string;
  data: FormData;
};

export const useUpdateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateAdInput) => {
      const res = await api.put(`ad/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads", "all"] });
    },
  });
};


export const useToggleAdStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch(`ad/${id}/toggle`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads", "all"] });
    },
  });
};


export const useDeleteAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`ad/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads", "all"] });
    },
  });
};
