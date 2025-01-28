import Image from "next/image";
import arrow from "@/assets/svg/arrowWhiteLeft.svg";
import styles from "./CircleArrow.module.scss";
import clsx from "clsx";

type TArrowDirections =
  | "right"
  | "up"
  | "down"
  | "left-up"
  | "right-up"
  | "left-down"
  | "right-down";

export const CircleArrow = ({
  direction,
  blur,
  className,
	isBig
}: {
  direction?: TArrowDirections;
  className?: string;
  blur?: boolean;
	isBig?: boolean;
}) => {
  return (
    <div
      className={clsx(
        styles.arrowWrapper,
        {
          [styles.right]: direction === "right",
          [styles.up]: direction === "up",
          [styles.down]: direction === "down",
          [styles.leftUp]: direction === "left-up",
          [styles.rightUp]: direction === "right-up",
          [styles.leftDown]: direction === "left-down",
          [styles.rightDown]: direction === "right-down",
          [styles.blur]: blur,
        },
        className
      )}
    >
      <Image src={arrow} alt="Иконка стрелки" className={clsx(styles.arrow, {
				[styles.big]: isBig,
			})} />
    </div>
  );
};
