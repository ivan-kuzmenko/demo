"use client";

import { useRef, useState } from "react";
import styles from "./BlockForm.module.scss";
import { sendFormRequest } from "@/lib/actions";
import { ButtonForm } from "../../Buttons/ButtonForm/ButtonForm";

export const BlockForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSendSuccess, setIsSendSuccess] = useState(false);

  return (
    <form
      ref={formRef}
      className={styles.form}
      action={async (formData: FormData) => {
        setIsSendSuccess(false);
        try {
          await sendFormRequest(formData);
          setIsSendSuccess(true);
        } catch (error) {
          alert("Ошибка при отправке формы.");
        } finally {
          if (formRef.current) {
            formRef.current.reset();
          }
        }
      }}
    >
      <div className={styles.formInputs}>
        <div className={styles.formInputsGroup}>
          <label className={styles.formInputsGroupLabel} htmlFor="name">
            Ваше имя
          </label>
          <input
            className={styles.formInputsGroupInput}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div className={styles.formInputsGroup}>
          <label className={styles.formInputsGroupLabel} htmlFor="email">
            Ваша почта
          </label>
          <input
            className={styles.formInputsGroupInput}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
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
        <ButtonForm isSendSuccess={isSendSuccess} />
        <p className={styles.formLowerText}>
          Отправляя заявку, вы соглашаетесь на обработку персональных данных
        </p>
      </div>
    </form>
  );
};
