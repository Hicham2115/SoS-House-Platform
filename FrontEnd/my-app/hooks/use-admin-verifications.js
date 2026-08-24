import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function usePendingVerifications() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["admin", "verifications"],
    queryFn: async () => (await api.get("/admin/verifications")).data,
    enabled: Boolean(token),
  });
}

export function useVerificationDetail(artisanId) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["admin", "verifications", artisanId],
    queryFn: async () =>
      (await api.get(`/admin/verifications/${artisanId}`)).data,
    enabled: Boolean(token) && Boolean(artisanId),
  });
}

export function useApproveVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artisanId) =>
      (await api.post(`/admin/verifications/${artisanId}/approve`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verifications"] });
      toast.success("Prestataire vérifié.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useRejectVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ artisanId, reason }) =>
      (
        await api.post(`/admin/verifications/${artisanId}/reject`, {
          reason,
        })
      ).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "verifications"] });
      toast.success("Prestataire rejeté.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
