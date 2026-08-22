import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useCreateOffer(demandeId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) =>
      (await api.post(`/demandes/${demandeId}/offers`, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["demandes", demandeId, "offers"],
      });
    },
  });
}

export function useAcceptOffer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (offerId) =>
      (await api.post(`/offers/${offerId}/accept`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes"] });
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
}
