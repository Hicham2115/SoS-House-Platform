"use client";

import { useMemo, useState } from "react";
import {
  Bookmark,
  CalendarDays,
  FileText,
  LayoutGrid,
  Lock,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  availableDemandes,
  categoryToneMeta,
  invoiceLevelMeta,
} from "@/lib/pro-dashboard-data";
import { categories, getCategory } from "@/lib/services-catalog";

const urgencyBadgeStyles = {
  urgente: "bg-red-50 text-red-600",
  programmee: "bg-teal-50 text-teal-700",
};

const urgencyLabels = {
  urgente: "Urgent",
  programmee: "Programmée",
};

const budgetFilters = [
  { value: "all", label: "Tous" },
  { value: "low", label: "Moins de 300 MAD" },
  { value: "mid", label: "300 – 600 MAD" },
  { value: "high", label: "Plus de 600 MAD" },
];

const sortOptions = [
  { value: "recent", label: "Plus récentes" },
  { value: "budget-desc", label: "Budget décroissant" },
  { value: "credits-asc", label: "Crédits croissants" },
];

function publishedLabel(minutesAgo) {
  if (minutesAgo < 60) return `Publiée il y a ${minutesAgo} min`;
  const hours = Math.round(minutesAgo / 60);
  return `Publiée il y a ${hours} h`;
}

function matchesBudget(demande, filter) {
  if (filter === "all") return true;
  if (filter === "low") return demande.budgetMax < 300;
  if (filter === "mid") return demande.budgetMin >= 300 && demande.budgetMax <= 600;
  if (filter === "high") return demande.budgetMax > 600;
  return true;
}

export default function ProDemandesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [villeFilter, setVilleFilter] = useState("Casablanca");
  const [invoiceFilter, setInvoiceFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [savedIds, setSavedIds] = useState([]);

  const villes = useMemo(
    () => Array.from(new Set(availableDemandes.map((d) => d.ville))),
    [],
  );

  const demandes = useMemo(() => {
    const filtered = availableDemandes.filter((demande) => {
      if (categoryFilter !== "all" && demande.category !== categoryFilter)
        return false;
      if (villeFilter !== "all" && demande.ville !== villeFilter) return false;
      if (invoiceFilter !== "all" && demande.invoiceLevel !== invoiceFilter)
        return false;
      if (urgentOnly && demande.urgency !== "urgente") return false;
      if (!matchesBudget(demande, budgetFilter)) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sortBy === "recent") {
      sorted.sort((a, b) => a.publishedMinutesAgo - b.publishedMinutesAgo);
    } else if (sortBy === "budget-desc") {
      sorted.sort((a, b) => b.budgetMax - a.budgetMax);
    } else if (sortBy === "credits-asc") {
      sorted.sort((a, b) => a.credits - b.credits);
    }
    return sorted;
  }, [categoryFilter, villeFilter, invoiceFilter, budgetFilter, urgentOnly, sortBy]);

  function toggleSaved(id) {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <>
      <DashboardHeader
        title="Demandes disponibles"
        subtitle="Consultez les nouvelles demandes et débloquez les détails pour y répondre."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
        notificationCount={3}
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-11 w-44 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <LayoutGrid className="size-4 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {categories.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={villeFilter} onValueChange={setVilleFilter}>
            <SelectTrigger className="h-11 w-48 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <MapPin className="size-4 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {villes.map((ville) => (
                <SelectItem key={ville} value={ville}>
                  {ville}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={invoiceFilter} onValueChange={setInvoiceFilter}>
            <SelectTrigger className="h-11 w-52 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <FileText className="size-4 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {Object.entries(invoiceLevelMeta).map(([value, meta]) => (
                <SelectItem key={value} value={value}>
                  {meta.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="h-11 w-48 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <Wallet className="size-4 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {budgetFilters.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <label className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5">
            <Switch checked={urgentOnly} onCheckedChange={setUrgentOnly} />
            <span className="text-[13px] font-semibold text-slate-700">
              Uniquement urgentes
            </span>
          </label>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="ml-auto h-11 w-52 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <SlidersHorizontal className="size-4 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          {demandes.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-[13px] text-slate-500">
              Aucune demande ne correspond à vos filtres.
            </p>
          ) : (
            demandes.map((demande) => {
              const category = getCategory(demande.category);
              const Icon = category?.Icon ?? FileText;
              const tone = categoryToneMeta[demande.category];
              const invoice = invoiceLevelMeta[demande.invoiceLevel];
              const saved = savedIds.includes(demande.id);

              return (
                <div
                  key={demande.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-start"
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tone?.icon ?? "bg-teal-50 text-teal-700"}`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-slate-950">
                      {demande.title}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
                      <MapPin className="size-3.5 shrink-0" />
                      {demande.quartier}, {demande.ville} · {demande.distanceKm} km
                      <span className="text-slate-300">·</span>
                      <CalendarDays className="size-3.5 shrink-0" />
                      {publishedLabel(demande.publishedMinutesAgo)}
                    </p>
                    <p className="mt-1.5 text-[13px] text-slate-600">
                      {demande.description}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone?.pill ?? "bg-slate-100 text-slate-600"}`}
                      >
                        {category?.label ?? demande.category}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${urgencyBadgeStyles[demande.urgency]}`}
                      >
                        {urgencyLabels[demande.urgency]}
                      </span>
                      {invoice && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${invoice.className}`}
                        >
                          {invoice.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-end">
                    <div className="text-left sm:text-right">
                      <p className="text-[12px] text-slate-500">
                        Budget indicatif
                      </p>
                      <p className="text-[14px] font-bold text-teal-700">
                        {demande.budgetMin} – {demande.budgetMax} MAD
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                        <Lock className="size-4 text-slate-400" />
                        {demande.credits} crédits
                      </span>
                      <Button className="h-9 shrink-0 rounded-lg bg-[#ffa514] px-4 text-[13px] font-bold text-slate-950 hover:bg-[#ffaf2d]">
                        Débloquer
                      </Button>
                      <button
                        type="button"
                        aria-label={
                          saved
                            ? "Retirer des enregistrées"
                            : "Enregistrer la demande"
                        }
                        onClick={() => toggleSaved(demande.id)}
                        className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition ${
                          saved
                            ? "border-teal-200 bg-teal-50 text-teal-700"
                            : "border-slate-200 text-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <Bookmark
                          className={`size-4 ${saved ? "fill-teal-700" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <ShieldCheck className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[14px] font-bold text-slate-950">
                Tous les prestataires sont vérifiés
              </p>
              <p className="text-[12px] text-slate-500">
                Identité vérifiée en personne, niveau fiscal contrôlé et avis
                clients authentiques.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-[13px] font-semibold text-teal-700">
            En savoir plus →
          </span>
        </div>
      </div>
    </>
  );
}
