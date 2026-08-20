import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useUser() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/user")).data,
    enabled: Boolean(token),
  });
}
