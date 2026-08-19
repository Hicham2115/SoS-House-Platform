const PHONE_PATTERN = /(?:\+212|00212|0)[\s.-]?[5-7](?:[\s.-]?\d{2}){4}/g;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Detects phone numbers and emails typed into free text so they can be
// masked before the description reaches other users (cahier des charges
// 12.2 — coordinates must never leak through the demande description).
export function maskContactInfo(text) {
  let detected = false;
  const masked = text
    .replace(PHONE_PATTERN, () => {
      detected = true;
      return "[coordonnées masquées]";
    })
    .replace(EMAIL_PATTERN, () => {
      detected = true;
      return "[coordonnées masquées]";
    });
  return { masked, detected };
}
