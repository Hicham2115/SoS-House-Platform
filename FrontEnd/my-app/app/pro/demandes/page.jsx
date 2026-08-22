"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  CalendarDays,
  Eye,
  FileText,
  LayoutGrid,
  Lock,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { DemandeDetailsSheet } from "@/components/dashboard/shared/demande-details-sheet";
import { FilterSelect } from "@/components/dashboard/shared/filter-select";
import { UnlockDemandeDialog } from "@/components/dashboard/pro/unlock-demande-dialog";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useAvailableDemandes } from "@/hooks/use-available-demandes";
import { mapDemandeToCard } from "@/lib/demande-display";
import { categoryToneMeta, invoiceLevelMeta } from "@/lib/pro-dashboard-data";
import { categories, getCategory } from "@/lib/services-catalog";

const urgencyBadgeStyles = {
  urgente: "bg-red-50 text-red-600",
  "sous-48h": "bg-amber-50 text-amber-700",
  programmee: "bg-teal-50 text-teal-700",
};

const urgencyLabels = {
  urgente: "Urgent",
  "sous-48h": "Sous 48h",
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
  if (filter === "mid")
    return demande.budgetMin >= 300 && demande.budgetMax <= 600;
  if (filter === "high") return demande.budgetMax > 600;
  return true;
}

export default function ProDemandesPage() {
  const { data: rawDemandes, isPending } = useAvailableDemandes();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [villeFilter, setVilleFilter] = useState("all");
  const [invoiceFilter, setInvoiceFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState("all");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [savedIds, setSavedIds] = useState([]);
  const [selectedDemandeId, setSelectedDemandeId] = useState(null);
  const [unlockDemandeId, setUnlockDemandeId] = useState(null);
  const selectedDemande =
    (rawDemandes ?? []).find((d) => d.id === selectedDemandeId) ?? null;

  const availableDemandes = useMemo(
    () => (rawDemandes ?? []).map(mapDemandeToCard),
    [rawDemandes],
  );

  const villes = useMemo(
    () => Array.from(new Set(availableDemandes.map((d) => d.ville))),
    [availableDemandes],
  );

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "Toutes" },
      ...categories.map(({ value, label, Icon }) => ({
        value,
        label,
        icon: Icon,
      })),
    ],
    [],
  );

  const villeOptions = useMemo(
    () => [
      { value: "all", label: "Toutes les villes" },
      ...villes.map((ville) => ({ value: ville, label: ville })),
    ],
    [villes],
  );

  const invoiceOptions = useMemo(
    () => [
      { value: "all", label: "Tous" },
      ...Object.entries(invoiceLevelMeta).map(([value, meta]) => ({
        value,
        label: meta.label,
      })),
    ],
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
  }, [
    availableDemandes,
    categoryFilter,
    villeFilter,
    invoiceFilter,
    budgetFilter,
    urgentOnly,
    sortBy,
  ]);

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
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            icon={LayoutGrid}
            value={categoryFilter}
            onValueChange={setCategoryFilter}
            options={categoryOptions}
            className="w-72"
          />

          <FilterSelect
            icon={MapPin}
            value={villeFilter}
            onValueChange={setVilleFilter}
            options={villeOptions}
            neutralValue="all"
            className="w-48"
          />

          {/* <FilterSelect
            icon={FileText}
            value={invoiceFilter}
            onValueChange={setInvoiceFilter}
            options={invoiceOptions}
            className="w-72"
          /> */}

          <FilterSelect
            icon={Wallet}
            value={budgetFilter}
            onValueChange={setBudgetFilter}
            options={budgetFilters}
            className="w-48"
          />

          <label
            className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 transition ${
              urgentOnly
                ? "border-red-200 bg-red-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <Switch checked={urgentOnly} onCheckedChange={setUrgentOnly} />
            <span
              className={`text-[13px] font-semibold ${urgentOnly ? "text-red-700" : "text-slate-700"}`}
            >
              Uniquement urgentes
            </span>
          </label>

          <FilterSelect
            icon={SlidersHorizontal}
            value={sortBy}
            onValueChange={setSortBy}
            options={sortOptions}
            neutralValue="recent"
            className="ml-auto w-52"
          />
        </div>

        <div className="flex flex-col gap-3">
          {isPending ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-4"
              >
                <Skeleton className="size-11 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              </div>
            ))
          ) : demandes.length === 0 ? (
            <p className="rounded-md border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-[13px] text-slate-500">
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
                  className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 sm:flex-row sm:items-start"
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
                      {demande.quartier}, {demande.ville}
                      <span className="text-slate-600">·</span>
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
                        {demande.budgetMin != null && demande.budgetMax != null
                          ? `${demande.budgetMin} – ${demande.budgetMax} MAD`
                          : "Non précisé"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDemandeId(demande.id)}
                        className="h-9 shrink-0 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Eye className="size-4" />
                        Détails
                      </Button>
                      {/* <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                        <Lock className="size-4 text-slate-400" />
                        {demande.credits} crédits
                      </span> */}
                      <Button
                        onClick={() => setUnlockDemandeId(demande.id)}
                        className="h-9 shrink-0 rounded-lg bg-[#ffa514] px-4 text-[13px] font-bold text-slate-950 hover:bg-[#ffaf2d]"
                      >
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

        {/* <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 bg-white px-5 py-4">
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
        </div> */}
      </div>

      <DemandeDetailsSheet
        demande={selectedDemande}
        open={Boolean(selectedDemande)}
        onOpenChange={(open) => !open && setSelectedDemandeId(null)}
      />

      <UnlockDemandeDialog
        key={unlockDemandeId ?? "none"}
        demande={demandes.find((d) => d.id === unlockDemandeId) ?? null}
        open={Boolean(unlockDemandeId)}
        onOpenChange={(open) => !open && setUnlockDemandeId(null)}
      />
    </>
  );
}
