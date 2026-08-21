"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { StepProgress } from "@/components/dashboard/shared/step-progress";
import { StepPortfolio } from "@/components/dashboard/pro/onboarding/step-portfolio";
import { StepProfil } from "@/components/dashboard/pro/onboarding/step-profil";
import { StepZone } from "@/components/dashboard/pro/onboarding/step-zone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/lib/axios";
import { useProviderPortfolio } from "@/hooks/use-provider-portfolio";

const STEP_ZONE = "zone";
const STEP_PORTFOLIO = "portfolio";
const STEP_PROFIL = "profil";

const flow = [STEP_ZONE, STEP_PORTFOLIO, STEP_PROFIL];

const stepLabels = {
  [STEP_ZONE]: "Zone",
  [STEP_PORTFOLIO]: "Portfolio",
  [STEP_PROFIL]: "Profil",
};

export const initialProviderOnboardingData = {
  // Step 1 — Zone. Identity (CIN/selfie) and verification tier (niveau) are
  // already collected at signup — see components/layout/auth-dialog.jsx.
  ville: "",
  radiusKm: 15,
  categories: [],

  // Step 3 — Profil
  disponibiliteJours: [],
  heureDebut: "08:00",
  heureFin: "18:00",
  canalNotification: "whatsapp",
  bio: "",
  anneesExperience: "",
  specialites: [],
  photoProfil: null,
};

// Rough client-side weighting — step 1 (required) counts more than the
// optional steps 2-3. `portfolioCount` is the total number of saved
// certifications/réalisations/photos, fetched separately from the backend.
export function computeOnboardingPct(formData, portfolioCount = 0) {
  let filled = 0;
  let total = 0;

  total += 2;
  filled += formData.ville ? 2 : 0;
  total += 2;
  filled += formData.categories.length > 0 ? 2 : 0;

  total += 1;
  filled += portfolioCount > 0 ? 1 : 0;

  const profilFields = [formData.bio, formData.anneesExperience, formData.photoProfil];
  total += profilFields.length + 2;
  filled += profilFields.filter(Boolean).length;
  filled += formData.disponibiliteJours.length > 0 ? 1 : 0;
  filled += formData.specialites.length > 0 ? 1 : 0;

  return Math.round((filled / total) * 100);
}

export function ProviderOnboardingModal({
  open,
  onOpenChange,
  formData,
  updateField,
  onFinish,
}) {
  const [currentStep, setCurrentStep] = useState(STEP_ZONE);
  const queryClient = useQueryClient();
  const { data: portfolio } = useProviderPortfolio();

  const activeIndex = flow.indexOf(currentStep);

  function saveUser(payload) {
    return api.patch("/user", payload).then(({ data }) => {
      queryClient.setQueryData(["user"], data);
      return data;
    });
  }

  const saveZone = useMutation({
    mutationFn: () =>
      saveUser({
        ville: formData.ville,
        radius_km: formData.radiusKm,
        provider_categories: formData.categories,
      }),
    onSuccess: () => {
      toast.success("Étape enregistrée");
      setCurrentStep(STEP_PORTFOLIO);
    },
    onError: () => {
      toast.error("Impossible d'enregistrer cette étape. Veuillez réessayer.");
    },
  });

  const finishOnboarding = useMutation({
    mutationFn: async () => {
      let avatarUrl;
      if (formData.photoProfil) {
        const avatarForm = new FormData();
        avatarForm.append("avatar", formData.photoProfil);
        const { data } = await api.post("/user/avatar", avatarForm);
        avatarUrl = data.avatar_url;
      }

      return saveUser({
        disponibilite_jours: formData.disponibiliteJours,
        heure_debut: formData.heureDebut,
        heure_fin: formData.heureFin,
        notification_Channel: formData.canalNotification,
        bio: formData.bio,
        annees_experience: formData.anneesExperience || null,
        specialites: formData.specialites,
        ...(avatarUrl ? { avatar: avatarUrl } : {}),
      });
    },
    onSuccess: (data) => {
      toast.success("Profil prestataire complété !");
      onOpenChange(false);
      onFinish?.(data);
    },
    onError: () => {
      toast.error("Impossible d'enregistrer votre profil. Veuillez réessayer.");
    },
  });

  function goBack() {
    if (activeIndex > 0) setCurrentStep(flow[activeIndex - 1]);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-[560px] gap-0 overflow-y-auto rounded-[18px] border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(12,55,55,0.22)] sm:max-w-[560px]">
        <div className="flex items-center gap-3">
          {activeIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Retour"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          <DialogHeader className="gap-1">
            <DialogTitle className="text-xl font-bold text-slate-950">
              {stepLabels[currentStep]}
            </DialogTitle>
            <DialogDescription className="text-[13px] text-slate-600">
              Étape {activeIndex + 1} sur {flow.length}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="border-b border-slate-100 pb-5">
          <StepProgress
            steps={flow}
            activeStep={currentStep}
            stepLabels={stepLabels}
          />
        </div>

        <div className="mt-5">
          {currentStep === STEP_ZONE && (
            <StepZone
              formData={formData}
              updateField={updateField}
              onContinue={() => saveZone.mutate()}
              isPending={saveZone.isPending}
            />
          )}

          {currentStep === STEP_PORTFOLIO && (
            <StepPortfolio
              portfolio={portfolio}
              onContinue={() => setCurrentStep(STEP_PROFIL)}
              onSkip={() => setCurrentStep(STEP_PROFIL)}
            />
          )}

          {currentStep === STEP_PROFIL && (
            <StepProfil
              formData={formData}
              updateField={updateField}
              onFinish={() => finishOnboarding.mutate()}
              isPending={finishOnboarding.isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
