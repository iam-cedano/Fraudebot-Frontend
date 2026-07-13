import { ReportProps } from "@/presentation/pages/search/components/types";

function Report({
  id,
  type,
  name,
  status,
  reports,
  organizations,
  tags,
}: ReportProps) {
  const isIndividual = type === "individual";
  const isActive = status === "active";

  return (
    <div className="flex flex-col gap-4 p-5 bg-white border border-gray-200 rounded-sm shadow-sm w-full font-sans">
      {/* Top Row */}
      <div className="flex items-center justify-between w-full flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* ID */}
          <span className="text-gray-500 font-medium text-lg">#{id} -</span>

          {/* Type Icon & Name */}
          <div className="flex items-center gap-1.5">
            {isIndividual ? (
              // User Icon
              <svg
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            ) : (
              // Company Icon
              <svg
                className="w-5 h-5 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            )}
            <h3 className="text-black font-bold text-lg leading-none">
              {name}
            </h3>
          </div>

          {/* Status Badge */}
          {isActive ? (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z" />
              </svg>
              Activo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-1 rounded">
              <svg
                className="w-3 h-3 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Inactivo
            </span>
          )}
        </div>

        {/* Reports Counter Badge */}
        <div className="flex items-center bg-red-600 text-white rounded-md px-2 py-1 font-bold text-xs shadow-sm">
          <span className="border border-white/40 rounded px-1 py-0.5 text-[10px] mr-1 font-medium leading-none">
            {reports}
          </span>
          <span>Reportes</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center gap-6 text-gray-500 text-sm font-medium flex-wrap">
        {/* Linked Company (Only if individual layout and data exists) */}
        {isIndividual && organizations && (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
            <span>{organizations.join(", ")}</span>
          </div>
        )}

        {/* Categories / Fraud Types */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>{tags.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Report;
