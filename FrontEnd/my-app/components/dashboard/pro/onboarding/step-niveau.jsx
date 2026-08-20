import { Landmark, Store, User } from "lucide-react";
import { FileUploadField } from "@/components/dashboard/pro/onboarding/file-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { niveauOptions } from "@/lib/pro-onboarding-data";

const niveauIcons = { n0: User, n1: Store, n2: Landmark };

export function StepNiveau({ formData, updateField, onContinue }) {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={formData.niveau}
        onValueChange={(value) => updateField("niveau", value)}
        className="gap-2.5"
      >
        {niveauOptions.map((option) => {
          const Icon = niveauIcons[option.value];
          const selected = formData.niveau === option.value;
          return (
            <label
              key={option.value}
              htmlFor={`niveau-${option.value}`}
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border border-l-4 p-3.5 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] ${
                selected
                  ? "border-teal-600 border-l-teal-600 bg-teal-50/60"
                  : "border-slate-200 border-l-slate-200 hover:bg-slate-50"
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
                  {option.title}
                </span>
                <span className="block text-[12px] leading-[1.5] text-slate-500">
                  {option.description}
                </span>
              </span>
              <RadioGroupItem value={option.value} id={`niveau-${option.value}`} />
            </label>
          );
        })}
      </RadioGroup>

      {formData.niveau === "n1" && (
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-3.5">
          <p className="text-[12px] font-semibold text-slate-600">
            Documents auto-entrepreneur
          </p>
          <FileUploadField
            id="carte-auto-entrepreneur"
            label="Carte auto-entrepreneur"
            file={formData.carteAutoEntrepreneur}
            onChange={(e) =>
              updateField("carteAutoEntrepreneur", e.target.files?.[0] ?? null)
            }
          />
          <FileUploadField
            id="attestation-inscription"
            label="Attestation d'inscription"
            file={formData.attestationInscription}
            onChange={(e) =>
              updateField("attestationInscription", e.target.files?.[0] ?? null)
            }
          />
          <FileUploadField
            id="rib-n1"
            label="RIB"
            file={formData.ribN1}
            onChange={(e) => updateField("ribN1", e.target.files?.[0] ?? null)}
          />
        </div>
      )}

      {formData.niveau === "n2" && (
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-3.5">
          <p className="text-[12px] font-semibold text-slate-600">
            Documents société
          </p>
          <FileUploadField
            id="modele-j"
            label="Modèle J"
            file={formData.modeleJ}
            onChange={(e) => updateField("modeleJ", e.target.files?.[0] ?? null)}
          />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ice" className="text-[13px] text-slate-700">
              ICE
            </Label>
            <Input
              id="ice"
              value={formData.ice}
              onChange={(e) => updateField("ice", e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-white px-3.5"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="identifiant-fiscal"
              className="text-[13px] text-slate-700"
            >
              Identifiant fiscal
            </Label>
            <Input
              id="identifiant-fiscal"
              value={formData.identifiantFiscal}
              onChange={(e) =>
                updateField("identifiantFiscal", e.target.value)
              }
              className="h-12 rounded-xl border-slate-200 bg-white px-3.5"
            />
          </div>

          <FileUploadField
            id="rib-societe"
            label="RIB société"
            file={formData.ribSociete}
            onChange={(e) =>
              updateField("ribSociete", e.target.files?.[0] ?? null)
            }
          />
          <FileUploadField
            id="piece-representant"
            label="Pièce d'identité du représentant légal"
            file={formData.pieceRepresentant}
            onChange={(e) =>
              updateField("pieceRepresentant", e.target.files?.[0] ?? null)
            }
          />
        </div>
      )}

      <Button
        type="button"
        onClick={onContinue}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </div>
  );
}
