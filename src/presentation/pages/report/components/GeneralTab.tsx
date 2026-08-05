import reportIcons from "@presentation/pages/report/components/icons";
import {
  ReportProfile,
  ReportTab,
} from "@presentation/pages/report/components/types";

interface GeneralTabProps {
  profile: ReportProfile;
  onNavigateTab: (tab: ReportTab) => void;
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ReportsBarChart() {
  const bars = [42, 68, 55, 80, 62];

  return (
    <svg
      viewBox="0 0 320 180"
      className="h-44 w-full max-w-md text-gray-900"
      aria-hidden
    >
      <line x1="28" y1="150" x2="300" y2="150" stroke="currentColor" />
      <line x1="28" y1="150" x2="28" y2="20" stroke="currentColor" />

      {bars.map((height, index) => {
        const x = 52 + index * 52;
        const barHeight = height * 1.2;

        return (
          <rect
            key={index}
            x={x}
            y={150 - barHeight}
            width="28"
            height={barHeight}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

function GeneralTab({ profile, onNavigateTab }: GeneralTabProps) {
  const today = formatLongDate(new Date());

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 bg-white">
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200">
        <section className="p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-gray-900">Reportes:</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Hasta el día de hoy {today} se han recibido:
          </p>

          <button
            type="button"
            onClick={() => onNavigateTab("Reportes")}
            className="mt-5 flex w-full items-center justify-between gap-4 text-left transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {reportIcons.reportAlert && (
                <img
                  src={reportIcons.reportAlert}
                  alt=""
                  aria-hidden
                  className="h-10 w-10 shrink-0"
                />
              )}
              <span className="text-2xl font-extrabold text-gray-900">
                {profile.reports} reportes
              </span>
            </div>
            {reportIcons.arrowRight && (
              <img
                src={reportIcons.arrowRight}
                alt=""
                aria-hidden
                className="h-5 w-5 shrink-0 text-gray-400"
              />
            )}
          </button>

          <p className="mt-4 text-xs text-gray-400">
            Los reportes han sido verificados por nuestro equipo.
          </p>
        </section>

        <section className="p-6 sm:p-8">
          <h2 className="text-lg font-extrabold text-gray-900">Contactos:</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Descubre los perfiles que utiliza esta{" "}
            <span className="font-extrabold text-gray-900">
              empresa/estafador
            </span>
            :
          </p>

          <button
            type="button"
            onClick={() => onNavigateTab("Contactos")}
            className="mt-5 flex w-full items-center justify-between gap-4 text-left transition-colors hover:bg-gray-50"
          >
            {reportIcons.contactsIllustration ? (
              <img
                src={reportIcons.contactsIllustration}
                alt=""
                aria-hidden
                className="h-28 w-auto max-w-full object-contain"
              />
            ) : (
              <div className="flex h-28 w-full max-w-xs items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-xs text-gray-400">
                Ilustración de contactos
              </div>
            )}
            {reportIcons.arrowRight && (
              <img
                src={reportIcons.arrowRight}
                alt=""
                aria-hidden
                className="h-5 w-5 shrink-0 text-gray-400"
              />
            )}
          </button>
        </section>
      </div>

      <section className="p-6 sm:p-8">
        <h2 className="text-lg font-extrabold text-gray-900">Diagrama:</h2>
        <div className="mt-4">
          <ReportsBarChart />
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Diagramas de barras de cantidad de reportes por mes del año{" "}
          {new Date().getFullYear()}
        </p>
      </section>
    </div>
  );
}

export default GeneralTab;
