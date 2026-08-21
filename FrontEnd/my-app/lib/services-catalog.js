import {
  Car,
  Droplet,
  Hammer,
  KeyRound,
  PaintRoller,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { categories as landingCategories } from "@/lib/professions";

function slugify(label) {
  return label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// The 7 core categories carry real subcategories/qualification fields; the
// rest of the landing page's category list is appended below so every
// service shown publicly is also selectable when publishing a demande.
const coreCategories = [
  {
    value: "plomberie",
    label: "Plomberie",
    Icon: Droplet,
    subcategories: [
      { value: "fuite", label: "Fuite et dégât des eaux" },
      { value: "debouchage", label: "Débouchage" },
      { value: "installation", label: "Installation et remplacement sanitaire" },
      { value: "chauffe-eau", label: "Chauffe-eau" },
      { value: "robinetterie", label: "Robinetterie" },
    ],
  },
  {
    value: "electricite",
    label: "Électricité",
    Icon: Zap,
    subcategories: [
      { value: "panne", label: "Panne et coupure" },
      { value: "mise-aux-normes", label: "Mise aux normes" },
      { value: "tableau", label: "Tableau électrique" },
      { value: "eclairage", label: "Éclairage" },
      { value: "prises", label: "Prises et interrupteurs" },
    ],
  },
  {
    value: "serrurerie",
    label: "Serrurerie",
    Icon: KeyRound,
    subcategories: [
      { value: "ouverture", label: "Ouverture de porte" },
      { value: "remplacement", label: "Remplacement de serrure" },
      { value: "blindage", label: "Blindage" },
      { value: "cles", label: "Clés et cylindres" },
    ],
  },
  {
    value: "bricolage",
    label: "Bricolage et petits travaux",
    Icon: Hammer,
    subcategories: [
      { value: "montage", label: "Montage de meubles" },
      { value: "fixation", label: "Fixation et pose" },
      { value: "reparations", label: "Petites réparations" },
    ],
  },
  {
    value: "nettoyage",
    label: "Nettoyage",
    Icon: Sparkles,
    subcategories: [
      { value: "regulier", label: "Ménage régulier" },
      { value: "fin-chantier", label: "Nettoyage de fin de chantier" },
      { value: "vitres", label: "Vitres" },
    ],
  },
  {
    value: "peinture",
    label: "Peinture",
    Icon: PaintRoller,
    subcategories: [
      { value: "interieure", label: "Intérieure" },
      { value: "exterieure", label: "Extérieure" },
      { value: "facade", label: "Façade" },
    ],
  },
  {
    value: "lavage-auto",
    label: "Lavage automobile à domicile",
    Icon: Car,
    subcategories: [
      { value: "exterieur", label: "Lavage extérieur" },
      { value: "interieur", label: "Nettoyage intérieur" },
      { value: "complet", label: "Complet" },
    ],
  },
];

const extraCategories = landingCategories.map((label) => ({
  value: slugify(label),
  label,
  Icon: Wrench,
  subcategories: [],
}));

export const categories = [...coreCategories, ...extraCategories];

export function getCategory(value) {
  return categories.find((category) => category.value === value) ?? null;
}

export const propertyTypes = [
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "local-commercial", label: "Local commercial" },
  { value: "bureau", label: "Bureau" },
];

// Per-category qualification fields (cahier des charges 9.4). Each field is
// rendered generically by StepQualification rather than hardcoded per form.
export const qualificationFields = {
  plomberie: [
    {
      name: "localisation",
      label: "Localisation",
      type: "select",
      options: [
        { value: "cuisine", label: "Cuisine" },
        { value: "salle-de-bain", label: "Salle de bain" },
        { value: "exterieur", label: "Extérieur" },
      ],
    },
    { name: "eauCoupee", label: "Eau coupée ?", type: "boolean" },
  ],
  electricite: [
    { name: "typePanne", label: "Panne totale ou partielle", type: "boolean", trueLabel: "Totale", falseLabel: "Partielle" },
  ],
  serrurerie: [
    { name: "porteFermee", label: "Porte claquée ou fermée à clé ?", type: "boolean", trueLabel: "Fermée à clé", falseLabel: "Claquée" },
  ],
  bricolage: [
    { name: "typeTravaux", label: "Type de travaux", type: "text" },
  ],
  nettoyage: [
    { name: "surface", label: "Surface (m²)", type: "text" },
    {
      name: "frequence",
      label: "Fréquence souhaitée",
      type: "select",
      options: [
        { value: "ponctuel", label: "Ponctuel" },
        { value: "hebdomadaire", label: "Hebdomadaire" },
        { value: "mensuel", label: "Mensuel" },
      ],
    },
  ],
  peinture: [
    { name: "surface", label: "Surface approximative (m²)", type: "text" },
    { name: "fourniture", label: "Fourniture incluse ?", type: "boolean" },
  ],
  // Temporarily disabled — additional lavage-auto qualification questions.
  // "lavage-auto": [
  //   {
  //     name: "typeVehicule",
  //     label: "Type de véhicule",
  //     type: "select",
  //     options: [
  //       { value: "citadine", label: "Citadine (ex: Clio, Sandero, 208)" },
  //       { value: "berline", label: "Berline (ex: Logan, 301, Fluence)" },
  //       { value: "suv", label: "SUV (ex: Duster, Tucson, Sportage)" },
  //       { value: "utilitaire", label: "Utilitaire (ex: Kangoo, Dokker, Hilux)" },
  //     ],
  //   },
  //   {
  //     name: "formule",
  //     label: "Intérieur, extérieur ou complet",
  //     type: "select",
  //     options: [
  //       { value: "interieur", label: "Intérieur" },
  //       { value: "exterieur", label: "Extérieur" },
  //       { value: "complet", label: "Complet" },
  //     ],
  //   },
  // ],
};

export const urgencyOptions = [
  { value: "programmee", label: "Programmée" },
  { value: "sous-48h", label: "Sous 48h" },
  { value: "urgente", label: "Urgente" },
];
