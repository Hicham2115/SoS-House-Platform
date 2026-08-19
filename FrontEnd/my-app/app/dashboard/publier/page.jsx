"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { StepProgress } from "@/components/dashboard/step-progress";
import { StepCategory } from "@/components/dashboard/publier/step-category";
import { StepInvoice } from "@/components/dashboard/publier/step-invoice";
import { StepLocation } from "@/components/dashboard/publier/step-location";
import { StepQualification } from "@/components/dashboard/publier/step-qualification";
import { StepRecap } from "@/components/dashboard/publier/step-recap";
import { StepUrgency } from "@/components/dashboard/publier/step-urgency";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { getInvoiceRequirement } from "@/lib/onboarding";
import { getPriceEstimate } from "@/lib/lead-pricing";
import { getCategory } from "@/lib/services-catalog";
import { useAuthStore } from "@/lib/store/auth";
import { useListingsStore } from "@/lib/store/listings";

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
  const user = useAuthStore((state) => state.user);
  const addListing = useListingsStore((state) => state.addListing);
  const invoiceRequirement = getInvoiceRequirement(user?.accountType);
  const hasDefaultAddress = Boolean(user?.defaultAddress?.ville);

  const [currentStep, setCurrentStep] = useState(STEP_CATEGORY);
  const [draft, setDraft] = useState(() => ({
    category: "",
    subcategory: "",
    propertyType: "",
    qualification: {},
    photos: [],
    description: "",
    ville: user?.defaultAddress?.ville ?? "",
    adresseComplete: user?.defaultAddress?.adresseComplete ?? "",
    etage: user?.defaultAddress?.etage ?? "",
    urgency: "",
    scheduledDate: null,
    scheduledTime: "",
    budget: null,
    invoiceRequired: invoiceRequirement.value,
  }));

  // Stands in for a real "publish demande" endpoint: same
  // mutate/isPending/onSuccess surface a network call would give us, just
  // backed by the local listings store for now.
  const publish = useMutation({
    mutationFn: async (listing) => {
      const category = getCategory(listing.category);
      const subcategory = category?.subcategories.find(
        (s) => s.value === listing.subcategory,
      );
      addListing({
        ...listing,
        title: `${category?.label ?? ""} — ${subcategory?.label ?? ""}`,
        city: listing.ville,
      });
      return listing;
    },
    onSuccess: () => {
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
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
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
            <StepProgress steps={flow} activeStep={currentStep} />
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
