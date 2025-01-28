"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Image, { StaticImageData } from "next/image";
import styles from "./SingleSlider.module.scss";
import { FC, useCallback, useRef, useState } from "react";
import arrow from "@/assets/svg/arrowWhiteLeft.svg";

type SingleSliderProps = {
  slides: StaticImageData[];
};

export const SingleSlider: FC<SingleSliderProps> = ({ slides }) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const activeIndexUS = useState<number>(0);

  const handlerPrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slidePrev();
    activeIndexUS[1](getActiveIndex());
  }, []);
  const handlerNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideNext();
    activeIndexUS[1](getActiveIndex());
  }, []);
  const getActiveIndex = (): number => {
    return swiperRef.current ? swiperRef.current.activeIndex : 0;
  };
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
    activeIndexUS[1](getActiveIndex());
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        className={styles.swiper}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide className={styles.slide} key={index}>
              <div className={styles.imageWrapper}>
                <Image
                  className={styles.image}
                  src={slide}
                  quality={100}
                  fill
                  alt="Изображение"
                />
              </div>
            </SwiperSlide>
          );
        })}
        <div className={styles.buttons}>
          <div className={styles.btnLeft} onClick={handlerPrev}>
            <Image src={arrow} alt="Стрелка" />
          </div>
          <div className={styles.btnRight} onClick={handlerNext}>
            <Image src={arrow} alt="Стрелка" />
          </div>
        </div>
      </Swiper>
      <div className={styles.pagination}>
        {Array.from({ length: slides.length }).map((_, index) => {
          return (
            <span
              key={index}
              className={`
                                    ${styles.bullet} 
                                    ${
                                      getActiveIndex() === index
                                        ? styles.bulletActive
                                        : ""
                                    }`}
              onClick={() => goToSlide(index)}
            ></span>
          );
        })}
      </div>
    </>
  );
};
