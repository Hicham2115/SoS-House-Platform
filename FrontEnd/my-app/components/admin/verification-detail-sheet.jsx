"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AlertTriangle,
  Building2,
  Calendar,
  Check,
  ExternalLink,
  FileCheck2,
  FileX2,
  Phone,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useApproveVerification,
  useRejectVerification,
  useVerificationDetail,
} from "@/hooks/use-admin-verifications";

const niveauLabel = { n1: "Auto-entrepreneur", n2: "Société" };

const documentFieldsByNiveau = {
  n1: [
    { key: "carte_auto_entrepreneur", label: "Carte auto-entrepreneur" },
    { key: "cin_recto", label: "CIN — recto" },
    { key: "cin_verso", label: "CIN — verso" },
    { key: "selfie", label: "Selfie" },
  ],
  n2: [
    { key: "cin_recto", label: "CIN — recto" },
    { key: "cin_verso", label: "CIN — verso" },
    { key: "selfie", label: "Selfie" },
  ],
};

function InfoRow({ Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-500">{label}</p>
        <p className="truncate text-[13px] font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function DocumentTile({ label, url }) {
  const provided = Boolean(url);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
        provided
          ? "border-slate-200 bg-white"
          : "border-dashed border-slate-200 bg-slate-50/60"
      }`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
          provided ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-400"
        }`}
      >
        {provided ? (
          <FileCheck2 className="size-4" strokeWidth={1.8} />
        ) : (
          <FileX2 className="size-4" strokeWidth={1.8} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`text-[13px] font-semibold ${
            provided ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {label}
        </p>
        <p className="text-[11px] text-slate-400">
          {provided ? "Fourni" : "Non fourni"}
        </p>
      </div>
      {provided && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1 rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-[12px] font-bold text-teal-700 transition hover:bg-teal-100"
        >
          Voir
          <ExternalLink className="size-3" strokeWidth={2} />
        </a>
      )}
    </div>
  );
}

export function VerificationDetailSheet({ artisanId, open, onOpenChange }) {
  const { data: artisan, isPending } = useVerificationDetail(artisanId);
  const approve = useApproveVerification();
  const reject = useRejectVerification();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  const close = () => {
    setRejecting(false);
    setReason("");
    onOpenChange(false);
  };

  const handleApprove = () => {
    approve.mutate(artisanId, { onSuccess: close });
  };

  const handleReject = () => {
    if (!reason.trim()) return;
    reject.mutate(
      { artisanId, reason: reason.trim() },
      { onSuccess: close },
    );
  };

  const documents = artisan ? documentFieldsByNiveau[artisan.niveau] ?? [] : [];
  const providedCount = documents.filter(({ key }) => artisan?.[key]).length;

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
        else onOpenChange(next);
      }}
    >
      <SheetContent className="flex w-full flex-col overflow-y-auto bg-slate-50 sm:max-w-md">
        <SheetHeader className="bg-white pr-10 pb-4">
          <SheetTitle className="sr-only">
            {artisan?.name ?? "Vérification"}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Dossier de vérification de {artisan?.name ?? "ce prestataire"}.
          </SheetDescription>

          {isPending ? (
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-24" />
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
                    {artisan?.name?.[0]?.toUpperCase() ?? "P"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-bold text-slate-950">
                    {artisan?.name}
                  </p>
                  <p className="flex items-center gap-1 text-[12px] text-slate-500">
                    <Phone className="size-3 shrink-0" />
                    {artisan?.phone ?? "—"}
                  </p>
                </div>
              </div>
              <Badge className="shrink-0 bg-violet-50 text-violet-600">
                {niveauLabel[artisan?.niveau] ?? artisan?.niveau}
              </Badge>
            </div>
          )}
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
          {isPending ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <InfoRow
                  Icon={Calendar}
                  label="Soumis le"
                  value={
                    artisan?.created_at
                      ? format(new Date(artisan.created_at), "d MMM yyyy", {
                          locale: fr,
                        })
                      : "—"
                  }
                />
                {artisan?.niveau === "n2" && (
                  <>
                    <InfoRow
                      Icon={Building2}
                      label="Nom commercial"
                      value={artisan?.nom_commercial || "—"}
                    />
                    <InfoRow
                      Icon={Building2}
                      label="Secteur d'activité"
                      value={artisan?.secteur_activite || "—"}
                    />
                    <InfoRow
                      Icon={FileCheck2}
                      label="Registre de commerce"
                      value={artisan?.rc || "—"}
                    />
                  </>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-bold text-slate-900">
                    Documents
                  </p>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {providedCount}/{documents.length} fournis
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {documents.map(({ key, label }) => (
                    <DocumentTile key={key} label={label} url={artisan?.[key]} />
                  ))}
                </div>
              </div>

              {rejecting && (
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
                  <p className="flex items-center gap-1.5 text-[13px] font-bold text-red-700">
                    <AlertTriangle className="size-3.5" strokeWidth={2} />
                    Motif du rejet
                  </p>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Expliquez pourquoi ce dossier est rejeté…"
                    rows={4}
                    className="mt-2 border-red-200 bg-white focus-visible:border-red-400 focus-visible:ring-red-400/15"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <SheetFooter className="border-t border-slate-200 bg-white">
          {rejecting ? (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="h-11 flex-1 rounded-xl"
                onClick={() => setRejecting(false)}
                disabled={reject.isPending}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                className="h-11 flex-1 gap-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700"
                onClick={handleReject}
                disabled={!reason.trim() || reject.isPending}
              >
                <X className="size-4" strokeWidth={2.2} />
                Confirmer le rejet
              </Button>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button
                variant="outline"
                className="h-11 flex-1 gap-1.5 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => setRejecting(true)}
                disabled={isPending || approve.isPending}
              >
                <X className="size-4" strokeWidth={2.2} />
                Rejeter
              </Button>
              <Button
                className="h-11 flex-1 gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800"
                onClick={handleApprove}
                disabled={isPending || approve.isPending}
              >
                <Check className="size-4" strokeWidth={2.2} />
                Approuver
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
