"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmittedOffers } from "@/hooks/use-offers";
import { api } from "@/lib/axios";
import { demandeTitle } from "@/lib/demande-display";
import { getCategory } from "@/lib/services-catalog";

const statusMeta = {
  pending: { label: "En attente", className: "bg-amber-50 text-amber-700" },
  accepted: { label: "Acceptée", className: "bg-teal-50 text-teal-700" },
  rejected: { label: "Non retenue", className: "bg-slate-100 text-slate-500" },
};

export default function ProOffresPage() {
  const { data: offers, isPending } = useSubmittedOffers();
  const queryClient = useQueryClient();
  const withdrawOffer = useMutation({
    mutationFn: async (offerId) => (await api.delete(`/offers/${offerId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offers"] });
      toast.success("Offre retirée.");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <DashboardHeader
        title="Mes offres"
        subtitle="Les prix que vous avez proposés aux clients, et leur statut."
        ctaLabel="+ Voir les nouvelles demandes"
        ctaHref="/pro/demandes"
        settingsHref="/pro/parametres"
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
        ) : !offers?.length ? (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-200 bg-white px-4 py-14 text-center">
            <Send className="size-8 text-slate-300" strokeWidth={1.5} />
            <p className="text-[13px] text-slate-500">
              Vous n&apos;avez encore proposé aucun prix.
            </p>
          </div>
        ) : (
          offers.map((offer) => {
            const demande = offer.demande;
            const category = demande ? getCategory(demande.category) : null;
            const Icon = category?.Icon ?? FileText;
            const status = statusMeta[offer.status] ?? statusMeta.pending;
            const accepted = offer.status === "accepted";

            return (
              <div
                key={offer.id}
                className={`flex flex-col gap-3 rounded-md border bg-white p-4 sm:flex-row sm:items-start ${
                  accepted
                    ? "border-teal-300 shadow-[0_8px_24px_rgba(13,148,136,0.12)]"
                    : "border-slate-200"
                }`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>

                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${status.className}`}
                  >
                    {status.label}
                  </span>
                  <p className="mt-2 text-[15px] font-bold text-slate-950">
                    {demande ? demandeTitle(demande) : "Demande"}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-500">
                    {demande?.ville && (
                      <>
                        <MapPin className="size-3.5 shrink-0" />
                        {demande.ville}
                        <span className="text-slate-600">·</span>
                      </>
                    )}
                    <CalendarDays className="size-3.5 shrink-0" />
                    {format(new Date(offer.created_at), "d MMM yyyy", {
                      locale: fr,
                    })}
                  </p>

                  {accepted && demande?.user && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-teal-50 p-3">
                      <CheckCircle2 className="size-4 shrink-0 text-teal-700" />
                      <span className="text-[13px] font-bold text-teal-700">
                        {demande.user.name}
                      </span>
                      {demande.adresse && (
                        <span className="text-[12px] text-teal-700/80">
                          {demande.adresse}
                        </span>
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        {demande.user.phone && (
                          <span className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-1.5 text-[12px] font-bold text-white">
                            <Phone className="size-3.5" />
                            {demande.user.phone}
                          </span>
                        )}
                        <Link
                          href={`/pro/messagerie?demande=${demande.id}`}
                          className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-[12px] font-bold text-teal-700 hover:bg-teal-50"
                        >
                          <MessageSquare className="size-3.5" />
                          Message
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <p className="text-[16px] font-extrabold text-teal-700">
                    {offer.price} MAD
                  </p>
                  {offer.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => withdrawOffer.mutate(offer.id)}
                      disabled={withdrawOffer.isPending}
                      className="flex items-center gap-1 text-[12px] font-semibold text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="size-3.5" />
                      Retirer
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
