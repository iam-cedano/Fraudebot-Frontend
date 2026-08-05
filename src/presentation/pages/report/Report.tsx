import { useState, useEffect } from "react";
import Footer from "@presentation/shared/components/Footer";
import Header from "@presentation/shared/components/Header";
import ContactsTab from "@presentation/pages/report/components/ContactsTab";
import GeneralTab from "@presentation/pages/report/components/GeneralTab";
import PlaceholderTab from "@presentation/pages/report/components/PlaceholderTab";
import ReportHero from "@presentation/pages/report/components/ReportHero";
import ReportsTab from "@presentation/pages/report/components/ReportsTab";
import ReportTabNavigation from "@presentation/pages/report/components/ReportTabNavigation";
import { ReportTab } from "@presentation/pages/report/components/types";
import mockProfile from "@presentation/pages/report/mockProfile";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";
import OrganizationSummaryEntity from "@/core/domain/organization/entities/organization-summary.entity";

function formatPartyType(
  type: "scammer" | "organization",
  entity: ScammerSummaryEntity | OrganizationSummaryEntity,
) {
  if (entity instanceof ScammerSummaryEntity || type === "scammer") {
    return "Estafador";
  }

  return "Empresa";
}

function Report({ type }: { type: "scammer" | "organization" }) {
  const { findScammerSummaryByIdUseCase, findOrganizationSummaryByIdUseCase } =
    useDependencies();
  const [activeTab, setActiveTab] = useState<ReportTab>("General");

  const [party, setParty] = useState<
    ScammerSummaryEntity | OrganizationSummaryEntity | null
  >(null);

  useEffect(() => {
    if (type === "scammer") {
      findScammerSummaryByIdUseCase.execute().then((scammer) => {
        setParty(scammer);
      });
    } else {
      findOrganizationSummaryByIdUseCase.execute().then((organization) => {
        setParty(organization);
      });
    }
  }, [findOrganizationSummaryByIdUseCase, findScammerSummaryByIdUseCase, type]);

  if (!party) {
    return <div>Loading...</div>;
  }

  const profile = {
    ...mockProfile,
    id: party.id,
    name: party.name,
    reports: party.reports,
    location: party.country,
    categories: party.categories,
    type: formatPartyType(type, party),
    status: party.isActive ? "Activo" : "Inactivo",
    reportDate: party.createdAt.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  };

  return (
    <>
      <title>FraudeBot - {party.name}</title>

      <div className="font-[Nunito]">
        <Header />
        <ReportHero
          id={party.id}
          name={party.name}
          type={formatPartyType(type, party)}
          reportDate={party.createdAt}
          status={party.isActive ? "Activo" : "Inactivo"}
          reports={party.reports}
          location={party.country}
          categories={party.categories}
          profilePicture={party.profilePicture}
        />

        <main className="min-h-[520px] bg-white">
          <ReportTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
            {activeTab === "General" && (
              <GeneralTab profile={profile} onNavigateTab={setActiveTab} />
            )}
            {activeTab === "Reportes" && (
              <ReportsTab reportCount={party.reports} />
            )}
            {activeTab === "Contactos" && (
              <ContactsTab contacts={mockProfile.contacts} />
            )}
            {(activeTab === "Mapa" || activeTab === "Soporte") && (
              <PlaceholderTab tab={activeTab} />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Report;
