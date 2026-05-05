import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@presentation/shared/components/Header";
import Footer from "@presentation/shared/components/Footer";
import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import RobotLottieAnimation from "@presentation/assets/robot.lottie";
import SearchContainer from "@presentation/pages/search/components/SearchContainer";
import { useEffect } from "react";
import { useDependencies } from "@/presentation/providers/DependencyProvider";

function Search() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { searchScammerUseCase } = useDependencies();
    const query = searchParams.get("q");

    useEffect(() => {
        if (!query || query.trim() === "") {
            navigate("/404");
            
            return;
        }

        searchScammerUseCase.execute(query).then((data) => {
            console.log(data);
        });

        return () => {
        };
    }, [query]);

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