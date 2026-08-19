import { Headphones } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RequestCard } from "@/components/dashboard/request-card";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { reasons, requests, stats } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Bonjour, Hicham 👋"
        subtitle="Voici un aperçu de vos demandes et interventions."
      />

      <div className="flex flex-1 flex-col gap-6 bg-slate-50 p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ Icon, value, label, tone, progress }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-slate-500">
                  {label}
                </p>
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                    tone === "teal"
                      ? "bg-teal-50 text-teal-700"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                </span>
              </div>
              <p className="mt-4 text-[26px] font-bold text-slate-950">
                {value}
              </p>
              {progress != null && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      tone === "teal" ? "bg-teal-600" : "bg-amber-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-slate-950">
                  Demandes actives
                </h2>
                <span className="text-[13px] font-semibold text-teal-700">
                  Voir toutes (4) →
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {requests.map((request) => (
                  <RequestCard key={request.title} request={request} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold text-slate-950">
                  Historique des missions
                </h2>
                <span className="text-[13px] font-semibold text-teal-700">
                  Voir tout →
                </span>
              </div>

              <Accordion className="mt-4 rounded-2xl border border-slate-200 bg-white px-4">
                <AccordionItem value="history" className="border-b-0">
                  <AccordionTrigger className="text-[14px] text-slate-700">
                    Voir vos anciennes missions terminées
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    Aucune autre mission archivée pour le moment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-teal-600 p-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-teal-700">
                <Headphones className="size-5" strokeWidth={1.8} />
              </span>
              <p className="mt-3 text-[15px] font-bold text-white">
                Besoin d&apos;aide ?
              </p>
              <p className="mt-1 text-[13px] leading-[1.5] text-white">
                Notre équipe est disponible 7j/7 pour vous accompagner.
              </p>
              <Button
                variant="outline"
                className="mt-3 h-10 rounded-lg border-teal-600 px-4 text-[13px] font-semibold text-teal-700 hover:bg-white"
              >
                Contacter le support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
