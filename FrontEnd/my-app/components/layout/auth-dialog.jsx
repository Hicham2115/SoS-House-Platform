"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
  User,
  Wrench,
} from "lucide-react";
import logo from "@/app/assets/logoLading.jpeg";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/lib/store/auth";
import { useAuthDialogStore } from "@/lib/store/auth-dialog";
import { professions } from "@/lib/professions";
import { useRouter } from "next/navigation";

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const clientSignUpSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom complet est requis"),
  email: z.string().trim().email("Adresse e-mail invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  phone: z.string().trim().min(1, "Le téléphone est requis"),
});

const artisanSignUpSchema = clientSignUpSchema.extend({
  profession: z.string().trim().min(1, "Le métier est requis"),
});

// Provider verification tier collected at signup — mirrors the backend's
// `niveau` column (n0 particulier / n1 auto-entrepreneur / n2 société).
const niveauChoices = [
  {
    value: "n0",
    Icon: User,
    title: "Particulier",
    description: "Activité informelle, sans statut déclaré.",
  },
  {
    value: "n1",
    Icon: Briefcase,
    title: "Auto-entrepreneur",
    description: "Statut auto-entrepreneur déclaré.",
  },
  {
    value: "n2",
    Icon: Building2,
    title: "Société",
    description: "Entreprise ou société enregistrée.",
  },
];

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
    borderClass: "border-l-teal-600",
    iconWrapClass: "bg-teal-50 text-teal-800",
    chevronClass: "bg-teal-600 text-white",
  },
  {
    role: "artisan",
    Icon: Wrench,
    title: "Je suis un artisan",
    description: "Je veux recevoir des demandes de clients.",
    borderClass: "border-l-[#ffa514]",
    iconWrapClass: "bg-[#ffa514]/10 text-[#ffa514]",
    chevronClass: "bg-[#ffa514] text-white",
  },
];

const trustBadges = [
  { Icon: ShieldCheck, label: "Artisans vérifiés en personne" },
  { Icon: BadgeCheck, label: "Avis authentiques de vrais clients" },
  { Icon: Lock, label: "Vos données sont sécurisées" },
];

function FileField({ label, file, onChange }) {
  return (
    <label className="flex h-12 w-full cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-[14px] text-slate-600 transition hover:border-teal-600">
      <Upload className="size-4 shrink-0 text-slate-400" />
      <span className="flex-1 truncate">{file ? file.name : label}</span>
      {file && <BadgeCheck className="size-4 shrink-0 text-teal-600" />}
      <input
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

export function AuthDialog() {
  const open = useAuthDialogStore((state) => state.open);
  const mode = useAuthDialogStore((state) => state.mode);
  const step = useAuthDialogStore((state) => state.step);
  const role = useAuthDialogStore((state) => state.role);
  const setOpen = useAuthDialogStore((state) => state.setOpen);
  const setMode = useAuthDialogStore((state) => state.setMode);
  const selectRole = useAuthDialogStore((state) => state.selectRole);
  const selectNiveau = useAuthDialogStore((state) => state.selectNiveau);
  const goToDocuments = useAuthDialogStore((state) => state.goToDocuments);
  const back = useAuthDialogStore((state) => state.back);
  const resetToRole = useAuthDialogStore((state) => state.resetToRole);
  const setToken = useAuthStore((state) => state.setToken);
  const [showPassword, setShowPassword] = useState(false);
  const openSignIn = useAuthDialogStore((state) => state.openSignIn);
  const router = useRouter();
  const queryClient = useQueryClient();

  const signUpForm = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      profession: "",
      niveau: "",
      rc: "",
      secteurActivite: "",
      nomCommercial: "",
      carteAutoEntrepreneur: null,
      cinRecto: null,
      cinVerso: null,
      selfie: null,
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

      const needsDocuments = role === "artisan" && value.niveau !== "n0";
      if (role === "artisan") {
        if (!value.niveau) {
          toast.error("Choisissez votre statut.");
          return;
        }
        if (needsDocuments && (!value.cinRecto || !value.cinVerso || !value.selfie)) {
          toast.error("Merci d'ajouter votre CIN (recto/verso) et un selfie.");
          return;
        }
        if (value.niveau === "n1" && !value.carteAutoEntrepreneur) {
          toast.error("Merci d'ajouter votre carte auto-entrepreneur.");
          return;
        }
        if (
          value.niveau === "n2" &&
          (!value.rc.trim() || !value.secteurActivite.trim() || !value.nomCommercial.trim())
        ) {
          toast.error(
            "Merci de renseigner le RC, le secteur d'activité et le nom commercial.",
          );
          return;
        }
      }

      try {
        const formData = new FormData();
        formData.append("name", parsed.data.fullName);
        formData.append("email", parsed.data.email);
        formData.append("password", parsed.data.password);
        formData.append("phone", parsed.data.phone);
        formData.append("role", role);
        if (role === "artisan") {
          formData.append("profession", parsed.data.profession);
          formData.append("niveau", value.niveau);
          if (value.niveau === "n1") {
            formData.append(
              "carte_auto_entrepreneur",
              value.carteAutoEntrepreneur,
            );
          }
          if (value.niveau === "n2") {
            formData.append("rc", value.rc);
            formData.append("secteur_activite", value.secteurActivite);
            formData.append("nom_commercial", value.nomCommercial);
          }
          if (needsDocuments) {
            formData.append("cin_recto", value.cinRecto);
            formData.append("cin_verso", value.cinVerso);
            formData.append("selfie", value.selfie);
          }
        }

        await api.post("/users", formData);
        toast.success("Compte créé avec succès.");
        signUpForm.reset();
        openSignIn();
      } catch (error) {
        console.error(error);
        toast.error("Impossible de créer votre compte. Veuillez réessayer.");
      }
    },
  });

  function validateBasics() {
    const schema = role === "artisan" ? artisanSignUpSchema : clientSignUpSchema;
    const parsed = schema.safeParse(signUpForm.state.values);
    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
      );
      return false;
    }
    return true;
  }

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

      try {
        const { data } = await api.post("/login", parsed.data);

        setToken(data.token);
        queryClient.setQueryData(["user"], data.user);
        toast.success("Connexion réussie.");
        signInForm.reset();
        setOpen(false);
        router.push(
          data.user.role === "artisan"
            ? "/pro"
            : data.user.role === "admin"
              ? "/admin"
              : "/dashboard",
        );
      } catch (error) {
        console.error(error);
        toast.error("Email ou mot de passe incorrect.");
      }
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
          {(step === "form" || step === "niveau" || step === "documents") && (
            <button
              type="button"
              onClick={back}
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
              : step === "niveau"
                ? "Quel est votre statut ?"
                : step === "documents"
                  ? "Documents de vérification"
                  : mode === "signup"
                    ? role === "artisan"
                      ? "Créer mon compte artisan"
                      : "Créer un compte"
                    : "Se connecter"}
          </DialogTitle>
          {(step === "role" || step === "niveau") && (
            <span className="h-1 w-10 rounded-full bg-teal-600" />
          )}
          <DialogDescription className="text-[15px] text-slate-600">
            {step === "role" ? (
              <>
                Dites-nous{" "}
                <span className="font-semibold text-teal-800">
                  qui vous êtes
                </span>{" "}
                pour continuer.
              </>
            ) : step === "niveau" ? (
              "Cela détermine les documents à fournir pour votre vérification."
            ) : step === "documents" ? (
              "Dernière étape avant de recevoir des demandes."
            ) : mode === "signup" ? (
              role === "artisan" ? (
                "Recevez des demandes de clients vérifiés près de chez vous."
              ) : (
                "Publiez une demande et trouvez un artisan vérifié."
              )
            ) : (
              "Accédez à votre espace SOS House."
            )}
          </DialogDescription>
        </DialogHeader>

        {step === "role" ? (
          <>
            <div className="mt-6 flex flex-col gap-3">
              {roleChoices.map(
                ({
                  role: choiceRole,
                  Icon,
                  title,
                  description,
                  borderClass,
                  iconWrapClass,
                  chevronClass,
                }) => (
                  <button
                    key={choiceRole}
                    type="button"
                    onClick={() => selectRole(choiceRole)}
                    className={`group flex cursor-pointer items-center gap-4 rounded-2xl border border-l-4 border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.1)] ${borderClass}`}
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-full ${iconWrapClass}`}
                    >
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
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5 ${chevronClass}`}
                    >
                      <ChevronRight className="size-4" />
                    </span>
                  </button>
                ),
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 divide-x divide-slate-200 border-t border-slate-100 pt-5 sm:gap-6">
              {trustBadges.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-1 items-start gap-1.5 pl-4 first:pl-0"
                >
                  <Icon className="size-4 shrink-0 text-teal-600" />
                  <span className="text-[11px] leading-[1.4] text-slate-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : step === "niveau" ? (
          <div className="mt-6 flex flex-col gap-3">
            {niveauChoices.map(({ value, Icon, title, description }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  signUpForm.setFieldValue("niveau", value);
                  selectNiveau();
                }}
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-l-4 border-l-teal-600 border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.1)]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800">
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
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition group-hover:translate-x-0.5">
                  <ChevronRight className="size-4" />
                </span>
              </button>
            ))}
          </div>
        ) : step === "documents" ? (
          <form
            className="mt-6 flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signUpForm.handleSubmit();
            }}
          >
            <signUpForm.Subscribe selector={(state) => state.values.niveau}>
              {(niveau) => (
                <>
                  {niveau === "n2" && (
                    <>
                      <signUpForm.Field name="rc">
                        {(field) => (
                          <InputGroup className={inputGroupClassName}>
                            <InputGroupAddon>
                              <IdCard />
                            </InputGroupAddon>
                            <InputGroupInput
                              placeholder="RC (registre de commerce)"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </InputGroup>
                        )}
                      </signUpForm.Field>

                      <signUpForm.Field name="secteurActivite">
                        {(field) => (
                          <InputGroup className={inputGroupClassName}>
                            <InputGroupAddon>
                              <Briefcase />
                            </InputGroupAddon>
                            <InputGroupInput
                              placeholder="Secteur d'activité"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </InputGroup>
                        )}
                      </signUpForm.Field>

                      <signUpForm.Field name="nomCommercial">
                        {(field) => (
                          <InputGroup className={inputGroupClassName}>
                            <InputGroupAddon>
                              <Building2 />
                            </InputGroupAddon>
                            <InputGroupInput
                              placeholder="Nom commercial"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </InputGroup>
                        )}
                      </signUpForm.Field>
                    </>
                  )}

                  {niveau === "n1" && (
                    <signUpForm.Field name="carteAutoEntrepreneur">
                      {(field) => (
                        <FileField
                          label="Carte auto-entrepreneur"
                          file={field.state.value}
                          onChange={field.handleChange}
                        />
                      )}
                    </signUpForm.Field>
                  )}

                  <signUpForm.Field name="cinRecto">
                    {(field) => (
                      <FileField
                        label="CIN — recto"
                        file={field.state.value}
                        onChange={field.handleChange}
                      />
                    )}
                  </signUpForm.Field>

                  <signUpForm.Field name="cinVerso">
                    {(field) => (
                      <FileField
                        label="CIN — verso"
                        file={field.state.value}
                        onChange={field.handleChange}
                      />
                    )}
                  </signUpForm.Field>

                  <signUpForm.Field name="selfie">
                    {(field) => (
                      <FileField
                        label="Selfie"
                        file={field.state.value}
                        onChange={field.handleChange}
                      />
                    )}
                  </signUpForm.Field>
                </>
              )}
            </signUpForm.Subscribe>

            <Button
              type="submit"
              className="mt-2 h-[52px] justify-center rounded-xl bg-[#ffa514] text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
            >
              Créer mon compte artisan
            </Button>
          </form>
        ) : mode === "signup" ? (
          <form
            className="mt-6 flex flex-col gap-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (role === "artisan") {
                const niveau = signUpForm.state.values.niveau;
                if (niveau && niveau !== "n0") {
                  if (!validateBasics()) return;
                  goToDocuments();
                  return;
                }
              }

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
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600">
                      <span className="flex flex-1 items-center gap-2.5 overflow-hidden text-slate-700">
                        <Wrench className="size-4 shrink-0 text-slate-500" />
                        <SelectValue placeholder="Métier (ex : Plombier)" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {professions.map((profession) => (
                        <SelectItem key={profession} value={profession}>
                          {profession}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    placeholder="Téléphone"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              )}
            </signUpForm.Field>

            <Button
              type="submit"
              className="mt-2 h-[52px] justify-center rounded-xl bg-[#ffa514] text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
            >
              {role === "artisan" ? (
                <signUpForm.Subscribe selector={(state) => state.values.niveau}>
                  {(niveau) =>
                    niveau && niveau !== "n0"
                      ? "Continuer"
                      : "Créer mon compte artisan"
                  }
                </signUpForm.Subscribe>
              ) : (
                "Créer mon compte"
              )}
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
              className="mt-2 h-[52px] justify-center rounded-xl bg-[#ffa514] text-[15px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
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
                  className="cursor-pointer font-semibold text-teal-800 hover:text-teal-800"
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
                  className="cursor-pointer font-semibold text-teal-800 hover:text-teal-800"
                  onClick={() => {
                    setMode("signup");
                    resetToRole();
                  }}
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
