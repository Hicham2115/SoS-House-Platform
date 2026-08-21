// Mock data for the provider (artisan) onboarding flow — UI structure only,
// no backend yet. Swap for real endpoints/config once step-N wiring lands.

export const bannerCopy = {
  blocking: {
    title: "Complétez votre vérification pour recevoir des demandes",
    subtitle: "Votre zone d'intervention (étape 1) est requise avant de pouvoir répondre.",
  },
  pending_review: {
    title: "Vérification en cours (48-72h)",
    subtitle: "Notre équipe examine vos documents.",
  },
  optional: {
    title: "Complétez votre profil pour améliorer votre visibilité",
    subtitle: "Portfolio et disponibilités — quelques minutes.",
  },
};

export const dayOptions = [
  { value: "lun", label: "Lun" },
  { value: "mar", label: "Mar" },
  { value: "mer", label: "Mer" },
  { value: "jeu", label: "Jeu" },
  { value: "ven", label: "Ven" },
  { value: "sam", label: "Sam" },
  { value: "dim", label: "Dim" },
];
