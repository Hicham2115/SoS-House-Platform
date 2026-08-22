import {
  BadgeCheck,
  CircleCheckBig,
  FileText,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Smile,
  Star,
} from "lucide-react";
// Only status the backend sets today — extend alongside the backend's
// workflow (mission accepted, in progress, done, ...) as it's built out.
export const statusStyles = {
  "En attente de réponses": "bg-amber-50 text-amber-700",
  "Prestataire choisi": "bg-teal-50 text-teal-700",
};

export const urgencyStyles = {
  programmee: "bg-slate-100 text-slate-600",
  "sous-48h": "bg-amber-50 text-amber-700",
  urgente: "bg-red-50 text-red-700",
};

export const stats = [
  { Icon: FileText, value: "4", label: "Demandes actives", tone: "teal" },
  {
    Icon: CircleCheckBig,
    value: "12",
    label: "Missions terminées",
    tone: "teal",
  },
  {
    Icon: Star,
    value: "4,8/5",
    label: "Note moyenne donnée",
    tone: "amber",
    progress: 96,
  },
  {
    Icon: Smile,
    value: "97%",
    label: "Taux de satisfaction",
    tone: "amber",
    progress: 97,
  },
];

export const reasons = [
  { Icon: ShieldCheck, label: "Artisans vérifiés en personne" },
  { Icon: BadgeCheck, label: "Avis authentiques de vrais clients" },
  { Icon: Lock, label: "Coordonnées protégées" },
  { Icon: HeartHandshake, label: "Accompagnement humain" },
];

export const faqs = [
  {
    question: "Comment publier une nouvelle demande ?",
    answer:
      'Cliquez sur "Publier une demande" en haut de votre tableau de bord, décrivez votre besoin et recevez des réponses d\'artisans vérifiés.',
  },
  {
    question: "Comment sont vérifiés les artisans ?",
    answer:
      "Chaque artisan passe une vérification d'identité en personne avant de pouvoir répondre aux demandes sur SOS House.",
  },
  {
    question: "Puis-je annuler une intervention planifiée ?",
    answer:
      'Oui, depuis "Demandes actives", ouvrez la demande concernée puis contactez le prestataire ou le support pour annuler.',
  },
  {
    question: "Comment mes données sont-elles protégées ?",
    answer:
      "Vos coordonnées ne sont jamais partagées publiquement et vos échanges restent chiffrés sur la plateforme.",
  },
];
