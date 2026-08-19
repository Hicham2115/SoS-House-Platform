import {
  AirVent,
  Droplet,
  KeyRound,
  PaintRoller,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { create } from "zustand";

export const categories = [
  { value: "plomberie", label: "Plomberie", Icon: Droplet },
  { value: "electricite", label: "Électricité", Icon: Zap },
  { value: "serrurerie", label: "Serrurerie", Icon: KeyRound },
  { value: "peinture", label: "Peinture", Icon: PaintRoller },
  { value: "climatisation", label: "Climatisation", Icon: AirVent },
  { value: "nettoyage", label: "Nettoyage", Icon: Sparkles },
  { value: "autre", label: "Autre", Icon: Wrench },
];

const initialListings = [
  {
    id: "seed-1",
    title: "Chauffe-eau en panne",
    category: "plomberie",
    city: "Rabat",
    description:
      "Plus d'eau chaude depuis hier soir, besoin d'un plombier rapidement.",
    author: "Salma A.",
    postedAt: "Il y a 2 heures",
  },
  {
    id: "seed-2",
    title: "Peinture façade extérieure",
    category: "peinture",
    city: "Marrakech",
    description:
      "Recherche un artisan pour repeindre la façade d'une villa, environ 80m².",
    author: "Karim T.",
    postedAt: "Il y a 5 heures",
  },
];

export const useListingsStore = create((set) => ({
  listings: initialListings,
  addListing: (listing) =>
    set((state) => ({
      listings: [
        {
          ...listing,
          id: `listing-${Date.now()}`,
          author: "Vous",
          postedAt: "À l'instant",
        },
        ...state.listings,
      ],
    })),
}));
