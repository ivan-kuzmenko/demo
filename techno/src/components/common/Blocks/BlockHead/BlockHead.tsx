import React, { FC } from "react";
import styles from "./BlockHead.module.scss";
import clsx from "clsx";

type TTextColor = "white" | "black";

interface BlockHeadProps {
  textColor: TTextColor;
  children: React.ReactNode;
  isTBank?: boolean;
}

export const BlockHead: FC<BlockHeadProps> = ({ children, textColor, isTBank }) => {
  const blockClasses = clsx(styles.block, {
    [styles.tBank]: isTBank,
  })

  const textClasses = clsx(styles.blockTitle, {
    [styles.white]: textColor === "white",
    [styles.black]: textColor === "black",
  })
  return (
    <div className={blockClasses}>
      <div className={styles.blockBorder}></div>
      <h2 className={textClasses}>{children}</h2>
    </div>
  );
};
