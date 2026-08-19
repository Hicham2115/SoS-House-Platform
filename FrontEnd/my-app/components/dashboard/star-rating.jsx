import { Star } from "lucide-react";

export function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "size-4 fill-amber-400 text-amber-400"
              : "size-4 text-slate-200"
          }
        />
      ))}
    </div>
  );
}
