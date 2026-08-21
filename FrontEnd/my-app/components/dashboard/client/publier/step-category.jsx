"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Tag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { StepIntro } from "@/components/dashboard/client/publier/step-intro";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/services-catalog";
// getCategory is only needed by the subcategory picker below, currently disabled.

const categorySchema = z.object({
  category: z.string().min(1, "Choisissez une catégorie"),
  // Subcategory selection temporarily disabled — see the commented field below.
  // subcategory: z.string().min(1, "Choisissez une sous-catégorie"),
});

export function StepCategory({ defaultValues, onSubmit }) {
  const form = useForm({
    defaultValues: {
      category: defaultValues.category,
      // subcategory: defaultValues.subcategory,
    },
    onSubmit: async ({ value }) => {
      const parsed = categorySchema.safeParse(value);
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
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <StepIntro
        icon={Tag}
        title="Choisissez la catégorie de votre demande"
        description="Sélectionnez la catégorie qui correspond le mieux à votre besoin."
      />

      <div className="mt-6 flex flex-col gap-5">
        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="category"
                className="text-[13px] font-semibold text-slate-700"
              >
                Catégorie
              </Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);
                  // form.setFieldValue("subcategory", "");
                }}
              >
                <SelectTrigger
                  id="category"
                  className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600"
                >
                  <span className="flex flex-1 items-center gap-2.5 overflow-hidden">
                    {(() => {
                      const SelectedIcon =
                        categories.find((c) => c.value === field.state.value)
                          ?.Icon ?? Tag;
                      return (
                        <SelectedIcon className="size-4 shrink-0 text-slate-500" />
                      );
                    })()}
                    <SelectValue placeholder="Choisissez une catégorie">
                      {(value) =>
                        categories.find((c) => c.value === value)?.label ??
                        "Choisissez une catégorie"
                      }
                    </SelectValue>
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {categories.map(({ value, label, Icon }) => (
                    <SelectItem key={value} value={value}>
                      <Icon className="size-4 text-teal-700" />
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[12px] text-slate-400">
                Exemples : Plomberie, Électricité, Serrurerie, Nettoyage,
                Peinture...
              </p>
            </div>
          )}
        </form.Field>

        {/* Subcategory picker temporarily disabled — for now clients only pick a category.
        <form.Subscribe selector={(state) => state.values.category}>
          {(categoryValue) => {
            const subcategories =
              getCategory(categoryValue)?.subcategories ?? [];
            return (
              <form.Field name="subcategory">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="subcategory"
                      className="text-[13px] font-semibold text-slate-700"
                    >
                      Sous-catégorie
                    </Label>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      disabled={!categoryValue}
                    >
                      <SelectTrigger
                        id="subcategory"
                        className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600"
                      >
                        <SelectValue placeholder="Choisissez une sous-catégorie">
                          {(value) =>
                            subcategories.find((s) => s.value === value)
                              ?.label ?? "Choisissez une sous-catégorie"
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[12px] text-slate-400">
                      Cela nous aide à trouver le bon artisan plus rapidement.
                    </p>
                  </div>
                )}
              </form.Field>
            );
          }}
        </form.Subscribe>
        */}
      </div>

      <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
        <Button
          type="submit"
          className="h-12 shrink-0 rounded-xl bg-[#0b1730] px-8 text-[14px] font-semibold text-white hover:bg-[#142248]"
        >
          Continuer
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
}
