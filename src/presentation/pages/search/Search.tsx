import { useEffect, useRef, useState } from "react";
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
import { getValidPage } from "@/presentation/shared/utils/search-pagination.util";
import { isCanceledError } from "@/common/utils/http-error.util";
import PaginationNav from "@/presentation/shared/components/PaginationNav";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [reports, setReports] = useState<ReportSummaryEntity[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const activeSearchId = useRef(0);
  const { searchReportUseCase, searchReportStubUseCase } = useDependencies();
  const urlQuery = searchParams.get("q") || "";
  const requestedPage = getValidPage(
    searchParams.get("p") || searchParams.get("page"),
  );
  const hasSubmittedSearch = urlQuery.trim().length > 0;
  const totalPages = pageSize > 0 ? Math.ceil(totalResults / pageSize) : 0;

  useEffect(() => {
    const formattedQuery = Formatter.FormatInput(urlQuery);
    setQuery(formattedQuery);
    setErrorMessage(null);

    if (!formattedQuery.trim()) {
      activeSearchId.current += 1;
      setIsSearching(false);
      setReports([]);
      setCurrentPage(1);
      setTotalResults(0);
      setPageSize(0);
      return;
    }

    const cachedResult = searchReportCache.get(formattedQuery, requestedPage);

    if (cachedResult) {
      setReports(cachedResult.data);
      setCurrentPage(cachedResult.page);
      setTotalResults(cachedResult.total);
      setPageSize(cachedResult.count);

      return;
    }

    const searchId = ++activeSearchId.current;
    const useStub =
      import.meta.env.DEV && formattedQuery.includes("[TEST]");
    const useCase = useStub ? searchReportStubUseCase : searchReportUseCase;

    setIsSearching(true);

    void useCase
      .execute(Formatter.toSearchQuery(formattedQuery), requestedPage)
      .then((result) => {
        if (searchId !== activeSearchId.current) {
          return;
        }

        setReports(result.data);
        setCurrentPage(result.page);
        setTotalResults(result.total);
        setPageSize(result.count);

        if (!useStub) {
          searchReportCache.set(formattedQuery, result);
        }

        if (result.page !== requestedPage) {
          setSearchParams(
            `?${Formatter.buildSearchQueryString(formattedQuery, result.page)}`,
            { replace: true },
          );
        }
      })
      .catch((error: unknown) => {
        if (
          searchId !== activeSearchId.current ||
          isCanceledError(error)
        ) {
          return;
        }

        setErrorMessage(
          "No pudimos completar la búsqueda. Revisa tu conexión e inténtalo de nuevo.",
        );
      })
      .finally(() => {
        if (searchId === activeSearchId.current) {
          setIsSearching(false);
        }
      });

    return () => {
      useCase.cancel();
    };
  }, [
    requestVersion,
    requestedPage,
    searchReportStubUseCase,
    searchReportUseCase,
    setSearchParams,
    urlQuery,
  ]);

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const formattedQuery = Formatter.FormatInput(event.currentTarget.value);

    setQuery(formattedQuery);
  };

  const handleSubmit = () => {
    setPageSize(0);
    const formattedQuery = Formatter.FormatInput(query);
    const nextSearch = formattedQuery.trim()
      ? `?${Formatter.buildSearchQueryString(formattedQuery, 1)}`
      : "";

    if (nextSearch === `?${searchParams.toString()}`) {
      setRequestVersion((version) => version + 1);
    } else {
      setSearchParams(nextSearch);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setSearchParams(`?${Formatter.buildSearchQueryString(urlQuery, page)}`);
  };

  return (
    <>
      <title>FraudeBot - Búsqueda</title>

      <Header />

      <SearchContainer>
        <h1 className="sr-only">Buscar reportes de fraude</h1>
        <LookupForm
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          query={query}
        />

        {isSearching && <Loader />}

        {!isSearching && errorMessage && (
          <section
            role="alert"
            className="mx-4 mb-8 max-w-xl rounded-lg border border-red-200 bg-red-50 p-6 text-center font-[Nunito]"
          >
            <h2 className="text-lg font-extrabold text-red-900">
              La búsqueda falló
            </h2>
            <p className="mt-2 text-red-800">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setRequestVersion((version) => version + 1)}
              className="mt-4 rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Reintentar
            </button>
          </section>
        )}

        {!isSearching &&
          !errorMessage &&
          reports.length > 0 &&
          reports.map((report) => (
            <Report
              key={`${report.type}:${report.id}`}
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

        {!isSearching && !errorMessage && totalPages > 1 && (
          <PaginationNav
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            ariaLabel="Paginación de reportes"
            className="mb-4 mt-2"
          />
        )}

        {!isSearching &&
          !errorMessage &&
          hasSubmittedSearch &&
          totalResults === 0 && <NotFound />}

        {!isSearching && !hasSubmittedSearch && (
          <p className="px-4 pb-16 text-center font-[Nunito] text-gray-600">
            Ingresa un dato para consultar reportes de la comunidad.
          </p>
        )}
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
