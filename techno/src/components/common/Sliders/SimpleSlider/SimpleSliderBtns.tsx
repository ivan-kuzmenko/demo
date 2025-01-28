import styles from "./SimpleSlider.module.scss";
import { useSwiper } from "swiper/react";

export const SimpleSliderBtns = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.buttons}>
      <div
        className={styles.btnLeft}
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <svg
          width="18"
          height="16"
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
      <div
        className={styles.btnRight}
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <svg
          width="18"
          height="16"
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
    </div>
  );
};
