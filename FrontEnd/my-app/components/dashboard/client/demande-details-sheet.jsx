"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { MapPin, Pencil, Tag, Trash2 } from "lucide-react";
import { DeleteDemandeDialog } from "@/components/dashboard/client/delete-demande-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  getCategory,
  propertyTypes,
  qualificationFields,
  urgencyOptions,
} from "@/lib/services-catalog";

const invoiceLabels = {
  aucune: "Aucune facture",
  simple: "Facture simple (sans TVA)",
  tva: "Facture avec TVA récupérable",
};

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-[13px] text-slate-500">{label}</span>
      <span className="text-right text-[13px] font-semibold text-slate-950">
        {value}
      </span>
    </div>
  );
}

export function DemandeDetailsSheet({
  demande,
  open,
  onOpenChange,
  onDelete,
  isDeleting,
}) {
  const category = demande ? getCategory(demande.category) : null;
  const subcategory = category?.subcategories.find(
    (s) => s.value === demande?.subcategory,
  );
  const propertyType = propertyTypes.find(
    (t) => t.value === demande?.property_type,
  );
  const urgency = urgencyOptions.find((u) => u.value === demande?.urgency);
  const fields = demande ? (qualificationFields[demande.category] ?? []) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        {demande && (
          <>
            <SheetHeader className="border-b border-slate-100 pb-4">
              <SheetTitle className="text-xl font-bold text-slate-950">
                {category?.label ?? demande.category}
                {subcategory ? ` — ${subcategory.label}` : ""}
              </SheetTitle>
              <SheetDescription className="text-[13px] text-slate-500">
                Créée le{" "}
                {format(new Date(demande.created_at), "d MMMM yyyy", {
                  locale: fr,
                })}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 px-4 pb-4">
              <span
                className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
                  demande.status === "assignee"
                    ? "bg-teal-50 text-teal-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {demande.status === "assignee"
                  ? "Prestataire choisi"
                  : "En attente de réponses"}
              </span>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 text-[12px] font-bold tracking-[0.04em] text-teal-700 uppercase">
                  <Tag className="size-3.5" />
                  Service
                </div>
                <div className="divide-y divide-slate-100">
                  <DetailRow label="Type de bien" value={propertyType?.label} />
                  {fields.map((field) => (
                    <DetailRow
                      key={field.name}
                      label={field.label}
                      value={
                        field.type === "boolean"
                          ? demande.qualification?.[field.name] === "oui"
                            ? (field.trueLabel ?? "Oui")
                            : demande.qualification?.[field.name] === "non"
                              ? (field.falseLabel ?? "Non")
                              : null
                          : field.type === "select"
                            ? field.options.find(
                                (o) =>
                                  o.value ===
                                  demande.qualification?.[field.name],
                              )?.label
                            : demande.qualification?.[field.name]
                      }
                    />
                  ))}
                </div>
                {demande.description && (
                  <p className="mt-2.5 rounded-xl bg-slate-50 p-3 text-[13px] leading-[1.6] text-slate-700">
                    {demande.description}
                  </p>
                )}
              </div>

              {demande.photos?.length > 0 && (
                <div>
                  <p className="mb-2 text-[12px] font-bold tracking-[0.04em] text-teal-700 uppercase">
                    Photos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {demande.photos.map((photo, index) => (
                      // eslint-disable-next-line @next/next/no-img-element -- backend-hosted URL, not configured as a next/image remote pattern
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="size-20 rounded-xl border border-slate-200 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 text-[12px] font-bold tracking-[0.04em] text-teal-700 uppercase">
                  <MapPin className="size-3.5" />
                  Localisation et urgence
                </div>
                <div className="divide-y divide-slate-100">
                  <DetailRow label="Ville" value={demande.ville} />
                  <DetailRow label="Adresse" value={demande.adresse} />
                  <DetailRow label="Étage" value={demande.etage} />
                  <DetailRow label="Urgence" value={urgency?.label} />
                  {demande.urgency === "programmee" &&
                    demande.scheduled_date && (
                      <DetailRow
                        label="Disponibilité"
                        value={`${format(new Date(demande.scheduled_date), "d MMMM yyyy", { locale: fr })}${
                          demande.scheduled_time
                            ? ` à ${demande.scheduled_time}`
                            : ""
                        }`}
                      />
                    )}
                  {(demande.budget_min || demande.budget_max) && (
                    <DetailRow
                      label="Budget indicatif"
                      value={`${demande.budget_min ?? 0} — ${demande.budget_max ?? 0} MAD`}
                    />
                  )}
                  <DetailRow
                    label="Facture requise"
                    value={invoiceLabels[demande.invoice_required]}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  render={<Link href={`/dashboard/publier?edit=${demande.id}`} />}
                  nativeButton={false}
                  className="h-9 flex-1 rounded-lg border-slate-200 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
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
                      disabled={isDeleting}
                      className="h-9 flex-1 rounded-lg border-red-200 text-[13px] font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                      Supprimer
                    </Button>
                  }
                />
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
