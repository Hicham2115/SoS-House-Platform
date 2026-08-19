// Ticket ranges from the cahier des charges grille tarifaire (10.3) —
// single source of truth for any client-facing price estimate.
const TICKET_RANGES_MAD = {
  plomberie: { min: 300, max: 8000 },
  electricite: { min: 300, max: 20000 },
  serrurerie: { min: 200, max: 800 },
  bricolage: { min: 150, max: 800 },
  nettoyage: { min: 300, max: 4000 },
  peinture: { min: 2000, max: 15000 },
  "lavage-auto": { min: 80, max: 400 },
};

export function getPriceEstimate(categoryValue) {
  return TICKET_RANGES_MAD[categoryValue] ?? null;
}
