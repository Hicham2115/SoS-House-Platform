import { Check, Upload } from "lucide-react";

// Local-state-only file picker — no upload logic yet.
// TODO: wire to real multipart upload once the backend endpoint exists.
export function FileUploadField({
  id,
  label,
  file,
  onChange,
  accept = "image/*,.pdf",
  multiple = false,
}) {
  const hasFile = multiple ? file?.length > 0 : Boolean(file);
  const fileText = multiple
    ? `${file.length} fichier(s) sélectionné(s)`
    : file?.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-semibold text-slate-700"
      >
        {label}
      </label>
      <label
        htmlFor={id}
        className={`flex h-12 cursor-pointer items-center gap-2.5 rounded-xl border border-dashed px-3.5 text-[13px] transition ${
          hasFile
            ? "border-teal-300 bg-teal-50/60 text-teal-700"
            : "border-slate-300 bg-slate-50/70 text-slate-500 hover:bg-slate-100"
        }`}
      >
        {hasFile ? (
          <Check className="size-4 shrink-0" />
        ) : (
          <Upload className="size-4 shrink-0" />
        )}
        <span className="truncate">
          {hasFile ? fileText : "Choisir un fichier"}
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
