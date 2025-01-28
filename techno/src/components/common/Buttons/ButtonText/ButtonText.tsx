import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./ButtonText.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { colorMap } from "@/lib/constants";

type TCircleColor = "blue" | "white" | "black" | "white-blue";

interface ButtonTextProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  circleColor: TCircleColor;
  isHeaderButton?: boolean;
  isTargetBlank?: boolean;
}

export const ButtonText: FC<ButtonTextProps> = ({
  children,
  onClick,
  link,
  circleColor,
  isHeaderButton = false,
  className,
  isTargetBlank = false,
}) => {
  const variantClass = clsx(
    styles.link,
    {
      [styles.blue]: circleColor === "blue",
      [styles.white]: circleColor === "white",
      [styles.black]: circleColor === "black",
      [styles.whiteBlue]: circleColor === "white-blue",
      [styles.headerButton]: isHeaderButton,
    },
    className
  );
  
  const arrowColor = colorMap[circleColor] || "red";
  
  if (!link) {
    return (
      <div className={variantClass} onClick={onClick}>
        <button className={styles.linkButton}>
          <svg
            className={styles.linkButtonArrow}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.4216 9.26597L10.6734 0.71333L10.0157 0.161475L1.46304 0.909729L1.56886 2.11926L8.66148 1.49873L0.514203 11.2083L1.44429 11.9887L9.59157 2.27917L10.2121 9.37179L11.4216 9.26597Z"
              fill={arrowColor}
            />
          </svg>
        </button>
        <span className={styles.linkText}>{children}</span>
      </div>
    );
  }

  return (
    <Link
      href={link ?? ""}
      className={variantClass}
      onClick={onClick}
      target={isTargetBlank ? "_blank" : "_self"}
    >
      <button className={styles.linkButton}>
        <svg
          className={styles.linkButtonArrow}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.4216 9.26597L10.6734 0.71333L10.0157 0.161475L1.46304 0.909729L1.56886 2.11926L8.66148 1.49873L0.514203 11.2083L1.44429 11.9887L9.59157 2.27917L10.2121 9.37179L11.4216 9.26597Z"
            fill={arrowColor}
          />
        </svg>
      </button>
      <span className={styles.linkText}>{children}</span>
    </Link>
  );
};
