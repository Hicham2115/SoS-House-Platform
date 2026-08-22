// Placeholder data for the artisan/pro dashboard — there is no missions,
// credits, or quotes backend yet. Swap for real endpoints once they exist.

export const proSummary = {
  credits: 85,
  demandesReceivedThisMonth: 28,
  demandesReceivedTrend: "+12% vs le mois dernier",
  conversionRate: 42,
  conversionTrend: "+8% vs le mois dernier",
  revenueThisMonth: 7450,
  revenueTrend: "+15% vs le mois dernier",
};

export const missedOpportunities = {
  count: 12,
  estimatedValue: 3200,
};

export const profileVerification = {
  identite: true,
  autoEntrepreneur: true,
  societe: false,
  rating: 4.9,
  reviewsCount: 87,
};

export const availableDemandes = [
  {
    id: "demande-1",
    category: "plomberie",
    title: "Réparation fuite d'eau sous évier",
    description:
      "Fuite d'eau sous l'évier de la cuisine, besoin d'un plombier pour identifier la source et réparer.",
    quartier: "Maârif",
    ville: "Casablanca",
    distanceKm: 2.4,
    publishedMinutesAgo: 15,
    urgency: "urgente",
    invoiceLevel: "n1",
    budgetMin: 300,
    budgetMax: 500,
    credits: 15,
  },
  {
    id: "demande-2",
    category: "electricite",
    title: "Installation prise électrique",
    description:
      "Installer 3 prises électriques dans le salon et une prise extérieure.",
    quartier: "Palmier",
    ville: "Casablanca",
    distanceKm: 1.8,
    publishedMinutesAgo: 28,
    urgency: "programmee",
    invoiceLevel: "n1",
    budgetMin: 200,
    budgetMax: 400,
    credits: 10,
  },
  {
    id: "demande-3",
    category: "nettoyage",
    title: "Ménage complet appartement",
    description:
      "Ménage complet d'un appartement de 80m² avant état des lieux.",
    quartier: "Ain Diab",
    ville: "Casablanca",
    distanceKm: 3.2,
    publishedMinutesAgo: 45,
    urgency: "programmee",
    invoiceLevel: "n0",
    budgetMin: 150,
    budgetMax: 250,
    credits: 8,
  },
  {
    id: "demande-4",
    category: "peinture",
    title: "Peinture salon + 2 chambres",
    description:
      "Peinture des murs et plafonds, préparation incluse. Couleur au choix.",
    quartier: "Oasis",
    ville: "Casablanca",
    distanceKm: 4.6,
    publishedMinutesAgo: 60,
    urgency: "urgente",
    invoiceLevel: "n2",
    budgetMin: 500,
    budgetMax: 800,
    credits: 20,
  },
];

export const invoiceLevelMeta = {
  n0: { label: "Facture non requise (N0)", className: "bg-slate-100 text-slate-600" },
  n1: { label: "Facture simple (N1+)", className: "bg-amber-50 text-amber-700" },
  n2: { label: "Facture avec TVA (N2)", className: "bg-violet-50 text-violet-600" },
};

export const categoryToneMeta = {
  plomberie: { icon: "bg-teal-50 text-teal-700", pill: "bg-teal-50 text-teal-700" },
  electricite: { icon: "bg-amber-50 text-amber-600", pill: "bg-amber-50 text-amber-700" },
  nettoyage: { icon: "bg-green-50 text-green-600", pill: "bg-green-50 text-green-700" },
  peinture: { icon: "bg-violet-50 text-violet-600", pill: "bg-violet-50 text-violet-700" },
  serrurerie: { icon: "bg-violet-50 text-violet-600", pill: "bg-violet-50 text-violet-700" },
  bricolage: { icon: "bg-orange-50 text-orange-600", pill: "bg-orange-50 text-orange-700" },
  "lavage-auto": { icon: "bg-sky-50 text-sky-600", pill: "bg-sky-50 text-sky-700" },
};

export const missionsEnCours = [
  {
    id: "M-2025-3158",
    category: "plomberie",
    label: "Plomberie · Réparation chasse d'eau",
    clientPhone: "06 12 ** ** 45",
    ville: "Maârif",
    status: "en-cours",
  },
  {
    id: "M-2025-3142",
    category: "electricite",
    label: "Électricité · Installation luminaire",
    clientPhone: "06 61 ** ** 98",
    ville: "Racine",
    status: "planifiee",
    scheduled: "Demain à 10:00",
  },
  {
    id: "M-2025-3125",
    category: "nettoyage",
    label: "Ménage · Appartement 120m²",
    clientPhone: "06 33 ** ** 22",
    ville: "Palmier",
    status: "attente-confirmation",
  },
];

export const missionStatusMeta = {
  "en-cours": { label: "En cours", className: "bg-green-50 text-green-700" },
  planifiee: {
    label: "Intervention planifiée",
    className: "bg-teal-50 text-teal-700",
  },
  "attente-confirmation": {
    label: "En attente de confirmation",
    className: "bg-amber-50 text-amber-700",
  },
};

export const creditBalance = {
  available: 85,
  inUse: 15,
  inUseDemandes: 3,
  bonus: 10,
  bonusExpiry: "25 mai 2024",
};

export const creditPackages = [
  { id: "p20", credits: 20, price: 20 },
  { id: "p50", credits: 50, price: 50, badge: "populaire" },
  { id: "p100", credits: 100, price: 100 },
  { id: "p200", credits: 200, price: 200, badge: "meilleure-valeur" },
  { id: "p500", credits: 500, price: 500 },
];

export const paymentMethods = [
  { id: "carte", label: "Carte bancaire", note: "Paiement sécurisé" },
  { id: "mobile-money", label: "Mobile Money", note: "Instantané" },
  { id: "cash-plus", label: "Cash Plus", note: "Disponible partout" },
  { id: "wafacash", label: "Wafacash", note: "Disponible partout" },
  { id: "barid-cash", label: "Barid Cash", note: "Instantané" },
];

export const creditOffers = [
  {
    id: "bienvenue",
    title: "Bonus de bienvenue",
    subtitle: "10 crédits offerts",
    detail: "Valable 7 jours après votre 1ère recharge",
  },
  {
    id: "pack-pro",
    title: "Pack Pro",
    subtitle: "+20% de crédits offerts",
    detail: "À partir de 100 crédits achetés",
  },
];

export const creditTransactions = [
  {
    date: "11 mai 2024, 15:22",
    type: "Achat",
    description: "Recharge de 50 crédits",
    credits: 50,
    amount: "50 MAD",
    balanceAfter: 85,
    method: "Carte bancaire",
  },
  {
    date: "11 mai 2024, 15:20",
    type: "Utilisation",
    description: "Déverrouillage demande #DV-2024-052",
    credits: -15,
    amount: "—",
    balanceAfter: 35,
    method: "—",
  },
  {
    date: "10 mai 2024, 11:05",
    type: "Bonus mission",
    description: "Mission terminée – avis positif",
    credits: 10,
    amount: "—",
    balanceAfter: 50,
    method: "Bonus",
  },
  {
    date: "10 mai 2024, 09:41",
    type: "Achat",
    description: "Recharge de 20 crédits",
    credits: 20,
    amount: "20 MAD",
    balanceAfter: 40,
    method: "Cash Plus",
  },
];

export const creditEstimate = {
  demandesDebloquees: 12,
  creditsUtilises: 12,
  moyenneParDemande: 1,
  recommendation:
    "Rechargez 50 à 100 crédits pour ne jamais manquer une bonne opportunité.",
};
