"use client";

import { useState } from "react";
import { Eye, LayoutGrid, Table2 } from "lucide-react";
import { DemandeDetailsSheet } from "@/components/dashboard/demande-details-sheet";
import { RequestCard } from "@/components/dashboard/request-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
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
import { statusStyles, toRequestCard, urgencyStyles } from "@/lib/dashboard-data";

const views = [
  { value: "cards", label: "Cartes", Icon: LayoutGrid },
  { value: "table", label: "Tableau", Icon: Table2 },
];

function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
      {views.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
            view === value
              ? "bg-white text-teal-700 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
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
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
        >
          <Skeleton className="size-11 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3.5 w-28" />
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
  const [selectedDemande, setSelectedDemande] = useState(null);
  const { data: demandes, isPending } = useDemandes();
  const requests = (demandes ?? []).map((demande) => ({
    id: demande.id,
    demande,
    ...toRequestCard(demande),
  }));

  return (
    <>
      <DashboardHeader
        title="Demandes actives"
        subtitle="Suivez l'avancement de toutes vos demandes en cours."
      />

      <div className="flex flex-1 flex-col gap-4 bg-slate-50 p-5 sm:p-8">
        <div className="flex justify-end">
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
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
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
                {requests.map((request) => (
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
      </div>

      <DemandeDetailsSheet
        demande={selectedDemande}
        open={Boolean(selectedDemande)}
        onOpenChange={(open) => !open && setSelectedDemande(null)}
      />
    </>
  );
}
