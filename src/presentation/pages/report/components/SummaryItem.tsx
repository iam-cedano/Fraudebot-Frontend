interface SummaryItemProps {
  label: string;
  value: string;
  iconSrc?: string;
  valueIconSrc?: string;
  tone?: "default" | "danger";
}

function SummaryItem({
  label,
  value,
  iconSrc = "",
  valueIconSrc = "",
  tone = "default",
}: SummaryItemProps) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        {iconSrc && (
          <img src={iconSrc} alt="" aria-hidden className="h-4 w-4 shrink-0" />
        )}
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
          {label}
        </p>
      </div>
      <div className="mt-1 flex items-center gap-1.5">
        {valueIconSrc && (
          <img
            src={valueIconSrc}
            alt=""
            aria-hidden
            className="h-4 w-4 shrink-0"
          />
        )}
        <p
          className={`truncate text-base font-semibold ${
            tone === "danger" ? "text-red-600" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default SummaryItem;
