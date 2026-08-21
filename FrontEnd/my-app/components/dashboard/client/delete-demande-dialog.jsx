"use client";

import { ShieldAlert, Trash2, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteDemandeDialog({ trigger, onConfirm, isDeleting }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={trigger} />
      <AlertDialogContent
        onClick={(e) => e.stopPropagation()}
        className="w-[calc(100%-2rem)] max-w-md gap-0 rounded-[28px] border-none bg-white p-8 text-center shadow-[0_30px_80px_rgba(12,55,55,0.22)]"
      >
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-100/70">
          <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.35)]">
            <Trash2 className="size-6" strokeWidth={1.8} />
          </span>
        </div>

        <AlertDialogTitle className="mt-5 text-[22px] font-extrabold text-slate-950">
          Supprimer cette demande ?
        </AlertDialogTitle>

        <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-linear-to-r from-red-300 to-red-400" />

        <AlertDialogDescription className="mt-4 text-[14px] leading-[1.6] text-slate-500">
          Cette action est définitive. Les prestataires ne pourront plus voir
          ni répondre à cette demande.
        </AlertDialogDescription>

        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-left">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-red-500" />
          <div>
            <p className="text-[13px] font-bold text-red-700">
              Action irréversible
            </p>
            <p className="mt-0.5 text-[13px] leading-[1.5] text-slate-600">
              Une fois supprimée, cette demande sera retirée de la plateforme
              pour tous les prestataires.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <AlertDialogCancel className="h-12 rounded-xl border-slate-200 text-[14px] font-semibold text-slate-700 hover:bg-slate-50">
            <X className="size-4" />
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-12 rounded-xl bg-red-600 text-[14px] font-bold text-white hover:bg-red-700"
          >
            <Trash2 className="size-4" />
            Supprimer définitivement
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
