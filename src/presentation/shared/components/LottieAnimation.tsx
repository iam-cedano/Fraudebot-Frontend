import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LottieProps } from "@presentation/shared/components/types";

export default function LottieAnimation({ src, loop = true, autoPlay = true, className }: LottieProps) {
  if (src) {
    return (
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoPlay}
        className={`${className} lottie-player`}
      />
    );
  }
}
