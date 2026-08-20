import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useLogout() {
  const clearToken = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.post("/logout");
    },
    onSettled: () => {
      clearToken();
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/");
    },
  });
}
