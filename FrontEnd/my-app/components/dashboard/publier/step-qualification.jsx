"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { AlignLeft, Camera, TriangleAlert, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
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
import { maskContactInfo } from "@/lib/contact-mask";
import { MAX_PHOTO_SIZE, readImageFile } from "@/lib/file-upload";
import { propertyTypes, qualificationFields } from "@/lib/services-catalog";

const MAX_PHOTOS = 5;

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const qualificationSchema = z.object({
  propertyType: z.string().min(1, "Choisissez un type de bien"),
  description: z
    .string()
    .trim()
    .min(10, "Décrivez votre besoin (10 caractères minimum)")
    .max(500),
});

function QualificationField({ field, value, onChange }) {
  if (field.type === "select") {
    return (
      <Select value={value ?? ""} onValueChange={onChange}>
        <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600">
          <SelectValue placeholder="Choisissez">
            {(v) => field.options.find((o) => o.value === v)?.label ?? "Choisissez"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (field.type === "boolean") {
    const trueLabel = field.trueLabel ?? "Oui";
    const falseLabel = field.falseLabel ?? "Non";
    return (
      <div className="flex gap-2.5">
        {[trueLabel, falseLabel].map((label, index) => {
          const optionValue = index === 0 ? "oui" : "non";
          const selected = value === optionValue;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onChange(optionValue)}
              className={`h-12 flex-1 rounded-xl border text-[14px] font-semibold transition ${
                selected
                  ? "border-teal-600 bg-teal-50 text-teal-700"
                  : "border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <InputGroup className={inputGroupClassName}>
      <InputGroupInput
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
}

export function StepQualification({ category, defaultValues, onSubmit }) {
  const fields = qualificationFields[category] ?? [];
  const [photos, setPhotos] = useState(defaultValues.photos ?? []);
  const [maskWarning, setMaskWarning] = useState(false);

  const form = useForm({
    defaultValues: {
      propertyType: defaultValues.propertyType,
      description: defaultValues.description,
      qualification: { ...defaultValues.qualification },
    },
    onSubmit: async ({ value }) => {
      const parsed = qualificationSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }
      const { masked, detected } = maskContactInfo(parsed.data.description);
      if (detected) {
        setMaskWarning(true);
        form.setFieldValue("description", masked);
        toast.error(
          "Les coordonnées personnelles ne sont pas autorisées ici — elles ont été masquées.",
        );
        return;
      }
      onSubmit({
        propertyType: parsed.data.propertyType,
        description: masked,
        qualification: value.qualification,
        photos,
      });
    },
  });

  async function handlePhotosChange(e) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    if (photos.length + files.length > MAX_PHOTOS) {
      toast.error(`Vous pouvez ajouter jusqu'à ${MAX_PHOTOS} photos.`);
      return;
    }

    try {
      const dataUrls = await Promise.all(
        files.map((file) =>
          readImageFile(
            file,
            MAX_PHOTO_SIZE,
            "Chaque photo ne doit pas dépasser 5 Mo.",
          ),
        ),
      );
      setPhotos((prev) => [...prev, ...dataUrls]);
    } catch (error) {
      toast.error(error.message);
    }
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form
      className="mt-5 flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="propertyType">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] text-slate-700">Type de bien</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
            >
              <SelectTrigger className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600">
                <SelectValue placeholder="Choisissez un type de bien">
                  {(value) =>
                    propertyTypes.find((t) => t.value === value)?.label ??
                    "Choisissez un type de bien"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      {fields.map((qualField) => (
        <form.Field
          key={qualField.name}
          name={`qualification.${qualField.name}`}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label className="text-[13px] text-slate-700">
                {qualField.label}
              </Label>
              <QualificationField
                field={qualField}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
            </div>
          )}
        </form.Field>
      ))}

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] text-slate-700">
          Photos (optionnel, {MAX_PHOTOS} maximum)
        </Label>
        <div className="flex flex-wrap gap-2.5">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative size-20 overflow-hidden rounded-xl border border-slate-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- data URL preview, not a next/image-eligible remote asset */}
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                aria-label="Supprimer la photo"
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="flex size-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50">
              <Camera className="size-5" />
              <span className="text-[11px] font-semibold">Ajouter</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotosChange}
              />
            </label>
          )}
        </div>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] text-slate-700">Description</Label>
            <InputGroup className={`${inputGroupClassName} h-auto`}>
              <InputGroupAddon align="block-start">
                <AlignLeft />
              </InputGroupAddon>
              <InputGroupTextarea
                placeholder="Décrivez le problème et vos disponibilités..."
                className="min-h-24"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  setMaskWarning(false);
                  field.handleChange(e.target.value);
                }}
              />
            </InputGroup>
            {maskWarning && (
              <p className="flex items-center gap-1.5 text-[12px] text-red-600">
                <TriangleAlert className="size-3.5 shrink-0" />
                Les coordonnées personnelles ne sont pas autorisées ici.
              </p>
            )}
          </div>
        )}
      </form.Field>

      <Button
        type="submit"
        className="mt-1 h-12 w-full justify-center rounded-xl bg-teal-600 text-[14px] font-semibold text-white hover:bg-teal-700"
      >
        Continuer
      </Button>
    </form>
  );
}
