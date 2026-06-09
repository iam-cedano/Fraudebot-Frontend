import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import RobotLottieAnimation from "@presentation/assets/robot.lottie";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useDependencies } from "@/presentation/providers/DependencyProvider";
import ScammerEntity from "@/domain/scammer/entities/scammer.entity";

function Search() {
  const [searchParams] = useSearchParams();
  const { searchScammerUseCase } = useDependencies();
  const query = searchParams.get("q");
  const [scammers, setScammers] = useState<ScammerEntity[]>([]);

  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    searchScammerUseCase
      .execute(query)
      .then((res) => {
        setScammers(res);
      })
      .catch((error) => {
        if (
          error?.name === "AbortError" ||
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED"
        ) {
          console.log("Search cancelled");
          return;
        }
        console.error("Search failed", error);
      });

    return () => {
      searchScammerUseCase.cancel();
    };
  }, [query, searchScammerUseCase]);

  return (
    <>
      <title>FraudeBot - Buscando</title>

      <Header />

      <SearchContainer>
        {scammers.length == 0 && (
          <div className="grow flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              <div className="w-64 h-64 bg-gray-50 flex items-center justify-center rounded-lg">
                <LottieAnimation src={RobotLottieAnimation} />
              </div>

              <p className="text-[#6b7280] text-2xl font-[Nunito] text-center">
                Buscando información, espere unos segundos
              </p>
            </div>
          </div>
        )}

        {scammers.length > 0 && (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8"></div>
        )}
      </SearchContainer>

      <Footer />
    </>
  );
}

export default Search;
