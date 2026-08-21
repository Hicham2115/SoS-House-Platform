// Invoice requirement is now chosen per-demande (see StepInvoice in the
// publier flow) rather than derived from a client account type — every
// client can freely pick "aucune" (n0) / "simple" (n1) / "tva" (n2), which
// map directly onto the artisan niveau ranks used by
// DemandeController::available() to gate which demandes an artisan sees.
export function getInvoiceRequirement() {
  return { value: "aucune", editable: true };
}

export function hasDefaultAddress(user) {
  return Boolean(user?.ville && user?.quartier && user?.adresse);
}

export function isOnboardingRequirementsMet(user) {
  return hasDefaultAddress(user);
}

// Weighted so the one hard requirement (address) carries most of the bar —
// email/photo/notification only top it off.
const COMPLETION_WEIGHTS = {
  address: 70,
  email: 10,
  avatar: 10,
  notification_Channel: 10,
};

export function getProfileCompletionPct(user) {
  let pct = 0;
  if (hasDefaultAddress(user)) pct += COMPLETION_WEIGHTS.address;
  if (user?.email) pct += COMPLETION_WEIGHTS.email;
  if (user?.avatar) pct += COMPLETION_WEIGHTS.avatar;
  if (user?.notification_Channel)
    pct += COMPLETION_WEIGHTS.notification_Channel;
  return Math.min(pct, 100);
}
