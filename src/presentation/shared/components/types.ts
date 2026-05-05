import { CSSProperties, ReactNode } from "react";

export type HeaderProps = {
  children?: ReactNode;
};

export type FooterProps = {
  children?: ReactNode;
};

export type LottieProps = {
  src?: string;
  loop?: boolean;
  autoPlay?: boolean;
  style?: CSSProperties;
};
