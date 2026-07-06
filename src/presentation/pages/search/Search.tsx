import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerEntity from "@/domain/scammer/entities/scammer.entity";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";
import Formatter from "@/presentation/shared/utils/formatter";
import Paragraph from "@/presentation/shared/utils/paragraph";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [scammers, setScammers] = useState<ScammerEntity[]>([]);
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
      .then((res) => setScammers(res))
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
      setScammers([]);

      return;
    }

    setIsSearching(true);

    try {
      const scammers = await searchScammerUseCase.execute(query);

      setScammers(scammers);
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
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
