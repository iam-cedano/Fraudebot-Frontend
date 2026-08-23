import Footer from "@/presentation/shared/components/Footer";
import Header from "@/presentation/shared/components/Header";
import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import NotFoundLottieAnimation from "@presentation/assets/404.lottie";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@/common/app-routes";

function NotFound() {
    return (
        <>
        <title>FraudeBot - Página no encontrada</title>

        <Header />

        <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pt-24">
            <div className="flex flex-col items-center gap-8">
                <div className="w-64 h-64 bg-gray-50 flex items-center justify-center rounded-lg" aria-hidden="true">
                    <LottieAnimation src={NotFoundLottieAnimation} className="w-full h-full lottie-404"  />
                </div>

                <h1 className="text-[#6b7280] text-2xl font-[Nunito] text-center">
                   Página no encontrada
                </h1>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link to={APP_ROUTES.home} className="rounded-lg bg-orange-700 px-5 py-3 font-bold text-white hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">Ir al inicio</Link>
                    <Link to={APP_ROUTES.search} className="rounded-lg border border-gray-300 px-5 py-3 font-bold text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">Usar el buscador</Link>
                </div>
            </div>
        </main>

        <Footer />
        </>
    );
}

export default NotFound;
