import { ReportProfile } from "@presentation/pages/report/components/types";

const mockProfile: ReportProfile = {
  id: "10000000",
  name: "Nomad Store",
  type: "Empresa",
  reportDate: "19/02/2025",
  status: "Activo",
  reports: 50,
  location: "México, Peru",
  categories: ["Estafas con Pacas de Ropa"],
  description:
    "Tienda reportada por ofrecer productos mediante redes sociales y no completar las entregas después de recibir el pago.",
  contacts: [
    { label: "Instagram", value: "@nomad.store" },
    { label: "WhatsApp", value: "+52 55 0000 0000" },
    { label: "Correo", value: "ventas@nomad-store.example" },
  ],
};

export default mockProfile;
