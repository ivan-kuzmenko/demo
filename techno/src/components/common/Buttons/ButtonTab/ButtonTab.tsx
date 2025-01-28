import { ComponentPropsWithoutRef, FC } from "react";
import styles from "./ButtonTab.module.scss";
import clsx from "clsx";

interface ButtonTabProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  isDisabled?: boolean;
}

export const ButtonTab: FC<ButtonTabProps> = ({
  children,
  onClick,
  isActive,
  isDisabled,
}) => {
  const buttonClasses = clsx(styles.button, {
    [styles.activeButton]: isActive,
  });

  return (
    <button onClick={onClick} className={buttonClasses} disabled={isDisabled}>
      {children}
    </button>
  );
};
