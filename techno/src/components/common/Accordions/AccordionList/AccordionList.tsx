"use client";

import { FC, useState } from "react";
import styles from "./AccordionList.module.scss";
import { AccordionPlus } from "./AccordionPlus/AccordionPlus";
import { TAccordionItem } from "@/lib/types";

interface AccordionListProps {
  list: TAccordionItem[];
}

export const AccordionList: FC<AccordionListProps> = ({ list }) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(
    0
  );

  return (
    <div className={styles.list}>
      {list.map((item, index) => (
        <AccordionPlus
          key={item.title}
          item={item}
          index={index}
          openAccordionIndex={openAccordionIndex}
          setOpenAccordionIndex={setOpenAccordionIndex}
        />
      ))}
    </div>
  );
};
