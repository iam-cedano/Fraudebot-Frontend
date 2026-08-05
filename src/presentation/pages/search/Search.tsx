import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";
import Formatter from "@/presentation/shared/utils/formatter";
import searchReportCache from "@/presentation/shared/utils/search-report-cache.util";
import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import NotFound from "@/presentation/pages/search/components/NotFound";
import ContactsTab from "@presentation/pages/report/components/ContactsTab";
import GeneralTab from "@presentation/pages/report/components/GeneralTab";
import PlaceholderTab from "@presentation/pages/report/components/PlaceholderTab";
import ReportHero from "@presentation/pages/report/components/ReportHero";
import ReportsTab from "@presentation/pages/report/components/ReportsTab";
import ReportTabNavigation from "@presentation/pages/report/components/ReportTabNavigation";
import { ReportTab } from "@presentation/pages/report/components/types";
import mockProfile from "@presentation/pages/report/mockProfile";
import {
  toHeroProps,
  toReportProfile,
} from "@/presentation/pages/search/utils/map-report-summary.util";
import {
  getValidPage,
  getVisiblePages,
} from "@/presentation/shared/utils/search-pagination.util";

function isCanceledError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const maybeCanceledError = error as { code?: string; name?: string };

  return (
    maybeCanceledError.name === "CanceledError" ||
    maybeCanceledError.code === "ERR_CANCELED"
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(() =>
    getValidPage(searchParams.get("p") || searchParams.get("page")),
  );
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [reports, setReports] = useState<ReportSummaryEntity[]>([]);
  const [activeTab, setActiveTab] = useState<ReportTab>("General");
  const activeSearchId = useRef(0);
  const { searchReportUseCase } = useDependencies();
  const totalPages = pageSize > 0 ? Math.ceil(totalResults / pageSize) : 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const selectedReport = reports[0] ?? null;
  const profile = selectedReport ? toReportProfile(selectedReport) : null;

  const updateSearchParams = useCallback(
    (nextQuery: string, nextPage: number) => {
      const nextSearchParams = new URLSearchParams({
        q: Formatter.FormatInput(nextQuery),
      });

      if (nextPage > 1) {
        nextSearchParams.set("p", String(nextPage));
      }

      setSearchParams(nextSearchParams);
    },
    [setSearchParams],
  );

  const searchReports = useCallback(
    async (nextQuery: string, nextPage: number) => {
      const searchId = ++activeSearchId.current;

      if (!nextQuery || nextQuery.trim() === "") {
        setIsSearching(false);
        setReports([]);
        setCurrentPage(1);
        setTotalResults(0);
        setPageSize(0);

        return;
      }

      setIsSearching(true);

      try {
        const result = await searchReportUseCase.execute(nextQuery, nextPage);

        setReports(result.data);
        setCurrentPage(result.page);
        setTotalResults(result.total);
        setPageSize(result.count);
        setActiveTab("General");
        searchReportCache.set(nextQuery, result);
        updateSearchParams(nextQuery, result.page);
      } catch (error) {
        if (isCanceledError(error)) {
          return;
        }

        console.error("Error searching reports:", error);
      } finally {
        if (searchId === activeSearchId.current) {
          setIsSearching(false);
        }
      }
    },
    [searchReportUseCase, updateSearchParams],
  );

  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    const formattedQuery = Formatter.FormatInput(query);
    const cachedResult = searchReportCache.get(formattedQuery, currentPage);

    setQuery(formattedQuery);

    if (cachedResult) {
      setReports(cachedResult.data);
      setCurrentPage(cachedResult.page);
      setTotalResults(cachedResult.total);
      setPageSize(cachedResult.count);

      return;
    }

    searchReports(formattedQuery, currentPage);

    return () => {
      searchReportUseCase.cancel();
    };
  }, []);

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const formattedQuery = Formatter.FormatInput(event.currentTarget.value);

    setSearchParams({ q: formattedQuery });
    setQuery(formattedQuery);
    setCurrentPage(1);
  };

  const handleSubmit = async () => {
    setPageSize(0);
    await searchReports(query, 1);
  };

  const handlePageChange = async (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    await searchReports(query, page);
  };

  const hasResults = !isSearching && reports.length > 0 && selectedReport && profile;

  return (
    <>
      <title>FraudeBot - Buscando</title>

      <div className="font-[Nunito]">
        <Header />

        {isSearching && (
          <SearchContainer>
            <Loader />
          </SearchContainer>
        )}

        {!isSearching && !hasResults && (
          <SearchContainer>
            <LookupForm
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              query={query}
            />

            {query && totalResults === 0 && <NotFound />}
          </SearchContainer>
        )}

        {hasResults && (
          <>
            <ReportHero {...toHeroProps(selectedReport)} />

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
                  <ReportsTab reportCount={selectedReport.reports} />
                )}
                {activeTab === "Contactos" && (
                  <ContactsTab contacts={mockProfile.contacts} />
                )}
                {(activeTab === "Mapa" || activeTab === "Soporte") && (
                  <PlaceholderTab tab={activeTab} />
                )}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mx-auto mb-8 flex max-w-5xl items-center justify-center gap-2 px-4"
                  aria-label="Paginación de reportes"
                >
                  <button
                    type="button"
                    className="rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Anterior
                  </button>

                  {visiblePages.map((page, index) => {
                    const previousPage = visiblePages[index - 1];
                    const shouldShowGap =
                      previousPage && page - previousPage > 1;

                    return (
                      <div key={page} className="flex items-center gap-2">
                        {shouldShowGap && (
                          <span className="text-sm font-semibold text-gray-400">
                            ...
                          </span>
                        )}

                        <button
                          type="button"
                          className={`rounded-sm border px-3 py-2 text-sm font-semibold shadow-sm ${
                            page === currentPage
                              ? "border-red-600 bg-red-600 text-white"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                          aria-current={
                            page === currentPage ? "page" : undefined
                          }
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </main>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}

export default Search;
