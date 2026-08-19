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

export function hasDefaultAddress(address) {
  return Boolean(
    address?.ville && address?.quartier && address?.adresseComplete,
  );
}

export function isOnboardingRequirementsMet(user) {
  return Boolean(user?.accountType) && hasDefaultAddress(user?.defaultAddress);
}

// Weighted so the two hard requirements (account type, address) already
// carry most of the bar — email/photo/notification only top it off.
const COMPLETION_WEIGHTS = {
  accountType: 40,
  address: 40,
  email: 10,
  avatar: 5,
  notificationChannel: 5,
};

export function getProfileCompletionPct(user) {
  let pct = 0;
  if (user?.accountType) pct += COMPLETION_WEIGHTS.accountType;
  if (hasDefaultAddress(user?.defaultAddress))
    pct += COMPLETION_WEIGHTS.address;
  if (user?.email) pct += COMPLETION_WEIGHTS.email;
  if (user?.avatarUrl) pct += COMPLETION_WEIGHTS.avatar;
  if (user?.notificationChannel) pct += COMPLETION_WEIGHTS.notificationChannel;
  return Math.min(pct, 100);
}
