import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";
import arrow from "@/assets/svg/arrowWhite.svg";
import styles from "./ButtonBlur.module.scss";
import clsx from "clsx";

interface ButtonBlurProps extends ComponentPropsWithoutRef<"button"> {
  link?: string;
  bottom?: boolean | undefined;
}

export const ButtonBlur: FC<ButtonBlurProps> = ({ link, bottom = false }) => {
  const linkClasses = clsx(styles.link, {
    [styles.bottom]: bottom === true,
    [styles.dynamic]: bottom == false,
  });

  if (!link) {
    return (
      <div className={linkClasses}>
        <button className={styles.linkButton}>
          <Image
            className={styles.linkButtonImage}
            src={arrow}
            alt="arrow"
            width={23}
            height={26}
          />
        </button>
      </div>
    );
  }

  return (
    <Link href={link ?? ""} className={linkClasses}>
      <button className={styles.linkButton}>
        <Image
          className={styles.linkButtonImage}
          src={arrow}
          alt="arrow"
          width={23}
          height={26}
        />
      </button>
    </Link>
  );
};
