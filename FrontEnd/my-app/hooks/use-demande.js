import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useDemande(id) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["demandes", id],
    queryFn: async () => (await api.get(`/demandes/${id}`)).data,
    enabled: Boolean(token) && Boolean(id),
  });
}
