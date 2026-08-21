import { useMemo, useState } from "react";
import { Camera, Mail, MessageCircle, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { dayOptions } from "@/lib/pro-onboarding-data";

export function StepProfil({ formData, updateField, onFinish, isPending }) {
  const [specialiteInput, setSpecialiteInput] = useState("");

  function addSpecialite() {
    const value = specialiteInput.trim();
    if (!value || formData.specialites.includes(value)) return;
    updateField("specialites", [...formData.specialites, value]);
    setSpecialiteInput("");
  }

  function removeSpecialite(value) {
    updateField(
      "specialites",
      formData.specialites.filter((s) => s !== value),
    );
  }

  function toggleDay(value) {
    updateField(
      "disponibiliteJours",
      formData.disponibiliteJours.includes(value)
        ? formData.disponibiliteJours.filter((d) => d !== value)
        : [...formData.disponibiliteJours, value],
    );
  }

  // Local-preview-only for now — no upload call.
  // TODO: wire to POST /api/provider/onboarding/step-5 (multipart avatar)
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    updateField("photoProfil", file);
  }

  const photoPreview = useMemo(
    () =>
      formData.photoProfil ? URL.createObjectURL(formData.photoProfil) : null,
    [formData.photoProfil],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] text-slate-700">Disponibilités</Label>
        <div className="flex flex-wrap gap-1.5">
          {dayOptions.map((day) => {
            const selected = formData.disponibiliteJours.includes(day.value);
            return (
              <button
                key={day.value}
                type="button"
                onClick={() => toggleDay(day.value)}
                className={`flex size-11 items-center justify-center rounded-full border text-[13px] font-semibold transition ${
                  selected
                    ? "border-teal-600 bg-teal-600 text-white"
                    : "border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center gap-2.5">
          <Input
            type="time"
            value={formData.heureDebut}
            onChange={(e) => updateField("heureDebut", e.target.value)}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-slate-50/70 px-3"
          />
          <span className="text-slate-400">—</span>
          <Input
            type="time"
            value={formData.heureFin}
            onChange={(e) => updateField("heureFin", e.target.value)}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-slate-50/70 px-3"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] text-slate-700">
          Canal de notification préféré
        </Label>
        <RadioGroup
          value={formData.canalNotification}
          onValueChange={(value) => updateField("canalNotification", value)}
          className="gap-2.5"
        >
          <label
            htmlFor="canal-whatsapp"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3.5 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <MessageCircle className="size-[18px]" strokeWidth={1.8} />
            </span>
            <span className="flex-1 text-[14px] font-semibold text-slate-950">
              WhatsApp
            </span>
            <RadioGroupItem value="whatsapp" id="canal-whatsapp" />
          </label>
          <label
            htmlFor="canal-email"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-3.5 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <Mail className="size-[18px]" strokeWidth={1.8} />
            </span>
            <span className="flex-1 text-[14px] font-semibold text-slate-950">
              Email
            </span>
            <RadioGroupItem value="email" id="canal-email" />
          </label>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio" className="text-[13px] text-slate-700">
          Bio détaillée
        </Label>
        <Textarea
          id="bio"
          placeholder="Décrivez votre parcours, votre expérience, ce qui vous distingue..."
          value={formData.bio}
          onChange={(e) => updateField("bio", e.target.value)}
          className="min-h-24 rounded-xl border-slate-200 bg-slate-50/70 px-3.5 py-3"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="experience" className="text-[13px] text-slate-700">
          Années d&apos;expérience
        </Label>
        <Input
          id="experience"
          type="number"
          min="0"
          value={formData.anneesExperience}
          onChange={(e) => updateField("anneesExperience", e.target.value)}
          className="h-12 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] text-slate-700">
          Spécialités particulières
        </Label>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ex : Fuites, chauffe-eau, cuisine..."
            value={specialiteInput}
            onChange={(e) => setSpecialiteInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSpecialite();
              }
            }}
            className="h-11 flex-1 rounded-xl border-slate-200 bg-slate-50/70 px-3.5"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addSpecialite}
            className="h-11 shrink-0 rounded-xl border-slate-200 px-4 text-[13px] font-semibold text-slate-700"
          >
            Ajouter
          </Button>
        </div>
        {formData.specialites.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {formData.specialites.map((specialite) => (
              <span
                key={specialite}
                className="flex items-center gap-1.5 rounded-full bg-teal-50 py-1 pl-3 pr-1.5 text-[12px] font-semibold text-teal-800"
              >
                {specialite}
                <button
                  type="button"
                  onClick={() => removeSpecialite(specialite)}
                  aria-label={`Retirer ${specialite}`}
                  className="flex size-4 items-center justify-center rounded-full hover:bg-teal-100"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
        <Avatar className="size-14">
          <AvatarImage src={photoPreview} alt="Photo de profil" />
          <AvatarFallback className="bg-teal-100 font-bold text-teal-700">
            ?
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[13px] font-bold text-slate-950">
            Photo de profil (optionnel)
          </p>
          <label
            htmlFor="onboarding-pro-photo"
            className="mt-1.5 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Camera className="size-4" />
            Ajouter une photo
          </label>
          <input
            id="onboarding-pro-photo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onFinish}
        disabled={isPending}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Terminer
      </Button>
    </div>
  );
}
