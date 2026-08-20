"use client";

import { useEffect, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Check, KeyRound, Lock, Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import defaultAvatar from "@/app/assets/avatars/avatar-1.png";
import { ZelligeCorner } from "@/components/Main/zellige-corner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { MAX_AVATAR_SIZE, readImageFile } from "@/lib/file-upload";

const accountSchema = z.object({
  name: z.string().trim().min(1, "Le nom complet est requis").max(255),
  email: z.string().trim().email("Adresse e-mail invalide"),
  phone: z.string().trim().optional(),
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
        <p className="mt-2 text-[12px] text-slate-500">{helperText}</p>
      </div>
    </div>
  );
}

export default function ParametresPage() {
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

  // useForm only reads defaultValues once at mount, but user arrives async
  // from useUser() — reset once the real data lands so the fields aren't
  // stuck showing the initial empty strings.
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

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
        subtitle="Gérez vos informations personnelles."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <form
          className="relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <ZelligeCorner
            id="parametres-zellige-tr"
            corner="top-right"
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 opacity-60"
          />

          <div className="relative flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <User className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-slate-950">
                Informations personnelles
              </p>
              <p className="text-[13px] text-slate-500">
                Gardez vos informations à jour pour une meilleure expérience.
              </p>
            </div>
          </div>

          <div className="relative flex items-center gap-4 border-b border-slate-100 py-5">
            <Avatar className="size-16">
              <AvatarImage
                src={user?.avatar}
                alt={user?.name ?? "Photo de profil"}
              />
              <AvatarFallback className="bg-teal-100 text-lg font-bold text-teal-700">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
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
              <FieldRow
                Icon={User}
                id="name"
                label="Nom complet"
                helperText="Utilisez votre nom et prénom tels qu'ils apparaissent sur vos documents."
                first
              >
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
              <FieldRow
                Icon={Mail}
                id="email"
                label="Adresse e-mail"
                helperText="C'est l'adresse utilisée pour recevoir les notifications et les mises à jour."
              >
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
              <FieldRow
                Icon={Phone}
                id="phone"
                label="Téléphone"
                helperText="Nous utiliserons ce numéro pour vous contacter si nécessaire."
              >
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
              className="h-11 rounded-xl bg-teal-600 px-6 text-[14px] font-semibold text-white hover:bg-teal-700"
            >
              <Check className="size-4" />
              Enregistrer les modifications
            </Button>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <Lock className="size-3.5" />
              Vos données sont sécurisées
            </span>
          </div>
        </form>

        <form
          className="relative flex flex-col gap-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
          onSubmit={(e) => {
            e.preventDefault();
            passwordForm.handleSubmit();
          }}
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <KeyRound className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[17px] font-bold text-slate-950">
                Mot de passe
              </p>
              <p className="text-[13px] text-slate-500">
                Choisissez un mot de passe robuste pour protéger votre compte.
              </p>
            </div>
          </div>

          <passwordForm.Field name="currentPassword">
            {(field) => (
              <FieldRow
                Icon={Lock}
                id="currentPassword"
                label="Mot de passe actuel"
                helperText="Confirmez votre mot de passe actuel pour continuer."
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
                helperText="Ressaisissez le même mot de passe."
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
              className="h-11 rounded-xl bg-teal-600 px-6 text-[14px] font-semibold text-white hover:bg-teal-700"
            >
              <Check className="size-4" />
              Mettre à jour le mot de passe
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
