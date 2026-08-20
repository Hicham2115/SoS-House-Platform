"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { StepProgress } from "@/components/dashboard/shared/step-progress";
import { StepCategory } from "@/components/dashboard/client/publier/step-category";
import { StepInvoice } from "@/components/dashboard/client/publier/step-invoice";
import { StepLocation } from "@/components/dashboard/client/publier/step-location";
import { StepQualification } from "@/components/dashboard/client/publier/step-qualification";
import { StepRecap } from "@/components/dashboard/client/publier/step-recap";
import { StepUrgency } from "@/components/dashboard/client/publier/step-urgency";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { getInvoiceRequirement } from "@/lib/onboarding";
import { getPriceEstimate } from "@/lib/lead-pricing";
import { useRouter } from "next/navigation";

const STEP_CATEGORY = "category";
const STEP_QUALIFICATION = "qualification";
const STEP_LOCATION = "location";
const STEP_URGENCY = "urgency";
const STEP_INVOICE = "invoice";
const STEP_RECAP = "recap";

const flow = [
  STEP_CATEGORY,
  STEP_QUALIFICATION,
  STEP_LOCATION,
  STEP_URGENCY,
  STEP_INVOICE,
  STEP_RECAP,
];

const stepLabels = {
  [STEP_CATEGORY]: "Catégorie",
  [STEP_QUALIFICATION]: "Qualification",
  [STEP_LOCATION]: "Localisation",
  [STEP_URGENCY]: "Urgence",
  [STEP_INVOICE]: "Facture requise",
  [STEP_RECAP]: "Récapitulatif",
};

export default function PublierPage() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const invoiceRequirement = getInvoiceRequirement(user?.account_type);
  const hasDefaultAddress = Boolean(user?.ville);
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(STEP_CATEGORY);
  const [draft, setDraft] = useState(() => ({
    category: "",
    subcategory: "",
    propertyType: "",
    qualification: {},
    photos: [],
    description: "",
    ville: user?.ville ?? "",
    adresseComplete: user?.adresse ?? "",
    etage: user?.etage ?? "",
    urgency: "",
    scheduledDate: null,
    scheduledTime: "",
    budget: null,
    invoiceRequired: invoiceRequirement.value,
  }));

  const publish = useMutation({
    mutationFn: async (listing) => {
      const { data } = await api.post("/demandes", {
        category: listing.category,
        subcategory: listing.subcategory,
        property_type: listing.propertyType,
        qualification: listing.qualification,
        photos: listing.photos,
        description: listing.description,
        ville: listing.ville,
        adresse: listing.adresseComplete,
        etage: listing.etage,
        urgency: listing.urgency,
        scheduled_date: listing.scheduledDate,
        scheduled_time: listing.scheduledTime,
        budget_min: listing.budget?.[0] ?? null,
        budget_max: listing.budget?.[1] ?? null,
        invoice_required: listing.invoiceRequired,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes"] });
      router.push("/dashboard/demandes");
      toast.success("Votre demande a été publiée.");
      setCurrentStep(STEP_CATEGORY);
      setDraft((d) => ({
        ...d,
        category: "",
        subcategory: "",
        propertyType: "",
        qualification: {},
        photos: [],
        description: "",
        urgency: "",
        scheduledDate: null,
        scheduledTime: "",
        budget: null,
      }));
    },
    onError: (error) => {
      console.error(error);
      toast.error("Impossible de publier votre demande. Veuillez réessayer.");
    },
  });

  const activeIndex = flow.indexOf(currentStep);

  function goBack() {
    if (activeIndex > 0) setCurrentStep(flow[activeIndex - 1]);
  }

  return (
    <>
      <DashboardHeader
        title="Publier une demande"
        subtitle="Décrivez votre besoin, les artisans vérifiés pourront y répondre."
      />

      <div className="flex flex-1 flex-col bg-slate-50 p-5 sm:p-8">
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-8">
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
            <div>
              <p className="text-[17px] font-bold text-slate-950">
                {stepLabels[currentStep]}
              </p>
              <p className="text-[13px] text-slate-600">
                Étape {activeIndex + 1} sur {flow.length}
              </p>
            </div>
          </div>

          <div className="border-b border-slate-100 pb-5">
            <StepProgress
              steps={flow}
              activeStep={currentStep}
              stepLabels={stepLabels}
            />
          </div>

          {currentStep === STEP_CATEGORY && (
            <StepCategory
              defaultValues={draft}
              onSubmit={(values) => {
                setDraft((d) => ({ ...d, ...values }));
                setCurrentStep(STEP_QUALIFICATION);
              }}
            />
          )}

          {currentStep === STEP_QUALIFICATION && (
            <StepQualification
              category={draft.category}
              defaultValues={draft}
              onSubmit={(values) => {
                setDraft((d) => ({ ...d, ...values }));
                setCurrentStep(STEP_LOCATION);
              }}
            />
          )}

          {currentStep === STEP_LOCATION && (
            <StepLocation
              defaultValues={draft}
              prefilled={hasDefaultAddress}
              onSubmit={(values) => {
                setDraft((d) => ({ ...d, ...values }));
                setCurrentStep(STEP_URGENCY);
              }}
            />
          )}

          {currentStep === STEP_URGENCY && (
            <StepUrgency
              defaultValues={draft}
              priceRange={getPriceEstimate(draft.category)}
              onSubmit={(values) => {
                setDraft((d) => ({ ...d, ...values }));
                setCurrentStep(STEP_INVOICE);
              }}
            />
          )}

          {currentStep === STEP_INVOICE && (
            <StepInvoice
              defaultValue={draft.invoiceRequired}
              editable={invoiceRequirement.editable}
              onSubmit={(value) => {
                setDraft((d) => ({ ...d, invoiceRequired: value }));
                setCurrentStep(STEP_RECAP);
              }}
            />
          )}

          {currentStep === STEP_RECAP && (
            <StepRecap
              draft={draft}
              isPending={publish.isPending}
              onSubmit={() => publish.mutate(draft)}
            />
          )}
        </div>
      </div>
    </>
  );
}
