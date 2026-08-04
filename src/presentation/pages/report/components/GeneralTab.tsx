import { ReportProfile } from "@presentation/pages/report/components/types";

interface GeneralTabProps {
  profile: ReportProfile;
}

function GeneralTab({ profile }: GeneralTabProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600">
          Acerca del perfil
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
          Información general
        </h2>
        <p className="mt-4 leading-7 text-gray-600">{profile.description}</p>

        <div className="mt-7">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-500">
            Categorías reportadas
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <aside className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-xl font-extrabold text-gray-900">
          ¿Tienes información?
        </h2>
        <p className="mt-3 leading-6 text-gray-600">
          Ayuda a la comunidad agregando pruebas o información relacionada con
          este perfil.
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-red-700"
        >
          Agregar reporte
        </button>
      </aside>
    </div>
  );
}

export default GeneralTab;
