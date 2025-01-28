import { ComponentPropsWithoutRef, FC } from "react"
import styles from './ButtonCalculator.module.scss';
import clsx from "clsx";

interface ButtonCalculatorProps extends ComponentPropsWithoutRef<"button"> {
  children: string;
  activeState: string;
  setActiveState: (state: string) => void;
}

export const ButtonCalculator: FC<ButtonCalculatorProps> = ({
  children,
  activeState,
  setActiveState,
}) => {
  const buttonClasses = clsx(styles.button, {
    [styles.active]: children === activeState,
  })

  const handleClick = () => {
    if (setActiveState) {
      setActiveState(children)
    }
  }

  return (
    <button className={buttonClasses} onClick={handleClick}>
      <span className={styles.buttonText}>{children}</span>
    </button>
  )
}