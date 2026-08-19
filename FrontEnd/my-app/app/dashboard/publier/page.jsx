"use client";

import { useForm } from "@tanstack/react-form";
import { AlignLeft, BadgePlus, MapPin, Tag } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, useListingsStore } from "@/lib/store/listings";

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const listingSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis").max(100),
  category: z.string().min(1, "Choisissez une catégorie"),
  city: z.string().trim().min(1, "La ville est requise"),
  description: z
    .string()
    .trim()
    .min(10, "Décrivez votre besoin (10 caractères minimum)")
    .max(500),
});

export default function PublierPage() {
  const listings = useListingsStore((state) => state.listings);
  const addListing = useListingsStore((state) => state.addListing);

  const form = useForm({
    defaultValues: { title: "", category: "", city: "", description: "" },
    onSubmit: async ({ value }) => {
      const parsed = listingSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }

      addListing(parsed.data);
      toast.success("Votre demande a été publiée.");
      form.reset();
    },
  });

  return (
    <>
      <DashboardHeader
        title="Publier une demande"
        subtitle="Décrivez votre besoin, les artisans vérifiés pourront y répondre."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8 xl:flex-row xl:items-start">
        <form
          className="flex w-full flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] xl:max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <BadgePlus className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[15px] font-bold text-slate-950">
                Nouvelle demande
              </p>
              <p className="text-[12px] text-slate-500">
                Visible par tous les artisans vérifiés
              </p>
            </div>
          </div>

          <form.Field name="title">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title" className="text-[13px] text-slate-700">
                  Titre
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <Tag />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="title"
                    placeholder="Ex : Fuite d'eau sous l'évier"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="category"
                  className="text-[13px] text-slate-700"
                >
                  Catégorie
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger
                    id="category"
                    className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600"
                  >
                    <SelectValue placeholder="Choisissez une catégorie" />
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

          <form.Field name="city">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city" className="text-[13px] text-slate-700">
                  Ville
                </Label>
                <InputGroup className={inputGroupClassName}>
                  <InputGroupAddon>
                    <MapPin />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="city"
                    placeholder="Ex : Casablanca"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="description"
                  className="text-[13px] text-slate-700"
                >
                  Description
                </Label>
                <InputGroup className={`${inputGroupClassName} h-auto`}>
                  <InputGroupAddon align="block-start">
                    <AlignLeft />
                  </InputGroupAddon>
                  <InputGroupTextarea
                    id="description"
                    placeholder="Décrivez le problème et vos disponibilités..."
                    className="min-h-24"
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
            className="mt-1 h-12 w-full justify-center rounded-xl bg-[#ffa514] text-[14px] font-bold text-slate-950 shadow-[0_13px_25px_rgba(255,165,20,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffaf2d]"
          >
            Publier ma demande
          </Button>
        </form>

        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-950">
              Annonces publiées récemment
            </h2>
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[12px] font-semibold text-teal-700">
              {listings.length} annonce{listings.length > 1 ? "s" : ""}
            </span>
          </div>

          {listings.map((listing) => {
            const category = categories.find(
              (c) => c.value === listing.category,
            );
            const Icon = category?.Icon;

            return (
              <div
                key={listing.id}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              >
                {Icon && (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[14px] font-bold text-slate-950">
                      {listing.title}
                    </p>
                    <span className="text-[12px] text-slate-500">
                      {listing.postedAt}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-slate-600 uppercase">
                      {category?.label}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-slate-500">
                      <MapPin className="size-3.5" />
                      {listing.city}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.5] text-slate-700">
                    {listing.description}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold text-teal-700">
                    {listing.author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
