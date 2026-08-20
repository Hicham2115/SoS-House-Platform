import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import avatar3 from "@/app/assets/avatars/avatar-3.png";
import { getCategory, urgencyOptions } from "@/lib/services-catalog";

// Only status the backend sets today — extend alongside the backend's
// workflow (mission accepted, in progress, done, ...) as it's built out.
export const statusStyles = {
  "En attente de réponses": "bg-amber-50 text-amber-700",
};

export const urgencyStyles = {
  programmee: "bg-slate-100 text-slate-600",
  "sous-48h": "bg-amber-50 text-amber-700",
  urgente: "bg-red-50 text-red-700",
};

// Shapes a raw demande row (from GET /demandes) into what RequestCard and
// the demandes table expect. No provider/note/action yet — that needs the
// missions domain, which isn't built.
export function toRequestCard(demande) {
  const category = getCategory(demande.category);
  const subcategory = category?.subcategories.find(
    (s) => s.value === demande.subcategory,
  );

  return {
    Icon: category?.Icon ?? FileText,
    title: subcategory
      ? `${category.label} — ${subcategory.label}`
      : (category?.label ?? demande.category),
    subtitle: demande.ville,
    meta: `Créée le ${format(new Date(demande.created_at), "d MMMM yyyy", { locale: fr })}`,
    status: "En attente de réponses",
    urgency: urgencyOptions.find((u) => u.value === demande.urgency)?.label,
    urgencyValue: demande.urgency,
  };
}

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

export const conversations = [
  {
    name: "Youssef E.",
    avatar: avatar2,
    subject: "Électricité • Prise défectueuse",
    preview: "Je peux passer demain matin vers 9h, ça vous convient ?",
    time: "10:24",
    unread: true,
  },
  {
    name: "Amine B.",
    avatar: avatar3,
    subject: "Serrurerie • Porte d'entrée bloquée",
    preview: "C'est confirmé pour mercredi 14h00.",
    time: "Hier",
    unread: true,
  },
  {
    name: "Reda Plomberie",
    initials: "RP",
    subject: "Peinture intérieure",
    preview: "J'ai terminé la première couche, photos envoyées.",
    time: "Lun.",
    unread: false,
  },
  {
    name: "Support SOS House",
    initials: "SH",
    subject: "Votre demande #4021",
    preview: "Merci de votre retour, tout est en ordre de notre côté.",
    time: "22 mai",
    unread: false,
  },
];

export const missionHistory = [
  {
    title: "Climatisation",
    subtitle: "Entretien complet",
    provider: "Reda Plomberie",
    date: "Terminée le 15 mai 2024",
    rating: 5,
  },
  {
    title: "Nettoyage",
    subtitle: "Appartement • 3 pièces",
    provider: "Fatima Z.",
    date: "Terminée le 2 mai 2024",
    rating: 5,
  },
  {
    title: "Plomberie",
    subtitle: "Fuite sous évier",
    provider: "Youssef E.",
    date: "Terminée le 18 avril 2024",
    rating: 4,
  },
];

export const faqs = [
  {
    question: "Comment publier une nouvelle demande ?",
    answer:
      "Cliquez sur \"Publier une demande\" en haut de votre tableau de bord, décrivez votre besoin et recevez des réponses d'artisans vérifiés.",
  },
  {
    question: "Comment sont vérifiés les artisans ?",
    answer:
      "Chaque artisan passe une vérification d'identité en personne avant de pouvoir répondre aux demandes sur SOS House.",
  },
  {
    question: "Puis-je annuler une intervention planifiée ?",
    answer:
      "Oui, depuis \"Demandes actives\", ouvrez la demande concernée puis contactez le prestataire ou le support pour annuler.",
  },
  {
    question: "Comment mes données sont-elles protégées ?",
    answer:
      "Vos coordonnées ne sont jamais partagées publiquement et vos échanges restent chiffrés sur la plateforme.",
  },
];
