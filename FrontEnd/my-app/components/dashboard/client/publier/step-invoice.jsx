"use client";

import { useState } from "react";
import { FileCheck2, FileText, FileX, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const invoiceOptions = [
  {
    value: "aucune",
    label: "Aucune facture",
    description: "Pour un besoin personnel, sans justificatif.",
    Icon: FileX,
  },
  {
    value: "simple",
    label: "Facture simple",
    description: "Facture conforme, sans TVA récupérable.",
    Icon: FileText,
  },
  {
    value: "tva",
    label: "Facture avec TVA récupérable",
    description: "Facture conforme, TVA déductible.",
    Icon: FileCheck2,
  },
];

const invoiceByValue = Object.fromEntries(
  invoiceOptions.map((option) => [option.value, option]),
);

export function StepInvoice({ defaultValue, editable, onSubmit }) {
  const [value, setValue] = useState(defaultValue);
  const locked = invoiceByValue[value];

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] text-slate-700">Facture requise</Label>

        {editable ? (
          <RadioGroup value={value} onValueChange={setValue} className="gap-2.5">
            {invoiceOptions.map(({ value: optionValue, label, description, Icon }) => {
              const selected = value === optionValue;
              return (
                <label
                  key={optionValue}
                  htmlFor={`invoice-${optionValue}`}
                  className={`flex cursor-pointer items-center gap-4 rounded-md border p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] ${
                    selected
                      ? "border-teal-600 bg-teal-50/60"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${
                      selected
                        ? "bg-teal-600 text-white"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-bold text-slate-950">
                      {label}
                    </span>
                    <span className="block text-[12px] leading-[1.5] text-slate-500">
                      {description}
                    </span>
                  </span>
                  <RadioGroupItem
                    value={optionValue}
                    id={`invoice-${optionValue}`}
                    className="shrink-0"
                  />
                </label>
              );
            })}
          </RadioGroup>
        ) : (
          <>
            <div className="flex items-center gap-4 rounded-md border border-slate-200 bg-slate-50 p-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                {locked ? (
                  <locked.Icon className="size-5" strokeWidth={1.8} />
                ) : (
                  <FileCheck2 className="size-5" strokeWidth={1.8} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold text-slate-950">
                  {locked?.label}
                </span>
                <span className="block text-[12px] leading-[1.5] text-slate-500">
                  {locked?.description}
                </span>
              </span>
              <Lock className="size-4 shrink-0 text-slate-400" />
            </div>
            <p className="flex items-start gap-1.5 rounded-xl bg-amber-50 p-3 text-[12px] leading-[1.5] text-amber-800">
              <Lock className="mt-0.5 size-3.5 shrink-0" />
              Verrouillé pour les comptes Entreprise — chaque demande exige
              une facture avec TVA récupérable.
            </p>
          </>
        )}
      </div>

      <Button
        type="button"
        onClick={() => onSubmit(value)}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </div>
  );
}
