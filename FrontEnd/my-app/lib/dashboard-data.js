import {
  BadgeCheck,
  CircleCheckBig,
  Droplet,
  FileText,
  HeartHandshake,
  Lock,
  ShieldCheck,
  Smile,
  Star,
  Zap,
  Calendar,
  PaintRoller,
} from "lucide-react";
import avatar2 from "@/app/assets/avatars/avatar-2.png";
import avatar3 from "@/app/assets/avatars/avatar-3.png";

export const statusStyles = {
  "En attente de réponses": "bg-amber-50 text-amber-700",
  "Prestataire retenu": "bg-teal-50 text-teal-700",
  "Intervention planifiée": "bg-blue-50 text-blue-700",
  "En cours": "bg-emerald-50 text-emerald-700",
  Terminée: "bg-slate-100 text-slate-600",
};

export const requests = [
  {
    Icon: Droplet,
    title: "Fuite d'eau",
    subtitle: "Salle de bain • Casablanca",
    meta: "Créée le 21 mai 2024",
    status: "En attente de réponses",
    note: "3 réponses reçues",
    action: "Comparer les réponses",
  },
  {
    Icon: Zap,
    title: "Électricité",
    subtitle: "Prise défectueuse • Salon",
    meta: "Retenu depuis le 22 mai 2024",
    status: "Prestataire retenu",
    provider: { name: "Youssef E.", avatar: avatar2 },
    action: "Message",
  },
  {
    Icon: Calendar,
    title: "Serrurerie",
    subtitle: "Porte d'entrée bloquée",
    meta: "Intervention planifiée",
    status: "Intervention planifiée",
    note: "Mer. 22 mai à 14h00",
    provider: { name: "Amine B.", avatar: avatar3 },
    action: "Détails",
    secondaryAction: "Message",
  },
  {
    Icon: PaintRoller,
    title: "Peinture intérieure",
    subtitle: "Appartement • 2 pièces",
    meta: "Commencé le 21 mai 2024",
    status: "En cours",
    provider: { name: "Reda Plomberie", initials: "RP" },
    action: "Message",
  },
  {
    Icon: CircleCheckBig,
    title: "Climatisation",
    subtitle: "Entretien complet",
    meta: "Terminée le 15 mai 2024",
    status: "Terminée",
    note: "Merci pour votre confiance !",
  },
];

export const stats = [
  { Icon: FileText, value: "4", label: "Demandes actives", tone: "teal" },
  {
    Icon: CircleCheckBig,
    value: "12",
    label: "Missions terminées",
    tone: "teal",
  },
  { Icon: Star, value: "4,8/5", label: "Note moyenne donnée", tone: "amber" },
  { Icon: Smile, value: "97%", label: "Taux de satisfaction", tone: "amber" },
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
