"use client";

import { useForm } from "@tanstack/react-form";
import { useForm as useTanstackForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Camera, Mail, MapPin, Phone, User } from "lucide-react";
import avatar1 from "@/app/assets/avatars/avatar-1.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { useAuthStore } from "@/lib/store/auth";

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const profileSchema = z.object({
  name: z.string().trim().min(1, "Le nom complet est requis").max(255),
  email: z.string().trim().email("Adresse e-mail invalide"),
  phone: z.string().trim().optional(),
  city: z.string().trim().optional(),
});

export default function ProfilPage() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const form = useTanstackForm({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      city: user?.city ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = profileSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }

      updateUser(parsed.data);
      toast.success("Profil mis à jour.");
    },
  });

  return (
    <>
      <DashboardHeader
        title="Mon profil"
        subtitle="Consultez et gérez vos informations personnelles."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row">
          <div className="relative">
            <Avatar className="size-20">
              <AvatarImage src={avatar1.src} alt={user?.name ?? "Profil"} />
              <AvatarFallback className="bg-teal-100 text-lg font-bold text-teal-700">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              aria-label="Changer la photo"
              onClick={() =>
                toast.info("La modification de photo sera bientôt disponible.")
              }
              className="absolute -right-1 -bottom-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-teal-600 text-white shadow-[0_4px_10px_rgba(13,148,136,0.35)] transition hover:bg-teal-700"
            >
              <Camera className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
            <p className="text-[18px] font-bold text-slate-950">
              {user?.name ?? "Mon profil"}
            </p>
            <span className="w-fit rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-teal-700 uppercase">
              Client
            </span>
          </div>
        </div>

        <form
          className="flex max-w-xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <p className="text-[15px] font-bold text-slate-950">
            Informations personnelles
          </p>

          <form.Field name="name">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-[13px] text-slate-700">
                  Nom complet
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-[13px] text-slate-700">
                  Adresse e-mail
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email"
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone" className="text-[13px] text-slate-700">
                  Téléphone
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Phone />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="phone"
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <form.Field name="city">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city" className="text-[13px] text-slate-700">
                  Ville
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <MapPin />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="city"
                    placeholder="Ex : Casablanca"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            className="mt-2 h-11 w-fit rounded-xl bg-teal-600 px-6 text-[14px] font-semibold text-white hover:bg-teal-700"
          >
            Enregistrer les modifications
          </Button>
        </form>
      </div>
    </>
  );
}
