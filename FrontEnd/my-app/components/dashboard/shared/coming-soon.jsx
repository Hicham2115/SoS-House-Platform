import { Hammer } from "lucide-react";

export function ComingSoon({ title }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50 p-8 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
        <Hammer className="size-6" strokeWidth={1.8} />
      </span>
      <p className="text-[16px] font-bold text-slate-950">{title}</p>
      <p className="max-w-sm text-[13px] text-slate-500">
        Cette section est en cours de construction et arrivera bientôt.
      </p>
    </div>
  );
}
