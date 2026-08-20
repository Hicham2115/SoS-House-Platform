"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, Zap } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { urgencyOptions } from "@/lib/services-catalog";

const hourOptions = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const minuteOptions = ["00", "15", "30", "45"];

const urgencySchema = z
  .object({
    urgency: z.enum(["programmee", "sous-48h", "urgente"], {
      message: "Choisissez un niveau d'urgence",
    }),
    scheduledDate: z.date().optional(),
    scheduledTime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.urgency === "programmee" && !data.scheduledDate) {
      ctx.addIssue({
        code: "custom",
        path: ["scheduledDate"],
        message: "Choisissez une date pour votre disponibilité",
      });
    }
  });

const urgencyIcons = { "sous-48h": Clock, urgente: Zap };

export function StepUrgency({ defaultValues, priceRange, onSubmit }) {
  const [budgetEnabled, setBudgetEnabled] = useState(
    Boolean(defaultValues.budget),
  );
  const min = priceRange?.min ?? 0;
  const max = priceRange?.max ?? 20000;
  const [budget, setBudget] = useState(defaultValues.budget ?? [min, max]);

  const form = useForm({
    defaultValues: {
      urgency: defaultValues.urgency,
      scheduledDate: defaultValues.scheduledDate ?? undefined,
      scheduledTime: defaultValues.scheduledTime ?? "",
    },
    onSubmit: async ({ value }) => {
      const parsed = urgencySchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      onSubmit({
        urgency: parsed.data.urgency,
        scheduledDate:
          parsed.data.urgency === "programmee" ? parsed.data.scheduledDate : null,
        scheduledTime:
          parsed.data.urgency === "programmee" ? parsed.data.scheduledTime : "",
        budget: budgetEnabled ? budget : null,
      });
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
      <form.Field name="urgency">
        {(field) => (
          <div className="flex flex-col gap-2.5">
            {urgencyOptions.map((option) => {
              const Icon = urgencyIcons[option.value] ?? CalendarIcon;
              const selected = field.state.value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.handleChange(option.value)}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] ${
                    selected
                      ? "border-teal-600 bg-teal-50/60"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                      selected
                        ? "bg-teal-600 text-white"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    <Icon className="size-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="text-[14px] font-semibold text-slate-950">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.urgency}>
        {(urgency) =>
          urgency === "programmee" && (
            <div className="flex gap-3">
              <form.Field name="scheduledDate">
                {(field) => (
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Label className="text-[13px] text-slate-700">
                      Date souhaitée
                    </Label>
                    <Popover>
                      <PopoverTrigger
                        render={
                          <button
                            type="button"
                            className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-[14px] text-slate-700 outline-none transition hover:border-teal-300 focus-visible:border-teal-600 focus-visible:ring-3 focus-visible:ring-teal-600/15"
                          />
                        }
                      >
                        <CalendarIcon className="size-4 shrink-0 text-teal-700" />
                        {field.state.value
                          ? format(field.state.value, "d MMMM yyyy", {
                              locale: fr,
                            })
                          : "Choisir une date"}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto rounded-xl p-2">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => field.handleChange(date)}
                          disabled={{ before: new Date() }}
                          className="[&_[data-selected=true]_button]:bg-teal-600 [&_[data-selected=true]_button]:text-white [&_[data-today=true]]:text-teal-700"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </form.Field>

              <form.Field name="scheduledTime">
                {(field) => {
                  const [hour, minute] = field.state.value
                    ? field.state.value.split(":")
                    : ["", ""];
                  return (
                    <div className="flex w-40 flex-col gap-1.5">
                      <Label className="text-[13px] text-slate-700">
                        Heure
                      </Label>
                      <div className="flex items-center gap-1.5">
                        <Select
                          value={hour}
                          onValueChange={(value) =>
                            field.handleChange(`${value}:${minute || "00"}`)
                          }
                        >
                          <SelectTrigger className="h-12 flex-1 rounded-xl border-slate-200 bg-slate-50/70 px-2.5 data-[state=open]:border-teal-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourOptions.map((h) => (
                              <SelectItem key={h} value={h}>
                                {h}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="font-bold text-slate-400">:</span>
                        <Select
                          value={minute}
                          onValueChange={(value) =>
                            field.handleChange(`${hour || "00"}:${value}`)
                          }
                        >
                          <SelectTrigger className="h-12 flex-1 rounded-xl border-slate-200 bg-slate-50/70 px-2.5 data-[state=open]:border-teal-600">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent>
                            {minuteOptions.map((m) => (
                              <SelectItem key={m} value={m}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                }}
              </form.Field>
            </div>
          )
        }
      </form.Subscribe>

      <div className="flex flex-col gap-2.5 rounded-xl border border-slate-200 p-3.5">
        <label className="flex cursor-pointer items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-slate-700">
            Budget indicatif (optionnel)
          </span>
          <input
            type="checkbox"
            checked={budgetEnabled}
            onChange={(e) => setBudgetEnabled(e.target.checked)}
            className="size-4 accent-teal-600"
          />
        </label>
        {budgetEnabled && (
          <>
            <Slider
              value={budget}
              onValueChange={setBudget}
              min={min}
              max={max}
              step={50}
              className="[&_[data-slot=slider-range]]:bg-teal-600 [&_[data-slot=slider-thumb]]:border-teal-600"
            />
            <p className="text-[12px] text-slate-500">
              {budget[0]} MAD — {budget[1]} MAD
            </p>
          </>
        )}
      </div>

      <Button
        type="submit"
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </form>
  );
}
