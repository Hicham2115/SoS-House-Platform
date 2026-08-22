import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useNotifications() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => (await api.get("/notifications")).data,
    enabled: Boolean(token),
    refetchInterval: 30000,
  });
}
