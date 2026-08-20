"use client";

import { useState } from "react";
import Link from "next/link";
import { DemandeDetailsSheet } from "@/components/dashboard/client/demande-details-sheet";
import { ProfileOnboarding } from "@/components/dashboard/client/profile-onboarding";
import { RequestCard } from "@/components/dashboard/client/request-card";
import { StatCard } from "@/components/dashboard/shared/stat-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDemandes } from "@/hooks/use-demandes";
import { useUser } from "@/hooks/use-user";
import { getCategory } from "@/lib/services-catalog";
import {
  missionHistoryPreview,
  missionStatusLabels,
  missionStatusStyles,
} from "@/lib/dashboard-data";
import {
  CalendarX,
  CircleCheckBig,
  FileText,
  MoreVertical,
  Smile,
  Star,
  TrendingUp,
} from "lucide-react";

const missionIconStyles = {
  terminee: "bg-green-50 text-green-600",
  annulee: "bg-slate-100 text-slate-500",
};

export default function DashboardPage() {
  const { data: demandes, isPending } = useDemandes();
  const { data: user } = useUser();
  const [selectedDemande, setSelectedDemande] = useState(null);

  const requests = (demandes ?? []).slice(0, 5).map((demande) => {
    const category = getCategory(demande.category);
    return {
      id: demande.id,
      demande,
      Icon: category?.Icon ?? FileText,
      title: category?.label ?? demande.category,
    };
  });

  const stats = [
    {
      icon: FileText,
      value: demandes?.length ?? 0,
      label: "Demandes actives",
      tone: "blue",
      caption: "En attente de réponse",
      captionTone: "blue",
    },
    {
      icon: CircleCheckBig,
      value: "12",
      label: "Missions terminées",
      tone: "green",
      caption: "+3 ce mois-ci",
      captionTone: "green",
      captionIcon: TrendingUp,
    },
    {
      icon: Star,
      value: "4,8/5",
      label: "Note moyenne donnée",
      tone: "purple",
      rating: 4.8,
      caption: "Sur la qualité des services",
      captionTone: "gray",
    },
    {
      icon: Smile,
      value: "97%",
      label: "Taux de satisfaction",
      tone: "orange",
      progress: 97,
      caption: "Clients satisfaits",
      captionTone: "gray",
    },
  ];

  return (
    <>
      <DashboardHeader
        title={`Bonjour, ${user?.name || "utilisateur"} 👋`}
        subtitle="Voici un aperçu de vos demandes et interventions."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <ProfileOnboarding />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-slate-950">
                Demandes actives
              </h2>
              <Link
                href="/dashboard/demandes"
                className="text-[13px] font-semibold text-teal-700"
              >
                Voir toutes ({demandes?.length ?? 0}) →
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {isPending ? (
                Array.from({ length: 2 }).map((_, index) => (
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
                ))
              ) : requests.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-[13px] text-slate-500">
                  Aucune demande pour le moment.
                </p>
              ) : (
                requests.map((request) => (
                  <RequestCard
                    key={request.id}
                    demande={request.demande}
                    icon={request.Icon}
                    title={request.title}
                    onViewDetails={() => setSelectedDemande(request.demande)}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-slate-950">
                Historique des missions
              </h2>
              <Link
                href="/dashboard/historique"
                className="text-[13px] font-semibold text-teal-700"
              >
                Voir tout →
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {missionHistoryPreview.map((mission) => {
                const Icon =
                  mission.status === "annulee" ? CalendarX : CircleCheckBig;
                return (
                  <div
                    key={mission.title}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <span
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full ${missionIconStyles[mission.status]}`}
                    >
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold text-slate-950">
                        {mission.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-600">
                        {mission.category} · {mission.ville}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${missionStatusStyles[mission.status]}`}
                    >
                      {missionStatusLabels[mission.status]}
                    </span>

                    <div className="shrink-0 text-right">
                      <p className="text-[14px] font-bold text-slate-950">
                        {mission.price ?? "—"}
                      </p>
                      <p className="text-[12px] text-slate-500">
                        {mission.date}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Voir les détails
                      </Button>
                      <button
                        type="button"
                        aria-label="Plus d'options"
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <DemandeDetailsSheet
        demande={selectedDemande}
        open={Boolean(selectedDemande)}
        onOpenChange={(open) => !open && setSelectedDemande(null)}
      />
    </>
  );
}
