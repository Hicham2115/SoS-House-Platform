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

export const conversations = [
  {
    id: "youssef",
    name: "Youssef E.",
    avatar: avatar2,
    type: "artisan",
    online: true,
    subject: "Électricité • Prise défectueuse",
    preview: "Je peux passer demain matin vers 9h, ça vous convient ?",
    time: "10:24",
    unread: true,
  },
  {
    id: "amine",
    name: "Amine B.",
    avatar: avatar3,
    type: "artisan",
    online: false,
    subject: "Serrurerie • Porte d'entrée bloquée",
    preview: "C'est confirmé pour mercredi 14h00.",
    time: "Hier",
    unread: true,
  },
  {
    id: "reda",
    name: "Reda Plomberie",
    initials: "RP",
    type: "artisan",
    online: false,
    subject: "Peinture intérieure",
    preview: "J'ai terminé la première couche, photos envoyées.",
    time: "Lun.",
    unread: false,
  },
  {
    id: "support",
    name: "Support SOS House",
    initials: "SH",
    type: "support",
    online: true,
    subject: "Votre demande #4021",
    preview: "Merci de votre retour, tout est en ordre de notre côté.",
    time: "22 mai",
    unread: false,
  },
];

// Client-only demo thread content — there is no messaging backend yet, so
// this only drives the UI shell (including locally-appended replies).
export const messagesByConversation = {
  youssef: [
    {
      from: "them",
      text: "Bonjour Hicham,\n\nJe peux passer demain matin vers 9h, ça vous convient ?",
      time: "10:24",
    },
    {
      from: "me",
      text: "Bonjour Youssef,\n\nOui, 9h me convient parfaitement. Merci !",
      time: "10:26",
      read: true,
    },
    {
      from: "them",
      text: "Parfait, à demain alors !\n\nN'hésitez pas si vous avez des précisions.",
      time: "10:27",
    },
  ],
  amine: [
    {
      from: "them",
      text: "Bonjour, je confirme mon passage mercredi à 14h00 pour la porte d'entrée.",
      time: "Hier",
    },
    {
      from: "me",
      text: "Parfait, c'est noté. Merci Amine !",
      time: "Hier",
      read: true,
    },
    { from: "them", text: "C'est confirmé pour mercredi 14h00.", time: "Hier" },
  ],
  reda: [
    {
      from: "them",
      text: "Bonjour, j'ai terminé la première couche de peinture, photos envoyées.",
      time: "Lun.",
    },
  ],
  support: [
    {
      from: "them",
      text: "Bonjour Hicham, merci de votre retour, tout est en ordre de notre côté concernant votre demande #4021.",
      time: "22 mai",
    },
  ],
};

// Placeholder rows for "Historique des missions" — there is no missions
// backend yet, swap for a real endpoint once it exists.
export const missionHistory = [
  {
    title: "Climatisation",
    category: null,
    subtitle: "Entretien complet",
    provider: "Reda Plomberie",
    ville: "Maarif, Casablanca",
    date: "Terminé le 15 mai 2024",
    rating: 5,
    credits: 50,
  },
  {
    title: "Nettoyage",
    category: "nettoyage",
    subtitle: "Appartement • 3 pièces",
    provider: "Fatima Z.",
    ville: "Anfa, Casablanca",
    date: "Terminé le 2 mai 2024",
    rating: 5,
    credits: 30,
  },
  {
    title: "Plomberie",
    category: "plomberie",
    subtitle: "Fuite sous évier",
    provider: "Youssef E.",
    ville: "Hay Hassani, Casablanca",
    date: "Terminé le 18 avril 2024",
    rating: 4,
    credits: 20,
  },
];

// Placeholder rows for the dashboard overview's "Historique des missions"
// preview — swap for a real endpoint once mission history is built.
export const missionHistoryPreview = [
  {
    title: "Réparation chasse d'eau",
    category: "Plomberie",
    ville: "Casablanca, Maarif",
    status: "terminee",
    price: "450 MAD",
    date: "20/07/2026",
  },
  {
    title: "Installation luminaire",
    category: "Électricité",
    ville: "Rabat, Agdal",
    status: "terminee",
    price: "350 MAD",
    date: "15/07/2026",
  },
  {
    title: "Peinture salon",
    category: "Peinture",
    ville: "Casablanca, Anfa",
    status: "annulee",
    price: null,
    date: "10/07/2026",
  },
];

export const missionStatusStyles = {
  terminee: "bg-green-50 text-green-700",
  annulee: "bg-blue-50 text-blue-600",
};

export const missionStatusLabels = {
  terminee: "Terminée",
  annulee: "Annulée",
};

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
