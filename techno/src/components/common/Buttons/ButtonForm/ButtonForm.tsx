import styles from "./ButtonForm.module.scss";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { colorMap } from "@/lib/constants";
import { Spinner } from "@/components/ui/Spinner/Spinner";

type TCircleColor = "white" | "black";

interface ButtonFormProps {
  onClick?: () => void;
  circleColor?: TCircleColor;
  isSendSuccess: boolean;
}

export const ButtonForm: FC<ButtonFormProps> = ({
  onClick,
  circleColor = "white",
  isSendSuccess
}) => {
  const { pending } = useFormStatus();

  const buttonClasses = clsx(styles.button, {
    [styles.white]: circleColor === "white",
    [styles.black]: circleColor === "black",
  });

  const arrowColor = colorMap[circleColor] || "black";

  const buttonText = () => {
    if (!isSendSuccess && pending) return "Отправка...";
    if (isSendSuccess && !pending) return "Отправлено!";
    if (!isSendSuccess && !pending) return "Отправить";
    if (isSendSuccess && pending) return "Отправка...";
    return "Отправить";
  };

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type="submit"
      disabled={pending}
    >
      <div className={styles.buttonContainer}>
        {pending ? (
          <Spinner
            variant="form-pending"
            color={"blue"}
          />
        ) : (
          <svg
            className={styles.buttonContainerArrow}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.4216 9.26597L10.6734 0.71333L10.0157 0.161475L1.46304 0.909729L1.56886 2.11926L8.66148 1.49873L0.514203 11.2083L1.44429 11.9887L9.59157 2.27917L10.2121 9.37179L11.4216 9.26597Z"
              fill={arrowColor}
            />
          </svg>
        )}
      </div>
      <span className={styles.buttonText}>
        {buttonText()}
      </span>
    </button>
  );
};
