"use client";

import { useForm } from "@tanstack/react-form";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const locationSchema = z.object({
  ville: z.string().trim().min(1, "La ville est requise"),
  adresseComplete: z.string().trim().min(1, "L'adresse complète est requise"),
  etage: z.string().trim().optional(),
});

export function StepLocation({ defaultValues, prefilled, onSubmit }) {
  const form = useForm({
    defaultValues: {
      ville: defaultValues.ville,
      adresseComplete: defaultValues.adresseComplete,
      etage: defaultValues.etage,
    },
    onSubmit: async ({ value }) => {
      const parsed = locationSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      onSubmit(parsed.data);
    },
  });

  return (
    <form
      className="mt-5 flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {prefilled && (
        <p className="rounded-xl bg-teal-50 px-3.5 py-2.5 text-[12px] text-teal-700">
          Préremplie depuis votre adresse par défaut — modifiable pour cette
          demande.
        </p>
      )}

      <form.Field name="ville">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ville" className="text-[13px] text-slate-700">
              Ville
            </Label>
            <InputGroup className={inputGroupClassName}>
              <InputGroupAddon>
                <MapPin />
              </InputGroupAddon>
              <InputGroupInput
                id="ville"
                placeholder="Ex : Casablanca"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </InputGroup>
          </div>
        )}
      </form.Field>

      <form.Field name="adresseComplete">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="adresseComplete"
              className="text-[13px] text-slate-700"
            >
              Adresse complète
            </Label>
            <InputGroup className={inputGroupClassName}>
              <InputGroupAddon>
                <MapPin />
              </InputGroupAddon>
              <InputGroupInput
                id="adresseComplete"
                placeholder="N°, rue, résidence..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </InputGroup>
          </div>
        )}
      </form.Field>

      <form.Field name="etage">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="etage" className="text-[13px] text-slate-700">
              Étage (optionnel)
            </Label>
            <InputGroup className={inputGroupClassName}>
              <InputGroupAddon>
                <MapPin />
              </InputGroupAddon>
              <InputGroupInput
                id="etage"
                placeholder="Ex : 3ème étage, porte 12"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </InputGroup>
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </form>
  );
}
