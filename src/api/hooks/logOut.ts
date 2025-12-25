import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";
import { useNavigate } from "react-router";

// logOut.ts hook file
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // route-ta backend er sathe milie dekhun
      const res = await api.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      // 1. LocalStorage clear korun (jodi thake)
      localStorage.removeItem("token");

      // 2. React Query cache puro clear kore din
      queryClient.clear();

      // 3. User-ke login-e pathan
      window.location.href = "/login"; // ba navigate("/login")
    },
    onError: (error: any) => {
      console.error(
        "Logout error details:",
        error.response?.data || error.message
      );
      // Jodi server error-o dey, tobuo safety-r jonno user-ke login-e pathiye cache clear kora bhalo
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
