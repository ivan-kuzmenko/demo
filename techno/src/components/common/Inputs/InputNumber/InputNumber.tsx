"use client";

import { ChangeEventHandler, ComponentPropsWithRef, FC } from "react";
import styles from "./InputNumber.module.scss";
import Image from "next/image";
import icon from "@/assets/svg/calculator/input-button.svg";
import clsx from "clsx";

interface InputNumberProps extends ComponentPropsWithRef<"input"> {
  placeholder: string;
  value: number;
  setValue: (value: number) => void;
  isActive: boolean;
  min?: number;
  max?: number;
  step?: number;
}
export const InputNumber: FC<InputNumberProps> = ({
  placeholder,
  value,
  setValue,
  isActive,
  min = 0,
  max,
  step = 1,
}) => {
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    const value = parseInt(e.target.value);
    if (!isNaN(value) && (max === undefined || value <= max)) {
      setValue(value < min ? min : value);
    } else {
      setValue(min);
    }
  };

  const handlePlusClick = () => {
    if (max === undefined || value < max) {
      setValue(value + step);
    }
  };

  const handleMinusClick = () => {
    if (value > min) {
      setValue(value - step);
    }
  };

  const wrapperClasses = clsx(styles.wrapper, {
    [styles.active]: isActive,
  });
  
  return (
    <div className={wrapperClasses}>
      <input
        type="number"
        placeholder={placeholder}
        className={styles.wrapperInput}
        value={value === min ? "" : value}
        onChange={handleValueChange}
        onKeyDown={(evt) =>
          ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
        }
      />
      <div className={styles.wrapperButtons}>
        <button
          className={styles.wrapperButtonsPlus}
          onClick={handlePlusClick}
          disabled={max !== undefined && value >= max}
        >
          <Image
            className={styles.wrapperButtonsPlusIcon}
            src={icon}
            alt="plus"
            width={20}
            height={20}
          />
        </button>
        <button
          className={styles.wrapperButtonsMinus}
          onClick={handleMinusClick}
          disabled={value <= min}
        >
          <Image
            className={styles.wrapperButtonsMinusIcon}
            src={icon}
            alt="minus"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};
