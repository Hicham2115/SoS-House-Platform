"use client";

import { useForm } from "@tanstack/react-form";
import {
  Clock,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { api } from "@/lib/axios";
import { faqs } from "@/lib/dashboard-data";

const inputGroupClassName =
  "h-12 rounded-xl border-slate-200 bg-slate-50/70 px-1 has-[[data-slot=input-group-control]:focus-visible]:border-teal-600 has-[[data-slot=input-group-control]:focus-visible]:ring-teal-600/15";

const subjects = [
  { value: "generale", label: "Question générale" },
  { value: "demande", label: "Problème avec une demande" },
  { value: "facturation", label: "Facturation" },
  { value: "signalement", label: "Signaler un problème" },
  { value: "autre", label: "Autre" },
];

const contactChannels = [
  { Icon: Mail, label: "support@soshouse.ma" },
  { Icon: Phone, label: "05 22 00 00 00" },
  { Icon: Clock, label: "Disponible 7j/7, 8h-22h" },
];

const contactSchema = z.object({
  subject: z.string().min(1, "Choisissez un sujet"),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères")
    .max(1000),
});

export default function AidePage() {
  const form = useForm({
    defaultValues: { subject: "", message: "" },
    onSubmit: async ({ value }) => {
      const parsed = contactSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(
          parsed.error.issues[0]?.message ?? "Veuillez vérifier les champs.",
        );
        return;
      }

      try {
        await api.post("/contacts", parsed.data);
        toast.success("Votre message a été envoyé au support.");
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Impossible d'envoyer votre message. Veuillez réessayer.");
      }
    },
  });

  return (
    <>
      <DashboardHeader
        title="Aide et support"
        subtitle="Trouvez une réponse ou contactez notre équipe."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <form
            className="order-2 flex flex-col gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] lg:order-1"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <MessageCircle className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-[15px] font-bold text-slate-950">
                  Envoyer un message
                </p>
                <p className="text-[12px] text-slate-500">
                  Réponse sous 24h ouvrées
                </p>
              </div>
            </div>

            <form.Field name="subject">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="subject"
                    className="text-[13px] text-slate-700"
                  >
                    Sujet
                  </Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger
                      id="subject"
                      className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 px-3 data-[state=open]:border-teal-600"
                    >
                      <span className="flex flex-1 items-center gap-2.5 overflow-hidden">
                        <Tag className="size-4 shrink-0 text-slate-500" />
                        <SelectValue placeholder="Choisissez un sujet" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    Message
                  </Label>
                  <InputGroup className={`${inputGroupClassName} h-auto`}>
                    <InputGroupTextarea
                      id="message"
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-40 py-3"
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
              className="mt-1 h-12 w-full justify-center gap-2 rounded-xl bg-[#0b1730] text-[14px] font-bold text-white shadow-[0_13px_25px_rgba(11,23,48,0.25)] transition hover:-translate-y-0.5 hover:bg-[#142248]"
            >
              <Send className="size-4" />
              Envoyer le message
            </Button>
          </form>

          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div className="relative overflow-hidden rounded-md bg-linear-to-br from-teal-600 to-teal-700 p-6 shadow-[0_20px_40px_rgba(13,148,136,0.25)]">
              <span className="absolute -top-8 -right-8 size-32 rounded-full bg-white/10" />
              <span className="absolute -bottom-10 right-16 size-24 rounded-full bg-white/10" />

              <div className="relative flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-teal-700">
                  <LifeBuoy className="size-6" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[17px] font-bold text-white">
                    Besoin d&apos;aide ?
                  </p>
                  <p className="text-[13px] text-white/85">
                    Notre équipe est disponible 7j/7 pour vous accompagner.
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {contactChannels.map(({ Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm"
                  >
                    <Icon className="size-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white px-4">
              <p className="px-1 pt-4 text-[15px] font-bold text-slate-950">
                Questions fréquentes
              </p>
              <Accordion>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="text-[14px] text-slate-800">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
