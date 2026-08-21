"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Coins,
  FileText,
  Mail,
  MessageCircle,
  MoreVertical,
  TrendingUp,
  Unlock,
  Wallet,
} from "lucide-react";
import { ProviderOnboardingBanner } from "@/components/dashboard/pro/provider-onboarding-banner";
import {
  ProviderOnboardingModal,
  computeOnboardingPct,
  initialProviderOnboardingData,
} from "@/components/dashboard/pro/provider-onboarding-modal";
import { StatCard } from "@/components/dashboard/shared/stat-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAvailableDemandes } from "@/hooks/use-available-demandes";
import { useUser } from "@/hooks/use-user";
import { api } from "@/lib/axios";
import { mapDemandeToCard } from "@/lib/demande-display";
import {
  categoryToneMeta,
  missionsEnCours,
  missionStatusMeta,
  proSummary,
} from "@/lib/pro-dashboard-data";
import { getCategory } from "@/lib/services-catalog";

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

export default function ProDashboardPage() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const { data: rawDemandes, isPending: demandesPending } =
    useAvailableDemandes();
  const availableDemandes = (rawDemandes ?? []).map(mapDemandeToCard);

  // TODO: replace with GET /api/provider/onboarding — status and formData
  // both come from the backend once onboarding is wired up. Niveau itself
  // is already persisted server-side (PATCH /user) and drives which
  // demandes /demandes/disponibles returns.
  const [onboardingStatus, setOnboardingStatus] = useState("blocking");
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingData, setOnboardingData] = useState(
    initialProviderOnboardingData,
  );
  const onboardingProgress = computeOnboardingPct(onboardingData);

  function updateOnboardingField(key, value) {
    setOnboardingData((prev) => ({ ...prev, [key]: value }));
  }

  const saveNiveau = useMutation({
    mutationFn: async (niveau) => {
      const { data } = await api.patch("/user", { niveau });
      queryClient.setQueryData(["user"], data);
      queryClient.invalidateQueries({ queryKey: ["demandes", "disponibles"] });
      return data;
    },
    onError: () => {
      toast.error("Impossible d'enregistrer votre niveau. Veuillez réessayer.");
    },
  });

  async function handleOnboardingFinish() {
    if (onboardingData.niveau) {
      await saveNiveau.mutateAsync(onboardingData.niveau);
    }
    setOnboardingStatus("pending_review");
  }

  const stats = [
    {
      icon: Coins,
      value: `${proSummary.credits} crédits`,
      label: "Solde de crédits",
      tone: "blue",
      caption: "Recharger →",
      captionTone: "blue",
      captionHref: "/pro/credits",
    },
    {
      icon: Mail,
      value: proSummary.demandesReceivedThisMonth,
      label: "Demandes travaillées ce mois",
      tone: "green",
      caption: proSummary.demandesReceivedTrend,
      captionTone: "green",
      captionIcon: TrendingUp,
    },
    {
      icon: TrendingUp,
      value: `${proSummary.conversionRate}%`,
      label: "Taux de transformation",
      tone: "orange",
      caption: proSummary.conversionTrend,
      captionTone: "green",
      captionIcon: TrendingUp,
    },
    {
      icon: Wallet,
      value: `${proSummary.revenueThisMonth.toLocaleString("fr-FR")} MAD`,
      label: "Chiffre d'affaires du mois",
      tone: "purple",
      caption: proSummary.revenueTrend,
      captionTone: "green",
      captionIcon: TrendingUp,
    },
  ];

  return (
    <>
      <DashboardHeader
        title={`Bonjour, ${user?.name || "artisan"} 👋`}
        subtitle="Voici un aperçu de votre activité."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
        notificationCount={6}
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <ProviderOnboardingBanner
          status={onboardingStatus}
          progress={onboardingProgress}
          onOpenModal={() => setOnboardingOpen(true)}
        />

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[17px] font-bold text-slate-950">
                Nouvelles demandes disponibles
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-600">
                  {availableDemandes.length}
                </span>
              </h2>
              <Link
                href="/pro/demandes"
                className="text-[13px] font-semibold text-teal-700"
              >
                Voir toutes →
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {demandesPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <Skeleton className="size-11 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3.5 w-32" />
                    </div>
                  </div>
                ))
              ) : availableDemandes.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center text-[13px] text-slate-500">
                  Aucune demande disponible pour le moment.
                </p>
              ) : (
                availableDemandes.slice(0, 3).map((demande) => {
                  const category = getCategory(demande.category);
                  const Icon = category?.Icon ?? FileText;
                  const tone = categoryToneMeta[demande.category];
                  return (
                    <div
                      key={demande.id}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                    >
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tone?.icon ?? "bg-teal-50 text-teal-700"}`}
                      >
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-bold text-slate-950">
                          {demande.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500">
                          {demande.quartier}, {demande.ville} · Budget
                          indicatif{" "}
                          {demande.budgetMin != null && demande.budgetMax != null
                            ? `${demande.budgetMin}–${demande.budgetMax} MAD`
                            : "non précisé"}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${urgencyBadgeStyles[demande.urgency]}`}
                      >
                        {urgencyLabels[demande.urgency]}
                      </span>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-700">
                          <Unlock className="size-4 text-slate-400" />
                          {demande.credits} crédits
                        </span>
                        <Button className="h-9 shrink-0 rounded-lg bg-[#ffa514] px-4 text-[13px] font-bold text-slate-950 hover:bg-[#ffaf2d]">
                          Débloquer
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[17px] font-bold text-slate-950">
                Mes missions en cours
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[12px] font-bold text-slate-600">
                  {missionsEnCours.length}
                </span>
              </h2>
              <Link
                href="/pro/missions"
                className="text-[13px] font-semibold text-teal-700"
              >
                Voir toutes mes missions →
              </Link>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {missionsEnCours.map((mission) => {
                const category = getCategory(mission.category);
                const Icon = category?.Icon ?? FileText;
                const status = missionStatusMeta[mission.status];
                return (
                  <div
                    key={mission.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-semibold text-slate-400">
                        #{mission.id}
                      </p>
                      <p className="text-[14px] font-bold text-slate-950">
                        {mission.label}
                      </p>
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        Client : {mission.clientPhone} · {mission.ville}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                      {mission.scheduled && (
                        <span className="text-[12px] text-slate-500">
                          {mission.scheduled}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <MessageCircle className="size-4" />
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <FileText className="size-4" />
                        Voir devis
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
              })}
            </div>
          </div>
        </div>
      </div>

      <ProviderOnboardingModal
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        formData={onboardingData}
        updateField={updateOnboardingField}
        onFinish={handleOnboardingFinish}
      />
    </>
  );
}
