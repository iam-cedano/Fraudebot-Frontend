import LottieAnimation from "@presentation/shared/components/LottieAnimation";
import RobotLottieAnimation from "@presentation/assets/robot.lottie";

function Loader() {
    return (
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
    );
}

export default Loader;