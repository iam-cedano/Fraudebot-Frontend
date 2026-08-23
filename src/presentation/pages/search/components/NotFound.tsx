import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import NotFoundLottieAnimation from "@presentation/assets/not-found.lottie";

function NotFound() {
    return (
        <div className="grow flex flex-col items-center justify-center" role="status">
            <div className="flex flex-col items-center gap-8">
              <div className="w-64 h-64 bg-gray-50 flex items-center justify-center rounded-lg" aria-hidden="true">
                <LottieAnimation src={NotFoundLottieAnimation} className="w-full h-full lottie-not-found" />
              </div>

              <p className="text-[#6b7280] text-2xl font-[Nunito] text-center">
                No se encontraron resultados
              </p>
            </div>
        </div>
    );
}

export default NotFound;