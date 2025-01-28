import { FC } from "react";
import styles from "./BlockTitle.module.scss";
import '@/styles/globals.scss';
import clsx from "clsx";

interface BlockTitleProps {
  leftChildren?: React.ReactNode;
  rightChildren: React.ReactNode;
}

export const BlockTitle: FC<BlockTitleProps> = ({
  leftChildren,
  rightChildren,
}) => {
  const leftClasses = clsx(styles.wrapperLeft, {
    [styles.leftNotExist]: !leftChildren,
  })

  return (
    <div className={styles.wrapper}>
      <div className={leftClasses}>{leftChildren}</div>
      <div className={styles.wrapperRight}>
        <div className="title">{rightChildren}</div>
      </div>
    </div>
  );
};
