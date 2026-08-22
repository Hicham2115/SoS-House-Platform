import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

// Conversations only exist for missions — a demande with an accepted offer.
export function useConversations() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => (await api.get("/conversations")).data,
    enabled: Boolean(token),
    refetchInterval: 15000,
  });
}

export function useMessages(demandeId) {
  return useQuery({
    queryKey: ["demandes", demandeId, "messages"],
    queryFn: async () =>
      (await api.get(`/demandes/${demandeId}/messages`)).data,
    enabled: Boolean(demandeId),
    refetchInterval: 5000,
  });
}
