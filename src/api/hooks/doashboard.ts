import { useQuery } from "@tanstack/react-query";
import { api } from "../axios";

// 1. Type definition thik ache
export type DashboardStats = {
  totalPosts: number;
  totalCategories: number;
  totalViews: number;
  traffic24h: {
    count: number;
    previousCount: number;
    growthPercent: number;
    isPositive: boolean;
  };
};

export const useFetchDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async (): Promise<DashboardStats> => {
      const res = await api.get("dashboard/stats");
      return res.data.data;
    },
    // Data-ta 5 minute por por 'stale' hobe
    staleTime: 1000 * 60 * 5,

    // --- REAL-TIME UPDATE LOGIC ---
    // Proti 10-30 second por por server theke auto data fetch korbe
    // Ete reload charai totalViews ba traffic-er number change hobe
    refetchInterval: 10000,

    // Window focus korle abar fresh data niye asbe
    refetchOnWindowFocus: true,
  });
};
