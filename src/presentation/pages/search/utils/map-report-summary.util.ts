import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import { ReportProfile } from "@/presentation/pages/report/components/types";
import mockProfile from "@/presentation/pages/report/mockProfile";

function formatPartyType(type: "scammer" | "organization") {
  return type === "scammer" ? "Estafador" : "Empresa";
}

function getLocation(report: ReportSummaryEntity) {
  if (report.organizations && report.organizations.length > 0) {
    return report.organizations.join(", ");
  }

  if (report.products.length > 0) {
    return report.products.join(", ");
  }

  return "—";
}

function getCategories(report: ReportSummaryEntity) {
  if (report.tags.length > 0) {
    return report.tags;
  }

  return report.products;
}

export function toReportProfile(report: ReportSummaryEntity): ReportProfile {
  return {
    ...mockProfile,
    id: report.id,
    name: report.name,
    type: formatPartyType(report.type),
    status: report.status === "active" ? "Activo" : "Inactivo",
    reports: report.reports,
    location: getLocation(report),
    categories: getCategories(report),
    reportDate: new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };
}

export function toHeroProps(report: ReportSummaryEntity) {
  return {
    id: report.id,
    name: report.name,
    type: formatPartyType(report.type),
    reportDate: new Date(),
    status: report.status === "active" ? "Activo" : "Inactivo",
    reports: report.reports,
    location: getLocation(report),
    categories: getCategories(report),
    profilePicture: null,
  };
}
