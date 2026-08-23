import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LottieProps } from "@presentation/shared/components/types";

export default function LottieAnimation({ src, loop = true, autoPlay = true, className }: LottieProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  if (src) {
    return (
      <DotLottieReact
        src={src}
        loop={prefersReducedMotion ? false : loop}
        autoplay={prefersReducedMotion ? false : autoPlay}
        className={`${className} lottie-player`}
      />
    );
  }

  return null;
}
