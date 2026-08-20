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
    label: "Plomberie · Fuite d'eau · Maârif",
    zone: "Quartier approximatif",
    budget: "300-500 MAD",
    urgency: "urgente",
    credits: 15,
  },
  {
    id: "demande-2",
    category: "electricite",
    label: "Électricité · Court-circuit · Maarif Extension",
    zone: "Quartier approximatif",
    budget: "200-400 MAD",
    urgency: "programmee",
    credits: 10,
  },
  {
    id: "demande-3",
    category: "nettoyage",
    label: "Ménage · Nettoyage complet · Anfa",
    zone: "Quartier approximatif",
    budget: "150-250 MAD",
    urgency: "programmee",
    credits: 8,
  },
  {
    id: "demande-4",
    category: "peinture",
    label: "Peinture · Salon + 2 chambres · Bourgogne",
    zone: "Quartier approximatif",
    budget: "500-800 MAD",
    urgency: "urgente",
    credits: 20,
  },
];

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
