import { useState } from "react";
import Footer from "@presentation/shared/components/Footer";
import Header from "@presentation/shared/components/Header";
import ContactsTab from "./components/ContactsTab";
import GeneralTab from "./components/GeneralTab";
import PlaceholderTab from "./components/PlaceholderTab";
import ProfileHero from "./components/ProfileHero";
import ReportsTab from "./components/ReportsTab";
import ReportTabNavigation from "./components/ReportTabNavigation";
import { ReportTab } from "./components/types";
import mockProfile from "./mockProfile";

function ReportDetails() {
  const [activeTab, setActiveTab] = useState<ReportTab>("General");

  return (
    <>
      <title>FraudeBot - {mockProfile.name}</title>

      <div className="font-[Nunito]">
        <Header />
        <ProfileHero profile={mockProfile} />

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

export default ReportDetails;
