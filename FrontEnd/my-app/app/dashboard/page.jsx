"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProfileOnboarding } from "@/components/dashboard/profile-onboarding";
import { RequestCard } from "@/components/dashboard/request-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useDemandes } from "@/hooks/use-demandes";
import { stats, toRequestCard } from "@/lib/dashboard-data";

export default function DashboardPage() {
  const { data: demandes, isPending } = useDemandes();
  const requests = (demandes ?? [])
    .slice(0, 3)
    .map((demande) => ({ id: demande.id, ...toRequestCard(demande) }));

  return (
    <>
      <DashboardHeader
        title="Bonjour, Hicham 👋"
        subtitle="Voici un aperçu de vos demandes et interventions."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <ProfileOnboarding />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ Icon, value, label, tone, progress }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-slate-500">
                  {label}
                </p>
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                    tone === "teal"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                </span>
              </div>
              <p className="mt-4 text-[26px] font-bold text-slate-950">
                {value}
              </p>
              {progress != null && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      tone === "teal" ? "bg-teal-600" : "bg-amber-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-slate-950">
                Demandes actives
              </h2>
              <span className="text-[13px] font-semibold text-teal-700">
                Voir toutes ({demandes?.length ?? 0}) →
              </span>
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
                  <RequestCard key={request.id} request={request} />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-[17px] font-bold text-slate-950">
                Historique des missions
              </h2>
              <span className="text-[13px] font-semibold text-teal-700">
                Voir tout →
              </span>
            </div>

            <Accordion className="mt-4 rounded-2xl border border-slate-200 bg-white px-4">
              <AccordionItem value="history" className="border-b-0">
                <AccordionTrigger className="text-[14px] text-slate-700">
                  Voir vos anciennes missions terminées
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Aucune autre mission archivée pour le moment.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
