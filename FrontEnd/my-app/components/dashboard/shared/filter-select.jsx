import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterSelect({
  icon: Icon,
  value,
  onValueChange,
  options,
  neutralValue = "all",
  className = "w-48",
}) {
  const isActive = value !== neutralValue;
  const selected = options.find((option) => option.value === value);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`h-11 ${className} rounded-full px-4 text-[13px] font-semibold transition ${
          isActive
            ? "border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-50"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
        }`}
      >
        {Icon && (
          <Icon
            className={`size-4 shrink-0 ${isActive ? "text-teal-600" : "text-slate-400"}`}
          />
        )}
        <SelectValue>{() => selected?.label ?? value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value: optionValue, label, icon: OptionIcon }) => (
          <SelectItem key={optionValue} value={optionValue}>
            {OptionIcon && (
              <OptionIcon className="size-4 shrink-0 text-slate-400" />
            )}
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
