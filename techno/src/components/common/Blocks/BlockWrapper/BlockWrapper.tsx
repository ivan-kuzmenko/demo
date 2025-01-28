import { FC } from "react";
import styles from "./BlockWrapper.module.scss";
import "@/styles/globals.scss";
import clsx from "clsx";

type TBackgroundColor = "white" | "gray" | "dark";
type TPadding = "sm" | "md" | "none" | "sm-md";

interface BlockWrapperProps {
  children: React.ReactNode;
  backgroundColor?: TBackgroundColor;
  paddingTop: TPadding;
  paddingBottom: TPadding;
  className?: string;
}

export const BlockWrapper: FC<BlockWrapperProps> = ({
  children,
  backgroundColor = "white",
  paddingTop,
  paddingBottom,
}) => {
  const wrapperClasses = clsx(styles.wrapper, {
    [styles.paddingTopNone]: paddingTop === "none",
    [styles.paddingTopSm]: paddingTop === "sm",
    [styles.paddingTopMd]: paddingTop === "md",
    [styles.paddingTopSmMd]: paddingTop === "sm-md",

    [styles.paddingBottomNone]: paddingBottom === "none",
    [styles.paddingBottomSm]: paddingBottom === "sm",
    [styles.paddingBottomMd]: paddingBottom === "md",
    [styles.paddingBottomSmMd]: paddingBottom === "sm-md",

    [styles.white]: backgroundColor === "white",
    [styles.gray]: backgroundColor === "gray",
    [styles.dark]: backgroundColor === "dark",
  });

  return (
    <section className={wrapperClasses}>
      <div className="container">{children}</div>
    </section>
  );
};
