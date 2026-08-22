"use client";

import { useState } from "react";
import { Camera, FileText, GraduationCap, Images, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { FileUploadField } from "@/components/dashboard/pro/onboarding/file-upload-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/services-catalog";
import {
  useCreateCertification,
  useCreateRealisation,
  useCreateTravauxPhoto,
  useDeleteCertification,
  useDeleteRealisation,
  useDeleteTravauxPhoto,
} from "@/hooks/use-provider-portfolio";

function SectionHeading({ Icon, title, description }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-4" strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-[14px] font-bold text-slate-950">{title}</p>
        <p className="text-[12px] leading-[1.5] text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SavedItem({ label, onRemove, isPending }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
      <FileText className="size-4 shrink-0 text-slate-400" />
      <span className="min-w-0 flex-1 truncate text-[13px] text-slate-700">
        {label}
      </span>
      <button
        type="button"
        onClick={onRemove}
        disabled={isPending}
        aria-label="Supprimer"
        className="flex size-6 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 disabled:opacity-50"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

const emptyCertification = { title: "", file: null, organisme: "" };
const emptyRealisation = {
  photoAvant: null,
  photoApres: null,
  description: "",
  categorie: "",
};
const emptyTravauxPhoto = { photo: null, legende: "" };

export function StepPortfolio({ portfolio, onContinue, onSkip }) {
  const [certDraft, setCertDraft] = useState(emptyCertification);
  const [realDraft, setRealDraft] = useState(emptyRealisation);
  const [photoDraft, setPhotoDraft] = useState(emptyTravauxPhoto);

  const createCertification = useCreateCertification();
  const deleteCertification = useDeleteCertification();
  const createRealisation = useCreateRealisation();
  const deleteRealisation = useDeleteRealisation();
  const createTravauxPhoto = useCreateTravauxPhoto();
  const deleteTravauxPhoto = useDeleteTravauxPhoto();

  function submitCertification() {
    if (!certDraft.title.trim() || !certDraft.file) {
      toast.error("Ajoutez un titre et un fichier.");
      return;
    }
    const formData = new FormData();
    formData.append("title", certDraft.title);
    formData.append("file", certDraft.file);
    if (certDraft.organisme) formData.append("organisme", certDraft.organisme);
    createCertification.mutate(formData, {
      onSuccess: () => setCertDraft(emptyCertification),
      onError: () => toast.error("Impossible d'ajouter ce document."),
    });
  }

  function submitRealisation() {
    if (!realDraft.photoAvant || !realDraft.photoApres) {
      toast.error("Ajoutez une photo avant et une photo après.");
      return;
    }
    const formData = new FormData();
    formData.append("photo_avant", realDraft.photoAvant);
    formData.append("photo_apres", realDraft.photoApres);
    if (realDraft.description)
      formData.append("description", realDraft.description);
    if (realDraft.categorie) formData.append("categorie", realDraft.categorie);
    createRealisation.mutate(formData, {
      onSuccess: () => setRealDraft(emptyRealisation),
      onError: () => toast.error("Impossible d'ajouter cette réalisation."),
    });
  }

  function submitTravauxPhoto() {
    if (!photoDraft.photo) {
      toast.error("Choisissez une photo.");
      return;
    }
    const formData = new FormData();
    formData.append("photo", photoDraft.photo);
    if (photoDraft.legende) formData.append("legende", photoDraft.legende);
    createTravauxPhoto.mutate(formData, {
      onSuccess: () => setPhotoDraft(emptyTravauxPhoto),
      onError: () => toast.error("Impossible d'ajouter cette photo."),
    });
  }

  const certifications = portfolio?.certifications ?? [];
  const realisations = portfolio?.realisations ?? [];
  const travauxPhotos = portfolio?.travaux_photos ?? [];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[13px] text-slate-500">
        Tout ce qui rassure vos futurs clients — cette étape est optionnelle,
        vous pourrez la compléter plus tard.
      </p>

      {/* Certifications / diplômes */}
      <div className="flex flex-col gap-3">
        <SectionHeading
          Icon={GraduationCap}
          title="Certifications / diplômes"
          description="Vos attestations et diplômes professionnels."
        />

        {certifications.map((cert) => (
          <SavedItem
            key={cert.id}
            label={cert.title}
            onRemove={() => deleteCertification.mutate(cert.id)}
            isPending={deleteCertification.isPending}
          />
        ))}

        <div className="flex flex-col gap-2.5 rounded-md border border-dashed border-slate-300 p-3.5">
          <Input
            placeholder='Titre du document (ex : "Certificat CAP Plomberie")'
            value={certDraft.title}
            onChange={(e) =>
              setCertDraft((d) => ({ ...d, title: e.target.value }))
            }
            className="h-11 rounded-xl border-slate-200 bg-white px-3.5"
          />
          <FileUploadField
            id="new-certification-file"
            label="Fichier (PDF ou photo)"
            file={certDraft.file}
            onChange={(e) =>
              setCertDraft((d) => ({
                ...d,
                file: e.target.files?.[0] ?? null,
              }))
            }
          />
          <Input
            placeholder="Organisme émetteur (optionnel)"
            value={certDraft.organisme}
            onChange={(e) =>
              setCertDraft((d) => ({ ...d, organisme: e.target.value }))
            }
            className="h-11 rounded-xl border-slate-200 bg-white px-3.5"
          />
          <button
            type="button"
            onClick={submitCertification}
            disabled={createCertification.isPending}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="size-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Réalisations avant/après */}
      <div className="flex flex-col gap-3">
        <SectionHeading
          Icon={Images}
          title="Réalisations avant/après"
          description="Montrez la transformation d'un chantier."
        />

        {realisations.map((r) => (
          <SavedItem
            key={r.id}
            label={r.description || "Réalisation"}
            onRemove={() => deleteRealisation.mutate(r.id)}
            isPending={deleteRealisation.isPending}
          />
        ))}

        <div className="flex flex-col gap-2.5 rounded-md border border-dashed border-slate-300 p-3.5">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <FileUploadField
              id="new-realisation-avant"
              label="Photo avant"
              file={realDraft.photoAvant}
              onChange={(e) =>
                setRealDraft((d) => ({
                  ...d,
                  photoAvant: e.target.files?.[0] ?? null,
                }))
              }
            />
            <FileUploadField
              id="new-realisation-apres"
              label="Photo après"
              file={realDraft.photoApres}
              onChange={(e) =>
                setRealDraft((d) => ({
                  ...d,
                  photoApres: e.target.files?.[0] ?? null,
                }))
              }
            />
          </div>

          <Input
            placeholder='Courte description (ex : "Rénovation salle de bain, Casablanca")'
            value={realDraft.description}
            onChange={(e) =>
              setRealDraft((d) => ({ ...d, description: e.target.value }))
            }
            className="h-11 rounded-xl border-slate-200 bg-white px-3.5"
          />

          <div className="flex flex-col gap-1.5">
            <Label className="text-[12px] text-slate-600">
              Catégorie concernée
            </Label>
            <Select
              value={realDraft.categorie}
              onValueChange={(value) =>
                setRealDraft((d) => ({ ...d, categorie: value }))
              }
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-white px-3">
                <SelectValue placeholder="Choisissez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={submitRealisation}
            disabled={createRealisation.isPending}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="size-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Photos de travaux */}
      <div className="flex flex-col gap-3">
        <SectionHeading
          Icon={Camera}
          title="Photos de travaux"
          description="Des exemples de votre travail au quotidien."
        />

        {travauxPhotos.map((p) => (
          <SavedItem
            key={p.id}
            label={p.legende || "Photo"}
            onRemove={() => deleteTravauxPhoto.mutate(p.id)}
            isPending={deleteTravauxPhoto.isPending}
          />
        ))}

        <div className="flex flex-col gap-2.5 rounded-md border border-dashed border-slate-300 p-3.5">
          <FileUploadField
            id="new-travaux-photo"
            label="Photo"
            file={photoDraft.photo}
            onChange={(e) =>
              setPhotoDraft((d) => ({
                ...d,
                photo: e.target.files?.[0] ?? null,
              }))
            }
          />
          <Input
            placeholder="Légende courte (optionnel)"
            value={photoDraft.legende}
            onChange={(e) =>
              setPhotoDraft((d) => ({ ...d, legende: e.target.value }))
            }
            className="h-11 rounded-xl border-slate-200 bg-white px-3.5"
          />
          <button
            type="button"
            onClick={submitTravauxPhoto}
            disabled={createTravauxPhoto.isPending}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="size-4" />
            Ajouter
          </button>
        </div>
      </div>

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
