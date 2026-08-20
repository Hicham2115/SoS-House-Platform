"use client";

import { useMemo, useState } from "react";
import {
  Briefcase,
  CalendarDays,
  CircleCheckBig,
  Clock,
  FileText,
  MapPin,
  MoreVertical,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { FilterSelect } from "@/components/dashboard/shared/filter-select";
import { StatCard } from "@/components/dashboard/shared/stat-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  categoryToneMeta,
  invoiceLevelShort,
  missionDetailStatusMeta,
  missions,
  missionSummary,
} from "@/lib/pro-dashboard-data";
import { categories, getCategory } from "@/lib/services-catalog";

const tabs = [
  { value: "all", label: "Toutes", count: missionSummary.total },
  { value: "en-cours", label: "En cours", count: missionSummary.enCours },
  {
    value: "attente-avis",
    label: "En attente d'avis",
    count: missionSummary.attenteAvis,
  },
  { value: "terminee", label: "Terminées", count: missionSummary.terminees },
  { value: "annulee", label: "Annulées", count: missionSummary.annulees },
];

function matchesTab(mission, tab) {
  if (tab === "all") return true;
  if (tab === "attente-avis")
    return (
      mission.status === "attente-avis-prestataire" ||
      mission.status === "attente-avis-client"
    );
  return mission.status === tab;
}

export default function ProMissionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const stats = [
    {
      icon: Briefcase,
      value: missionSummary.total,
      label: "Total missions",
      tone: "blue",
      caption: "Toutes périodes",
      captionTone: "gray",
    },
    {
      icon: Clock,
      value: missionSummary.enCours,
      label: "En cours",
      tone: "orange",
      caption: "À traiter",
      captionTone: "gray",
    },
    {
      icon: CircleCheckBig,
      value: missionSummary.terminees,
      label: "Terminées",
      tone: "green",
      caption: "Missions finalisées",
      captionTone: "gray",
    },
    {
      icon: Star,
      value: missionSummary.attenteAvis,
      label: "En attente d'avis",
      tone: "purple",
      caption: "Double confirmation",
      captionTone: "gray",
    },
  ];

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "Toutes catégories" },
      ...categories.map(({ value, label, Icon }) => ({
        value,
        label,
        icon: Icon,
      })),
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      missions.filter(
        (mission) =>
          matchesTab(mission, activeTab) &&
          (categoryFilter === "all" || mission.category === categoryFilter),
      ),
    [activeTab, categoryFilter],
  );

  return (
    <>
      <DashboardHeader
        title="Mes missions"
        subtitle="Suivez vos missions en cours, terminées ou en attente d'avis."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
        notificationCount={3}
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-[14px] font-semibold transition ${
                  activeTab === tab.value
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
                <span
                  className={`flex size-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    activeTab === tab.value
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <FilterSelect
            icon={SlidersHorizontal}
            value={categoryFilter}
            onValueChange={setCategoryFilter}
            options={categoryOptions}
            className="w-72"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white">
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-[13px] text-slate-500">
              Aucune mission ne correspond à ce filtre.
            </p>
          ) : (
            filtered.map((mission, index) => {
              const category = getCategory(mission.category);
              const Icon = category?.Icon ?? FileText;
              const tone = categoryToneMeta[mission.category];
              const status = missionDetailStatusMeta[mission.status];

              return (
                <div
                  key={mission.id}
                  className={`flex flex-col gap-3 p-4 sm:flex-row sm:items-center ${
                    index > 0 ? "border-t border-slate-100" : ""
                  }`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tone?.icon ?? "bg-teal-50 text-teal-700"}`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-slate-950">
                      {mission.title}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
                      <MapPin className="size-3.5 shrink-0" />
                      {mission.quartier}, {mission.ville} · {mission.distanceKm}{" "}
                      km
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          categoryToneMeta[mission.category]?.pill ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {invoiceLevelShort[mission.invoiceLevel]}
                      </span>
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-slate-500">
                      <CalendarDays className="size-3.5 shrink-0" />
                      {mission.publishedLabel}
                    </p>
                  </div>

                  <div className="shrink-0 sm:w-56">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${status?.className}`}
                    >
                      {status?.label}
                    </span>
                    <p className="mt-1 text-[13px] text-slate-600">
                      {mission.statusNote}
                    </p>
                    <p className="text-[12px] text-slate-400">
                      {mission.statusDate}
                    </p>
                  </div>

                  <div className="shrink-0 text-left sm:w-32 sm:text-right">
                    <p className="text-[14px] font-bold text-slate-950">
                      {mission.budget != null ? `${mission.budget} MAD` : "—"}
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Budget indicatif
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Voir détails
                    </Button>
                    <button
                      type="button"
                      aria-label="Plus d'options"
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                    >
                      <MoreVertical className="size-4" />
                    </button>
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
                Double confirmation requise
              </p>
              <p className="text-[12px] text-slate-500">
                Une mission n&apos;est visible et notée qu&apos;une fois
                confirmée par vous ET par le client.
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
