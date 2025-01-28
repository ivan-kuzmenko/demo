'use client'

import { FC } from 'react';
import styles from './InputOption.module.scss'

interface InputOptionProps {
  option: number;
  handleListClose: () => void;
  setValue(value: number): void;
}

export const InputOption: FC<InputOptionProps> = ({
  option,
  handleListClose,
  setValue,
}) => {
  const handleClick = () => {
    setValue(option);
    setTimeout(handleListClose, 0)
  }

  return (
    <li className={styles.option} onClick={handleClick}>
      {option}
    </li>
  )
}