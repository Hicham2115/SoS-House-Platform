import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { CalendarDays, ChevronRight, Eye, MapPin, Pencil, Tag, Trash2 } from "lucide-react";
import { DeleteDemandeDialog } from "@/components/dashboard/client/delete-demande-dialog";
import { Button } from "@/components/ui/button";
import { statusStyles, urgencyStyles } from "@/lib/dashboard-data";
import { urgencyOptions } from "@/lib/services-catalog";

const urgencyDotStyles = {
  programmee: "bg-slate-400",
  "sous-48h": "bg-amber-500",
  urgente: "bg-red-500",
};

export function DemandeCard({
  demande,
  icon: Icon,
  title,
  subcategoryLabel,
  onViewDetails,
  onDelete,
  isDeleting,
}) {
  const budget =
    demande.budget_min && demande.budget_max
      ? `${demande.budget_min} – ${demande.budget_max} MAD`
      : null;
  const urgencyLabel = urgencyOptions.find(
    (u) => u.value === demande.urgency,
  )?.label;

  return (
    <div
      onClick={onViewDetails}
      className="relative flex cursor-pointer flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 pr-10 transition hover:border-teal-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] lg:flex-row lg:items-start lg:gap-6"
    >
      <div className="flex flex-1 gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <Icon className="size-6" strokeWidth={1.8} />
        </span>

        <div className="min-w-0 flex-1">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles["En attente de réponses"]}`}
          >
            En attente de réponses
          </span>
          <p className="mt-2 text-[16px] font-bold text-slate-950">{title}</p>
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
            <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600">
              <CalendarDays className="size-3.5" />
              Créée le{" "}
              {format(new Date(demande.created_at), "d MMMM yyyy", {
                locale: fr,
              })}
            </span>
            {budget && (
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-600">
                <Tag className="size-3.5" />
                Budget indicatif{" "}
                <span className="font-bold text-slate-950">{budget}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="hidden w-px self-stretch bg-slate-100 lg:block" />

      <div className="flex shrink-0 flex-col gap-3 lg:w-52">
        {subcategoryLabel && (
          <div>
            <p className="text-[12px] text-slate-500">Type de prestation</p>
            <span className="mt-1 inline-block rounded-full bg-teal-50 px-3 py-1 text-[12px] font-semibold text-teal-700">
              {subcategoryLabel}
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
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="h-9 w-fit rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Eye className="size-4" />
            Détails
          </Button>

          <Button
            variant="outline"
            render={
              <Link
                href={`/dashboard/publier?edit=${demande.id}`}
                onClick={(e) => e.stopPropagation()}
              />
            }
            nativeButton={false}
            className="h-9 w-fit rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="size-4" />
            Modifier
          </Button>

          <DeleteDemandeDialog
            isDeleting={isDeleting}
            onConfirm={() => onDelete?.(demande.id)}
            trigger={
              <Button
                variant="outline"
                onClick={(e) => e.stopPropagation()}
                disabled={isDeleting}
                className="h-9 w-fit rounded-lg border-red-200 px-3.5 text-[13px] font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="size-4" />
                Supprimer
              </Button>
            }
          />
        </div>
      </div>

      <ChevronRight className="absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate-300" />
    </div>
  );
}
