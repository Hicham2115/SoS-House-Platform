import { getCategory } from "@/lib/services-catalog";

const invoiceLevelByRequired = {
  aucune: "n0",
  simple: "n1",
  tva: "n2",
};

// No pricing service exists yet — flat placeholder until the backend
// exposes a real unlock cost per demande.
const DEFAULT_UNLOCK_CREDITS = 10;

export function minutesSince(dateString) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  return Math.max(0, Math.round(diffMs / 60000));
}

export function demandeTitle(demande) {
  const category = getCategory(demande.category);
  const subcategory = category?.subcategories?.find(
    (s) => s.value === demande.subcategory,
  );
  return subcategory?.label ?? category?.label ?? demande.category;
}

export function mapDemandeToCard(demande) {
  return {
    id: demande.id,
    title: demandeTitle(demande),
    category: demande.category,
    quartier: demande.adresse,
    ville: demande.ville,
    publishedMinutesAgo: minutesSince(demande.created_at),
    description: demande.description,
    urgency: demande.urgency,
    invoiceLevel: invoiceLevelByRequired[demande.invoice_required] ?? "n0",
    budgetMin: demande.budget_min,
    budgetMax: demande.budget_max,
    credits: DEFAULT_UNLOCK_CREDITS,
  };
}
