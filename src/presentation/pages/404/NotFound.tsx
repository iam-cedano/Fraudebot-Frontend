import Footer from "@/presentation/shared/components/Footer";
import Header from "@/presentation/shared/components/Header";
import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import NotFoundLottieAnimation from "@presentation/assets/404.lottie";

function NotFound() {
    return (
        <>
        <title>Fraudebot - Página no encontrada</title>

        <Header />

        <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-24">
            <div className="flex flex-col items-center gap-8">
                <div className="w-64 h-64 bg-gray-50 flex items-center justify-center rounded-lg">
                    <LottieAnimation src={NotFoundLottieAnimation} className="w-full h-full lottie-404"  />
                </div>

                <h1 className="text-[#6b7280] text-2xl font-[Nunito] text-center">
                   Página no encontrada
                </h1>
            </div>
        </div>

        <Footer />
        </>
    );
}

export default NotFound;
