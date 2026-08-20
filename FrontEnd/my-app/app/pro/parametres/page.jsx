"use client";

import { useEffect, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Camera,
  Check,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { MAX_AVATAR_SIZE, readImageFile } from "@/lib/file-upload";
import { profileVerification } from "@/lib/pro-dashboard-data";

const accountTypes = [
  { value: "particulier", label: "Particulier" },
  { value: "professionnel", label: "Auto-entrepreneur" },
  { value: "entreprise", label: "Entreprise" },
];

const accountSchema = z.object({
  name: z.string().trim().min(1, "Le nom complet est requis").max(255),
  email: z.string().trim().email("Adresse e-mail invalide"),
  phone: z.string().trim().optional(),
});

const proSchema = z.object({
  profession: z.string().trim().max(255).optional(),
  accountType: z.string().optional(),
  raisonSociale: z.string().trim().max(255).optional(),
  ice: z.string().trim().max(255).optional(),
});

const addressSchema = z.object({
  ville: z.string().trim().max(255).optional(),
  quartier: z.string().trim().max(255).optional(),
  adresse: z.string().trim().max(255).optional(),
  etage: z.string().trim().max(255).optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
    newPassword: z
      .string()
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(1, "Veuillez confirmer le mot de passe"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

function FieldRow({ Icon, id, label, helperText, children, first }) {
  return (
    <div
      className={`flex gap-4 pb-5 ${first ? "" : "border-t border-slate-100 pt-5"}`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-[18px]" strokeWidth={1.8} />
      </span>
      <div className="flex-1">
        <Label htmlFor={id} className="text-[14px] font-bold text-slate-950">
          {label}
        </Label>
        {children}
        {helperText && (
          <p className="mt-2 text-[12px] text-slate-500">{helperText}</p>
        )}
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, subtitle, children, onSubmit }) {
  return (
    <form
      className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-[17px] font-bold text-slate-950">{title}</p>
          <p className="text-[13px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </form>
  );
}

export default function ProParametresPage() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const avatarInputRef = useRef(null);

  const updateAccount = useMutation({
    mutationFn: async (patch) => {
      const { data } = await api.patch("/user", patch);
      queryClient.setQueryData(["user"], data);
      return data;
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "Impossible d'enregistrer les modifications. Veuillez réessayer.",
      );
    },
  });

  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = accountSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      await updateAccount.mutateAsync(parsed.data);
      toast.success("Modifications enregistrées.");
    },
  });

  const proForm = useForm({
    defaultValues: {
      profession: user?.profession ?? "",
      accountType: user?.account_type ?? "particulier",
      raisonSociale: user?.raison_sociale ?? "",
      ice: user?.ice ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = proSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      await updateAccount.mutateAsync({
        profession: parsed.data.profession,
        account_type: parsed.data.accountType,
        raison_sociale: parsed.data.raisonSociale,
        ice: parsed.data.ice,
      });
      toast.success("Informations professionnelles mises à jour.");
    },
  });

  const addressForm = useForm({
    defaultValues: {
      ville: user?.ville ?? "",
      quartier: user?.quartier ?? "",
      adresse: user?.adresse ?? "",
      etage: user?.etage ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = addressSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      await updateAccount.mutateAsync(parsed.data);
      toast.success("Zone d'intervention mise à jour.");
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const parsed = passwordSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      try {
        await api.put("/user/password", {
          current_password: parsed.data.currentPassword,
          new_password: parsed.data.newPassword,
        });
        passwordForm.reset();
        toast.success("Mot de passe mis à jour.");
      } catch (error) {
        console.error(error);
        toast.error("Mot de passe actuel incorrect.");
      }
    },
  });

  // TanStack Form only reads defaultValues once at mount, but user arrives
  // async from useUser() — reset once the real data lands.
  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
    proForm.reset({
      profession: user.profession ?? "",
      accountType: user.account_type ?? "particulier",
      raisonSociale: user.raison_sociale ?? "",
      ice: user.ice ?? "",
    });
    addressForm.reset({
      ville: user.ville ?? "",
      quartier: user.quartier ?? "",
      adresse: user.adresse ?? "",
      etage: user.etage ?? "",
    });
  }, [user]);

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      await readImageFile(
        file,
        MAX_AVATAR_SIZE,
        "L'image ne doit pas dépasser 2 Mo.",
      );
    } catch (error) {
      toast.error(error.message);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { data: uploadData } = await api.post("/user/avatar", formData);
      await updateAccount.mutateAsync({ avatar: uploadData.avatar_url });
      toast.success("Photo de profil mise à jour.");
    } catch (error) {
      console.error(error);
      toast.error("Impossible d'envoyer la photo. Veuillez réessayer.");
    }
  }

  async function handleRemoveAvatar() {
    await updateAccount.mutateAsync({ avatar: null });
    toast.success("Photo de profil supprimée.");
  }

  return (
    <>
      <DashboardHeader
        title="Paramètres du compte"
        subtitle="Gérez vos informations et votre zone d'intervention."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
        notificationCount={3}
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={user?.avatar}
                alt={user?.name ?? "Photo de profil"}
              />
              <AvatarFallback className="bg-teal-100 text-lg font-bold text-teal-700">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[16px] font-bold text-slate-950">
                {user?.name ?? "Mon profil"}
              </p>
              <p className="text-[13px] text-slate-500">
                {user?.profession || "Métier non renseigné"}
                {user?.ville ? ` · ${user.ville}` : ""}
              </p>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="text-[13px] font-bold text-slate-950">
                  {profileVerification.rating}
                </span>
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="text-[12px] text-slate-500">
                  · {profileVerification.reviewsCount} avis
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                profileVerification.identite
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <CheckCircle2 className="size-3.5" />
              Identité vérifiée
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                profileVerification.autoEntrepreneur
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <CheckCircle2 className="size-3.5" />
              Auto-entrepreneur vérifié
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold ${
                profileVerification.societe
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <CheckCircle2 className="size-3.5" />
              Société vérifiée
            </span>
          </div>
        </div>

        <SectionCard
          icon={User}
          title="Informations personnelles"
          subtitle="Gardez vos informations à jour pour une meilleure expérience."
          onSubmit={form.handleSubmit}
        >
          <div className="flex items-center gap-4 border-b border-slate-100 py-5">
            <div>
              <p className="text-[14px] font-bold text-slate-950">
                Photo de profil
              </p>
              <p className="text-[12px] text-slate-500">
                JPG ou PNG, 2 Mo maximum.
              </p>
              <div className="mt-2.5 flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => avatarInputRef.current?.click()}
                  className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Camera className="size-4" />
                  Changer la photo
                </Button>
                {user?.avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-[13px] font-semibold text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                )}
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <form.Field name="name">
            {(field) => (
              <FieldRow Icon={User} id="name" label="Nom complet" first>
                <Input
                  id="name"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <FieldRow Icon={Mail} id="email" label="Adresse e-mail">
                <Input
                  id="email"
                  type="email"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <FieldRow Icon={Phone} id="phone" label="Téléphone">
                <Input
                  id="phone"
                  type="tel"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </form.Field>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
            <Button
              type="submit"
              className="h-11 rounded-xl bg-[#0b1730] px-6 text-[14px] font-semibold text-white hover:bg-[#142248]"
            >
              <Check className="size-4" />
              Enregistrer les modifications
            </Button>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <Lock className="size-3.5" />
              Vos données sont sécurisées
            </span>
          </div>
        </SectionCard>

        <SectionCard
          icon={Briefcase}
          title="Informations professionnelles"
          subtitle="Ces informations sont visibles par les clients sur vos missions."
          onSubmit={proForm.handleSubmit}
        >
          <proForm.Field name="profession">
            {(field) => (
              <FieldRow
                Icon={Briefcase}
                id="profession"
                label="Métier"
                helperText="Ex : Plombier, Électricien, Peintre..."
                first
              >
                <Input
                  id="profession"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </proForm.Field>

          <proForm.Field name="accountType">
            {(field) => (
              <FieldRow
                Icon={Briefcase}
                id="accountType"
                label="Type de compte"
              >
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger
                    id="accountType"
                    className="mt-2 h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldRow>
            )}
          </proForm.Field>

          <proForm.Subscribe selector={(state) => state.values.accountType}>
            {(accountType) =>
              accountType === "entreprise" && (
                <>
                  <proForm.Field name="raisonSociale">
                    {(field) => (
                      <FieldRow
                        Icon={Briefcase}
                        id="raisonSociale"
                        label="Raison sociale"
                      >
                        <Input
                          id="raisonSociale"
                          className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </FieldRow>
                    )}
                  </proForm.Field>

                  <proForm.Field name="ice">
                    {(field) => (
                      <FieldRow Icon={Briefcase} id="ice" label="ICE">
                        <Input
                          id="ice"
                          className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </FieldRow>
                    )}
                  </proForm.Field>
                </>
              )
            }
          </proForm.Subscribe>

          <div className="mt-2 border-t border-slate-100 pt-5">
            <Button
              type="submit"
              className="h-11 rounded-xl bg-[#0b1730] px-6 text-[14px] font-semibold text-white hover:bg-[#142248]"
            >
              <Check className="size-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </SectionCard>

        <SectionCard
          icon={MapPin}
          title="Zone d'intervention"
          subtitle="Utilisée pour vous proposer les demandes proches de vous."
          onSubmit={addressForm.handleSubmit}
        >
          <addressForm.Field name="ville">
            {(field) => (
              <FieldRow Icon={MapPin} id="ville" label="Ville" first>
                <Input
                  id="ville"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </addressForm.Field>

          <addressForm.Field name="quartier">
            {(field) => (
              <FieldRow Icon={MapPin} id="quartier" label="Quartier">
                <Input
                  id="quartier"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </addressForm.Field>

          <addressForm.Field name="adresse">
            {(field) => (
              <FieldRow Icon={MapPin} id="adresse" label="Adresse">
                <Input
                  id="adresse"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </addressForm.Field>

          <addressForm.Field name="etage">
            {(field) => (
              <FieldRow Icon={MapPin} id="etage" label="Étage (optionnel)">
                <Input
                  id="etage"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </addressForm.Field>

          <div className="mt-2 border-t border-slate-100 pt-5">
            <Button
              type="submit"
              className="h-11 rounded-xl bg-[#0b1730] px-6 text-[14px] font-semibold text-white hover:bg-[#142248]"
            >
              <Check className="size-4" />
              Enregistrer les modifications
            </Button>
          </div>
        </SectionCard>

        <SectionCard
          icon={KeyRound}
          title="Mot de passe"
          subtitle="Choisissez un mot de passe robuste pour protéger votre compte."
          onSubmit={passwordForm.handleSubmit}
        >
          <passwordForm.Field name="currentPassword">
            {(field) => (
              <FieldRow
                Icon={Lock}
                id="currentPassword"
                label="Mot de passe actuel"
                first
              >
                <Input
                  id="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </passwordForm.Field>

          <passwordForm.Field name="newPassword">
            {(field) => (
              <FieldRow
                Icon={KeyRound}
                id="newPassword"
                label="Nouveau mot de passe"
                helperText="8 caractères minimum."
              >
                <Input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </passwordForm.Field>

          <passwordForm.Field name="confirmPassword">
            {(field) => (
              <FieldRow
                Icon={KeyRound}
                id="confirmPassword"
                label="Confirmer le nouveau mot de passe"
              >
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="mt-2 h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldRow>
            )}
          </passwordForm.Field>

          <div className="mt-2 border-t border-slate-100 pt-5">
            <Button
              type="submit"
              className="h-11 rounded-xl bg-[#0b1730] px-6 text-[14px] font-semibold text-white hover:bg-[#142248]"
            >
              <Check className="size-4" />
              Mettre à jour le mot de passe
            </Button>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
