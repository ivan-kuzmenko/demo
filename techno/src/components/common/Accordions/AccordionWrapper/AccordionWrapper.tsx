import { FC } from "react";
import styles from "./AccordionWrapper.module.scss";
import clsx from "clsx";

interface AccordionWrapperProps {
  headChildren: React.ReactNode;
  bodyChildren: React.ReactNode;
  isExpanded: boolean;
}

export const AccordionWrapper: FC<AccordionWrapperProps> = ({
  headChildren,
  bodyChildren,
  isExpanded,
}) => {
  const bodyClasses = clsx(styles.accordionBody, {
    [styles.expand]: isExpanded,
  });

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHead}>{headChildren}</div>
      <div className={bodyClasses}>
        <p className={styles.accordionBodyGap}></p>
        {bodyChildren}
      </div>
    </div>
  );
};
