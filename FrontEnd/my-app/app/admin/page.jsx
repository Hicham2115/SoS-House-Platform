"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2, FileText, ListChecks, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminOverview } from "@/hooks/use-admin-overview";

const statusMeta = {
  publiee: { label: "Publiée", className: "bg-teal-50 text-teal-700" },
  assignee: { label: "Assignée", className: "bg-amber-50 text-amber-700" },
};

function StatCard({ label, value, Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-white p-5">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-7" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold whitespace-nowrap text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-[26px] font-bold text-slate-950">{value}</p>
      </div>
    </div>
  );
}

export default function AdminOverviewPage() {
  const { data, isPending } = useAdminOverview();

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
        <h1 className="text-xl font-bold text-slate-950">Vue d&apos;ensemble</h1>
        <p className="mt-0.5 text-[13px] text-slate-600">
          Activité générale de la plateforme.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-5 bg-slate-50 p-5 sm:p-8">
        {isPending ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-23 rounded-md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Clients" value={data?.total_clients ?? 0} Icon={Users} />
            <StatCard
              label="Artisans N0 / N1 / N2"
              value={`${data?.artisans_par_niveau?.n0 ?? 0} / ${data?.artisans_par_niveau?.n1 ?? 0} / ${data?.artisans_par_niveau?.n2 ?? 0}`}
              Icon={Users}
            />
            <StatCard
              label="Demandes actives"
              value={data?.demandes_actives ?? 0}
              Icon={FileText}
            />
            <StatCard
              label="Missions terminées"
              value={data?.missions_terminees ?? 0}
              Icon={CheckCircle2}
            />
          </div>
        )}

        <div className="rounded-md border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h2 className="flex items-center gap-2 text-[15px] font-bold text-slate-950">
              <ListChecks className="size-4 text-teal-700" />
              Demandes récentes
            </h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                  Catégorie
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Client
                </TableHead>
                <TableHead className="text-[12px] font-semibold text-slate-500">
                  Statut
                </TableHead>
                <TableHead className="px-4 text-[12px] font-semibold text-slate-500">
                  Créée le
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index} className="border-slate-200">
                    <TableCell colSpan={4} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : !data?.demandes_recentes?.length ? (
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-[13px] text-slate-400"
                  >
                    Aucune demande pour l&apos;instant.
                  </TableCell>
                </TableRow>
              ) : (
                data.demandes_recentes.map((demande) => {
                  const status = statusMeta[demande.status] ?? {
                    label: demande.status,
                    className: "bg-slate-100 text-slate-600",
                  };
                  return (
                    <TableRow key={demande.id} className="border-slate-200">
                      <TableCell className="px-4 py-3 font-medium text-slate-900">
                        {demande.category}
                      </TableCell>
                      <TableCell>{demande.user?.name ?? "—"}</TableCell>
                      <TableCell>
                        <Badge className={status.className}>{status.label}</Badge>
                      </TableCell>
                      <TableCell className="px-4">
                        {format(new Date(demande.created_at), "d MMM yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
