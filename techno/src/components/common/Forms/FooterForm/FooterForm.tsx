"use client";

import Image from "next/image";
import styles from "./FooterForm.module.scss";
import arrow from "@/assets/svg/arrowBlackHorizontal.svg";
import { useRef } from "react";
import { sendEmailNotifications } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/Spinner/Spinner";

const FooterFormButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className={styles.formButton} type="submit" disabled={pending}>
      {pending ? (
        <Spinner variant="footer-pending" color="black" />
      ) : (
        <Image
          className={styles.formButtonImage}
          src={arrow}
          alt="Arrow"
          width={13}
          height={15}
        />
      )}
    </button>
  );
};

export const FooterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className={styles.form}
      action={async (formData) => {
        try {
          await sendEmailNotifications(formData);
        } catch (error) {
          alert("Ошибка при отправке формы.");
        } finally {
          formRef.current?.reset();
        }
      }}
    >
      <input
        className={styles.formInput}
        type="email"
        name="email"
        placeholder="Почта"
        required
      />
      <FooterFormButton />
    </form>
  );
};
