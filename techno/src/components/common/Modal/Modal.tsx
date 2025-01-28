"use client";

import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { FC, useRef } from "react";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutSide";
import Image from "next/image";
import closeIcon from "@/assets/svg/close.svg";

interface ModalProps {
  children: React.ReactNode;
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  isDelay?: boolean;
}

const Modal: FC<ModalProps> = ({
  children,
  isModal,
  setIsModal,
  isDelay = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalClose = () => {
    setIsModal(false);
  };

  useClickOutside(modalRef, handleModalClose);

  const overlayClasses = clsx(styles.overlay, {
    [styles.showOverlay]: isModal,
  });

  const modalClasses = clsx(styles.modal, {
    [styles.showModal]: isModal && !isDelay,
    [styles.showModalWithDelay]: isModal && isDelay,
  });

  return ReactDOM.createPortal(
    <section className={overlayClasses}>
      <div className={modalClasses} ref={modalRef}>
        <div className={styles.close} onClick={handleModalClose}>
          <Image
            className={styles.closeImage}
            src={closeIcon}
            alt="Close"
            width={30}
            height={30}
            sizes="100%"
          />
        </div>
        {children}
      </div>
    </section>,
    document.body
  );
};

export default Modal;
