"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  Wrench,
} from "lucide-react";
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

const clientSignUpSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom complet est requis"),
  email: z.string().trim().email("Adresse e-mail invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  phone: z.string().trim().optional(),
});

const artisanSignUpSchema = clientSignUpSchema.extend({
  profession: z.string().trim().min(1, "Le métier est requis"),
});

const signInSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

const roleChoices = [
  {
    role: "client",
    Icon: User,
    title: "Je suis un client",
    description: "Je cherche un artisan vérifié pour mes travaux.",
  },
  {
    role: "artisan",
    Icon: Wrench,
    title: "Je suis un artisan",
    description: "Je veux recevoir des demandes de clients.",
  },
];

export function AuthDialog() {
  const open = useAuthDialogStore((state) => state.open);
  const mode = useAuthDialogStore((state) => state.mode);
  const step = useAuthDialogStore((state) => state.step);
  const role = useAuthDialogStore((state) => state.role);
  const setOpen = useAuthDialogStore((state) => state.setOpen);
  const setMode = useAuthDialogStore((state) => state.setMode);
  const selectRole = useAuthDialogStore((state) => state.selectRole);
  const backToRole = useAuthDialogStore((state) => state.backToRole);
  const [showPassword, setShowPassword] = useState(false);

  const signUpForm = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      profession: "",
    },
    onSubmit: async ({ value }) => {
      const schema =
        role === "artisan" ? artisanSignUpSchema : clientSignUpSchema;
      const parsed = schema.safeParse(value);
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
        className="w-[calc(100%-2rem)] max-w-[580px] sm:max-w-[580px] gap-0 rounded-[18px] border-slate-200/80 bg-white p-7 shadow-[0_30px_80px_rgba(12,55,55,0.22)] sm:p-8"
      >
        <div className="flex items-center gap-3">
          {step === "form" && (
            <button
              type="button"
              onClick={backToRole}
              aria-label="Retour"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          <Image src={logo} alt="SOS House" className="h-20 w-auto" />
        </div>

        <DialogHeader className="mt-6 gap-1.5">
          <DialogTitle className="text-2xl font-bold text-slate-950">
            {step === "role"
              ? "Bienvenue sur SOS House"
              : mode === "signup"
                ? role === "artisan"
                  ? "Créer mon compte artisan"
                  : "Créer un compte"
                : "Se connecter"}
          </DialogTitle>
          <DialogDescription className="text-[15px] text-slate-600">
            {step === "role"
              ? "Dites-nous qui vous êtes pour continuer."
              : mode === "signup"
                ? role === "artisan"
                  ? "Recevez des demandes de clients vérifiés près de chez vous."
                  : "Publiez une demande et trouvez un artisan vérifié."
                : "Accédez à votre espace SOS House."}
          </DialogDescription>
        </DialogHeader>

        {step === "role" ? (
          <div className="mt-6 flex flex-col gap-3">
            {roleChoices.map(
              ({ role: choiceRole, Icon, title, description }) => (
                <button
                  key={choiceRole}
                  type="button"
                  onClick={() => selectRole(choiceRole)}
                  className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-teal-600 hover:bg-teal-50/50"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-slate-950">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-[1.5] text-slate-600">
                      {description}
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600" />
                </button>
              ),
            )}
          </div>
        ) : mode === "signup" ? (
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

            {role === "artisan" && (
              <signUpForm.Field name="profession">
                {(field) => (
                  <InputGroup className={inputGroupClassName}>
                    <InputGroupAddon>
                      <Wrench />
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="Métier (ex : Plombier)"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </InputGroup>
                )}
              </signUpForm.Field>
            )}

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
              {role === "artisan"
                ? "Créer mon compte artisan"
                : "Créer mon compte"}
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

        {step === "form" && (
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
        )}
      </DialogContent>
    </Dialog>
  );
}
