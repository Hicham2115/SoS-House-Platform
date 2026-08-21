import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/services-catalog";

export function StepZone({ formData, updateField, onContinue, isPending }) {
  function toggleCategory(value) {
    updateField(
      "categories",
      formData.categories.includes(value)
        ? formData.categories.filter((c) => c !== value)
        : [...formData.categories, value],
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="zone-ville" className="text-[13px] text-slate-700">
          Zone d&apos;intervention
        </Label>
        {/* TODO: replace with real address/map autocomplete */}
        <div className="flex h-12 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5">
          <MapPin className="size-4 shrink-0 text-slate-400" />
          <input
            id="zone-ville"
            placeholder="Ex : Casablanca"
            value={formData.ville}
            onChange={(e) => updateField("ville", e.target.value)}
            className="h-full flex-1 bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="mt-1 flex items-center justify-between">
          <Label className="text-[13px] text-slate-700">
            Rayon d&apos;intervention
          </Label>
          <span className="text-[13px] font-semibold text-teal-700">
            {formData.radiusKm} km
          </span>
        </div>
        <Slider
          value={formData.radiusKm}
          onValueChange={(value) => updateField("radiusKm", value)}
          min={1}
          max={50}
          step={1}
          className="[&_[data-slot=slider-range]]:bg-teal-600 [&_[data-slot=slider-thumb]]:border-teal-600"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-[13px] text-slate-700">
          Catégories maîtrisées
        </Label>
        <div className="grid grid-cols-2 gap-2.5">
          {categories.map(({ value, label }) => {
            const checked = formData.categories.includes(value);
            return (
              <label
                key={value}
                htmlFor={`cat-${value}`}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 transition ${
                  checked
                    ? "border-teal-600 bg-teal-50/60"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Checkbox
                  id={`cat-${value}`}
                  checked={checked}
                  onCheckedChange={() => toggleCategory(value)}
                />
                <span className="text-[13px] font-medium text-slate-800">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        onClick={onContinue}
        disabled={isPending}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </div>
  );
}
