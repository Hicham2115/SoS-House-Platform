"use client";

import { useState } from "react";
import {
  ChevronRight,
  CircleCheckBig,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Pagination } from "@/components/dashboard/pagination";
import { StarRating } from "@/components/dashboard/star-rating";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  missionHistory,
  missionStatusLabels,
  missionStatusStyles,
} from "@/lib/dashboard-data";
import { categories } from "@/lib/services-catalog";

const dateFilters = [
  { value: "all", label: "Toutes les dates" },
  { value: "30j", label: "30 derniers jours" },
  { value: "3m", label: "3 derniers mois" },
  { value: "annee", label: "Cette année" },
];

const PAGE_SIZE = 5;

export default function HistoriquePage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = missionHistory.filter((mission) => {
    if (categoryFilter !== "all" && mission.category !== categoryFilter)
      return false;
    if (
      search &&
      !`${mission.title} ${mission.subtitle} ${mission.provider}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function goToPage(p) {
    setPage(Math.min(Math.max(p, 1), totalPages));
  }

  return (
    <>
      <DashboardHeader
        title="Historique des missions"
        subtitle="Retrouvez toutes vos missions terminées."
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-11 w-56 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="h-11 w-52 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateFilters.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <InputGroup className="ml-auto h-11 w-full max-w-72 rounded-full border-slate-200 bg-white px-1">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Rechercher une mission..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </InputGroup>

          <button
            type="button"
            aria-label="Filtres avancés"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
          >
            <SlidersHorizontal className="size-4.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {paginated.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-[13px] text-slate-500">
              Aucune mission ne correspond à votre recherche.
            </p>
          ) : (
            paginated.map((mission) => {
              const category = categories.find(
                (c) => c.value === mission.category,
              );
              const Icon = category?.Icon ?? CircleCheckBig;
              return (
                <div
                  key={mission.title}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-slate-950">
                      {mission.title}
                    </p>
                    <p className="mt-0.5 text-[13px] text-slate-600">
                      {mission.subtitle} • {mission.provider}
                    </p>
                    {mission.ville && (
                      <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500">
                        <MapPin className="size-3.5 shrink-0" />
                        {mission.ville}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${missionStatusStyles.terminee}`}
                    >
                      {missionStatusLabels.terminee}
                    </span>
                    <span className="text-[12px] text-slate-500">
                      {mission.date}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex flex-col items-end gap-1">
                      <StarRating rating={mission.rating} />
                      {mission.credits != null && (
                        <span className="text-[12px] font-semibold text-green-600">
                          +{mission.credits} crédits gagnés
                        </span>
                      )}
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-slate-300" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </>
  );
}
