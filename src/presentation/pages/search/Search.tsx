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
import Report from "@/presentation/pages/search/components/ReportCard";
import ReportSummaryEntity from "@/core/domain/report/entities/report-summary.entity";
import NotFound from "@/presentation/pages/search/components/NotFound";
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
  const activeSearchId = useRef(0);
  const { searchReportUseCase } = useDependencies();
  const totalPages = pageSize > 0 ? Math.ceil(totalResults / pageSize) : 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);

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

  return (
    <>
      <title>FraudeBot - Buscando</title>

      <Header />

      <SearchContainer>
        {isSearching && <Loader />}

        {!isSearching && (
          <LookupForm
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
            query={query}
          />
        )}

        {!isSearching &&
          reports.length > 0 &&
          reports.map((report, idx) => (
            <Report
              key={idx}
              id={report.id}
              name={report.name}
              organizations={report.organizations}
              products={report.products}
              reports={report.reports}
              tags={report.tags}
              status={report.status}
              type={report.type}
            />
          ))}

        {!isSearching && totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-2 mt-2 mb-4 font-[Nunito]"
            aria-label="Paginación de reportes"
          >
            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Anterior
            </button>

            {visiblePages.map((page, index) => {
              const previousPage = visiblePages[index - 1];
              const shouldShowGap = previousPage && page - previousPage > 1;

              return (
                <div key={page} className="flex items-center gap-2">
                  {shouldShowGap && (
                    <span className="text-sm font-semibold text-gray-400">
                      ...
                    </span>
                  )}

                  <button
                    type="button"
                    className={`px-3 py-2 text-sm font-semibold border rounded-sm shadow-sm ${
                      page === currentPage
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                    aria-current={page === currentPage ? "page" : undefined}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              className="px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Siguiente
            </button>
          </nav>
        )}

        {!isSearching && totalResults === 0 && <NotFound />}
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
