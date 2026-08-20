import { FileText, X } from "lucide-react";
import { FileUploadField } from "@/components/dashboard/pro/onboarding/file-upload-field";
import { Button } from "@/components/ui/button";

export function StepCompetence({ formData, updateField, onContinue, onSkip }) {
  function handleFilesChange(e) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    updateField("competenceFiles", [...formData.competenceFiles, ...files]);
  }

  function removeFile(index) {
    updateField(
      "competenceFiles",
      formData.competenceFiles.filter((_, i) => i !== index),
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13px] text-slate-500">
        Diplômes, attestations, portfolio — tout ce qui rassure vos futurs
        clients (optionnel).
      </p>

      <FileUploadField
        id="competence-files"
        label="Ajouter des fichiers"
        file={formData.competenceFiles}
        onChange={handleFilesChange}
        multiple
      />

      {formData.competenceFiles.length > 0 && (
        <ul className="flex flex-col gap-2">
          {formData.competenceFiles.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5"
            >
              <FileText className="size-4 shrink-0 text-slate-400" />
              <span className="min-w-0 flex-1 truncate text-[13px] text-slate-700">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label="Retirer le fichier"
                className="flex size-6 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-1 flex items-center gap-3">
        <Button
          type="button"
          onClick={onContinue}
          className="h-12 flex-1 justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
        >
          Continuer
        </Button>
        <button
          type="button"
          onClick={onSkip}
          className="shrink-0 text-[13px] font-semibold text-slate-500 hover:text-slate-800"
        >
          Passer cette étape →
        </button>
      </div>
    </div>
  );
}
