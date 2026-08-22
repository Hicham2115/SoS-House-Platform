"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Inbox,
  MapPin,
  MessageSquare,
  MessageSquareQuote,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientOffers } from "@/hooks/use-offers";
import { api } from "@/lib/axios";
import { statusStyles, urgencyStyles } from "@/lib/dashboard-data";
import { demandeTitle } from "@/lib/demande-display";
import { getCategory, urgencyOptions } from "@/lib/services-catalog";

const urgencyDotStyles = {
  programmee: "bg-slate-400",
  "sous-48h": "bg-amber-500",
  urgente: "bg-red-500",
};

const niveauMeta = {
  n0: { label: "Non vérifié", className: "bg-slate-100 text-slate-600" },
  n1: { label: "Auto-entrepreneur", className: "bg-amber-50 text-amber-700" },
  n2: {
    label: "Entreprise enregistrée",
    className: "bg-violet-50 text-violet-600",
  },
};

function groupByDemande(offers) {
  const groups = new Map();

  for (const offer of offers) {
    if (!offer.demande) continue;
    const key = offer.demande.id;
    if (!groups.has(key)) {
      groups.set(key, { demande: offer.demande, offers: [] });
    }
    groups.get(key).offers.push(offer);
  }

  return Array.from(groups.values());
}

export default function ClientOffresPage() {
  const { data: offers, isPending } = useClientOffers();
  const [selectedDemandeId, setSelectedDemandeId] = useState(null);

  const groups = useMemo(() => groupByDemande(offers ?? []), [offers]);
  const selectedGroup = groups.find(
    (g) => g.demande.id === selectedDemandeId,
  );

  return (
    <>
      <DashboardHeader
        title="Offres reçues"
        subtitle="Les demandes pour lesquelles des prestataires ont proposé un prix."
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
        ) : !groups.length ? (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-slate-200 bg-white px-4 py-14 text-center">
            <Inbox className="size-8 text-slate-300" strokeWidth={1.5} />
            <p className="text-[13px] text-slate-500">
              Aucune offre reçue pour l&apos;instant.
            </p>
          </div>
        ) : (
          groups.map(({ demande, offers: demandeOffers }) => {
            const category = getCategory(demande.category);
            const Icon = category?.Icon ?? FileText;
            const subcategory = category?.subcategories?.find(
              (s) => s.value === demande.subcategory,
            );
            const urgencyLabel = urgencyOptions.find(
              (u) => u.value === demande.urgency,
            )?.label;
            const budget =
              demande.budget_min && demande.budget_max
                ? `${demande.budget_min} – ${demande.budget_max} MAD`
                : null;
            const hasAccepted = demandeOffers.some(
              (o) => o.status === "accepted",
            );
            const statusLabel = hasAccepted
              ? "Prestataire choisi"
              : "En attente de réponses";

            return (
              <div
                key={demande.id}
                onClick={() => setSelectedDemandeId(demande.id)}
                className="relative flex cursor-pointer flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 pr-10 transition hover:border-teal-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] lg:flex-row lg:items-start lg:gap-6"
              >
                <div className="flex flex-1 gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles[statusLabel]}`}
                    >
                      {statusLabel}
                    </span>
                    <p className="mt-2 text-[16px] font-bold text-slate-950">
                      {demandeTitle(demande)}
                    </p>
                    {demande.adresse && (
                      <p className="mt-0.5 text-[13px] text-slate-500">
                        {demande.adresse}
                      </p>
                    )}
                    {demande.ville && (
                      <p className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-500">
                        <MapPin className="size-3.5 shrink-0" />
                        {demande.ville}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {demande.created_at && (
                        <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600">
                          <CalendarDays className="size-3.5" />
                          Créée le{" "}
                          {format(new Date(demande.created_at), "d MMMM yyyy", {
                            locale: fr,
                          })}
                        </span>
                      )}
                      {budget && (
                        <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600">
                          <Tag className="size-3.5" />
                          Budget indicatif{" "}
                          <span className="font-bold text-slate-950">
                            {budget}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hidden w-px self-stretch bg-slate-100 lg:block" />

                <div className="flex shrink-0 flex-col gap-3 lg:w-52">
                  {subcategory && (
                    <div>
                      <p className="text-[12px] text-slate-500">
                        Type de prestation
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-teal-50 px-3 py-1 text-[12px] font-semibold text-teal-700">
                        {subcategory.label}
                      </span>
                    </div>
                  )}
                  {urgencyLabel && (
                    <div>
                      <p className="text-[12px] text-slate-500">Priorité</p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${urgencyStyles[demande.urgency]}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${urgencyDotStyles[demande.urgency]}`}
                        />
                        {urgencyLabel}
                      </span>
                    </div>
                  )}
                  <p className="text-[12px] font-semibold text-slate-500">
                    {demandeOffers.length} offre
                    {demandeOffers.length > 1 ? "s" : ""} reçue
                    {demandeOffers.length > 1 ? "s" : ""}
                  </p>
                </div>

                <ChevronRight className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-300" />
              </div>
            );
          })
        )}
      </div>

      <Sheet
        open={Boolean(selectedGroup)}
        onOpenChange={(open) => !open && setSelectedDemandeId(null)}
      >
        <SheetContent className="w-full overflow-y-auto bg-slate-50 sm:max-w-md">
          {selectedGroup && (
            <>
              <SheetHeader className="gap-3 border-b border-slate-100 bg-white pb-5">
                <div className="min-w-0 flex-1">
                  <SheetTitle className="text-lg leading-tight font-extrabold text-slate-950">
                    {demandeTitle(selectedGroup.demande)}
                  </SheetTitle>
                  <SheetDescription
                    render={<div />}
                    className="mt-1.5 flex flex-wrap items-center gap-1.5"
                  >
                    <span className="flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700">
                      <Send className="size-3" />
                      {selectedGroup.offers.length} offre
                      {selectedGroup.offers.length > 1 ? "s" : ""}
                    </span>
                    {selectedGroup.demande.ville && (
                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        <MapPin className="size-3" />
                        {selectedGroup.demande.ville}
                      </span>
                    )}
                  </SheetDescription>
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-3 px-4 pb-5">
                {selectedGroup.offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    isCheapest={
                      offer.status === "pending" &&
                      offer.price ===
                        Math.min(
                          ...selectedGroup.offers
                            .filter((o) => o.status === "pending")
                            .map((o) => o.price),
                        )
                    }
                  />
                ))}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function OfferCard({ offer, isCheapest }) {
  const queryClient = useQueryClient();
  const acceptOffer = useMutation({
    mutationFn: async (offerId) =>
      (await api.post(`/offers/${offerId}/accept`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["demandes"] });
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
  });
  const niveau = niveauMeta[offer.user?.niveau] ?? niveauMeta.n0;
  const accepted = offer.status === "accepted";
  const rejected = offer.status === "rejected";

  function handleAccept() {
    acceptOffer.mutate(offer.id, {
      onSuccess: () => toast.success("Offre acceptée."),
      onError: (error) => toast.error(error.message),
    });
  }

  return (
    <div
      className={`relative overflow-hidden rounded-md border bg-white p-4 transition ${
        accepted
          ? "border-teal-300 shadow-[0_8px_24px_rgba(13,148,136,0.15)]"
          : rejected
            ? "border-slate-200 opacity-60"
            : "border-slate-200 hover:border-teal-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
      }`}
    >
      {accepted && (
        <span className="absolute top-0 right-0 flex items-center gap-1 rounded-bl-xl bg-teal-600 px-3 py-1 text-[11px] font-bold text-white">
          <CheckCircle2 className="size-3.5" />
          Choisie
        </span>
      )}
      {isCheapest && (
        <span className="absolute top-0 right-0 flex items-center gap-1 rounded-bl-xl bg-amber-400 px-3 py-1 text-[11px] font-bold text-slate-950">
          <Sparkles className="size-3.5" />
          Meilleur prix
        </span>
      )}

      <div className="flex items-start gap-3">
        <Avatar size="lg" className="ring-4 ring-teal-50">
          <AvatarImage src={offer.user?.avatar} alt={offer.user?.name} />
          <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
            {offer.user?.name?.[0]?.toUpperCase() ?? "P"}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="flex items-center gap-1 text-[14px] font-bold text-slate-950">
            {offer.user?.name ?? "Prestataire"}
            <BadgeCheck className="size-3.5 shrink-0 text-teal-600" />
          </p>
          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${niveau.className}`}
          >
            <ShieldCheck className="size-3" />
            {niveau.label}
          </span>
        </div>

        <div className="shrink-0 rounded-xl bg-teal-50 px-3 pt-5 pb-1.5 text-right">
          <p className="text-[17px] leading-none font-extrabold text-teal-700">
            {offer.price}
          </p>
          <p className="text-[10px] font-semibold text-teal-600">MAD</p>
        </div>
      </div>

      {offer.message && (
        <div className="mt-3 flex gap-2 rounded-xl border-l-2 border-teal-200 bg-slate-50 p-3">
          <MessageSquareQuote className="size-4 shrink-0 text-slate-400" />
          <p className="text-[13px] leading-normal text-slate-700">
            {offer.message}
          </p>
        </div>
      )}

      {accepted && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {offer.user?.phone && (
            <span className="flex flex-1 items-center gap-2 rounded-xl bg-teal-50 p-3 text-[13px] font-bold text-teal-700">
              <Phone className="size-4 shrink-0" />
              {offer.user.phone}
            </span>
          )}
          <Link
            href={`/dashboard/messagerie?demande=${offer.demande_id}`}
            className="flex items-center gap-2 rounded-xl border border-teal-200 bg-white p-3 text-[13px] font-bold text-teal-700 transition hover:bg-teal-50"
          >
            <MessageSquare className="size-4 shrink-0" />
            Messagerie
          </Link>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
          <CalendarDays className="size-3.5" />
          {format(new Date(offer.created_at), "d MMM yyyy 'à' HH:mm", {
            locale: fr,
          })}
        </span>

        {accepted ? null : rejected ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
            Non retenue
          </span>
        ) : (
          <Button
            size="sm"
            disabled={acceptOffer.isPending}
            onClick={handleAccept}
            className="h-8 gap-1 rounded-lg bg-teal-700 px-3 text-[12px] font-bold text-white shadow-[0_4px_10px_rgba(13,148,136,0.3)] hover:bg-teal-800"
          >
            <CheckCircle2 className="size-3.5" />
            Choisir cette offre
          </Button>
        )}
      </div>
    </div>
  );
}
