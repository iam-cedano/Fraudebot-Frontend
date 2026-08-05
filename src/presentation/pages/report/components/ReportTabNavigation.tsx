import reportIcons from "@presentation/pages/report/components/icons";
import {
  reportTabs,
  ReportTab,
} from "@presentation/pages/report/components/types";

interface ReportTabNavigationProps {
  activeTab: ReportTab;
  onTabChange: (tab: ReportTab) => void;
}

const tabIcons: Record<ReportTab, string> = {
  General: reportIcons.home,
  Reportes: reportIcons.reportes,
  Contactos: reportIcons.contactos,
  Mapa: reportIcons.mapa,
  Soporte: reportIcons.soporte,
};

function ReportTabNavigation({
  activeTab,
  onTabChange,
}: ReportTabNavigationProps) {
  return (
    <div className="mx-auto flex max-w-5xl justify-center px-4 pt-6">
      <nav
        className="inline-flex w-fit max-w-full overflow-x-auto bg-gray-100"
        aria-label="Secciones del perfil"
      >
        {reportTabs.map((tab) => {
          const isActive = activeTab === tab;
          const iconSrc = tabIcons[tab];

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-3.5 text-sm font-extrabold transition-colors sm:px-6 ${
                isActive
                  ? "bg-gray-950 text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-950"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {iconSrc && (
                <img
                  src={iconSrc}
                  alt=""
                  aria-hidden
                  className="h-4 w-4 shrink-0"
                />
              )}
              {tab}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default ReportTabNavigation;
