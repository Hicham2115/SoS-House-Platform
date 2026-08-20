"use client";

import { useForm } from "@tanstack/react-form";
import { Tag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getCategory } from "@/lib/services-catalog";

const categorySchema = z.object({
  category: z.string().min(1, "Choisissez une catégorie"),
  subcategory: z.string().min(1, "Choisissez une sous-catégorie"),
});

export function StepCategory({ defaultValues, onSubmit }) {
  const form = useForm({
    defaultValues: {
      category: defaultValues.category,
      subcategory: defaultValues.subcategory,
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
      className="mt-5 flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="category">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category" className="text-[13px] text-slate-700">
              Catégorie
            </Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value);
                form.setFieldValue("subcategory", "");
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
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.category}>
        {(categoryValue) => {
          const subcategories = getCategory(categoryValue)?.subcategories ?? [];
          return (
            <form.Field name="subcategory">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="subcategory"
                    className="text-[13px] text-slate-700"
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
                </div>
              )}
            </form.Field>
          );
        }}
      </form.Subscribe>

      <Button
        type="submit"
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </form>
  );
}
