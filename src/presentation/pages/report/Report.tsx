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

function Report({ type }: { type: "scammer" | "organization" }) {
  const { findScammerSummaryByIdUseCase, findOrganizationSummaryByIdUseCase } = useDependencies();
  const [activeTab, setActiveTab] = useState<ReportTab>("General");

  const [party, setParty] = useState<ScammerSummaryEntity | OrganizationSummaryEntity | null>(null);

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
  }, []);

  if (!party) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <title>FraudeBot - {mockProfile.name}</title>

      <div className="font-[Nunito]">
        <Header />
        <ReportHero 
          id={party.id} 
          name={party.name} 
          type={party instanceof ScammerSummaryEntity ? "Scammer" : "Organization"} 
          reportDate={party.createdAt} 
          status="Active" 
          reports={party.reports} 
          location={party.country} 
          categories={party.categories} 
        />

        <main className="min-h-[520px] bg-white">
          <ReportTabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
            {activeTab === "General" && <GeneralTab profile={mockProfile} />}
            {activeTab === "Reportes" && (
              <ReportsTab reportCount={mockProfile.reports} />
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
