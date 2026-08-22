"use client";

import Link from "next/link";
import {
  FileText,
  ListChecks,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientOffers } from "@/hooks/use-offers";
import { demandeTitle } from "@/lib/demande-display";
import { getCategory } from "@/lib/services-catalog";

const niveauMeta = {
  n0: { label: "Non vérifié", className: "bg-slate-100 text-slate-600" },
  n1: { label: "Auto-entrepreneur", className: "bg-amber-50 text-amber-700" },
  n2: {
    label: "Entreprise enregistrée",
    className: "bg-violet-50 text-violet-600",
  },
};

export default function ClientMissionsPage() {
  const { data: offers, isPending } = useClientOffers();
  const missions = (offers ?? []).filter((o) => o.status === "accepted");

  return (
    <>
      <DashboardHeader
        title="Mes missions"
        subtitle="Les demandes pour lesquelles vous avez choisi un prestataire."
      />

      <div className="flex flex-1 flex-col gap-3 bg-slate-50 p-5 sm:p-8">
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
        ) : !missions.length ? (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-200 bg-white px-4 py-14 text-center">
            <ListChecks className="size-8 text-slate-300" strokeWidth={1.5} />
            <p className="text-[13px] text-slate-500">
              Aucune mission pour l&apos;instant. Choisissez une offre reçue
              pour démarrer une mission.
            </p>
          </div>
        ) : (
          missions.map((offer) => {
            const demande = offer.demande;
            const category = demande ? getCategory(demande.category) : null;
            const Icon = category?.Icon ?? FileText;
            const niveau = niveauMeta[offer.user?.niveau] ?? niveauMeta.n0;

            return (
              <div
                key={offer.id}
                className="flex flex-col gap-3 rounded-md border border-teal-300 bg-white p-4 shadow-[0_8px_24px_rgba(13,148,136,0.12)] sm:flex-row sm:items-start"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-slate-950">
                    {demande ? demandeTitle(demande) : "Demande"}
                  </p>
                  {demande?.ville && (
                    <p className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500">
                      <MapPin className="size-3.5 shrink-0" />
                      {demande.ville}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage
                        src={offer.user?.avatar}
                        alt={offer.user?.name}
                      />
                      <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
                        {offer.user?.name?.[0]?.toUpperCase() ?? "P"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[13px] font-semibold text-slate-800">
                      {offer.user?.name ?? "Prestataire"}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${niveau.className}`}
                    >
                      <ShieldCheck className="size-3" />
                      {niveau.label}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="flex items-center gap-1 text-[16px] font-extrabold text-teal-700">
                    <Wallet className="size-4" />
                    {offer.price} MAD
                  </span>
                  <div className="flex items-center gap-2">
                    {offer.user?.phone && (
                      <span className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-1.5 text-[12px] font-bold text-white">
                        <Phone className="size-3.5" />
                        {offer.user.phone}
                      </span>
                    )}
                    <Link
                      href={`/dashboard/messagerie?demande=${offer.demande_id}`}
                      className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-[12px] font-bold text-teal-700 hover:bg-teal-50"
                    >
                      <MessageSquare className="size-3.5" />
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
