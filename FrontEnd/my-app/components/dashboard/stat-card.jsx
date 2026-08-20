import { Star } from "lucide-react";

const toneStyles = {
  blue: "bg-teal-50 text-teal-700",
  green: "bg-green-50 text-green-600",
  purple: "bg-violet-50 text-violet-600",
  orange: "bg-amber-50 text-amber-600",
};

const captionStyles = {
  blue: "text-teal-700",
  green: "text-green-600",
  gray: "text-slate-500",
};

export function StatCard({
  icon: Icon,
  value,
  label,
  tone,
  progress,
  rating,
  caption,
  captionTone,
  captionIcon: CaptionIcon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-4">
        <span
          className={`flex size-14 shrink-0 items-center justify-center rounded-full ${toneStyles[tone]}`}
        >
          <Icon className="size-7" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-[26px] font-bold text-slate-950">{value}</p>
        </div>
      </div>
      {rating != null && (
        <div className="mt-3 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`size-3.5 ${
                index < Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
        </div>
      )}
      {caption && (
        <p
          className={`mt-2 flex items-center gap-1 text-[12px] font-semibold ${captionStyles[captionTone]}`}
        >
          {CaptionIcon && <CaptionIcon className="size-3.5" />}
          {caption}
        </p>
      )}
      {progress != null && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
