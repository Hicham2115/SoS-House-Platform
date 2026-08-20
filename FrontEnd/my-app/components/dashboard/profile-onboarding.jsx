"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Hash,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Store,
  User,
  UserRoundCog,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import defaultAvatar from "@/app/assets/avatars/avatar-1.png";
import { StepProgress } from "@/components/dashboard/step-progress";
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
  accountTypes,
  getAccountType,
  getProfileCompletionPct,
  hasDefaultAddress,
  isOnboardingRequirementsMet,
} from "@/lib/onboarding";
import { api } from "@/lib/axios";

const STEP_ACCOUNT_TYPE = "account-type";
const STEP_BUSINESS_INFO = "business-info";
const STEP_ADDRESS = "address";
const STEP_NOTIFICATIONS = "notifications";

const stepLabels = {
  [STEP_ACCOUNT_TYPE]: "Type de compte",
  [STEP_BUSINESS_INFO]: "Informations professionnelles",
  [STEP_ADDRESS]: "Adresse",
  [STEP_NOTIFICATIONS]: "Finalisation",
};

const accountTypeIcons = {
  particulier: User,
  professionnel: Store,
  entreprise: Landmark,
};

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

// The business-info step only exists for Professionnel/Entreprise accounts,
// so the flow length depends on the account type chosen in step one.
function getStepFlow(accountType) {
  const type = getAccountType(accountType);
  const flow = [STEP_ACCOUNT_TYPE];
  if (type?.requiresRaisonSociale) flow.push(STEP_BUSINESS_INFO);
  flow.push(STEP_ADDRESS, STEP_NOTIFICATIONS);
  return flow;
}

function getInitialStep(user) {
  if (!user?.account_type) return STEP_ACCOUNT_TYPE;
  const type = getAccountType(user.account_type);
  if (type?.requiresRaisonSociale && !user.raison_sociale) {
    return STEP_BUSINESS_INFO;
  }
  if (!hasDefaultAddress(user)) return STEP_ADDRESS;
  return STEP_NOTIFICATIONS;
}

function showValidationError(error) {
  toast.error(error.issues[0]?.message ?? "Veuillez vérifier les champs.");
}

const accountTypeSchema = z.object({
  account_type: z.enum(["particulier", "professionnel", "entreprise"], {
    message: "Choisissez un type de compte",
  }),
});

// Built per-step against the account type chosen in step one, since which
// fields are required depends on it.
function getBusinessInfoSchema(type) {
  return z.object({
    raison_sociale: type?.requiresRaisonSociale
      ? z.string().trim().min(1, "La raison sociale est requise")
      : z.string().trim().optional(),
    ice: type?.requiresIce
      ? z.string().trim().min(1, "L'ICE est requis pour un compte Entreprise")
      : z.string().trim().optional(),
    nom_du_referant: type?.requiresReferent
      ? z.string().trim().min(1, "Le nom du référent est requis")
      : z.string().trim().optional(),
  });
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
      account_type: user?.account_type ?? "",
      raison_sociale: user?.raison_sociale ?? "",
      ice: user?.ice ?? "",
      nom_du_referant: user?.nom_du_referant ?? "",
      ville: user?.ville ?? "",
      quartier: user?.quartier ?? "",
      adresse: user?.adresse ?? "",
      etage: user?.etage ?? "",
      notification_Channel: user?.notification_Channel ?? "whatsapp",
      avatar: user?.avatar ?? null,
    },
    onSubmit: async ({ value }) => {
      const accountTypeResult = accountTypeSchema.safeParse({
        account_type: value.account_type,
      });
      if (!accountTypeResult.success) {
        showValidationError(accountTypeResult.error);
        return;
      }

      const businessResult = getBusinessInfoSchema(
        getAccountType(value.account_type),
      ).safeParse({
        raison_sociale: value.raison_sociale,
        ice: value.ice,
        nom_du_referant: value.nom_du_referant,
      });
      if (!businessResult.success) {
        showValidationError(businessResult.error);
        return;
      }

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
        ...accountTypeResult.data,
        ...businessResult.data,
        ...addressResult.data,
        ...notificationResult.data,
        avatar: value.avatar,
      });
    },
  });

  if (!user || isOnboardingRequirementsMet(user)) return null;

  const pct = getProfileCompletionPct(user);

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

  function handleContinueAccountType() {
    const result = accountTypeSchema.safeParse({
      account_type: form.state.values.account_type,
    });
    if (!result.success) {
      showValidationError(result.error);
      return;
    }
    const type = getAccountType(result.data.account_type);
    setCurrentStep(
      type?.requiresRaisonSociale ? STEP_BUSINESS_INFO : STEP_ADDRESS,
    );
  }

  function handleContinueBusinessInfo() {
    const type = getAccountType(form.state.values.account_type);
    const result = getBusinessInfoSchema(type).safeParse({
      raison_sociale: form.state.values.raison_sociale,
      ice: form.state.values.ice,
      nom_du_referant: form.state.values.nom_du_referant,
    });
    if (!result.success) {
      showValidationError(result.error);
      return;
    }
    setCurrentStep(STEP_ADDRESS);
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
                Type de compte et adresse — ça ne prend qu&apos;une minute.
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
          <form.Subscribe selector={(state) => state.values.account_type}>
            {(accountType) => {
              const flow = getStepFlow(accountType);
              const activeIndex = flow.indexOf(currentStep);
              const businessAccountType = getAccountType(accountType);

              function goBack() {
                if (activeIndex > 0) setCurrentStep(flow[activeIndex - 1]);
              }

              return (
                <>
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
                    {currentStep === STEP_ACCOUNT_TYPE && (
                      <>
                        <form.Field name="account_type">
                          {(field) => (
                            <RadioGroup
                              value={field.state.value}
                              onValueChange={(value) =>
                                field.handleChange(value)
                              }
                              className="gap-2.5"
                            >
                              {accountTypes.map((type) => {
                                const Icon = accountTypeIcons[type.value];
                                const selected =
                                  field.state.value === type.value;
                                return (
                                  <label
                                    key={type.value}
                                    htmlFor={`account-type-${type.value}`}
                                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-l-4 p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] ${
                                      selected
                                        ? "border-teal-600 border-l-teal-600 bg-teal-50/60"
                                        : "border-slate-200 border-l-slate-200 hover:bg-slate-50"
                                    }`}
                                  >
                                    <span
                                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                                        selected
                                          ? "bg-teal-600 text-white"
                                          : "bg-teal-50 text-teal-700"
                                      }`}
                                    >
                                      <Icon
                                        className="size-5"
                                        strokeWidth={1.8}
                                      />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-[14px] font-bold text-slate-950">
                                        {type.label}
                                      </span>
                                      <span className="block text-[12px] leading-[1.5] text-slate-500">
                                        {type.description}
                                      </span>
                                    </span>
                                    <RadioGroupItem
                                      value={type.value}
                                      id={`account-type-${type.value}`}
                                      className="shrink-0"
                                    />
                                  </label>
                                );
                              })}
                            </RadioGroup>
                          )}
                        </form.Field>

                        <Button
                          type="button"
                          onClick={handleContinueAccountType}
                          className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
                        >
                          Continuer
                        </Button>
                      </>
                    )}

                    {currentStep === STEP_BUSINESS_INFO && (
                      <>
                        <form.Field name="raison_sociale">
                          {(field) => (
                            <div className="flex flex-col gap-1.5">
                              <Label
                                htmlFor="raison_sociale"
                                className="text-[13px] text-slate-700"
                              >
                                Raison sociale
                              </Label>
                              <InputGroup className={inputGroupClassName}>
                                <InputGroupAddon>
                                  <Building2 />
                                </InputGroupAddon>
                                <InputGroupInput
                                  id="raison_sociale"
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

                        <form.Field name="ice">
                          {(field) => (
                            <div className="flex flex-col gap-1.5">
                              <Label
                                htmlFor="ice"
                                className="text-[13px] text-slate-700"
                              >
                                ICE{" "}
                                {businessAccountType?.requiresIce
                                  ? ""
                                  : "(optionnel)"}
                              </Label>
                              <InputGroup className={inputGroupClassName}>
                                <InputGroupAddon>
                                  <Hash />
                                </InputGroupAddon>
                                <InputGroupInput
                                  id="ice"
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

                        {businessAccountType?.requiresReferent && (
                          <>
                            <form.Field name="nom_du_referant">
                              {(field) => (
                                <div className="flex flex-col gap-1.5">
                                  <Label
                                    htmlFor="nom_du_referant"
                                    className="text-[13px] text-slate-700"
                                  >
                                    Nom du référent
                                  </Label>
                                  <InputGroup className={inputGroupClassName}>
                                    <InputGroupAddon>
                                      <User />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                      id="nom_du_referant"
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

                            <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 p-3.5 text-[12px] leading-[1.5] text-amber-800">
                              <Landmark className="mt-0.5 size-4 shrink-0" />
                              <span>
                                Vos demandes exigeront toujours une facture avec
                                TVA récupérable — ce réglage est verrouillé pour
                                les comptes Entreprise et ne peut pas être
                                désactivé.
                              </span>
                            </div>
                          </>
                        )}

                        <Button
                          type="button"
                          onClick={handleContinueBusinessInfo}
                          className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
                        >
                          Continuer
                        </Button>
                      </>
                    )}

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
                                Préremplira vos prochaines demandes
                                automatiquement.
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
                                  src={field.state.value || defaultAvatar.src}
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
                                Comment souhaitez-vous être contacté à
                                l&apos;avenir ?
                              </Label>

                              <RadioGroup
                                value={field.state.value}
                                onValueChange={(value) =>
                                  field.handleChange(value)
                                }
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
                                    <Mail
                                      className="size-[18px]"
                                      strokeWidth={1.8}
                                    />
                                  </span>
                                  <span className="flex-1 text-[14px] font-semibold text-slate-950">
                                    Email
                                  </span>
                                  <RadioGroupItem
                                    value="email"
                                    id="notif-email"
                                  />
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
                </>
              );
            }}
          </form.Subscribe>
        </DialogContent>
      </Dialog>
    </>
  );
}
