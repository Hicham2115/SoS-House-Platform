"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { StepProgress } from "@/components/dashboard/shared/step-progress";
import { StepCompetence } from "@/components/dashboard/pro/onboarding/step-competence";
import { StepNiveau } from "@/components/dashboard/pro/onboarding/step-niveau";
import { StepPlan } from "@/components/dashboard/pro/onboarding/step-plan";
import { StepProfil } from "@/components/dashboard/pro/onboarding/step-profil";
import { StepSocle } from "@/components/dashboard/pro/onboarding/step-socle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STEP_SOCLE = "socle";
const STEP_NIVEAU = "niveau";
const STEP_COMPETENCE = "competence";
const STEP_PLAN = "plan";
const STEP_PROFIL = "profil";

const flow = [STEP_SOCLE, STEP_NIVEAU, STEP_COMPETENCE, STEP_PLAN, STEP_PROFIL];

const stepLabels = {
  [STEP_SOCLE]: "Socle",
  [STEP_NIVEAU]: "Niveau",
  [STEP_COMPETENCE]: "Compétence",
  [STEP_PLAN]: "Plan",
  [STEP_PROFIL]: "Profil",
};

export const initialProviderOnboardingData = {
  // Step 1 — Socle
  cinRecto: null,
  cinVerso: null,
  selfie: null,
  ville: "",
  radiusKm: 15,
  categories: [],

  // Step 2 — Niveau
  niveau: "n0",
  carteAutoEntrepreneur: null,
  attestationInscription: null,
  ribN1: null,
  modeleJ: null,
  ice: "",
  identifiantFiscal: "",
  ribSociete: null,
  pieceRepresentant: null,

  // Step 3 — Compétence
  competenceFiles: [],

  // Step 4 — Plan
  plan: "decouverte",

  // Step 5 — Profil
  disponibiliteJours: [],
  heureDebut: "08:00",
  heureFin: "18:00",
  canalNotification: "whatsapp",
  bio: "",
  anneesExperience: "",
  photoProfil: null,
};

// Rough client-side weighting — steps 1-2 (required) count more than the
// optional steps 3-5. Swap for a real completion % from the backend later.
export function computeOnboardingPct(formData) {
  let filled = 0;
  let total = 0;

  const socleFields = [formData.cinRecto, formData.cinVerso, formData.selfie, formData.ville];
  total += socleFields.length * 2;
  filled += socleFields.filter(Boolean).length * 2;
  total += 2;
  filled += formData.categories.length > 0 ? 2 : 0;

  total += 2;
  filled += formData.niveau ? 2 : 0;

  total += 1;
  filled += formData.competenceFiles.length > 0 ? 1 : 0;

  total += 1;
  filled += formData.plan ? 1 : 0;

  const profilFields = [formData.bio, formData.anneesExperience, formData.photoProfil];
  total += profilFields.length + 1;
  filled += profilFields.filter(Boolean).length;
  filled += formData.disponibiliteJours.length > 0 ? 1 : 0;

  return Math.round((filled / total) * 100);
}

export function ProviderOnboardingModal({
  open,
  onOpenChange,
  formData,
  updateField,
  onFinish,
}) {
  const [currentStep, setCurrentStep] = useState(STEP_SOCLE);
  const [isPending, setIsPending] = useState(false);

  const activeIndex = flow.indexOf(currentStep);

  function goBack() {
    if (activeIndex > 0) setCurrentStep(flow[activeIndex - 1]);
  }

  function goToStep(step) {
    // TODO: wire to POST /api/provider/onboarding/step-{n} with the
    // current step's slice of formData before advancing.
    toast.success("Étape enregistrée");
    setCurrentStep(step);
  }

  function handleContinueSocle() {
    goToStep(STEP_NIVEAU);
  }

  function handleContinueNiveau() {
    goToStep(STEP_COMPETENCE);
  }

  function handleContinueCompetence() {
    goToStep(STEP_PLAN);
  }

  function handleSkipCompetence() {
    goToStep(STEP_PLAN);
  }

  function handleContinuePlan() {
    goToStep(STEP_PROFIL);
  }

  function handleFinish() {
    // TODO: wire to POST /api/provider/onboarding/complete (or a final
    // step-5 call) with the full formData payload, including real file
    // uploads for cinRecto/cinVerso/selfie/photoProfil/etc.
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.success("Profil prestataire complété !");
      onOpenChange(false);
      onFinish?.(formData);
    }, 400);
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
          {currentStep === STEP_SOCLE && (
            <StepSocle
              formData={formData}
              updateField={updateField}
              onContinue={handleContinueSocle}
            />
          )}

          {currentStep === STEP_NIVEAU && (
            <StepNiveau
              formData={formData}
              updateField={updateField}
              onContinue={handleContinueNiveau}
            />
          )}

          {currentStep === STEP_COMPETENCE && (
            <StepCompetence
              formData={formData}
              updateField={updateField}
              onContinue={handleContinueCompetence}
              onSkip={handleSkipCompetence}
            />
          )}

          {currentStep === STEP_PLAN && (
            <StepPlan
              formData={formData}
              updateField={updateField}
              onContinue={handleContinuePlan}
            />
          )}

          {currentStep === STEP_PROFIL && (
            <StepProfil
              formData={formData}
              updateField={updateField}
              onFinish={handleFinish}
              isPending={isPending}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
