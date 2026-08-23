interface ReportsTabProps {
  reportCount: number;
}

function ReportsTab({ reportCount }: ReportsTabProps) {
  return (
    <section
      role="tabpanel"
      id="report-panel-reportes"
      aria-labelledby="report-tab-reportes"
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
            Vista previa
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
            Historial de reportes
          </h2>
        </div>
        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-extrabold text-white">
          {reportCount} reportes
        </span>
      </div>
      <p className="mt-6 rounded-lg bg-gray-50 p-5 text-gray-600">
        Próximamente podrás consultar aquí el detalle de los reportes de la
        comunidad. El historial aún no está conectado a una fuente de datos.
      </p>
    </section>
  );
}

export default ReportsTab;
