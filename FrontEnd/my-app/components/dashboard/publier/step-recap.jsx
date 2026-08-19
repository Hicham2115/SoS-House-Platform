"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { BadgePlus, MapPin, Tag, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPriceEstimate } from "@/lib/lead-pricing";
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

function RecapRow({ label, value }) {
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

export function StepRecap({ draft, isPending, onSubmit }) {
  const category = getCategory(draft.category);
  const subcategory = category?.subcategories.find(
    (s) => s.value === draft.subcategory,
  );
  const propertyType = propertyTypes.find(
    (t) => t.value === draft.propertyType,
  );
  const urgency = urgencyOptions.find((u) => u.value === draft.urgency);
  const priceRange = getPriceEstimate(draft.category);
  const fields = qualificationFields[draft.category] ?? [];

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 text-[12px] font-bold uppercase tracking-[0.04em] text-teal-700">
          <Tag className="size-3.5" />
          Service
        </div>
        <div className="divide-y divide-slate-100">
          <RecapRow label="Catégorie" value={category?.label} />
          <RecapRow label="Sous-catégorie" value={subcategory?.label} />
          <RecapRow label="Type de bien" value={propertyType?.label} />
          {fields.map((field) => (
            <RecapRow
              key={field.name}
              label={field.label}
              value={
                field.type === "boolean"
                  ? draft.qualification?.[field.name] === "oui"
                    ? (field.trueLabel ?? "Oui")
                    : draft.qualification?.[field.name] === "non"
                      ? (field.falseLabel ?? "Non")
                      : null
                  : field.type === "select"
                    ? field.options.find(
                        (o) => o.value === draft.qualification?.[field.name],
                      )?.label
                    : draft.qualification?.[field.name]
              }
            />
          ))}
          <RecapRow
            label="Photos"
            value={draft.photos?.length ? `${draft.photos.length} ajoutée(s)` : null}
          />
        </div>
        {draft.description && (
          <p className="mt-2.5 rounded-xl bg-slate-50 p-3 text-[13px] leading-[1.6] text-slate-700">
            {draft.description}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5 text-[12px] font-bold uppercase tracking-[0.04em] text-teal-700">
          <MapPin className="size-3.5" />
          Localisation et urgence
        </div>
        <div className="divide-y divide-slate-100">
          <RecapRow label="Ville" value={draft.ville} />
          <RecapRow label="Adresse" value={draft.adresseComplete} />
          <RecapRow label="Étage" value={draft.etage} />
          <RecapRow label="Urgence" value={urgency?.label} />
          {draft.urgency === "programmee" && draft.scheduledDate && (
            <RecapRow
              label="Disponibilité"
              value={`${format(draft.scheduledDate, "d MMMM yyyy", { locale: fr })}${
                draft.scheduledTime ? ` à ${draft.scheduledTime}` : ""
              }`}
            />
          )}
          {draft.budget && (
            <RecapRow
              label="Budget indicatif"
              value={`${draft.budget[0]} — ${draft.budget[1]} MAD`}
            />
          )}
          <RecapRow label="Facture requise" value={invoiceLabels[draft.invoiceRequired]} />
        </div>
      </div>

      {priceRange && (
        <div className="flex items-start gap-2.5 rounded-2xl bg-teal-50 p-3.5 text-teal-800">
          <Wallet className="mt-0.5 size-4 shrink-0" />
          <span className="text-[12px] leading-[1.5]">
            Estimation indicative pour cette catégorie :{" "}
            <span className="font-bold">
              {priceRange.min} — {priceRange.max} MAD
            </span>
            . Le prix définitif dépend du prestataire et du devis.
          </span>
        </div>
      )}

      <Button
        type="button"
        disabled={isPending}
        onClick={onSubmit}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#ffa514] text-[14px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
      >
        <BadgePlus className="size-4" />
        Publier ma demande
      </Button>
    </div>
  );
}
