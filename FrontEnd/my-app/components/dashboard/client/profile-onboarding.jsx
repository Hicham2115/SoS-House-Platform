"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  UserRoundCog,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { StepProgress } from "@/components/dashboard/shared/step-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/hooks/use-user";
import { MAX_AVATAR_SIZE, readImageFile } from "@/lib/file-upload";
import {
  getProfileCompletionPct,
  hasDefaultAddress,
  isOnboardingRequirementsMet,
} from "@/lib/onboarding";
import { api } from "@/lib/axios";

const STEP_ADDRESS = "address";
const STEP_NOTIFICATIONS = "notifications";

const flow = [STEP_ADDRESS, STEP_NOTIFICATIONS];

const stepLabels = {
  [STEP_ADDRESS]: "Adresse",
  [STEP_NOTIFICATIONS]: "Finalisation",
};

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

function getInitialStep(user) {
  return hasDefaultAddress(user) ? STEP_NOTIFICATIONS : STEP_ADDRESS;
}

function showValidationError(error) {
  toast.error(error.issues[0]?.message ?? "Veuillez vérifier les champs.");
}

const addressSchema = z.object({
  ville: z.string().trim().min(1, "La ville est requise"),
  quartier: z.string().trim().min(1, "Le quartier est requis"),
  adresse: z.string().trim().min(1, "L'adresse complète est requise"),
  etage: z.string().trim().optional(),
});

const notificationSchema = z.object({
  notification_Channel: z.enum(["whatsapp", "email"]),
});

export function ProfileOnboarding() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(() => getInitialStep(user));

  const completeOnboarding = useMutation({
    mutationFn: async (patch) => {
      const { data } = await api.patch("/user", {
        ...patch,
        avatar: patch.avatar?.startsWith("data:") ? undefined : patch.avatar,
      });
      queryClient.setQueryData(["user"], data);
      return data;
    },
    onSuccess: () => {
      toast.success("Profil complet ! Vous êtes prêt à publier.");
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "Impossible de mettre à jour votre profil. Veuillez réessayer.",
      );
    },
  });

  // One form for every field across the whole wizard. The Continuer button
  // on each step only validates that step's slice of fields before
  // advancing; the final Terminer button runs the real submit below.
  const form = useForm({
    defaultValues: {
      ville: user?.ville ?? "",
      quartier: user?.quartier ?? "",
      adresse: user?.adresse ?? "",
      etage: user?.etage ?? "",
      notification_Channel: user?.notification_Channel ?? "whatsapp",
      avatar: user?.avatar ?? null,
    },
    onSubmit: async ({ value }) => {
      const addressResult = addressSchema.safeParse({
        ville: value.ville,
        quartier: value.quartier,
        adresse: value.adresse,
        etage: value.etage,
      });
      if (!addressResult.success) {
        showValidationError(addressResult.error);
        return;
      }

      const notificationResult = notificationSchema.safeParse({
        notification_Channel: value.notification_Channel,
      });
      if (!notificationResult.success) {
        showValidationError(notificationResult.error);
        return;
      }

      completeOnboarding.mutate({
        ...addressResult.data,
        ...notificationResult.data,
        avatar: value.avatar,
      });
    },
  });

  if (!user || isOnboardingRequirementsMet(user)) return null;

  const pct = getProfileCompletionPct(user);
  const activeIndex = flow.indexOf(currentStep);

  function goBack() {
    if (activeIndex > 0) setCurrentStep(flow[activeIndex - 1]);
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    let previewUrl;
    try {
      previewUrl = await readImageFile(
        file,
        MAX_AVATAR_SIZE,
        "L'image ne doit pas dépasser 2 Mo.",
      );
    } catch (error) {
      toast.error(error.message);
      return;
    }
    form.setFieldValue("avatar", previewUrl);

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await api.post("/user/avatar", formData);
      form.setFieldValue("avatar", data.avatar_url);
      toast.success("Photo de profil ajoutée.");
    } catch (error) {
      console.error(error);
      toast.error("Impossible d'envoyer la photo. Veuillez réessayer.");
    }
  }

  function handleContinueAddress() {
    const result = addressSchema.safeParse({
      ville: form.state.values.ville,
      quartier: form.state.values.quartier,
      adresse: form.state.values.adresse,
      etage: form.state.values.etage,
    });
    if (!result.success) {
      showValidationError(result.error);
      return;
    }
    setCurrentStep(STEP_NOTIFICATIONS);
  }

  return (
    <>
      <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
              <UserRoundCog className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[15px] font-bold text-slate-950">
                Complétez votre profil pour publier plus vite
              </p>
              <p className="mt-0.5 text-[13px] text-slate-600">
                Votre adresse — ça ne prend qu&apos;une minute.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-teal-100 sm:w-56">
                  <div
                    className="h-full rounded-full bg-teal-600"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] font-semibold text-teal-700">
                  {pct}%
                </span>
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="h-10 shrink-0 rounded-xl bg-[#0b1730] px-5 text-[13px] font-semibold text-white hover:bg-[#142248]"
          >
            Compléter mon profil
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[520px] gap-0 rounded-[18px] border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(12,55,55,0.22)] sm:max-w-[520px] max-h-[85vh] overflow-y-auto">
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

          <form
            className="mt-5 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {currentStep === STEP_ADDRESS && (
              <>
                <form.Field name="ville">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="ville"
                        className="text-[13px] text-slate-700"
                      >
                        Ville
                      </Label>
                      <InputGroup className={inputGroupClassName}>
                        <InputGroupAddon>
                          <MapPin />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="ville"
                          placeholder="Ex : Casablanca"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </InputGroup>
                    </div>
                  )}
                </form.Field>

                <form.Field name="quartier">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="quartier"
                        className="text-[13px] text-slate-700"
                      >
                        Quartier
                      </Label>
                      <InputGroup className={inputGroupClassName}>
                        <InputGroupAddon>
                          <MapPin />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="quartier"
                          placeholder="Ex : Maârif"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </InputGroup>
                    </div>
                  )}
                </form.Field>

                <form.Field name="adresse">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="adresse"
                        className="text-[13px] text-slate-700"
                      >
                        Adresse complète
                      </Label>
                      <InputGroup className={inputGroupClassName}>
                        <InputGroupAddon>
                          <MapPin />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="adresse"
                          placeholder="N°, rue, résidence..."
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </InputGroup>
                      <p className="text-[12px] text-slate-500">
                        Préremplira vos prochaines demandes automatiquement.
                      </p>
                    </div>
                  )}
                </form.Field>

                <form.Field name="etage">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label
                        htmlFor="etage"
                        className="text-[13px] text-slate-700"
                      >
                        Étage (optionnel)
                      </Label>
                      <InputGroup className={inputGroupClassName}>
                        <InputGroupAddon>
                          <MapPin />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="etage"
                          placeholder="Ex : 3ème étage, porte 12"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(e.target.value)
                          }
                        />
                      </InputGroup>
                    </div>
                  )}
                </form.Field>

                <Button
                  type="button"
                  onClick={handleContinueAddress}
                  className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
                >
                  Continuer
                </Button>
              </>
            )}

            {currentStep === STEP_NOTIFICATIONS && (
              <>
                <form.Field name="avatar">
                  {(field) => (
                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                      <Avatar className="size-14">
                        <AvatarImage
                          src={field.state.value}
                          alt={user?.name ?? "Photo de profil"}
                        />
                        <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
                          {user?.name?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-bold text-slate-950">
                          Photo de profil (optionnel)
                        </p>
                        <label
                          htmlFor="onboarding-avatar"
                          className="mt-1.5 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Camera className="size-4" />
                          Ajouter une photo
                        </label>
                        <input
                          id="onboarding-avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </div>
                    </div>
                  )}
                </form.Field>

                <form.Field name="notification_Channel">
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[13px] text-slate-700">
                        Comment souhaitez-vous être contacté à l&apos;avenir ?
                      </Label>

                      <RadioGroup
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                        className="gap-2.5"
                      >
                        <label
                          htmlFor="notif-whatsapp"
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] hover:bg-slate-50"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                            <MessageCircle
                              className="size-[18px]"
                              strokeWidth={1.8}
                            />
                          </span>
                          <span className="flex-1 text-[14px] font-semibold text-slate-950">
                            WhatsApp
                          </span>
                          <RadioGroupItem
                            value="whatsapp"
                            id="notif-whatsapp"
                          />
                        </label>
                        <label
                          htmlFor="notif-email"
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] hover:bg-slate-50"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                            <Mail className="size-[18px]" strokeWidth={1.8} />
                          </span>
                          <span className="flex-1 text-[14px] font-semibold text-slate-950">
                            Email
                          </span>
                          <RadioGroupItem value="email" id="notif-email" />
                        </label>
                      </RadioGroup>
                    </div>
                  )}
                </form.Field>

                <Button
                  type="submit"
                  disabled={completeOnboarding.isPending}
                  className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
                >
                  Terminer
                </Button>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
