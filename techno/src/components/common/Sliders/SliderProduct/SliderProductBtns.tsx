import styles from "./SliderProduct.module.scss";
import { useSwiper } from "swiper/react";

export const SliderProductBtns = () => {
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
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.49958 13.0937L14.5703 7.02303V6.16449L8.49958 0.09375L7.64105 0.952284L12.6754 5.98668L0.00053215 5.98668V7.20082L12.6754 7.20082L7.64105 12.2352L8.49958 13.0937Z"
            fill="#001F32"
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
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.49958 13.0937L14.5703 7.02303V6.16449L8.49958 0.09375L7.64105 0.952284L12.6754 5.98668L0.00053215 5.98668V7.20082L12.6754 7.20082L7.64105 12.2352L8.49958 13.0937Z"
            fill="#001F32"
          />
        </svg>
      </div>
    </div>
  );
};
