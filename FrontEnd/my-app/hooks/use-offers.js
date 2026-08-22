import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useClientOffers() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["offers", "mine"],
    queryFn: async () => (await api.get("/offers")).data,
    enabled: Boolean(token),
  });
}

export function useOffers(demandeId) {
  return useQuery({
    queryKey: ["demandes", demandeId, "offers"],
    queryFn: async () => (await api.get(`/demandes/${demandeId}/offers`)).data,
    enabled: Boolean(demandeId),
  });
}

// Offers a provider has submitted, across every demande they bid on.
export function useSubmittedOffers() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["offers", "submitted"],
    queryFn: async () => (await api.get("/offers/submitted")).data,
    enabled: Boolean(token),
  });
}
