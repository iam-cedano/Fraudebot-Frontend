interface PlaceholderTabProps {
  tab: "Soporte";
}

function PlaceholderTab({ tab }: PlaceholderTabProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-extrabold text-gray-900">{tab}</h2>
      <p className="mt-3 text-gray-600">
        Esta sección está lista para recibir el contenido definitivo.
      </p>
    </section>
  );
}

export default PlaceholderTab;
