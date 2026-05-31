import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import RobotLottieAnimation from "@presentation/assets/robot.lottie";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useDependencies } from "@/presentation/providers/DependencyProvider";

function Search() {
    const [searchParams] = useSearchParams();
    const { searchScammerUseCase } = useDependencies();
    const query = searchParams.get("q");

    useEffect(() => {
        if (!query || query.trim() === "") {
            return;
        }

        searchScammerUseCase.execute(query).then((data) => {
            console.log(data);
        }).catch((error) => {
            if (error?.name === "AbortError" || error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
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

        </SearchContainer>

        <Footer />

        </>
);
}

export default Search;