import { Check } from "lucide-react";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTrigger,
} from "@/components/reui/stepper";

// Purely visual progress display, shared by every multi-step dashboard
// flow (profile onboarding, publier une demande). Navigation stays with
// the explicit Continuer/Retour buttons in whichever flow renders this.
export function StepProgress({ steps, activeStep }) {
  const activeIndex = steps.indexOf(activeStep);
  return (
    <Stepper
      value={activeIndex + 1}
      indicators={{ completed: <Check className="size-3.5" /> }}
      className="mt-5"
    >
      <StepperNav className="gap-2">
        {steps.map((step, index) => (
          <StepperItem key={step} step={index + 1} className="flex-1 items-center">
            <StepperTrigger className="cursor-default">
              <StepperIndicator className="size-6 text-[11px] font-bold data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-slate-400 data-[state=active]:bg-teal-100 data-[state=active]:text-teal-700 data-[state=active]:ring-2 data-[state=active]:ring-teal-600 data-[state=completed]:bg-teal-600 data-[state=completed]:text-white">
                {index + 1}
              </StepperIndicator>
            </StepperTrigger>
            {index < steps.length - 1 && (
              <StepperSeparator className="data-[state=completed]:bg-teal-600" />
            )}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}
