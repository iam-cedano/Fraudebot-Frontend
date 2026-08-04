import {
  reportTabs,
  ReportTab,
} from "@presentation/pages/report/components/types";

interface ReportTabNavigationProps {
  activeTab: ReportTab;
  onTabChange: (tab: ReportTab) => void;
}

function ReportTabNavigation({
  activeTab,
  onTabChange,
}: ReportTabNavigationProps) {
  return (
    <nav
      className="border-b border-gray-200 bg-gray-50 px-4"
      aria-label="Secciones del perfil"
    >
      <div className="mx-auto flex max-w-4xl overflow-x-auto">
        {reportTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`min-w-32 border-b-2 px-6 py-4 text-sm font-extrabold transition-colors ${
              activeTab === tab
                ? "border-gray-950 bg-gray-950 text-white"
                : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-950"
            }`}
            aria-current={activeTab === tab ? "page" : undefined}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default ReportTabNavigation;
