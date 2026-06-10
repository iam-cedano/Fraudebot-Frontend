import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerEntity from "@/domain/scammer/entities/scammer.entity";
import Loader from "@/presentation/pages/search/components/Loader";
import LookupForm from "@presentation/pages/search/components/LookupForm";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const [scammers, setScammers] = useState<ScammerEntity[]>([]);
  const { searchScammerUseCase } = useDependencies();
  
  const query = searchParams.get("q");
  
  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }
    
    setIsSearching(true);

    searchScammerUseCase
      .execute(query)
      .then((res) => setScammers(res))
      .finally(() => setIsSearching(false));

    return () => {
      searchScammerUseCase.cancel();
    };
  }, []);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setSearchParams({ q: newQuery });
  }

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
  }

  return (
    <>
      <title>FraudeBot - Buscando</title>

      <Header />

      <SearchContainer>
        
        {isSearching && <Loader />}

        {!isSearching && <LookupForm defaultQuery={query} onSubmit={handleSubmit} onInputChange={handleInputChange} />}

      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
