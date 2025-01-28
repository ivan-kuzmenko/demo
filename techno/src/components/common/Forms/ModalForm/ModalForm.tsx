"use client";

import { FC, useRef, useState } from "react";
import styles from "./ModalForm.module.scss";
import { ButtonForm } from "../../Buttons/ButtonForm/ButtonForm";
import { sendModalShowerFormRequest } from "@/lib/actions";
import { TOrderShowerDetails } from "@/lib/types";

interface ModalFormProps {
  details: TOrderShowerDetails;
  setModal: (value: boolean) => void;
}

export const ModalForm: FC<ModalFormProps> = ({ details, setModal }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSendSuccess, setIsSendSuccess] = useState(false);

  return (
    <form
      ref={formRef}
      className={styles.form}
      action={async (formData: FormData) => {
        setIsSendSuccess(false);
        try {
          await sendModalShowerFormRequest(formData, details);
          setIsSendSuccess(true);
        } catch (error) {
          alert("Ошибка при отправке формы.");
        } finally {
          if (formRef.current) {
            formRef.current.reset();
          }
          setModal(false);
        }
      }}
    >
      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="name">
          Ваше имя
        </label>
        <input
          className={styles.formGroupInput}
          type="text"
          id="name"
          name="name"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="email">
          Ваша почта
        </label>
        <input
          className={styles.formGroupInput}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formGroupLabel} htmlFor="message">
          Сообщение
        </label>
        <textarea
          className={styles.formGroupTextarea}
          id="message"
          name="message"
          required
        ></textarea>
      </div>

      <div className={styles.formLower}>
        <ButtonForm isSendSuccess={isSendSuccess} circleColor="black" />
        <p className={styles.formLowerText}>
          Отправляя заявку, вы соглашаетесь на обработку персональных данных
        </p>
      </div>
    </form>
  );
};
