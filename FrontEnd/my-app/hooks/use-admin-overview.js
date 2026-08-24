import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useAdminOverview() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["admin", "overview"],
    queryFn: async () => (await api.get("/admin/overview")).data,
    enabled: Boolean(token),
  });
}
