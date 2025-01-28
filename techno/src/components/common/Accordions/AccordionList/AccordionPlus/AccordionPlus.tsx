"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./AccordionPlus.module.scss";
import clsx from "clsx";
import { TAccordionItem } from "@/lib/types";

interface AccordionPlusProps {
  item: TAccordionItem;
  index: number;
  openAccordionIndex: number | null;
  setOpenAccordionIndex: (index: number | null) => void;
}

export const AccordionPlus: FC<AccordionPlusProps> = ({ 
  item,
  index,
  openAccordionIndex,
  setOpenAccordionIndex,
 }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if(openAccordionIndex === index) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [openAccordionIndex, index])

  const plusClasses = clsx(styles.accordionHeadPlusVertical, {
    [styles.minus]: isCollapsed,
  });

  const bodyClasses = clsx(styles.accordionBody, {
    [styles.collapsed]: isCollapsed,
  });

  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHead}
        onClick={() => setOpenAccordionIndex(index === openAccordionIndex ? null : index)}
      >
        <h4 className={styles.accordionHeadTitle}>{item.title}</h4>
        <div className={styles.accordionHeadPlus}>
          <div className={plusClasses}></div>
          <div className={styles.accordionHeadPlusHorizontal}></div>
        </div>
      </div>
      <div className={bodyClasses}>
        <div 
          className={styles.accordionBodyContent} 
          dangerouslySetInnerHTML={{ __html: item.html }} 
        />
      </div>
    </div>
  );
};
