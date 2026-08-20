import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import { statusStyles } from "@/lib/dashboard-data";

export function RequestCard({ demande, icon: Icon, title, onViewDetails }) {
  const budget =
    demande.budget_min && demande.budget_max
      ? `${demande.budget_min} - ${demande.budget_max} MAD`
      : null;

  return (
    <button
      type="button"
      onClick={onViewDetails}
      className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-teal-200 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-slate-950">{title}</p>
        {demande.ville && (
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-slate-500">
            <MapPin className="size-3.5 shrink-0" />
            {demande.ville}
          </p>
        )}
        <span
          className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles["En attente de réponses"]}`}
        >
          En attente de réponses
        </span>
      </div>

      {budget && (
        <div className="hidden shrink-0 flex-col items-end gap-1.5 text-right sm:flex">
          <p className="text-[12px] text-slate-500">Budget indicatif</p>
          <p className="text-[14px] font-bold text-slate-950">{budget}</p>
          <p className="flex items-center gap-1.5 text-[12px] text-slate-500">
            <CalendarDays className="size-3.5" />
            Publiée le{" "}
            {format(new Date(demande.created_at), "dd/MM/yyyy", {
              locale: fr,
            })}
          </p>
        </div>
      )}

      <ChevronRight className="size-5 shrink-0 text-slate-300" />
    </button>
  );
}
