import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";

export function useProviderPortfolio() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["provider", "portfolio"],
    queryFn: async () => (await api.get("/provider/portfolio")).data,
    enabled: Boolean(token),
  });
}

function usePortfolioMutation(path) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => (await api.post(path, formData)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider", "portfolio"] });
    },
  });
}

function useDeletePortfolioMutation(pathFor) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => (await api.delete(pathFor(id))).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provider", "portfolio"] });
    },
  });
}

export function useCreateCertification() {
  return usePortfolioMutation("/provider/certifications");
}
export function useDeleteCertification() {
  return useDeletePortfolioMutation((id) => `/provider/certifications/${id}`);
}

export function useCreateRealisation() {
  return usePortfolioMutation("/provider/realisations");
}
export function useDeleteRealisation() {
  return useDeletePortfolioMutation((id) => `/provider/realisations/${id}`);
}

export function useCreateTravauxPhoto() {
  return usePortfolioMutation("/provider/travaux-photos");
}
export function useDeleteTravauxPhoto() {
  return useDeletePortfolioMutation((id) => `/provider/travaux-photos/${id}`);
}
