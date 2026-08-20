import { BadgeCheck, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { statusStyles } from "@/lib/dashboard-data";

export function RequestCard({ request, onViewDetails }) {
  const {
    Icon,
    title,
    subtitle,
    meta,
    status,
    note,
    provider,
    action,
    secondaryAction,
  } = request;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[15px] font-bold text-slate-950">{title}</p>
          <span className="text-[12px] text-slate-500">{meta}</span>
        </div>
        <p className="mt-0.5 text-[13px] text-slate-600">{subtitle}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${statusStyles[status]}`}
          >
            {status}
          </span>
          {note && <span className="text-[13px] text-slate-600">{note}</span>}
          {provider && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-slate-800">
              <Avatar size="sm">
                {provider.avatar && (
                  <AvatarImage src={provider.avatar.src} alt={provider.name} />
                )}
                <AvatarFallback>{provider.initials}</AvatarFallback>
              </Avatar>
              {provider.name}
              <BadgeCheck className="size-4 text-teal-600" />
            </span>
          )}
        </div>
      </div>

      {(action || secondaryAction || onViewDetails) && (
        <div className="flex shrink-0 flex-wrap gap-2">
          {secondaryAction && (
            <Button
              variant="outline"
              className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              {secondaryAction}
            </Button>
          )}
          {action && (
            <Button
              variant="outline"
              className="h-9 rounded-lg border-teal-600 px-3.5 text-[13px] font-semibold text-teal-700 hover:bg-teal-50"
            >
              {action}
            </Button>
          )}
          {onViewDetails && (
            <Button
              variant="outline"
              onClick={onViewDetails}
              className="h-9 rounded-lg border-slate-200 px-3.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Eye className="size-4" />
              Détails
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
