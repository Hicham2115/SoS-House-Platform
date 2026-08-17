"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import logo from "@/app/assets/logo.png";
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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";
const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom complet est requis"),
  email: z.string().trim().email("Adresse e-mail invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  phone: z.string().trim().optional(),
});
const signInSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});
export function AuthDialog() {
  const open = useAuthDialogStore((state) => state.open);
  const mode = useAuthDialogStore((state) => state.mode);
  const setOpen = useAuthDialogStore((state) => state.setOpen);
  const setMode = useAuthDialogStore((state) => state.setMode);
  const [showPassword, setShowPassword] = useState(false);
  const signUpForm = useForm({
    defaultValues: { fullName: "", email: "", password: "", phone: "" },
    onSubmit: async ({ value }) => {
      const parsed = signUpSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      toast.success("Compte créé avec succès.");
      signUpForm.reset();
      setOpen(false);
    },
  });
  const signInForm = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      const parsed = signInSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Identifiants invalides.",
        );
        return;
      }
      toast.success("Connexion réussie.");
      signInForm.reset();
      setOpen(false);
    },
  });
  const PasswordToggle = (
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        size="icon-xs"
        aria-label={
          showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        onClick={() => setShowPassword((v) => !v)}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </InputGroupButton>
    </InputGroupAddon>
  );
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setMode("signup");
      }}
    >
      <DialogContent
        showCloseButton
        className="w-[calc(100%-2rem)] max-w-[580px] sm:max-w-[580px] gap-0 rounded-[28px] border-slate-200/80 bg-white p-7 shadow-[0_30px_80px_rgba(12,55,55,0.22)] sm:p-8"
      >
        <Image src={logo} alt="SOS House" className="h-10 w-auto" />

        <DialogHeader className="mt-6 gap-1.5">
          <DialogTitle className="text-2xl font-bold text-slate-950">
            {mode === "signup" ? "Créer un compte" : "Se connecter"}
          </DialogTitle>
          <DialogDescription className="text-[15px] text-slate-600">
            {mode === "signup"
              ? "Publiez une demande et trouvez un artisan vérifié."
              : "Accédez à votre espace client SOS House."}
          </DialogDescription>
        </DialogHeader>

        {mode === "signup" ? (
          <form
            className="mt-6 flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signUpForm.handleSubmit();
            }}
          >
            <signUpForm.Field name="fullName">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Nom complet"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              )}
            </signUpForm.Field>

            <signUpForm.Field name="email">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="email"
                    placeholder="Adresse e-mail"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              )}
            </signUpForm.Field>

            <signUpForm.Field name="password">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {PasswordToggle}
                </InputGroup>
              )}
            </signUpForm.Field>

            <signUpForm.Field name="phone">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Phone />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="tel"
                    placeholder="Téléphone (optionnel)"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              )}
            </signUpForm.Field>

            <Button
              type="submit"
              className="mt-2 h-[52px] justify-center rounded-xl bg-[#ffc400] text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,196,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19]"
            >
              Créer mon compte
            </Button>
          </form>
        ) : (
          <form
            className="mt-6 flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signInForm.handleSubmit();
            }}
          >
            <signInForm.Field name="email">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="email"
                    placeholder="Adresse e-mail"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              )}
            </signInForm.Field>

            <signInForm.Field name="password">
              {(field) => (
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>
                  <InputGroupInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {PasswordToggle}
                </InputGroup>
              )}
            </signInForm.Field>

            <Button
              type="submit"
              className="mt-2 h-[52px] justify-center rounded-xl bg-[#ffc400] text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,196,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffcb19]"
            >
              Se connecter
            </Button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-slate-600">
          {mode === "signup" ? (
            <>
              Déjà un compte ?{" "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-teal-700 hover:text-teal-800"
                onClick={() => setMode("signin")}
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              Pas de compte ?{" "}
              <button
                type="button"
                className="cursor-pointer font-semibold text-teal-700 hover:text-teal-800"
                onClick={() => setMode("signup")}
              >
                Créer un compte
              </button>
            </>
          )}
        </p>
      </DialogContent>
    </Dialog>
  );
}
