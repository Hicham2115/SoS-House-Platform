import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useAvailableDemandes() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["demandes", "disponibles"],
    queryFn: async () => (await api.get("/demandes/disponibles")).data,
    enabled: Boolean(token),
  });
}
