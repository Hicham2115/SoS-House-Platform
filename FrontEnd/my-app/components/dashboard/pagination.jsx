import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("ellipsis-start");
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  ) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("ellipsis-end");
  pages.push(total);
  return pages;
}

export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="mt-2 flex items-center justify-center gap-1.5">
      <button
        type="button"
        aria-label="Page précédente"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pageNumbers.map((p, index) =>
        typeof p === "number" ? (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition ${
              p === page
                ? "bg-[#0b1730] text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        ) : (
          <span
            key={`${p}-${index}`}
            className="px-1 text-[13px] text-slate-400"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        aria-label="Page suivante"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
