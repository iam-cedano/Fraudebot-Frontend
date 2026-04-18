import Lottie from "lottie-react";
import { LottieProps } from "@presentation/shared/components/types";

export default function LottieAnimation({ animationData, loop = true, autoPlay = true, style }: LottieProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoPlay}
      style={style}
    />
  );
}
