export function StepIntro({ icon: Icon, title, description }) {
  return (
    <div className="mt-5 flex items-start gap-3">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-[15px] font-bold text-slate-950">{title}</p>
        <p className="text-[13px] text-slate-500">{description}</p>
      </div>
    </div>
  );
}
