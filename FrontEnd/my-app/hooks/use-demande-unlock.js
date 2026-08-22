import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useUnlockDemande() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (demandeId) =>
      (await api.post(`/demandes/${demandeId}/unlock`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
