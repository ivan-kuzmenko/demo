"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./InputSelect.module.scss";
import { InputOption } from "./InputOption/InputOption";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutSide";

interface InputSelectProps {
  placeholder: string;
  options: number[];
  value: number;
  setValue(value: number): void;
}
export const InputSelect: FC<InputSelectProps> = ({
  placeholder,
  options,
  value,
  setValue,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isListShow, setIsListShow] = useState(false);

  const listRef = useRef(null);
  const handleListClose = useCallback(() => {
    setIsListShow(false);
  }, []);
  useClickOutside(listRef, handleListClose);

  useEffect(() => {
    if (value > 0) {
      setIsActive(true);
    }
  }, [value]);

  const handleToggleList = () => {
    setIsListShow((prev) => !prev);
  };

  const selectClasses = clsx(styles.select, {
    [styles.active]: isActive && value > 0,
    [styles.listShow]: isListShow === true,
  });

  return (
    <div className={selectClasses} onClick={handleToggleList}>
      <div className={styles.selectArrow}>
        <svg
          className={styles.selectArrowIcon}
          width="13"
          height="15"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.87774 15.8638L0.873047 8.85909V7.86847L7.87774 0.86377L8.86835 1.85439L3.05944 7.6633H17.6843V9.06424H3.05944L8.86835 14.8732L7.87774 15.8638Z"
            fill="white"
          />
        </svg>
      </div>
      <input
        className={styles.selectInput}
        placeholder={placeholder}
        value={value > 0 ? value : ""}
        onChange={() => {}}
      />
      <ul className={styles.selectList} ref={listRef}>
        {options.map((option, index) => (
          <InputOption
            option={option}
            key={index}
            handleListClose={handleListClose}
            setValue={setValue}
          />
        ))}
      </ul>
    </div>
  );
};
