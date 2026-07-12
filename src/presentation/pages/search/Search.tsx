import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerEntity from "@/core/domain/scammer/entities/scammer.entity";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";
import Formatter from "@/presentation/shared/utils/formatter";
import Paragraph from "@/presentation/shared/utils/paragraph";
import OrganizationEntity from "@/core/domain/organization/entities/organization.entity";
import Report from "@/presentation/pages/search/components/Report";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [reports, setReports] = useState<
    (ScammerEntity | OrganizationEntity)[]
  >([]);
  const { searchScammerUseCase } = useDependencies();

  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    setSearchParams({ q: Paragraph.RemoveWhitespaces(query) });
    setQuery(Formatter.FormatInput(query));

    setIsSearching(true);

    searchScammerUseCase
      .execute(query)
      .then((res) => setReports(res))
      .finally(() => setIsSearching(false));

    return () => {
      searchScammerUseCase.cancel();
    };
  }, []);

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const newQuery = Paragraph.RemoveWhitespaces(event.currentTarget.value);

    const formattedQuery = Formatter.FormatInput(newQuery);

    setSearchParams({ q: newQuery });
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
      const scammers = await searchScammerUseCase.execute(query);

      setReports(scammers);
    } catch (error) {
      console.error("Error searching scammers:", error);
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
              id={report.getId()}
              name={report.getName()}
              organization={
                report instanceof ScammerEntity
                  ? report.getOrganizations().join(", ")
                  : undefined
              }
              reportsCount={}
            />
          ))}
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
