interface SummaryItemProps {
  label: string;
  value: string;
  tone?: "default" | "danger";
}

function SummaryItem({
  label,
  value,
  tone = "default",
}: SummaryItemProps) {
  return (
    <div className="min-w-0 border-b border-gray-100 pb-3 sm:border-b-0 sm:pb-0">
      {/* Reserve this row for the final icon from Figma. */}
      <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p
        className={`mt-1 truncate text-sm font-semibold ${
          tone === "danger" ? "text-red-600" : "text-gray-700"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default SummaryItem;
