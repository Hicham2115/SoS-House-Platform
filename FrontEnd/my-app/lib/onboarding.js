export const accountTypes = [
  {
    value: "particulier",
    label: "Particulier",
    description: "Je publie des demandes pour mon usage personnel.",
    requiresRaisonSociale: false,
    requiresIce: false,
    requiresReferent: false,
  },
  {
    value: "professionnel",
    label: "Professionnel",
    description: "TPE, commerce, syndic — facture simple.",
    requiresRaisonSociale: true,
    requiresIce: false,
    requiresReferent: false,
  },
  {
    value: "entreprise",
    label: "Entreprise",
    description: "Société immatriculée — facture avec TVA récupérable.",
    requiresRaisonSociale: true,
    requiresIce: true,
    requiresReferent: true,
  },
];

export function getAccountType(value) {
  return accountTypes.find((type) => type.value === value) ?? null;
}

// "aucune" = no invoice needed, "simple" = editable invoice without VAT,
// "tva" = VAT invoice, locked per the cahier des charges (5.2): a
// collaborator on an Entreprise account must never be able to disable it.
export function getInvoiceRequirement(accountTypeValue) {
  if (accountTypeValue === "entreprise") {
    return { value: "tva", editable: false };
  }
  if (accountTypeValue === "professionnel") {
    return { value: "simple", editable: true };
  }
  return { value: "aucune", editable: true };
}

export function hasDefaultAddress(user) {
  return Boolean(user?.ville && user?.quartier && user?.adresse);
}

export function isOnboardingRequirementsMet(user) {
  return Boolean(user?.account_type) && hasDefaultAddress(user);
}

// Weighted so the two hard requirements (account type, address) already
// carry most of the bar — email/photo/notification only top it off.
const COMPLETION_WEIGHTS = {
  account_type: 40,
  address: 40,
  email: 10,
  avatar: 5,
  notification_Channel: 5,
};

export function getProfileCompletionPct(user) {
  let pct = 0;
  if (user?.account_type) pct += COMPLETION_WEIGHTS.account_type;
  if (hasDefaultAddress(user)) pct += COMPLETION_WEIGHTS.address;
  if (user?.email) pct += COMPLETION_WEIGHTS.email;
  if (user?.avatar) pct += COMPLETION_WEIGHTS.avatar;
  if (user?.notification_Channel)
    pct += COMPLETION_WEIGHTS.notification_Channel;
  return Math.min(pct, 100);
}
