import { ChevronRight, TriangleAlert, UserRoundCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bannerCopy } from "@/lib/pro-onboarding-data";

const variants = {
  blocking: {
    wrapper: "border-amber-200 border-l-4 border-l-amber-500 bg-amber-50",
    iconWrapper: "bg-amber-500 text-white",
    Icon: TriangleAlert,
    barTrack: "bg-amber-100",
    barFill: "bg-amber-500",
    pctText: "text-amber-700",
  },
  optional: {
    wrapper: "border-teal-100 bg-teal-50",
    iconWrapper: "bg-teal-600 text-white",
    Icon: UserRoundCog,
    barTrack: "bg-teal-100",
    barFill: "bg-teal-600",
    pctText: "text-teal-700",
  },
  pending_review: {
    wrapper: "border-teal-100 bg-teal-50",
    iconWrapper: "bg-teal-600 text-white",
    Icon: UserRoundCog,
    barTrack: "bg-teal-100",
    barFill: "bg-teal-600",
    pctText: "text-teal-700",
  },
};

// TODO: replace `progress` (mock) with the real completion % returned by
// GET /api/provider/onboarding once the backend exists.
export function ProviderOnboardingBanner({ status, progress, onOpenModal }) {
  const variant = variants[status];
  const copy = bannerCopy[status];
  if (!variant || !copy) return null;

  return (
    <div className={`rounded-md border p-5 ${variant.wrapper}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={`flex size-11 shrink-0 items-center justify-center rounded-full ${variant.iconWrapper}`}
          >
            <variant.Icon className="size-5" strokeWidth={1.8} />
          </span>
          <div>
            <p className="text-[15px] font-bold text-slate-950">
              {copy.title}
            </p>
            <p className="mt-0.5 text-[13px] text-slate-600">
              {copy.subtitle}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div
                className={`h-1.5 w-40 overflow-hidden rounded-full sm:w-56 ${variant.barTrack}`}
              >
                <div
                  className={`h-full rounded-full ${variant.barFill}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={`text-[12px] font-semibold ${variant.pctText}`}>
                {progress}%
              </span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          onClick={onOpenModal}
          className="h-10 shrink-0 rounded-xl bg-[#0b1730] px-5 text-[13px] font-semibold text-white hover:bg-[#142248]"
        >
          Compléter mon profil
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
