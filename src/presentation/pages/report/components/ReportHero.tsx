import SummaryItem from "@presentation/pages/report/components/SummaryItem";
import { ReportHeroProps } from "@presentation/pages/report/components/types";

function ReportHero({
  id,
  name,
  type,
  reportDate,
  status,
  reports,
  location,
  categories,
}: ReportHeroProps) {
  return (
    /* Replace this color with the final red background image from Figma. */
    <section className="bg-[#c5221f] px-4 pb-10 pt-28 sm:pb-12 sm:pt-32">
      <article className="mx-auto max-w-4xl rounded-xl bg-white p-5 shadow-xl sm:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          {/* Replace this placeholder with the profile image/icon. */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-gray-100 bg-gray-200 text-2xl font-black text-gray-500">
            NS
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                    {name}
                  </h1>
                  <span className="rounded bg-amber-100 px-2 py-1 text-xs font-extrabold text-amber-800">
                    Precaución
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  ID: {id} | {type}
                </p>
              </div>

              <button
                type="button"
                className="rounded-md bg-sky-500 px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-sky-600"
              >
                Compartir
              </button>
            </div>

            <div className="mt-5 grid gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryItem
                label="Fecha del reporte"
                value={reportDate.toLocaleDateString()}
              />
              <SummaryItem label="Estado" value={status} />
              <SummaryItem
                label="Reportes"
                value={String(reports)}
                tone="danger"
              />
              <SummaryItem label="Ubicación" value={location} />
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-end sm:justify-between">
              <SummaryItem
                label="Categorías"
                value={categories.join(", ")}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 px-5 py-2 text-xs font-extrabold text-gray-700 hover:bg-gray-50"
                >
                  Ayuda
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-5 py-2 text-xs font-extrabold text-white hover:bg-red-700"
                >
                  Reportar
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ReportHero;
