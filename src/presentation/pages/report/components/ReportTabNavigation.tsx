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
    <nav
      className="border-b border-gray-200 bg-gray-100 px-4"
      aria-label="Secciones del perfil"
    >
      <div className="mx-auto flex max-w-5xl overflow-x-auto">
        {reportTabs.map((tab) => {
          const isActive = activeTab === tab;
          const iconSrc = tabIcons[tab];

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`flex min-w-0 flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-extrabold transition-colors sm:px-6 ${
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
      </div>
    </nav>
  );
}

export default ReportTabNavigation;
