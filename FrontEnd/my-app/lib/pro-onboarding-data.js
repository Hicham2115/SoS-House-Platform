// Mock data for the provider (artisan) onboarding flow — UI structure only,
// no backend yet. Swap for real endpoints/config once step-N wiring lands.

export const bannerCopy = {
  blocking: {
    title: "Complétez votre vérification pour recevoir des demandes",
    subtitle: "Le Socle (étape 1) est requis avant de pouvoir répondre.",
  },
  pending_review: {
    title: "Vérification en cours (48-72h)",
    subtitle: "Notre équipe examine vos documents.",
  },
  optional: {
    title: "Complétez votre profil pour améliorer votre visibilité",
    subtitle: "Niveau, compétences et disponibilités — quelques minutes.",
  },
};

export const niveauOptions = [
  {
    value: "n0",
    title: "N0 — Non déclaré",
    description: "Accès aux demandes sans facture requise",
  },
  {
    value: "n1",
    title: "N1 — Auto-entrepreneur",
    description: "Facture simple, sans TVA récupérable",
  },
  {
    value: "n2",
    title: "N2 — Société",
    description: "Facture avec TVA récupérable, accès aux comptes professionnels",
  },
];

export const planOptions = [
  {
    value: "decouverte",
    name: "Découverte",
    price: "Gratuit",
    badge: "Recommandé pour débuter",
    features: ["3 leads inclus/mois", "Rayon 5 km", "1 catégorie"],
  },
  {
    value: "pro",
    name: "Pro",
    price: "À l'usage",
    features: ["Leads à la carte", "Rayon 15 km", "3 catégories"],
  },
  {
    value: "pro-plus",
    name: "Pro+",
    price: "199 MAD/mois",
    features: ["Leads illimités", "Rayon 30 km", "Toutes catégories"],
  },
  {
    value: "entreprise",
    name: "Entreprise",
    price: "Sur devis",
    features: ["Multi-comptes", "Rayon national", "Support dédié"],
  },
];

export const dayOptions = [
  { value: "lun", label: "Lun" },
  { value: "mar", label: "Mar" },
  { value: "mer", label: "Mer" },
  { value: "jeu", label: "Jeu" },
  { value: "ven", label: "Ven" },
  { value: "sam", label: "Sam" },
  { value: "dim", label: "Dim" },
];
