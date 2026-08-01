import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";
import Formatter from "@/presentation/shared/utils/formatter";
import Paragraph from "@/presentation/shared/utils/paragraph";
import Report from "@/presentation/pages/search/components/Report";
import ReportEntity from "@/common/domain/report/entities/report.entity";

function getValidPage(page: string | null) {
  const parsedPage = Number(page);

  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages]);

  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((firstPage, secondPage) => firstPage - secondPage);
}

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
    getValidPage(searchParams.get("page")),
  );
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [reports, setReports] = useState<ReportEntity[]>([]);
  const { searchReportUseCase } = useDependencies();
  const totalPages = pageSize > 0 ? Math.ceil(totalResults / pageSize) : 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const updateSearchParams = useCallback(
    (nextQuery: string, nextPage: number) => {
      const nextSearchParams = new URLSearchParams({
        q: Paragraph.RemoveWhitespaces(nextQuery),
      });

      if (nextPage > 1) {
        nextSearchParams.set("page", String(nextPage));
      }

      setSearchParams(nextSearchParams);
    },
    [setSearchParams],
  );

  const searchReports = useCallback(
    async (nextQuery: string, nextPage: number) => {
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

        setReports(result.reports);
        setCurrentPage(result.page);
        setTotalResults(result.total);
        setPageSize(result.count);
        updateSearchParams(nextQuery, result.page);
      } catch (error) {
        if (isCanceledError(error)) {
          return;
        }

        console.error("Error searching reports:", error);
      } finally {
        setIsSearching(false);
      }
    },
    [searchReportUseCase, updateSearchParams],
  );

  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    setQuery(Formatter.FormatInput(query));
    searchReports(query, currentPage);

    return () => {
      searchReportUseCase.cancel();
    };
  }, []);

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const newQuery = Paragraph.RemoveWhitespaces(event.currentTarget.value);

    const formattedQuery = Formatter.FormatInput(newQuery);

    setSearchParams({ q: newQuery });
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
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
