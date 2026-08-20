import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useDemandes() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["demandes"],
    queryFn: async () => (await api.get("/demandes")).data,
    enabled: Boolean(token),
  });
}
