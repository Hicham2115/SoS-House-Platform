import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useAdminUsers() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => (await api.get("/admin/users")).data,
    enabled: Boolean(token),
  });
}
