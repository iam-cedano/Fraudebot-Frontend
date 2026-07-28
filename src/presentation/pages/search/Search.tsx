import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";
import Formatter from "@/presentation/shared/utils/formatter";
import Report from "@/presentation/pages/search/components/Report";
import ReportEntity from "@/common/domain/report/entities/report.entity";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [reports, setReports] = useState<ReportEntity[]>([]);
  const { searchReportUseCase } = useDependencies();

  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    const formattedQuery = Formatter.FormatInput(query);

    setSearchParams({ q: formattedQuery });
    setQuery(formattedQuery);

    setIsSearching(true);

    searchReportUseCase
      .execute(Formatter.toSearchQuery(query))
      .then((res) => setReports(res))
      .finally(() => setIsSearching(false));

    return () => {
      searchReportUseCase.cancel();
    };
  }, []);

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const formattedQuery = Formatter.FormatInput(event.currentTarget.value);

    setSearchParams({ q: formattedQuery });
    setQuery(formattedQuery);
  };

  const handleSubmit = async () => {
    if (!query || query.trim() === "") {
      setIsSearching(false);
      setReports([]);

      return;
    }

    setIsSearching(true);

    try {
      const reports = await searchReportUseCase.execute(
        Formatter.toSearchQuery(query),
      );

      setReports(reports);
    } catch (error) {
      console.error("Error searching reports:", error);
    } finally {
      setIsSearching(false);
    }
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
              reports={report.reports}
              tags={report.tags}
              status={report.status}
              type={report.type}
            />
          ))}
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
