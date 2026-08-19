import { CircleCheckBig } from "lucide-react";
import { StarRating } from "@/components/dashboard/star-rating";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { missionHistory } from "@/lib/dashboard-data";

export default function HistoriquePage() {
  return (
    <>
      <DashboardHeader
        title="Historique des missions"
        subtitle="Retrouvez toutes vos missions terminées."
      />

      <div className="flex flex-1 flex-col gap-3 bg-slate-50 p-5 sm:p-8">
        {missionHistory.map((mission) => (
          <div
            key={mission.title}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <CircleCheckBig className="size-5" strokeWidth={1.8} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-bold text-slate-950">
                  {mission.title}
                </p>
                <span className="text-[12px] text-slate-500">
                  {mission.date}
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-slate-600">
                {mission.subtitle} • {mission.provider}
              </p>
            </div>

            <StarRating rating={mission.rating} />
          </div>
        ))}
      </div>
    </>
  );
}
