export interface Contact {
  label: string;
  value: string;
}

export interface ReportProfile {
  id: string;
  name: string;
  type: string;
  reportDate: string;
  status: string;
  reports: number;
  location: string;
  categories: string[];
  description: string;
  contacts: Contact[];
}

export const reportTabs = [
  "General",
  "Reportes",
  "Contactos",
  "Mapa",
  "Soporte",
] as const;

export type ReportTab = (typeof reportTabs)[number];
