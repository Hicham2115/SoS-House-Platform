"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Lock, Send, Wallet, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUnlockDemande } from "@/hooks/use-demande-unlock";
import { useCreateOffer } from "@/hooks/use-offers";

const offerSchema = z.object({
  price: z.coerce.number().int().min(1, "Indiquez un prix"),
  message: z.string().trim().max(1000).optional(),
});

export function UnlockDemandeDialog({ demande, open, onOpenChange }) {
  const [step, setStep] = useState("confirm");
  const unlockDemande = useUnlockDemande();
  const createOffer = useCreateOffer(demande?.id);

  const form = useForm({
    defaultValues: { price: "", message: "" },
    onSubmit: async ({ value }) => {
      const parsed = offerSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Prix invalide.");
        return;
      }

      try {
        await createOffer.mutateAsync(parsed.data);
        toast.success("Votre prix proposé a été envoyé au client.");
        form.reset();
        onOpenChange(false);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  function handleConfirmUnlock() {
    unlockDemande.mutate(demande.id, {
      onSuccess: () => setStep("offer"),
      onError: (error) => toast.error(error.message),
    });
  }

  if (!demande) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-lg gap-0 rounded-[28px] border-none bg-white p-8 text-center shadow-[0_30px_80px_rgba(120,80,10,0.22)] sm:max-w-lg"
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600"
        >
          <X className="size-4" />
        </button>

        {step === "confirm" ? (
          <>
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-amber-100/70">
              <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-500 text-slate-950 shadow-[0_10px_20px_rgba(217,158,21,0.35)]">
                <Lock className="size-6" strokeWidth={1.8} />
              </span>
            </div>

            <DialogTitle className="mt-5 text-[22px] font-extrabold text-slate-950">
              Débloquer cette demande ?
            </DialogTitle>

            <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-linear-to-r from-amber-300 to-amber-400" />

            <DialogDescription className="mt-4 text-[14px] leading-[1.6] text-slate-500">
              Vous pourrez ensuite proposer un prix au client. C&apos;est lui
              qui choisira l&apos;offre qui lui convient.
            </DialogDescription>

            <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-left">
              <Wallet className="mt-0.5 size-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-[13px] font-bold text-amber-700">
                  {demande.credits} crédits seront débités
                </p>
                <p className="mt-0.5 text-[13px] leading-[1.5] text-slate-600">
                  Le montant est débité une seule fois, dès le déblocage.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 items-stretch gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-auto min-h-12 rounded-xl border-slate-200 py-3 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                <X className="size-4 shrink-0" />
                Annuler
              </Button>
              <Button
                onClick={handleConfirmUnlock}
                disabled={unlockDemande.isPending}
                className="h-auto min-h-12 rounded-xl bg-[#ffa514] py-3 text-[14px] font-bold text-slate-950 hover:bg-[#ffaf2d]"
              >
                <Lock className="size-4 shrink-0" />
                {unlockDemande.isPending ? "Déblocage..." : "Débloquer"}
              </Button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-teal-100/70">
              <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-teal-600 to-teal-700 text-white shadow-[0_10px_20px_rgba(13,148,136,0.35)]">
                <Send className="size-6" strokeWidth={1.8} />
              </span>
            </div>

            <DialogTitle className="mt-5 text-[22px] font-extrabold text-slate-950">
              Proposez votre prix
            </DialogTitle>

            <DialogDescription className="mt-4 text-[14px] leading-[1.6] text-slate-500">
              Demande débloquée. Envoyez un prix suggéré, le client choisira
              parmi les offres reçues.
            </DialogDescription>

            <div className="mt-5 flex flex-col gap-4 text-left">
              <form.Field name="price">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="price" className="text-[13px] text-slate-700">
                      Prix proposé (MAD)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min={1}
                      placeholder="450"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50/70"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="message">
                {(field) => (
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="message"
                      className="text-[13px] text-slate-700"
                    >
                      Message (facultatif)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Précisez votre offre..."
                      className="min-h-24 rounded-xl border-slate-200 bg-slate-50/70"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>
            </div>

            <div className="mt-6 grid grid-cols-2 items-stretch gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-auto min-h-12 rounded-xl border-slate-200 py-3 text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                Plus tard
              </Button>
              <Button
                type="submit"
                disabled={createOffer.isPending}
                className="h-auto min-h-12 rounded-xl bg-teal-700 py-3 text-[14px] font-bold text-white hover:bg-teal-800"
              >
                <Send className="size-4 shrink-0" />
                {createOffer.isPending ? "Envoi..." : "Envoyer l'offre"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
