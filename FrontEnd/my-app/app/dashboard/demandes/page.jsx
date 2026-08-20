"use client";

import { useState } from "react";
import { format, isSameMonth } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarDays,
  Clock,
  Eye,
  FileText,
  CircleCheckBig,
  LayoutGrid,
  Table2,
} from "lucide-react";
import { DemandeCard } from "@/components/dashboard/demande-card";
import { DemandeDetailsSheet } from "@/components/dashboard/demande-details-sheet";
import { Pagination } from "@/components/dashboard/pagination";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useDemandes } from "@/hooks/use-demandes";
import { statusStyles, urgencyStyles } from "@/lib/dashboard-data";
import { getCategory, urgencyOptions } from "@/lib/services-catalog";

const DEMANDE_STATUS = "En attente de réponses";
const PAGE_SIZE = 5;

const statusFilters = [
  { value: "all", label: "Tous les statuts" },
  { value: DEMANDE_STATUS, label: DEMANDE_STATUS },
];

const views = [
  { value: "cards", label: "Cartes", Icon: LayoutGrid },
  { value: "table", label: "Tableau", Icon: Table2 },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {views.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${
            view === value
              ? "border-teal-200 bg-teal-50 text-teal-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Icon className="size-4" strokeWidth={1.8} />
          {label}
        </button>
      ))}
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"
        >
          <Skeleton className="size-14 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3.5 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent">
            <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
              Demande
            </TableHead>
            <TableHead className="text-[12px] font-semibold text-slate-500">
              Statut
            </TableHead>
            <TableHead className="text-[12px] font-semibold text-slate-500">
              Urgence
            </TableHead>
            <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
              Date
            </TableHead>
            <TableHead className="px-4 text-[12px] font-semibold text-slate-500" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index} className="border-slate-200">
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-8 w-20 rounded-lg" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <p className="text-[15px] font-bold text-slate-950">
        Aucune demande pour le moment
      </p>
      <p className="text-[13px] text-slate-500">
        Publiez une demande pour la voir apparaître ici.
      </p>
    </div>
  );
}

export default function DemandesPage() {
  const [view, setView] = useState("cards");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [page, setPage] = useState(1);
  const { data: demandes, isPending } = useDemandes();

  const allRequests = (demandes ?? []).map((demande) => {
    const category = getCategory(demande.category);
    const subcategory = category?.subcategories.find(
      (s) => s.value === demande.subcategory,
    );

    return {
      id: demande.id,
      demande,
      Icon: category?.Icon ?? FileText,
      title: subcategory
        ? `${category.label} — ${subcategory.label}`
        : (category?.label ?? demande.category),
      subcategoryLabel: subcategory?.label,
      subtitle: demande.ville,
      meta: `Créée le ${format(new Date(demande.created_at), "d MMMM yyyy", { locale: fr })}`,
      status: DEMANDE_STATUS,
      urgency: urgencyOptions.find((u) => u.value === demande.urgency)?.label,
      urgencyValue: demande.urgency,
    };
  });

  const requests =
    statusFilter === "all"
      ? allRequests
      : allRequests.filter((r) => r.status === statusFilter);

  const totalPages = Math.max(1, Math.ceil(requests.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const total = demandes?.length ?? 0;
  const thisMonthCount = (demandes ?? []).filter((d) =>
    isSameMonth(new Date(d.created_at), new Date()),
  ).length;
  const monthLabel = format(new Date(), "MMMM yyyy", { locale: fr });

  const stats = [
    {
      icon: FileText,
      value: total,
      label: "Total des demandes",
      tone: "blue",
      caption: "En attente de réponse",
      captionTone: "blue",
    },
    {
      icon: CircleCheckBig,
      value: total,
      label: "En attente de réponse",
      tone: "green",
      caption: total ? "100% de vos demandes" : "Aucune demande",
      captionTone: "green",
    },
    {
      icon: Clock,
      value: 0,
      label: "Réponses reçues",
      tone: "orange",
      caption: "Ce mois-ci",
      captionTone: "gray",
    },
    {
      icon: CalendarDays,
      value: thisMonthCount,
      label: "Demandes ce mois",
      tone: "purple",
      caption: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
      captionTone: "gray",
    },
  ];

  return (
    <>
      <DashboardHeader
        title="Demandes actives"
        subtitle="Suivez l'avancement de toutes vos demandes en cours."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-10 w-56 rounded-full border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusFilters.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ViewToggle view={view} onChange={setView} />
        </div>

        {isPending ? (
          view === "cards" ? (
            <CardsSkeleton />
          ) : (
            <TableSkeleton />
          )
        ) : requests.length === 0 ? (
          <EmptyState />
        ) : view === "cards" ? (
          <div className="flex flex-col gap-3">
            {paginatedRequests.map((request) => (
              <DemandeCard
                key={request.id}
                demande={request.demande}
                icon={request.Icon}
                title={request.title}
                subcategoryLabel={request.subcategoryLabel}
                onViewDetails={() => setSelectedDemande(request.demande)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                    Demande
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-slate-500">
                    Statut
                  </TableHead>
                  <TableHead className="text-[12px] font-semibold text-slate-500">
                    Urgence
                  </TableHead>
                  <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                    Date
                  </TableHead>
                  <TableHead className="px-4 text-[12px] font-semibold text-slate-500" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    className="border-slate-200 hover:bg-slate-50"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                          <request.Icon className="size-4" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-950">
                            {request.title}
                          </p>
                          <p className="truncate text-[12px] text-slate-500">
                            {request.subtitle}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles[request.status]}`}
                      >
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.urgency ? (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${urgencyStyles[request.urgencyValue]}`}
                        >
                          {request.urgency}
                        </span>
                      ) : (
                        <span className="text-[13px] text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 text-[13px] text-slate-600">
                      {request.meta}
                    </TableCell>
                    <TableCell className="px-4">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedDemande(request.demande)}
                        className="h-8 rounded-lg border-slate-200 px-3 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Eye className="size-3.5" />
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {!isPending && requests.length > 0 && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>

      <DemandeDetailsSheet
        demande={selectedDemande}
        open={Boolean(selectedDemande)}
        onOpenChange={(open) => !open && setSelectedDemande(null)}
      />
    </>
  );
}
