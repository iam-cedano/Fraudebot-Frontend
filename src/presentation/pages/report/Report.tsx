import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "@presentation/shared/components/Footer";
import Header from "@presentation/shared/components/Header";
import ContactsTab from "@presentation/pages/report/components/ContactsTab";
import GeneralTab from "@presentation/pages/report/components/GeneralTab";
import PlaceholderTab from "@presentation/pages/report/components/PlaceholderTab";
import ReportHero, {
  ReportHeroSkeleton,
} from "@presentation/pages/report/components/ReportHero";
import ReportsTab from "@presentation/pages/report/components/ReportsTab";
import ReportTabNavigation from "@presentation/pages/report/components/ReportTabNavigation";
import { ReportTab } from "@presentation/pages/report/components/types";
import mockProfile from "@presentation/pages/report/mockProfile";
import defaultAvatar from "@presentation/assets/default-avatar.png";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerSummaryEntity from "@/core/domain/scammer/entities/scammer-summary.entity";
import OrganizationSummaryEntity from "@/core/domain/organization/entities/organization-summary.entity";

function GeneralPanelsSkeleton() {
  return (
    <div
      className="divide-y divide-gray-200 border border-gray-200 bg-white"
      aria-hidden
    >
      <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-gray-200">
        <div className="space-y-4 px-6 py-6 sm:px-8 sm:py-8">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full max-w-xs animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-40 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="space-y-4 px-6 py-6 sm:px-8 sm:py-8">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full max-w-sm animate-pulse rounded bg-gray-200" />
          <div className="mx-auto h-32 w-32 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-56 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

function Report({ type }: { type: "scammer" | "organization" }) {
  const { id } = useParams<{ id: string }>();
  const { findScammerSummaryByIdUseCase, findOrganizationSummaryByIdUseCase } =
    useDependencies();
  const [activeTab, setActiveTab] = useState<ReportTab>("General");

  const [party, setParty] = useState<
    ScammerSummaryEntity | OrganizationSummaryEntity | null
  >(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    if (type === "scammer") {
      findScammerSummaryByIdUseCase
        .execute(id)
        .then((scammer) => {
          setParty(scammer);
        })
        .catch(() => undefined);

      return () => {
        findScammerSummaryByIdUseCase.cancel();
      };
    }

    findOrganizationSummaryByIdUseCase
      .execute()
      .then((organization) => {
        setParty(organization);
      })
      .catch(() => undefined);

    return () => {
      findOrganizationSummaryByIdUseCase.cancel();
    };
  }, [findOrganizationSummaryByIdUseCase, findScammerSummaryByIdUseCase, id, type]);

  useEffect(() => {
    document.title = party
      ? `FraudeBot - ${party.name}`
      : "FraudeBot - Cargando...";
  }, [party]);

  return (
    <div className="font-[Nunito]">
      <Header />
      {party ? (
        <ReportHero
          id={party.id}
          name={party.name}
          type={type === "scammer" ? "Estafador" : "Empresa"}
          reportDate={party.createdAt}
          status={party.isActive ? "Activo" : "Inactivo"}
          reports={party.reports}
          location={party.country}
          categories={party.categories}
          profilePicture={
            type === "scammer"
              ? party.profilePicture ?? defaultAvatar
              : party.profilePicture
          }
        />
      ) : (
        <ReportHeroSkeleton type={type} />
      )}

      <main className="min-h-130 bg-white">
        <ReportTabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
          {party ? (
            <>
              {activeTab === "General" && (
                <GeneralTab
                  partyId={party.id}
                  partyType={type}
                  reports={party.reports}
                  onNavigateTab={setActiveTab}
                />
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
            </>
          ) : (
            activeTab === "General" && <GeneralPanelsSkeleton />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Report;
