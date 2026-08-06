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
  className?: string;
};

export type DropdownOption = {
  id: string;
  label: string;
  onClick: () => void;
  iconSrc?: string;
  disabled?: boolean;
};

export type DropdownButtonProps = {
  label: string;
  options: DropdownOption[];
  className?: string;
  iconSrc?: string;
  align?: "left" | "right";
};
