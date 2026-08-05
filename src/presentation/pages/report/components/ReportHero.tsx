import heroRedBackground from "@presentation/assets/hero-red.webp";
import placeholderImage from "@presentation/assets/placeholder.webp";
import SummaryItem from "@presentation/pages/report/components/SummaryItem";
import reportIcons from "@presentation/pages/report/components/icons";
import { ReportHeroProps } from "@presentation/pages/report/components/types";
import DropdownButton from "@presentation/shared/components/DropdownButton";
import { DropdownOption } from "@presentation/shared/components/types";

function ReportHero({
  id,
  name,
  type,
  reportDate,
  status,
  reports,
  location,
  categories,
  profilePicture,
}: ReportHeroProps) {
  const formattedDate = reportDate.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const shareOptions: DropdownOption[] = [
    {
      id: "pdf",
      label: "Descargar PDF",
      onClick: () => {
        alert("Descargando PDF");
      },
    }
  ];

  return (
    <section
      className="bg-cover bg-center px-4 pb-10 pt-28 sm:pb-12 sm:pt-32"
      style={{ backgroundImage: `url(${heroRedBackground})` }}
    >
      <article className="mx-auto max-w-5xl rounded-2xl bg-white p-5 shadow-xl sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row">
          <img
            src={profilePicture ?? placeholderImage}
            alt={name}
            className="h-28 w-28 shrink-0 rounded-2xl border border-gray-100 object-cover sm:h-32 sm:w-32"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">
                    {name}
                  </h1>
                  {reportIcons.warning && (
                    <img
                      src={reportIcons.warning}
                      alt=""
                      aria-hidden
                      className="h-6 w-6"
                    />
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  ID: {id} | {type}
                </p>
              </div>

              <DropdownButton
                label="Compartir"
                options={shareOptions}
                iconSrc={reportIcons.shareArrow}
              />
            </div>

            <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryItem
                label="Fecha del Reporte"
                value={formattedDate}
                iconSrc={reportIcons.calendar}
              />
              <SummaryItem
                label="Estado"
                value={status}
                iconSrc={reportIcons.status}
                valueIconSrc={reportIcons.warning}
              />
              <SummaryItem
                label="Reportes"
                value={String(reports)}
                iconSrc={reportIcons.reports}
                tone="danger"
              />
              <SummaryItem
                label="Ubicación"
                value={location}
                iconSrc={reportIcons.location}
              />
            </div>

            <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4 lg:flex-row lg:items-end lg:justify-between">
              <SummaryItem
                label="Categorías"
                value={categories.join(", ")}
                iconSrc={reportIcons.categories}
              />

              <div className="flex shrink-0 gap-2 self-end">
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
