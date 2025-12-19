import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";

export type Subscription = {
  _id: string;
  email: string;
  createdAt: string;
};


export const useSubscribe = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await api.post("subscription", { email });
      return res.data.data;
    },
  });
};


export const useFetchAllSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions", "all"],
    queryFn: async (): Promise<Subscription[]> => {
      const res = await api.get("subscription");
      return res.data.data;
    },
  });
};


export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`subscription/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscriptions", "all"],
      });
    },
  });
};
