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

export const invoiceLevelShort = { n0: "N0", n1: "N1+", n2: "N2" };

// Full "Mes missions" list — same demandes as availableDemandes, now
// unlocked and tracked through their lifecycle.
export const missions = [
  {
    id: "mission-1",
    category: "plomberie",
    title: "Réparation fuite d'eau sous évier",
    quartier: "Maârif",
    ville: "Casablanca",
    distanceKm: 2.4,
    invoiceLevel: "n1",
    status: "en-cours",
    statusNote: "Mission acceptée",
    statusDate: "13 mai à 09:14",
    publishedLabel: "Publiée le 11 mai à 15:22",
    budget: 400,
  },
  {
    id: "mission-2",
    category: "electricite",
    title: "Installation prise électrique",
    quartier: "Palmier",
    ville: "Casablanca",
    distanceKm: 1.8,
    invoiceLevel: "n1",
    status: "attente-avis-prestataire",
    statusNote: "Mission terminée",
    statusDate: "12 mai à 18:30",
    publishedLabel: "Publiée le 10 mai à 10:05",
    budget: 300,
  },
  {
    id: "mission-3",
    category: "nettoyage",
    title: "Ménage complet appartement",
    quartier: "Ain Diab",
    ville: "Casablanca",
    distanceKm: 3.2,
    invoiceLevel: "n0",
    status: "attente-avis-client",
    statusNote: "En attente de confirmation",
    statusDate: "11 mai à 14:12",
    publishedLabel: "Publiée le 9 mai à 16:40",
    budget: 200,
  },
  {
    id: "mission-4",
    category: "peinture",
    title: "Peinture salon + 2 chambres",
    quartier: "Oasis",
    ville: "Casablanca",
    distanceKm: 4.6,
    invoiceLevel: "n2",
    status: "terminee",
    statusNote: "Mission confirmée",
    statusDate: "8 mai à 17:45",
    publishedLabel: "Publiée le 7 mai à 09:18",
    budget: 650,
  },
  {
    id: "mission-5",
    category: "serrurerie",
    title: "Ouverture porte claquée",
    quartier: "Racine",
    ville: "Casablanca",
    distanceKm: 2.1,
    invoiceLevel: "n0",
    status: "annulee",
    statusNote: "Annulée par le client",
    statusDate: "6 mai à 12:20",
    publishedLabel: "Publiée le 5 mai à 11:03",
    budget: null,
  },
];

export const missionSummary = {
  total: 28,
  enCours: 6,
  terminees: 18,
  attenteAvis: 4,
  annulees: 2,
};

export const missionDetailStatusMeta = {
  "en-cours": { label: "En cours", className: "bg-teal-50 text-teal-700" },
  "attente-avis-prestataire": {
    label: "En attente d'avis",
    className: "bg-green-50 text-green-700",
  },
  "attente-avis-client": {
    label: "En attente d'avis client",
    className: "bg-violet-50 text-violet-700",
  },
  terminee: { label: "Terminée", className: "bg-green-50 text-green-700" },
  annulee: { label: "Annulée", className: "bg-red-50 text-red-600" },
};
