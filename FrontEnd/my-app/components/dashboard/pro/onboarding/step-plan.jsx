import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { planOptions } from "@/lib/pro-onboarding-data";

export function StepPlan({ formData, updateField, onContinue }) {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={formData.plan}
        onValueChange={(value) => updateField("plan", value)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {planOptions.map((plan) => {
          const selected = formData.plan === plan.value;
          return (
            <label
              key={plan.value}
              htmlFor={`plan-${plan.value}`}
              className={`relative flex cursor-pointer flex-col gap-2.5 rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(12,55,55,0.08)] ${
                selected
                  ? "border-teal-600 bg-teal-50/60"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-4 rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-slate-950">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-slate-950">
                  {plan.name}
                </span>
                <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
              </div>
              <p className="text-[13px] font-semibold text-teal-700">
                {plan.price}
              </p>
              <ul className="flex flex-col gap-1.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-1.5 text-[12px] leading-[1.5] text-slate-600"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-teal-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </label>
          );
        })}
      </RadioGroup>

      <Button
        type="button"
        onClick={onContinue}
        className="mt-1 h-12 w-full justify-center rounded-xl bg-[#0b1730] text-[14px] font-semibold text-white hover:bg-[#142248]"
      >
        Continuer
      </Button>
    </div>
  );
}
