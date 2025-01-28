import Link from "next/link";
import styles from "./Breadcrumbs.module.scss";
import { FC } from "react";

interface BreadcrumbsProps {
  parentLink: string;
  parentName: string;
  childName: string;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  parentLink,
  parentName,
  childName,
}) => {
  return (
    <span className={styles.wrapper}>
      <Link href={parentLink} className={styles.wrapperParent}>
        {parentName}
      </Link>{" "}
      / <span className={styles.wrapperChild}>{childName}</span>
    </span>
  );
};
