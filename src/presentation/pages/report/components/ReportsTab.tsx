interface ReportsTabProps {
  reportCount: number;
}

function ReportsTab({ reportCount }: ReportsTabProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
            Historial
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
            Reportes de la comunidad
          </h2>
        </div>
        <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-extrabold text-white">
          {reportCount} reportes
        </span>
      </div>
      <p className="mt-6 rounded-lg bg-gray-50 p-5 text-gray-600">
        Los reportes se mostrarán aquí cuando la página se conecte a la fuente
        de datos.
      </p>
    </section>
  );
}

export default ReportsTab;
