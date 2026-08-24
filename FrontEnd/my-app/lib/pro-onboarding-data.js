// Mock data for the provider (artisan) onboarding flow — UI structure only,
// no backend yet. Swap for real endpoints/config once step-N wiring lands.

export const bannerCopy = {
  blocking: {
    title: "Complétez votre profil pour recevoir des demandes",
    subtitle: "Votre zone d'intervention (étape 1) est requise avant de pouvoir répondre.",
  },
  pending_review: {
    title: "Votre profil est presque complet",
    subtitle: "Continuez à compléter votre profil et votre portfolio.",
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
