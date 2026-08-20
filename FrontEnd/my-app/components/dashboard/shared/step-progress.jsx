import { Check } from "lucide-react";

// Purely visual progress display, shared by every multi-step dashboard
// flow (profile onboarding, publier une demande). Navigation stays with
// the explicit Continuer/Retour buttons in whichever flow renders this.
export function StepProgress({ steps, activeStep, stepLabels }) {
  const activeIndex = steps.indexOf(activeStep);

  return (
    <div className="mt-5 flex items-start">
      {steps.map((step, index) => {
        const state =
          index < activeIndex
            ? "completed"
            : index === activeIndex
              ? "active"
              : "inactive";
        const isLast = index === steps.length - 1;

        return (
          <div
            key={step}
            className={`flex items-center ${isLast ? "" : "flex-1"}`}
          >
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-[14px] font-bold ${
                  state === "completed"
                    ? "border-teal-600 bg-teal-600 text-white"
                    : state === "active"
                      ? "border-teal-600 bg-white text-teal-700"
                      : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {state === "completed" ? (
                  <Check className="size-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`w-max max-w-24 text-center text-[12px] font-semibold ${
                  state === "inactive" ? "text-slate-400" : "text-teal-700"
                }`}
              >
                {stepLabels[step]}
              </span>
            </div>

            {!isLast && (
              <div
                className={`mt-5 h-0.5 flex-1 rounded-full ${
                  index < activeIndex ? "bg-teal-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
